'use client';

import React, { useState, useRef } from 'react';
import { Alert, Button, Grid, Paper } from '@mui/material';
import styles from './addVulnForm.module.css';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddVulnForm() {
  const descriptionInput = useRef(null);
  const formRef = useRef(null);
  const cveInputName = 'cve';

  const [submitError, setSubmitError] = useState(false);
  const { loading } = usePromiseTracker();
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [cveFieldValue, setCVEFieldValue] = useState();

  const vulnSchema = Yup.object().shape({
    cve: Yup.string()
      .min(6, 'Vulnerability ID is invalid')
      .max(50, 'Vulnerability ID is invalid')
      .required('CVE is required'),
    url: Yup.string()
      .url('Please enter a valid URL')
      .required('URL field is required')
  });

  const formik = useFormik({
    initialValues: {
      cve: '',
      url: ''
    },
    validationSchema: vulnSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleFormSubmit();
      setSubmitting(false);
    }
  });

  const constructURL = (cve) => {
    return 'https://nvd.nist.gov/vuln/detail/' + cve;
  };

  const handleCVEInputBlur = (e) => {
    const inputText = e.target.value;
    const url = inputText.length > 3 ? constructURL(inputText) : '';
    formik.setFieldValue('url', url);
  };

  const handleCveInputChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue('cve', value);
    setCVEFieldValue(value);
  };
  const handleFormSubmit = (event) => {
    const restURL = `${process.env.NEXT_PUBLIC_REST_HOST}/vulnerability/add?id=${formik.values.cve}&url=${formik.values.url}&description=${descriptionInput.current.value}`;
    trackPromise(
      fetch(restURL)
        .then(async (response) => {
          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setSubmitError(false);
          formik.resetForm();
          setCVEFieldValue("");
          descriptionInput.current.value = '';
          setIsAlertVisible(true);
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(error.toString());
          setSubmitError(true);
        })
    );
  };
  return (
    <Paper elevation={10} sx={{backgroundColor: "#F6FCFC", padding: "30px"}}>
      <form ref={formRef} className={styles.addVulnForm}>
        <div className={styles.listItem}>
          {formik.touched.cve && formik.errors.cve ? (
            <Alert
              sx={{ border: '0px', fontSize: '14px', padding: '0px' }}
              variant="outlined"
              severity="warning"
            >
              {formik.errors.cve}
            </Alert>
          ) : null}
          <input
            onBlur={(e) => {
              formik.handleBlur(e);
              handleCVEInputBlur(e);
            }}
            onChange={handleCveInputChange}
            placeholder={'CVE ID'}
            name={cveInputName}
            className={`inputField ${
              formik.touched.cve && formik.errors.cve ? 'invalid' : ''
            }`}
            value={cveFieldValue}
          />
        </div>

        <div className={styles.URLContainer}>
          {formik.touched.url && formik.errors.url ? (
            <Alert
              sx={{ border: '0px', fontSize: '14px', padding: '0px' }}
              variant="outlined"
              severity="warning"
            >
              Please enter a valid URL
            </Alert>
          ) : null}
          <input
            className={
              styles.URLItem +
              ' inputField ' +
              `${formik.touched.url && formik.errors.url ? 'invalid' : ''}`
            }
            type="url"
            name="url"
            placeholder="URL"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.url}
          />{' '}
        </div>

        <div className={styles.listItem}>
          <textarea
            maxlength="255"
            ref={descriptionInput}
            className="textArea"
            placeholder="DESCRIPTION"
          />
        </div>
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
        {loading && <label className="errorMessage">Loading...</label>}
      </form>
    </Paper>
  );
}

export default AddVulnForm;
