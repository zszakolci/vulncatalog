'use client'
import React, { useState } from 'react';
import SearchList from './SearchList';
import styles from './Search.module.css';
import useSWR from 'swr';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error, isValidating } = useSWR(
    searchTerm ? `http://localhost:8080/search?input=${searchTerm}` : null, 
    (path, ...args) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          fetcher(path, ...args)
            .then(resolve)
            .catch(reject);
        }, 700);
      })
    );



  const handleChange = e => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
  };

  function searchResults() {
    const hiddenCatalog = searchTerm === '';

    return (
      <div className={styles.SearchResult}>
        <div className={styles.results} hidden={hiddenCatalog}>
          {data ? <SearchList filteredCatalog={data} /> : ''}
        </div>
      </div>
    );
  }

  return (
    <section className="Search">
      <div className={styles.SearchContainer}>
        <p className={styles.SearchLabel}>Let's see if we can find something ;)</p>
        <input
          className={styles.SearchInput}
          value={searchTerm}
          type="search"
          placeholder="Type CVE, LPS, or LPE..."
          onChange={handleChange}
        ></input>
      </div>
      {searchResults()}
    </section>
  );
}

export default Search;