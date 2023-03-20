import React, { useState, useContext, useEffect , useRef, useImperativeHandle} from 'react';
import { Alert, Autocomplete, Button, TextField } from '@mui/material';
import styles from './addTicketForm.module.css';
import vulnFormStyles  from './addVulnForm.module.css';
import useSWR from 'swr';
import { ErrorContext } from './addTicketForm';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Chip from '@mui/material/Chip';
//import AddVulnForm from './addVulnForm';
import { Box } from '@mui/system';

const CVESearch = React.forwardRef((props, ref) => 
  {
  const [searchTerm, setSearchTerm] = useState();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const [fetchActive, setFetchActive] = useState(false);
  const [err, setErr] = useContext(ErrorContext);
  const [noOptions, setNoOptions] = useState('Start to type CVE...');
  //const [textValue, setTextValue] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    setSelectedValue
  }));

  const handleClose = () => {
    setDialogOpen(false);
  };

  const cveNotFound = () => (
    <div>
      CVE could not be found.{' '}
      <Button onClick={handleAddClick} color="secondary">
        Add new
      </Button>
    </div>
  );

  const removeExisting = (arr, elementsToRemove) => {
    return arr.filter((val) => !elementsToRemove.includes(val));
  };

  const handleAddClick = (e) => {

    setDialogOpen(true);
  };

  const { data, error, isValidating } = useSWR(
    fetchActive
      ? `${process.env.NEXT_PUBLIC_REST_HOST}/vulnerability/search?keyword=${searchTerm}`
      : null,
    (path, ...args) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          fetcher(path, ...args)
            .then(resolve)
            .catch(reject);
        }, 200);
      })
  );

  useEffect(() => {
    setErr(error);
  });

  if (error) setNoOptions(error.toString());

  const filteredVulnerabilities = data
    ? data
    : [];

  const handleChange = (e) => {
    const inputText = e.target.value;
    setSearchTerm(inputText);
    inputText.length < 6 ? setFetchActive(false) : setFetchActive(true);
    error ? setNoOptions(error.toString()) : setNoOptions(cveNotFound);

    if (inputText.length < 6) setNoOptions('Start to type CVE...');

    const url = inputText.length > 3 ? constructURL(inputText) : '';
    setUrlFieldValue(url);
    cveFormik.setFieldValue('url', url);
    cveFormik.setFieldValue('cve',searchTerm);
  };

  const handleBlur = (e) => {
    setFetchActive(false);
  };

  const handleOptionSelected = (_event, newValue) => {
    props.formik.setFieldValue('cveSearch', newValue);
    setSelectedValue(newValue);
    setSearchTerm(newValue);
  };

  const constructURL = (cve) => {
    return 'https://nvd.nist.gov/vuln/detail/' + cve;
  };

  const descriptionInput = useRef(null);
  const formRef = useRef(null);
  const cveInputName = 'cve';

  const [submitError, setSubmitError] = useState(false);
  const { loading } = usePromiseTracker();
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [urlFieldValue, setUrlFieldValue] = useState(constructURL(searchTerm));
  //const [cveFieldValue, setCVEFieldValue] = useState(cve);

  const vulnSchema = Yup.object().shape({
    cve: Yup.string()
      .min(6, 'Vulnerability ID is invalid')
      .max(50, 'Vulnerability ID is invalid')
      .required('CVE is required'),
    url: Yup.string()
      .url('Please enter a valid URL')
      .required('URL field is required')
  });

  const cveFormik = useFormik({
    initialValues: {
      cve: searchTerm,
      url: urlFieldValue
    },
    validationSchema: vulnSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleFormSubmit();
      setSubmitting(false);
    }
});



  const handleCVEInputBlur = (e) => {
    const inputText = e.target.value;
    const url = inputText.length > 3 ? constructURL(inputText) : '';
    cveFormik.setFieldValue('url', url);
    setUrlFieldValue(url);
  };

  const handleCveInputChange = (e) => {
    const value = e.target.value;
    cveFormik.setFieldValue('cve', value);
    setSearchTerm(value);
  };

  const handleURLFieldValueChange = (e) => {
    value = e.target.value;
    setUrlFieldValue(value);
    cveFormik.setFieldValue('url', value);
  };

  const handleFormSubmit = (event) => {
    const restURL = `${process.env.NEXT_PUBLIC_REST_HOST}/vulnerability/add?id=${searchTerm}&url=${urlFieldValue}&description=${descriptionInput.current.value}`;
    trackPromise(
      fetch(restURL)
        .then(async (response) => {
          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setSubmitError(false);
          //cveFormik.resetForm();

          descriptionInput.current.value = '';
          setIsAlertVisible(true);
          let newSelections= selectedValue;
          newSelections.push(searchTerm);
          setSelectedValue(newSelections);
          setTimeout(() => {
            setIsAlertVisible(false);
            handleClose();
          }, 1000);
        })
        .catch((error) => {
          setErrorMessage(error.toString());
          setSubmitError(true);
        })
    );
  };

  return (
    <div className={styles.listItem}>
      {props.formik.touched.cveSearch && props.formik.errors.cveSearch ? (
        <Alert
          sx={{ border: '0px', fontSize: '14px', padding: '0px' }}
          variant="outlined"
          severity="warning"
        >
          {props.formik.errors.cveSearch}
        </Alert>
      ) : null}

      <Autocomplete
        loadingText="Loading..."
        noOptionsText={noOptions}
        loading={isValidating}
        autoComplete
        filterSelectedOptions
        autoSelect
        multiple
        autoHighlight
        blurOnSelect="touch"
        options={filteredVulnerabilities}
        getOptionLabel={(option) => option}
        renderOption={(props, option) => {
          return (
            <li key={option} tabIndex={-1} {...props}>
              {option}
            </li>
          );
        }}

        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option + index} // set the key to a unique value based on the option and index
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        disablePortal
        value={selectedValue}
        onChange={handleOptionSelected}
        sx={{ width: '90%', backgroundColor: '#FFF' }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={
              props.formik.touched.cveSearch &&
              Boolean(props.formik.errors.cveSearch)
            }
            /* helperText={props.formik.touched.cve && props.formik.errors.cve}  */
            onBlur={(e) => {
              props.formik.handleBlur(e);
              handleBlur(e);
            }}
            name="cveSearch"
            label="CVE"
            required
            onChange={(e) => {
              handleChange(e);
            }}
            className="combobox"
            placeholder="CVE ID"
          />
        )}
      />
      <Dialog open={dialogOpen} onClose={handleClose}>
        <form ref={formRef} className={vulnFormStyles.addVulnForm}>
          <DialogTitle>Add a new Vulnerability</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Provide the CVE ID, corresponding URL, and a short description!
            </DialogContentText>

            <Box className="box">
              <div className={vulnFormStyles.listItem}>
                {cveFormik.touched.cve && cveFormik.errors.cve ? (
                  <Alert
                    sx={{ border: '0px', fontSize: '14px', padding: '0px' }}
                    variant="outlined"
                    severity="warning"
                  >
                    {cveFormik.errors.cve}
                  </Alert>
                ) : null}
                <input
                  onBlur={(e) => {
                    cveFormik.handleBlur(e);
                    handleCVEInputBlur(e);
                  }}
                  onChange={handleCveInputChange}
                  placeholder={'CVE ID'}
                  name={cveInputName}
                  className={`inputField ${
                    cveFormik.touched.cve && cveFormik.errors.cve
                      ? 'invalid'
                      : ''
                  }`}
                  value={searchTerm}
                />
              </div>

              <div className={vulnFormStyles.URLContainer}>
                {cveFormik.touched.url && cveFormik.errors.url ? (
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
                    vulnFormStyles.URLItem +
                    ' inputField ' +
                    `${
                      cveFormik.touched.url && cveFormik.errors.url
                        ? 'invalid'
                        : ''
                    }`
                  }
                  type="url"
                  name="url"
                  placeholder="URL"
                  onBlur={cveFormik.handleBlur}
                  onChange={handleURLFieldValueChange}
                  value={urlFieldValue}
                />{' '}
              </div>

              <div className={vulnFormStyles.listItem}>
                <textarea
                  ref={descriptionInput}
                  className="textArea"
                  placeholder="DESCRIPTION"
                />
              </div>

              {loading && <label className="errorMessage">Loading...</label>}
            </Box>
          </DialogContent>
          <DialogActions>
            <div className={vulnFormStyles.buttonContainer}>
              <div>
                <Button
                  disabled={!cveFormik.isValid || cveFormik.isSubmitting}
                  color="secondary"
                  onClick={cveFormik.handleSubmit}
                  className={vulnFormStyles.addButton}
                  variant="contained"
                >
                  Add
                </Button>{' '}
                <Button onClick={handleClose}>Cancel</Button>
              </div>
              {submitError && (
                <div>
                  {' '}
                  <Alert
                    className={vulnFormStyles.alert}
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
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
});

CVESearch.displayName = 'CVESearch';
export default CVESearch;
