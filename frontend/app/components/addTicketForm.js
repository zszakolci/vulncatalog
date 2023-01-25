import { Button } from '@mui/material';
import styles from './addTicketForm.module.css'
import CVESearch from './cveSearch'
import LibrarySearch from './librarySearch';
import VersionSearch from './versionSearch';
import React, { useState } from 'react';
import useSWR from 'swr';
export const ErrorContext = React.createContext();
function AddTicketForm(){
    const CVEIDInput = React.createRef();
    const LPEInput = React.createRef();
    const LSVInput = React.createRef();
    const LPSInput = React.createRef();
    const libraryInput = React.createRef();
    const affectedInput = React.createRef();
    const fixedInput = React.createRef();
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const [post,setPost] = useState(false);
    const [err, setErr] = useState(null);
    const restURL = 
    CVEIDInput.current && LPEInput.current && LSVInput.current && LPSInput.current
    && libraryInput.current && affectedInput.current && fixedInput.current
    ?`http://localhost:8080/ticket/add?vulnerabilityId=${CVEInput.current.value}&lpeId=${LPEInput.current.value}&lpsId=${LPSInput.current.value}&lsvId=${LSVInput.current.value}&libraryId=${libraryInput.current.value}&affectedversion=${affectedInput.current.value}&fixedversion=${fixedInput.current.value}`
    : '';

    //const {data,error,isLoading} = useSWR( post ? restURL: null); 
   
    const handleSubmit = async (event) =>
    {
        setPost(true);
        event.preventDefault();  
    }

    return (
        <ErrorContext.Provider value={{ err, setErr }}>
        <div className='box'>
                <form className="addTicketForm">

                   <CVESearch ref={CVEIDInput}/>
                    <div className={styles.listItem}><input ref={LPEInput} className="inputField" type="text" placeholder="LPE" /></div>
                    <div className={styles.listItem}><input ref={LSVInput} className="inputField" type="text" placeholder="LSV" /></div>
                    <div className={styles.listItem}><input ref={LPSInput} className="inputField" type="text" placeholder="LPS" /></div>
                    <LibrarySearch ref={libraryInput}/>
                    <VersionSearch ref={affectedInput} label="Affects Version"/>
                    <VersionSearch ref={fixedInput} label="Fixed Version"/>
                    
                    <Button onClick={handleSubmit} className={styles.addButton} variant="contained">
                    Add
                    </Button > 
            </form>
        </div>
        </ErrorContext.Provider>
      );
}

export default AddTicketForm;