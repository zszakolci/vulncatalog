import React, { useState, useContext } from 'react';
import { Autocomplete, Button, TextField } from "@mui/material";
import styles from './addTicketForm.module.css';
import useSWR from 'swr';
import { ErrorContext } from './addTicketForm';

const CVESearch = (props, ref) => {
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
        })/* .catch(err => {
          setErrorMessage(err.toString());
          setError(true);
      }
          ), [error,errorMessage] */
      );

    setErr(error);
    if(error)setNoOptions(error.toString());

    const filteredVulnerabilities = data ? data : [];
    //const filteredVulnerabilities = error ? [error.toString()] : returned;

    
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

    return(
        <div className={styles.listItem}>
            <Autocomplete loadingText='Loading...' noOptionsText={noOptions} loading={isValidating} autoComplete autoHighlight autoSelect blurOnSelect='touch' options={filteredVulnerabilities} disablePortal renderInput={(params) => <TextField  {...params} onChange={handleChange} inputRef={ref} onBlur={handleBlur} className="combobox" placeholder="CVE ID" />} /> 
            <Button className={styles.linkButton}>Add new</Button>
        </div>
    );
};

export default React.forwardRef(CVESearch)