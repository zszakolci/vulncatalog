'use client';

import React, { useState, useContext } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import styles from './addTicketForm.module.css';
import useSWR from 'swr';
import { ErrorContext } from './addTicketForm';

const LibrarySearch = (props, ref) => {
  const [searchTerm, setSearchTerm] = useState();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const [fetchActive, setFetchActive] = useState(false);
  //const [err,setErr] = useContext(ErrorContext);
  //const [errorMessage,setErrorMessage] = useState("");
  const { data, error, isValidating } = useSWR(
    fetchActive
      ? `http://localhost:8080/library/search?keyword=${searchTerm}`
      : null,
    (path, ...args) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          fetcher(path, ...args)
            .then(resolve)
            .catch(reject);
        }, 700);
      }) /* .catch(err => {
            setErrorMessage(err.toString());
            setError(true);
        }
            ), [error,errorMessage] */
  );

  //if(error)
  // setErr(error);
  const returned = data ? data : [];
  const filteredLibraries = error ? [error.toString()] : returned;

  const handleChange = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
    lowerCase === '' ? setFetchActive(false) : setFetchActive(true);
  };

  const handleBlur = (e) => {
    setFetchActive(false);
  };

  return (
    <div className={styles.comboBoxContainer}>
      <Autocomplete
        className="combobox"
        options={filteredLibraries}
        disablePortal
        renderInput={(params) => (
          <TextField
            {...params}
            onBlur={handleBlur}
            onChange={handleChange}
            inputRef={ref}
            label="Library"
          />
        )}
        placeholder="Library"
      />
      <Button className={styles.linkButton}>Add new</Button>{' '}
    </div>
  );
};

export default React.forwardRef(LibrarySearch);
