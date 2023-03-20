'use client';

import React, { useContext, useEffect, useState, useImperativeHandle } from 'react';
import { Alert, Autocomplete, Button, TextField } from '@mui/material';
import styles from './addTicketForm.module.css';
import useSWR from 'swr';
import { ErrorContext } from './addTicketForm';

const AffectedVersionSearch = React.forwardRef((props, ref) => {
  const [selectedValues,setSelectedValues] = useState([]);
  const [err, setErr] = useContext(ErrorContext);
  const [textInput, setTextInput] = useState("");
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_REST_HOST}/version/get-all`,
    fetcher
  );
  const returned = data ? data : [];
  const versions = error ? [error.toString()] : returned;
  useEffect(() => {
    setErr(error);
  });

  useImperativeHandle(ref, () => ({
    setSelectedValues
  }));

  const handleOptionSelected = (_event, newValue) => {
    props.formik.setFieldValue('affectedVersion', newValue);
    setSelectedValues(newValue);
  };

  const handleTextInputChanged = (e) =>
  {
    setTextInput(e.target.value);
  }

  return (
    <div className={styles.comboBoxContainer}>
      {props.formik.touched.affectedVersion &&
      props.formik.errors.affectedVersion ? (
        <Alert
          sx={{ border: '0px', fontSize: '14px', padding: '0px' }}
          variant="outlined"
          severity="warning"
        >
          {props.formik.errors.affectedVersion}
        </Alert>
      ) : null}
      <Autocomplete
        options={versions}
        disablePortal
        filterSelectedOptions
        autoComplete
        autoHighlight
        //ref={ref}
        multiple
        renderOption={(props, option) => {
          return (
            <li {...props} key={option}>
              {option}
            </li>
          );
        }}
        sx={{ width: '60%', backgroundColor: '#FFF' }}
        value={selectedValues}
        onChange={handleOptionSelected}
        blurOnSelect="touch"
        renderInput={(params) => (
          <TextField
            {...params}
            error={
              props.formik.touched.affectedVersion &&
              Boolean(props.formik.errors.affectedVersion)
            }
            required
            name="affectedVersion"
            //onChange={handleTextInputChanged}
            //value={textInput}
            onBlur={props.formik.handleBlur}
            //value={props.formik.values.affectedVersion}
            className="combobox"
            label="Affects Version"
            placeholder="Affects version"
          />
        )}
      />{' '}
    </div>
  );
});

AffectedVersionSearch.displayName = 'AffectedVersionSearch';
export default AffectedVersionSearch;
