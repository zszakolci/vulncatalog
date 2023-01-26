"use client"
import '../components/addVulnForm'
import AddVulnForm from '../components/addVulnForm';
import AddTicketForm from '../components/addTicketForm'
import AddLibraryForm from '../components/addLibraryForm'
import styles from './adminForm.module.css'
import React, { useState, useEffect } from 'react';
import { Button, ThemeProvider } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import theme from '../admin/themes'

function AdminForm(){

    const [vulnFormOpened, setVulnFormOpened] = useState(false);
    const [ticketFormOpened, setTicketormOpened] = useState(false);
    const [libraryFormOpened, setLibraryFormOpened] = useState(false);
    

    const vulnLabelClicked =()=>{
        setVulnFormOpened(!vulnFormOpened);
    }

    const ticketLabelClicked =()=>{
        setTicketormOpened(!ticketFormOpened);
    }

    const libraryLabelClicked =()=>{
        setLibraryFormOpened(!libraryFormOpened);
        
    }

    return (
        <div className={styles.adminFormContainer}>
           <ThemeProvider theme={theme}>
            <section className={styles.addVulnForm}>
            <div className={styles.labelContainer}> 
            <Button startIcon={<AddCircle/>} color='secondary' onClick={vulnLabelClicked}>
                Add vulnerability
            </Button>
            </div>
                <div hidden={!vulnFormOpened}><AddVulnForm  /></div>
            </section>
            {/* <section  className={styles.addLibraryForm}>
            <div className={styles.labelContainer}> <Button startIcon={<AddCircle/>} onClick={libraryLabelClicked}>
                Add Library
             </Button></div>
               <div hidden={!libraryFormOpened}> <AddLibraryForm /></div>
             </section> */}
            <section  className={styles.addTicketForm}>
            <div className={styles.labelContainer}> <Button color='secondary' startIcon={<AddCircle/>} onClick={ticketLabelClicked}>
                Add a ticket
    </Button></div>  
                <div hidden={!ticketFormOpened}><AddTicketForm /></div>
             </section>
               </ThemeProvider>
        </div>
      );
}

export default AdminForm;