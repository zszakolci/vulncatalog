import React from 'react';
import Vulnentry from './Vulnentry';
import styles from './SearchList.module.scss';
import { Grow } from '@mui/material';

function SearchList({ filteredCatalog }) {
  const vulnEntries = filteredCatalog.map((vulnentry) => (
    <Vulnentry key={vulnentry.id} vulnentry={vulnentry} />
  ));
  const title = '';
  return (
    <div className={styles.vulnContainer}>
      <h2>{title}</h2>
      <ul className={styles.vulnTable}>
        <Grow in={true}>
          <li className={styles.vulnTableHeader}>
            {/* <div className={styles.col1}>CVE Code</div> */}
            <div className={styles.col1}>LPE</div>
            <div className={styles.col2}>LSV</div>
            <div className={styles.col3}>LPS</div>
            <div className={styles.col4}>Library</div>
            <div className={styles.col5}>Affects Version</div>
            <div className={styles.col6}>Fixed Version</div>
            {/* <div className={styles.col8}>i</div> */}
          </li>
        </Grow>
      </ul>
      <ul className={styles.vulnTable}>{vulnEntries}</ul>
    </div>
  );
}

export default SearchList;
