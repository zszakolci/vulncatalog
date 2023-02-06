"use client";

import React, {useContext, useEffect} from 'react';
import { Alert, Autocomplete, Button, TextField } from "@mui/material";
import styles from './addTicketForm.module.css'
import useSWR from 'swr'
import { ErrorContext } from './addTicketForm';

const AffectedVersionSearch = (props) =>{
    const [err, setErr] = useContext(ErrorContext);
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const {data,error,isLoading} = useSWR( 'http://localhost:8080/version/get-all',fetcher ); 
    const returned = data ? data : [];
    const versions = error ? [error.toString()] : returned;
    useEffect(() => {
        setErr(error);
      }, )

      const handleOptionSelected = (_event, newValue) => {
        props.formik.setFieldValue('affectedVersion', newValue);
      };

    return(
      
        <div className={styles.comboBoxContainer}>
              {props.formik.touched.affectedVersion && props.formik.errors.affectedVersion ? (
            <Alert sx={{border: '0px',fontSize: '14px',  padding: '0px'}}  variant="outlined" severity='warning'>{props.formik.errors.affectedVersion}</Alert>
   ) : null}
             <Autocomplete  
             
             options={versions} 
             disablePortal 
            autoComplete
            autoSelect
            renderOption={(props, option) => {
                return (
                  <li {...props} key={option}>
                    {option}
                  </li>
                  );
                }}
            sx={{width: '60%',backgroundColor: '#FFF'}}

            onChange={handleOptionSelected}
            onBlur={props.formik.handleBlur} 
             renderInput={(params) => <TextField 
             {...params} 
             
            error={props.formik.touched.affectedVersion && Boolean(props.formik.errors.affectedVersion)} 
            required
            onBlur={props.formik.handleBlur}
             name='affectedVersion'
             onChange={props.formik.handleChange}
             value={props.formik.values.affectedVersion}
             className="combobox" 
             label='Affects Version' 
             placeholder='Affects version' 
           
             />} /> </div>
        
     );
}

export default AffectedVersionSearch;