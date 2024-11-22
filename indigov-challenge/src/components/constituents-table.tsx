import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Constituent } from '../types/constituent.type';
import PhoneNumberMask from './masked-phone-number';
import { requests, RequestKeysEnum } from '../axios/requests';
import { useAxios } from '../axios/useAxios';
import { useEffect, useRef, useState } from 'react';
import EmailMask from './masked-email';


const ConstituentTable: React.FC<{ reloadTable: boolean }> = ({ reloadTable }) => {
    const [loading, setLoading] = useState(false);
    const [constituents, setConstituents] = useState<Constituent[]>([]);

    const isMounted = useRef(true);

    const request =  { ...requests[RequestKeysEnum.GetAllConstituents] };

    const { execute } = useAxios<Constituent[]>(request, true);

    useEffect(() => {
        isMounted.current = true;

        const fetchData = async () => {
            setLoading(true);
            
            const response = await execute();
            if (response) {
                setConstituents(response);
            }

            setLoading(false);
        };

        fetchData();

        return () => {
            isMounted.current = false;
        };
    },[reloadTable]);

    const formatNumber = (constituent: Constituent) => {
        return <PhoneNumberMask phoneNumber={constituent.phoneNumber} />;
    };

    const formatEmail = (constituent: Constituent) => {
        if(constituent.emailAddress === '') {
            return<></>
        } else {
            return <EmailMask email={constituent.emailAddress} />
        }
        
    };

    const header = `All Constituents`;

    const footer = `In total there are ${constituents ? constituents.length : 0} Constituents.`;

    return (
        <DataTable
            value={constituents}
            loading={loading}
            emptyMessage="No constituents found."
            tableStyle={{ minWidth: '50rem', marginTop: '2rem', margin: '0 auto' }}
            scrollable scrollHeight="40rem"
            header={header}
            footer={footer}
        >
            <Column field="name" header="Name"></Column>
            <Column field="phoneNumber" header="Phone Number" body={formatNumber}></Column>
            <Column field="emailAddress" header="Email" body={formatEmail}></Column>
        </DataTable>
    );
};

export default ConstituentTable;