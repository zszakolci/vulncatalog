"use client"

//import AddVulnForm from '../components/addVulnForm';
//import AddTicketForm from '../components/addTicketForm'
//import AddLibraryForm from '../components/addLibraryForm'
import styles from './adminForm.module.css'
import React, { useState } from 'react';
import { Button, Collapse, ThemeProvider } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import theme from '../admin/themes'
import dynamic from "next/dynamic"
import FormSkeleton from './formSkeleton'

 const AddVulnForm = dynamic(() => import("../components/addVulnForm"), {
    loading: () => <FormSkeleton/>,
  });

  const AddTicketForm = dynamic(() => import("../components/addTicketForm"), {
    loading: () => <FormSkeleton/>,
  });

function AdminForm(){

    const [vulnFormOpened, setVulnFormOpened] = useState(false);
    const [ticketFormOpened, setTicketormOpened] = useState(false);
    //const [libraryFormOpened, setLibraryFormOpened] = useState(false);
    

    const vulnLabelClicked =()=>{
        setVulnFormOpened(!vulnFormOpened);
    }

    const ticketLabelClicked =()=>{
        setTicketormOpened(!ticketFormOpened);
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
                <div>
                    <Collapse in={vulnFormOpened}>{<AddVulnForm  /> }</Collapse>
                </div>
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
                <div>
                    <Collapse in={ticketFormOpened}>{<AddTicketForm /> }</Collapse>
                </div>
             </section>
               </ThemeProvider>
        </div>
      );
}

export default AdminForm;