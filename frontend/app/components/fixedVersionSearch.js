"use client";

import React, {useContext, useEffect} from 'react';
import { Alert, Autocomplete, Button, TextField } from "@mui/material";
import styles from './addTicketForm.module.css'
import useSWR from 'swr'
import { ErrorContext } from './addTicketForm';

const FixedVersionSearch = (props) =>{
    const [err, setErr] = useContext(ErrorContext);
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const {data,error,isLoading} = useSWR( 'http://localhost:8080/version/get-all',fetcher ); 
    const returned = data ? data : [];
    const versions = error ? [error.toString()] : returned;
    useEffect(() => {
        setErr(error);
      }, )


      const handleOptionSelected = (_event, newValue) => {
        props.formik.setFieldValue('fixedVersion', newValue);
      }
    return(
      
        <div className={styles.comboBoxContainer}>
           
             <Autocomplete 
             renderOption={(props, option) => {
                return (
                  <li {...props} key={option}>
                    {option}
                  </li>
                  );
                }}
                onChange={handleOptionSelected}
                onBlur={props.formik.handleBlur} 
                inputValue={props.formik.values.fixedVersion}
                //onInputChange={props.formik.handleChange}
             sx={{width: '60%',backgroundColor: '#FFF'}} options={versions} disablePortal renderInput={(params) => <TextField 
             {...params} 
            name='fixedVersion'
            onBlur={props.formik.handleBlur}
             className="combobox" 
             label='Fixed Version'
             placeholder='Fixed Version'
             onChange={props.formik.handleChange}
            value={props.formik.values.fixedVersion}
            //onChange={props.formik.values.handleChange}
             />} /> </div>
        
     );
}

export default FixedVersionSearch;