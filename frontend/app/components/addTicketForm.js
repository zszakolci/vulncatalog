import { Alert, AlertTitle, Button, Paper } from '@mui/material';
import styles from './addTicketForm.module.css';
import CVESearch from './cveSearch';
//import LibrarySearch from './librarySearch';
import AffectedVersionSearch from './versionSearch';
import React, { useState, createRef, useRef } from 'react';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import FixedVersionSearch from './fixedVersionSearch';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

function AddTicketForm() {
  const loading = usePromiseTracker();
  const [errorMessage, setErrorMessage] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  //const fetcher = (...args) => fetch(...args).then(res => res.json());
  //const [post,setPost] = useState(false);
  // const [err, setErr] = useState(null);
  const [err, setErr] = useState({});
  const cveSearchRef = useRef(null);
  const affectedVersionRef = useRef(null);
  const fixedVersionRef = useRef(null);

  const ticketSchema = Yup.object().shape({
    cveSearch: Yup.array()
      .nullable(true).min(1)
      .required('Please choose a vulnerability or add a new one.'),
    lpe: Yup.string()
      .notRequired()
      .lowercase()
      .matches(/^(lpe-[0-9]{4,10})?$/, {
        message: 'Please enter a valid LPE',
        excludeEmptyString: true
      }),
    lsv: Yup.string()
      .notRequired()
      .lowercase()
      .matches(/^(lsv-[0-9]{3,10})?$/, {
        message: 'Please enter a valid LSV',
        excludeEmptyString: true
      }),
    lps: Yup.string().required('Ticked ID is required'),
    affectedVersion: Yup.array()
      .nullable(true).min(1)
      .required('Please choose the affected version')
  });

  const formik = useFormik({
    initialValues: {
      cveSearch: [],
      lpe: '',
      lsv: '',
      lps: '',
      affectedLibrary: '',
      affectedVersion: [],
      fixedVersion: []
    },
    validationSchema: ticketSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit();
      setSubmitting(false);
    }
  });

  const cleanupForm = () =>
  {
    try{
      console.log(formik);
      formik.resetForm();
    }catch(err)
    {
      console.error(err);
    }
    cveSearchRef.current.setSelectedValue([]);
    affectedVersionRef.current.setSelectedValues([]);
    fixedVersionRef.current.setSelectedValues([]);
  }
  const handleSubmit = async (event) => {
    const restURL = `${process.env.NEXT_PUBLIC_REST_HOST}/ticket/add?vulnerabilityIds=${formik.values.cveSearch}&lpeId=${formik.values.lpe}&id=${formik.values.lps}&lsvId=${formik.values.lsv}&library=${formik.values.affectedLibrary}&affectedVersions=${formik.values.affectedVersion}&fixedVersions=${formik.values.fixedVersion}`;

    trackPromise(
      fetch(restURL)
        .then(async (response) => {
          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          cleanupForm();
          setIsAlertVisible(true);
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 3000);
          setSubmitError(false);
          //setSubmitSuccess(true);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(error.toString());
          setSubmitError(true);
          //setSubmitSuccess(false);
        })
    );
  };

  return (
    <ErrorContext.Provider value={[err, setErr]}>
      <Paper elevation={10} sx={{ padding: "30px"}}>
        {err && (
          <Alert variant="outlined" severity="error">
            <strong>{err ? err.toString() : ''}</strong>
          </Alert>
        )}
        <form className="addTicketForm">
          <CVESearch selectedValue={[]} multiple={true} formik={formik} ref={cveSearchRef}/>
          <div className={styles.listItem}>
            {formik.touched.lpe && formik.errors.lpe ? (
              <Alert
                sx={{ border: '0px', fontSize: '14px', padding: '0px' }}
                variant="outlined"
                severity="warning"
              >
                {formik.errors.lpe}
              </Alert>
            ) : null}
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="lpe"
              value={formik.values.lpe}
              className={`inputField ${
                formik.touched.lpe && formik.errors.lpe ? 'invalid' : ''
              }`}
              type="text"
              placeholder="LPE"
            />
          </div>
          <div className={styles.listItem}>
            {formik.touched.lsv && formik.errors.lsv ? (
              <Alert
                sx={{ border: '0px', fontSize: '14px', padding: '0px' }}
                variant="outlined"
                severity="warning"
              >
                {formik.errors.lsv}
              </Alert>
            ) : null}
            <input
              className={`inputField ${
                formik.touched.lsv && formik.errors.lsv ? 'invalid' : ''
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="lsv"
              value={formik.values.lsv}
              type="text"
              placeholder="LSV"
            />
          </div>
          <div className={styles.listItem}>
            {formik.touched.lps && formik.errors.lps ? (
              <Alert
                sx={{ border: '0px', fontSize: '14px', padding: '0px' }}
                variant="outlined"
                severity="warning"
              >
                {formik.errors.lps}
              </Alert>
            ) : null}
            <input
              required
              className={`inputField ${
                formik.touched.lps && formik.errors.lps ? 'invalid' : ''
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lps}
              name="lps"
              label="LPS"
              type="text"
              placeholder="LPS*"
            />
          </div>
          <div className={styles.libraryFieldContainer}>
            <input
              value={formik.values.affectedLibrary}
              onChange={formik.handleChange}
              name="affectedLibrary"
              className={styles.libraryField + ' inputField'}
              type="text"
              placeholder="Affected library"
            />
          </div>
          <AffectedVersionSearch formik={formik} ref={affectedVersionRef}/>
          <FixedVersionSearch formik={formik} ref={fixedVersionRef} />
          <div className={styles.buttonContainer}>
            <div>
              <Button
                disabled={!formik.isValid || formik.isSubmitting}
                color="secondary"
                onClick={formik.handleSubmit}
                className={styles.addButton}
                variant="contained"
              >
                Add
              </Button>{' '}
            </div>
            {submitError && (
              <div>
                {' '}
                <Alert
                  className={styles.alert}
                  variant="outlined"
                  severity="error"
                >
                  <strong>Unable to Submit data. Try again later.</strong>
                </Alert>
              </div>
            )}
            {isAlertVisible && (
              <div>
                {' '}
                <Alert
                  className={styles.alert}
                  variant="outlined"
                  severity="success"
                >
                  <strong>Ticket successfully added!</strong>
                </Alert>
              </div>
            )}
          </div>
        </form>
      </Paper>
    </ErrorContext.Provider>
  );
}

export default AddTicketForm;
