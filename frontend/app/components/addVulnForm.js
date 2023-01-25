"use client";

import React, { useState, useRef } from 'react';
import { Alert, Button } from '@mui/material';
import styles from './addVulnForm.module.css'

import { useForm,Controller } from "react-hook-form";
import { usePromiseTracker, trackPromise} from "react-promise-tracker";


function AddVulnForm(){
    const [urlFieldValue, setUrlFieldValue] = React.useState('');
    const CVEInput = useRef(null);
    const descriptionInput = useRef(null);
    const formRef = useRef(null);
    //const cveInputName="cve";
    const [errorMessage, setErrorMessage] = useState("");
    const [submitError,setSubmitError] = useState(false);
    const { loading } = usePromiseTracker();
    const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);
    //const restURL = (CVEInput.current  && descriptionInput.current) ? `http://localhost:8080/vulnerability/add?id=${CVEInput.current.value}&url=${urlFieldValue}&description=${descriptionInput.current.value}`: "";

    //console.log(restURL);
    //const {data,error,isLoading} = useSWR( post ? restURL: null,fetcher); 

     const { register, handleSubmit, watch, formState: { errors }, control } = useForm({
        mode: "onTouched",
        defaultValues: {
            cve: '',
            url: ''
          }
    });  

    register("cve", {required: true});
    const cve = watch("cve");
    const constructURL = (cve) =>
    {
        return "https://nvd.nist.gov/vuln/detail/" + cve;
    }

    const handleCVEInputBlur = (e) =>
{
    const inputText = e.target.value;
    const url = inputText? constructURL(inputText): "";
    setUrlFieldValue(url);
}

const handleURLChange = (e) =>
{

    setUrlFieldValue(e.target.value);
}

const handleFormSubmit =  (event) =>
{
    const restURL = `http://localhost:8080/vulnerability/add?id=${CVEInput.current.value}&url=${urlFieldValue}&description=${descriptionInput.current.value}`;
    console.log("in handlesubmit");
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
            CVEInput.current.value = "";
            descriptionInput.current.value = "";
            setUrlFieldValue("");
            setIsAlertVisible(true);
            setTimeout(() => {
                setIsAlertVisible(false);
            }, 3000);
        })
        .catch(error => {
            setErrorMessage(error.toString());
            setSubmitError(true);
        }));
    //setPost(true);
    event.preventDefault;
    //formRef.current.submit();
   
    
}
    return (
        <div className={"box"} >
            <form ref={formRef} className={styles.addVulnForm } >
            
            <Controller
                 render={({
                    field: { onBlur, value, name={cve}, ref, placeholder="CVE ID", className="inputField" },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <div  className={styles.listItem}>
                    <input
                      value={value}
                      required
                      onBlur={handleCVEInputBlur} // notify when input is touched
                      ref={CVEInput} // wire up the input ref
                      placeholder={placeholder}
                      name={name}
                      className={className}
                    />
      
                    {invalid && isTouched && <div className="error-message">szar</div>}
                    </div> 
                  )}
                control={control}
                rules={{ required: true }}
                name={cve}
                
                
            />
            {cve}
            {errors.cve  && 
  <div className="error-message">This field is required</div>}
                       
                    {/* <div  className={styles.listItem}><input ref={CVEInput} name={cveInputName} onBlur={handleCVEInputBlur}
       className="inputField" type="text" placeholder="CVE ID" /></div> */}
                     {/* {errors.id && <div className="errorMessage">This field is required</div>}  */}
                    <div className={styles.URLContainer}><input className={"inputField " + styles.URLItem} type="url" placeholder="URL" onChange={handleURLChange} value={urlFieldValue} /> </div>
                    {/* {errors.url && <div className="errorMessage">This field is required</div>} */}
                    <div className={styles.listItem}><textarea ref={descriptionInput} className='textArea' placeholder="DESCRIPTION"/></div>
                    <div className={styles.buttonContainer}>
                <div><Button onClick={handleFormSubmit} className={styles.addButton} variant="contained">
                    Add
                </Button > </div>
                {submitError && <div> <Alert className={styles.alert} variant="outlined" severity="error">
                         <strong>Unable to Submit data. Try again later.</strong>
                    </Alert></div>} 
                    { isAlertVisible && <div> <Alert className={styles.alert} variant="outlined" severity="success">
                         <strong>Ticket successfully added!</strong>
                    </Alert></div>}
                    </div>
                {loading && <label className="errorMessage">Loading...</label> }
            </form>
        </div>
      );
}

export default AddVulnForm;