import React, { useState, useContext, useEffect } from 'react';
import { Alert, Autocomplete, Button, TextField } from "@mui/material";
import styles from './addTicketForm.module.css';
import useSWR from 'swr';
import { ErrorContext } from './addTicketForm';

const CVESearch = (props) => {
   const [searchTerm, setSearchTerm] = useState();
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const [fetchActive,setFetchActive] = useState(false);
    const [err,setErr] = useContext(ErrorContext);
    const [noOptions,setNoOptions] = useState("Start to type CVE..."); 
    //const [error,setError] = useState(false);
    //const [errorMessage,setErrorMessage] = useState("");

   const { data,error, isValidating } = useSWR(
      fetchActive ? `http://localhost:8080/vulnerability/search?keyword=${searchTerm}` : null, 
      (path, ...args) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            fetcher(path, ...args)
              .then(resolve)
              .catch(reject);
            
          }, 700);
        })
      ); 

      useEffect(() => {
        setErr(error);
      }, )
     
    if(error)setNoOptions(error.toString());

    const filteredVulnerabilities = data ? data : []; 


  const handleChange = e => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
    lowerCase === "" ? setFetchActive(false) : setFetchActive(true);
    error ?  setNoOptions(error.toString()) : setNoOptions("CVE could not be found. Add new ->");;
      
    if(lowerCase === "")
      setNoOptions("Start to type CVE...") 

  };

  const handleBlur = e => {
    setFetchActive(false);
};

const handleOptionSelected = (_event, newValue) => {
  props.formik.setFieldValue('cveSearch', newValue);
};


    return(
        <div className={styles.listItem}>
               {props.formik.touched.cveSearch && props.formik.errors.cveSearch ? (
                <Alert sx={{border: '0px',fontSize: '14px', padding: '0px'}} variant="outlined" severity='warning'>{props.formik.errors.cveSearch}</Alert>
       ) : null}

             { <Autocomplete 
              loadingText='Loading...' 
              noOptionsText={noOptions} 
              loading={isValidating} 
              autoComplete
              autoSelect 
              blurOnSelect='touch' 
              options={filteredVulnerabilities} 
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option}>
                    {option}
                  </li>
                  );
                }}
              disablePortal 
              inputValue={props.formik.values.cveSearch}
              //value={props.formik.values.cveSearch}
              onChange={handleOptionSelected}
              sx={{width: '70%', backgroundColor: '#FFF'}}
              renderInput={(params) => <TextField  
                {...params} 
                value={props.formik.values.cveSearch} 
                error={props.formik.touched.cveSearch && Boolean(props.formik.errors.cveSearch)} 
                onChange={(e)=>{handleChange(e), props.formik.handleChange(e) }} 
                /* helperText={props.formik.touched.cve && props.formik.errors.cve}  */
                onBlur={(e)=>{props.formik.handleBlur(e); handleBlur(e)}} 
                name='cveSearch'
                label='CVE'
                required
                className="combobox" 
                placeholder="CVE ID" />} />  }
            <Button className={styles.linkButton}>Add new</Button>
        </div>
    );
};

export default CVESearch