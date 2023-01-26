import { Alert, AlertTitle, Button } from '@mui/material';
import styles from './addTicketForm.module.css'
import CVESearch from './cveSearch'
//import LibrarySearch from './librarySearch';
import VersionSearch from './versionSearch';
import React, { useState, useContext } from 'react';
import { usePromiseTracker, trackPromise} from "react-promise-tracker";
import SuccessMessage from './successMessage'

const ErrorContext = React.createContext([{}, () => {}]);
/* const ErrorProvider = (props) => {
    const [err, setErr] = useState({});
    return (
      <ErrorContext.Provider value={[err, setErr]}>
        {props.children}
      </ErrorContext.Provider>
    );
  } */

  export { ErrorContext };

function AddTicketForm(){
    const CVEIDInput = React.createRef();
    const LPEInput = React.createRef();
    const LSVInput = React.createRef();
    const LPSInput = React.createRef();
    const libraryInput = React.createRef();
    const affectedInput = React.createRef();
    const fixedInput = React.createRef();
    const [errorMessage, setErrorMessage] = useState("");
    const [submitError,setSubmitError] = useState(false);
    const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);
    //const fetcher = (...args) => fetch(...args).then(res => res.json());
    //const [post,setPost] = useState(false);
    // const [err, setErr] = useState(null);
    const [err, setErr] = useState({});

    //const {data,error,isLoading} = useSWR( post ? restURL: null); 
    console.log("szopás:" + err);
    const handleSubmit = async (event) =>
    {
        const restURL = 
        CVEIDInput.current && LPEInput.current && LSVInput.current && LPSInput.current
        && libraryInput.current && affectedInput.current && fixedInput.current
        ?`http://localhost:8080/ticket/add?vulnerabilityId=${CVEIDInput.current.value}&lpeId=${LPEInput.current.value}&ticketId=${LPSInput.current.value}&lsvId=${LSVInput.current.value}&library=${libraryInput.current.value}&affectedVersion=${affectedInput.current.value}&fixedVersion=${fixedInput.current.value}`
        : '';
        event.preventDefault(); 
        console.log("in handlesubmit");
        console.log(restURL);
        trackPromise(
        fetch(restURL)
            .then(async response => {
                //const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                setSubmitError(false);
                CVEIDInput.current.value = "";
                LPEInput.current.value = "";
                LSVInput.current.value = "";
                LPSInput.current.value = "";
                libraryInput.current.value = "";
                affectedInput.current.value = "";
                fixedInput.current.value = "";
                setIsAlertVisible(true);
                setTimeout(() => {
                    setIsAlertVisible(false);
                }, 3000);
                //this.setState({ totalReactPackages: data.total })
            })
            .catch(error => {
                setErrorMessage(error.toString());
                setSubmitError(true);
                setSubmitSuccess(false);
            }));
        //setPost(true);
        //event.preventDefault();
        //formRef.current.submit();
         
    }

    return (
        <ErrorContext.Provider value={[err, setErr]}>
        <div className='box'>
                {err && <Alert variant="outlined" severity="error">
                         <strong>{err ? err.toString() : ''}</strong>
                    </Alert> }
                <form className="addTicketForm">
                   
                   <CVESearch ref={CVEIDInput} /* setErr={setErr} err={err} *//>
                    <div className={styles.listItem}><input ref={LPEInput} className="inputField" type="text" placeholder="LPE" /></div>
                    <div className={styles.listItem}><input ref={LSVInput} className="inputField" type="text" placeholder="LSV" /></div>
                    <div className={styles.listItem}><input ref={LPSInput} className="inputField" type="text" placeholder="LPS" /></div>
                    <div className={styles.libraryFieldContainer}><input ref={libraryInput} className={styles.libraryField + " inputField"} type="text" placeholder="Affected library"/></div>
                    <VersionSearch ref={affectedInput} label="Affects Version"/>
                    <VersionSearch ref={fixedInput} label="Fixed Version"/>
                    <div className={styles.buttonContainer}>
                    <div><Button color='secondary' onClick={handleSubmit} className={styles.addButton} variant="contained">
                    Add
                    </Button > </div>
                    {submitError && <div> <Alert className={styles.alert} variant="outlined" severity="error">
                         <strong>Unable to Submit data. Try again later.</strong>
                    </Alert></div>} 
                    { isAlertVisible && <div> <Alert className={styles.alert} variant="outlined" severity="success">
                         <strong>Ticket successfully added!</strong>
                    </Alert></div>}
                    </div>
           
            </form>
        </div>
        </ErrorContext.Provider>
      );
}

export default AddTicketForm;