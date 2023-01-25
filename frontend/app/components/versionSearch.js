"use client";

import React, {useContext} from 'react';
import { Autocomplete, Button, TextField } from "@mui/material";
import styles from './addTicketForm.module.css'
import useSWR from 'swr'
import { ErrorContext } from './addTicketForm';

const VersionSearch = ({label},ref) =>{
    const [err, setErr] = useContext(ErrorContext);
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const {data,error,isLoading} = useSWR( 'http://localhost:8080/version/get-all',fetcher ); 
    const returned = data ? data : [];
    const versions = error ? [error.toString()] : returned;
    setErr(error);
   // let counter = 1;
    //const versionOpts = versions.map(version => ({label:version, id:counter++}));

    return(
        <div className={styles.comboBoxContainer}> <Autocomplete options={versions} disablePortal renderInput={(params) => <TextField {...params} className="combobox" label={label} placeholder={label} inputRef={ref} />} /> </div>
        
     );
}

export default React.forwardRef(VersionSearch);