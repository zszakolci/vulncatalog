"use client";

import React, { useState } from 'react';
import { Button } from '@mui/material';
import styles from './addVulnForm.module.css'
import useSWR from 'swr'
import { useForm,useController } from "react-hook-form";



function AddVulnForm(){
    const [urlFieldValue, setUrlFieldValue] = React.useState('');
    const CVEInput = React.createRef();
    const descriptionInput = React.createRef();
    const formRef = React.useRef(null);
     const fetcher = (...args) => fetch(...args).then(res => res.json());
     const [post,setPost] = useState(false);
    const cveInputName="cve";
    const restURL = (CVEInput.current  && descriptionInput.current) ? `http://localhost:8080/vulnerability/add?id=${CVEInput.current.value}&url=${urlFieldValue}&description=${descriptionInput.current.value}`: "";
    const {data,error,isLoading} = useSWR( post ? restURL: null,fetcher); 
    const { handleSubmit, control } = useForm({
        mode: "onTouched",
        defaultValues: {
            cveInputName: '',
            url: ''
          }
    });

   
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

const handleFormSubmit = async (event) =>
{
    console.log("in handleSubmit");
    setPost(true);
    event.preventDefault();
    formRef.current.submit();
   
    
}
    return (
        <div className={"box"} >
            <form ref={formRef} className={styles.addVulnForm } >

                    <div  className={styles.listItem}><input name={cveInputName} onBlur={handleCVEInputBlur}
       className="inputField" type="text" placeholder="CVE ID" /></div>
                    {/* {inputError[cveInputName] && <div className="errorMessage">This field is required</div>} */}
                    <div className={styles.URLContainer}><input className={"inputField " + styles.URLItem} type="url" placeholder="URL" onChange={handleURLChange} value={urlFieldValue} /> </div>
                    {/* {errors.url && <div className="errorMessage">This field is required</div>} */}
                    <div className={styles.listItem}><textarea ref={descriptionInput} className='textArea' placeholder="DESCRIPTION"/></div>
                <Button onClick={handleSubmit(handleFormSubmit)} className={styles.addButton} variant="contained">
                    Add
                </Button > {error ? <label className="errorMessage">Error:</label> : ''}
            </form>
        </div>
      );
}

export default AddVulnForm;