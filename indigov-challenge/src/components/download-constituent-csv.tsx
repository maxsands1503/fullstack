import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog"
import { useState } from "react";
import { requests, RequestKeysEnum } from "../axios/requests";
import { useAxios } from "../axios/useAxios";

export const DownloadConstituentCsv: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [filterDate, setFilterDate] = useState(new Date())
    const [errors, setErrors] = useState('');

    const request = { ...requests[RequestKeysEnum.GetConstituentCsvByCreatedDate] };

    const { execute, loading, error } = useAxios<any>(request, true);

    const handleDateSet = (e: any) => {
        e.value ? setFilterDate(e.value) : setErrors('Please Select a Valid Date')
    }

    const triggerDownload = async () => {
        request.url = `${request.url}/${filterDate}`
        try {
            const response = await execute();
            setVisible(false);
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement("a");
            link.href = url;

            // Set the file name for download
            link.setAttribute("download", `constituent-filtered-${filterDate}.csv`);
            document.body.appendChild(link);

            // Trigger the download
            link.click();

            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error Submitting Form:", error || err);
        }
    }

    return (
        <>
            <Button label="Download CSV" icon="pi pi-download" onClick={() => setVisible(true)} />
            <Dialog visible={visible} modal style={{ width: '50rem' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <label htmlFor="filter_date">Created Date Value</label>
                <Calendar onChange={handleDateSet} placeholder="Select Date to Filter" value={filterDate}/>
                <Button label="Download" onClick={triggerDownload} />
            </Dialog>
        </>
    )


}