'use client'
import React, { useState,Suspense } from 'react';
import dynamic from "next/dynamic"
//import SearchList from './SearchList';
import styles from './Search.module.css';
import useSWR from 'swr';
import LoadingSkeleton from './loadingSkeleton';
import { Alert } from '@mui/material';
import Image from 'next/image';
import dog from '../../public/dog.png';
import notFound from '../../public/searching.jpeg';

const SearchList = dynamic(() => import("./SearchList"), {
  loading: () => <LoadingSkeleton/>,
});

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error, isValidating } = useSWR(
    searchTerm.length > 5 ? `http://localhost:8080/search?input=${searchTerm}` : null, 
    (path, ...args) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          fetcher(path, ...args)
            .then(resolve)
            .catch(reject);
        }, 500);
      }), { suspense: false }
    );



  const handleChange = e => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
  };

  function searchResults() {
    const hiddenCatalog = searchTerm.length < 6;

    return (
      <div className={styles.SearchResult}>
        <div className={styles.results} hidden={hiddenCatalog}>
        <Suspense fallback={<p>Loading...</p>}>
              { isValidating ? <LoadingSkeleton/> : 
              data ? 
              <SearchList filteredCatalog={data} /> : 
              <section className={styles.notFound}>
                  <Alert sx={{marginTop:'40px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px'}} severity='info'>No result found for the search term. Try another one, or add a new Vulnerability</Alert>
                   <Image src={notFound} width={428} height={400} alt="searching doggie"></Image>
              </section>
              }
        </Suspense>
          
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
      {error ? 
      <section className={styles.errorSection}>
      <Alert sx={{marginTop:'40px', maxWidth: '400px',marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px'}} severity='error'>Could not load data from the server :(</Alert>
      <Image width={288} height={354} className={styles.dog} src={dog} alt="sad doggie"></Image>
      </section>
      :
      searchResults()}
    </section>
  );
}

export default Search;