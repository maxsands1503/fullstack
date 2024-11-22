import { useState } from "react";
import ConstituentTable from "./components/constituents-table";
import { SignUpDialog } from "./components/sign-up-dialog";
import { DownloadConstituentCsv } from "./components/download-constituent-csv";

const Home = () => {
    const [reloadTable, setReloadTable] = useState(false);

    const triggerReload = () => {
        setReloadTable((prev) => !prev);
    };



    return (
        <>
            <h1 className="mt-2 ml-2" style={{ fontSize: '1.5rem' }}>Welcome to the Town Hall</h1>
            <div className="row d-inline-flex justify-end mt-2">
                <SignUpDialog onSuccess={triggerReload} />
                <span className="ml-1 mr-5">
                    <DownloadConstituentCsv />
                </span>
            </div>
            <div className="d-flex justify-center mt-4">
                <ConstituentTable reloadTable={reloadTable} />
            </div>
        </>

    );
}

export default Home;