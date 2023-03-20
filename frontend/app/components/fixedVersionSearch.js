'use client';

import React, { useContext, useEffect, useState, useImperativeHandle } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import styles from './addTicketForm.module.css';
import useSWR from 'swr';
import { ErrorContext } from './addTicketForm';

const FixedVersionSearch = React.forwardRef((props, ref) => {
  const [selectedValues,setSelectedValues] = useState([]);
  const [err, setErr] = useContext(ErrorContext);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_REST_HOST}/version/get-all`,
    fetcher
  );

  useImperativeHandle(ref, () => ({
    setSelectedValues
  }));

  const returned = data ? data : [];
  const versions = error ? [error.toString()] : returned;
  useEffect(() => {
    setErr(error);
  });

  const handleOptionSelected = (_event, newValue) => {
    props.formik.setFieldValue('fixedVersion', newValue);
    setSelectedValues(newValue);
  };
  return (
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
        sx={{ width: '60%', backgroundColor: '#FFF' }}
        options={versions}
        disablePortal
        multiple
        autoHighlight
        filterSelectedOptions
        value={selectedValues}
        renderInput={(params) => (
          <TextField
            {...params}
            name="fixedVersion"
            onBlur={props.formik.handleBlur}
            className="combobox"
            label="Fixed Version"
            placeholder="Fixed Version"
            //onChange={props.formik.handleChange}
            //value={props.formik.values.fixedVersion}
          />
        )}
      />{' '}
    </div>
  );
});

FixedVersionSearch.displayName = 'fixedVersionSearch';

export default FixedVersionSearch;
