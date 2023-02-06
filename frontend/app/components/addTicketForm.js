import { Alert, AlertTitle, Button } from '@mui/material';
import styles from './addTicketForm.module.css'
import CVESearch from './cveSearch'
//import LibrarySearch from './librarySearch';
import AffectedVersionSearch from './versionSearch';
import React, { useState, useContext } from 'react';
import { usePromiseTracker, trackPromise} from "react-promise-tracker";
import FixedVersionSearch from './fixedVersionSearch'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormatStrikethroughOutlined } from '@mui/icons-material';

const ErrorContext = React.createContext([{}, () => {}]);
/* const ErrorProvider = (props) => {
    const [err, setErr] = useState({});
    return (
      <ErrorContext.Provider value={[err, setErr]}>
        {props.children}
      </ErrorContext.Provider>
    );
  } */

  export { ErrorContext };

function AddTicketForm(){
    
    const loading = usePromiseTracker();
    const [errorMessage, setErrorMessage] = useState("");
    const [submitError,setSubmitError] = useState(false);
    const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);
    //const fetcher = (...args) => fetch(...args).then(res => res.json());
    //const [post,setPost] = useState(false);
    // const [err, setErr] = useState(null);
    const [err, setErr] = useState({});

    const ticketSchema = Yup.object().shape({
        cveSearch: Yup.string().nullable(true)
          .required('Please choose a vulnerability or add a new one.'),
        lpe: Yup.string().notRequired().lowercase().matches(/^(lpe-[0-9]{4,10})?$/, {message: 'Please enter a valid LPE', excludeEmptyString: true })
            ,
        lsv: Yup.string().notRequired().lowercase()
            .matches(/^(lsv-[0-9]{3,10})?$/, {message: 'Please enter a valid LSV', excludeEmptyString: true })
              ,
        lps: Yup.string()
        .required('Ticked ID is required'),
        affectedVersion: Yup.string().nullable(true)
        .required('Please choose the affected version')
      });


  const formik = useFormik({
    initialValues: {
      cveSearch: '',
      lpe: '',
      lsv: '',
      lps: '',
      affectedLibrary: '',
      affectedVersion: '',
      fixedVersion: ''
    },
    validationSchema: ticketSchema,
    onSubmit: (values, { setSubmitting }) => {
        handleSubmit();
        setSubmitting(false);
    },
  });

  const validateForm = () =>
  {
      return (formik.values.cveSearch && formik.values.affectedVersion && formik.values.lps.length > 4);
  }

    const handleSubmit = async (event) =>
    {
        const restURL = 
        `http://localhost:8080/ticket/add?vulnerabilityId=${formik.values.cveSearch}&lpeId=${formik.values.lpe}&ticketId=${formik.values.lps}&lsvId=${formik.values.lsv}&library=${formik.values.affectedLibrary}&affectedVersion=${formik.values.affectedVersion}&fixedVersion=${formik.values.fixedVersion}`;
       
        trackPromise(
        fetch(restURL)
            .then(async response => {
                if (!response.ok) {

                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                
                formik.resetForm();
                setIsAlertVisible(true);
                setTimeout(() => {
                    setIsAlertVisible(false);
                }, 3000);
                  setSubmitError(false);
                  //setSubmitSuccess(true);
            })
            .catch(error => {
                setErrorMessage(error.toString());
                setSubmitError(true);
                //setSubmitSuccess(false);
            }));
          
 
    }

    return (
      
      <ErrorContext.Provider value={[err, setErr]}>
        <div className='box'>
                {err && <Alert variant="outlined" severity="error">
                         <strong>{err ? err.toString() : ''}</strong>
                    </Alert> }
                <form className="addTicketForm">
                   
                   <CVESearch 
                   formik={formik} />
                    <div className={styles.listItem}>
                    {formik.touched.lpe && formik.errors.lpe ? (
                <Alert sx={{border: '0px',fontSize: '14px', padding: '0px'}} variant="outlined" severity='warning'>{formik.errors.lpe}</Alert>
       ) : null}
                      <input
                       onChange={formik.handleChange} 
                       onBlur={formik.handleBlur} 
                       name='lpe' 
                       value={formik.values.lpe} 
                       className={`inputField ${
                        formik.touched.lpe && formik.errors.lpe ? 'invalid' : ''}`} 
                        type="text" placeholder="LPE" /></div>
                    <div className={styles.listItem}>
                    {formik.touched.lsv && formik.errors.lsv ? (
                <Alert sx={{border: '0px',fontSize: '14px', padding: '0px'}} variant="outlined" severity='warning'>{formik.errors.lsv}</Alert>
       ) : null}
                      <input className={`inputField ${
                        formik.touched.lsv && formik.errors.lsv ? 'invalid' : ''}`} 
                        onChange={formik.handleChange} 
                       onBlur={formik.handleBlur} 
                       name='lsv' 
                       value={formik.values.lsv} 
                         type="text" placeholder="LSV" /></div>
                    <div className={styles.listItem}>
                    {formik.touched.lps && formik.errors.lps ? (
                <Alert sx={{border: '0px',fontSize: '14px', padding: '0px'}} variant="outlined" severity='warning'>{formik.errors.lps}</Alert>
       ) : null}
                      <input required 
                   
                    className={`inputField ${
                      formik.touched.lps && formik.errors.lps ? 'invalid' : ''}` }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} 
                      value={formik.values.lps} 
                      name='lps' 
                      label='LPS'
                    type="text" 
                    placeholder="LPS" /></div>
                    <div className={styles.libraryFieldContainer}>
                      <input 
                   
                      value={formik.values.affectedLibrary}
                      onChange={formik.handleChange}
                      name='affectedLibrary'
                       className={styles.libraryField + " inputField"} 
                       type="text" 
                       placeholder="Affected library"/>
                       </div>
                    <AffectedVersionSearch formik={formik} />
                    <FixedVersionSearch formik={formik} />
                    <div className={styles.buttonContainer}>
                    <div><Button disabled={!formik.isValid || formik.isSubmitting } color='secondary' onClick={formik.handleSubmit} className={styles.addButton} variant="contained">
                    Add
                    </Button > </div>
                    {submitError && <div> <Alert className={styles.alert} variant="outlined" severity="error">
                         <strong>Unable to Submit data. Try again later.</strong>
                    </Alert></div>} 
                    { isAlertVisible && <div> <Alert className={styles.alert} variant="outlined" severity="success">
                         <strong>Ticket successfully added!</strong>
                    </Alert></div>}
                    </div>
           
            </form>
        </div>
        </ErrorContext.Provider> 
      ); 
}

export default AddTicketForm;