"use client";

import React, { useState, useEffect } from 'react';
import { Autocomplete, Button, TextField } from "@mui/material";
import styles from './addTicketForm.module.css'

const LibrarySearch= (props,ref) =>{
    const [searchTerm, setSearchTerm] = useState("");
    const  [loading, setLoading] = useState(false);
    const [filteredLibraries, setFilteredLibraries] = useState([]);

    useEffect(() => {
        if(!searchTerm ){
            setFilteredLibraries([]);
        }
        else{
            const timer = setTimeout(() => {
                 fetch('http://localhost:8080/library/?id='+ searchTerm)
                   .then((response) => response.json())
                   .then((data) => {
                        setFilteredLibraries(data);
                   })
                   .catch((err) => {
                      console.log(err.message);
                   }); 

            }, 700);
            return () => clearTimeout(timer);
        }
        
     }, [searchTerm]);
     return(
        <div className={styles.comboBoxContainer}><Autocomplete className="combobox" options={filteredLibraries} disablePortal renderInput={(params) => <TextField {...params}  label="Library" />} placeholder="Library"/><Button className={styles.linkButton} ref={ref}>Add new</Button> </div>
     );
}

export default React.forwardRef(LibrarySearch);