import React, { useState } from 'react';
import { Autocomplete, Button, TextField } from "@mui/material";
import styles from './addTicketForm.module.css';
import useSWR from 'swr';

const CVESearch = (props, ref) => {
    const [searchTerm, setSearchTerm] = useState();
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const [fetchActive,setFetchActive] = useState(false);
    const { data, error, isValidating } = useSWR(
      fetchActive ? `http://localhost:8080/vulnerability?id=${searchTerm}` : null, 
      (path, ...args) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            fetcher(path, ...args)
              .then(resolve)
              .catch(reject);
          }, 700);
        })
      );

    const filteredVulnerabilities = data ? data : [];

    
  const handleChange = e => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
    lowerCase === "" ? setFetchActive(false) : setFetchActive(true);
  
  };

    return(
        <div className={styles.listItem}>
            <Autocomplete  options={filteredVulnerabilities} disablePortal renderInput={(params) => <TextField  {...params} onChange={handleChange} ref={ref} className="combobox" placeholder="CVE ID" />} /> 
            <Button className={styles.linkButton}>Add new</Button>
        </div>
    );
};

export default React.forwardRef(CVESearch)