import React from 'react';
import Vulnentry from './Vulnentry';
import styles from './SearchList.module.scss';

function SearchList({ filteredCatalog }) {
  const vulnEntries = filteredCatalog.map(vulnentry =>  <Vulnentry key={vulnentry.vulnerabilityid} vulnentry={vulnentry} />); 
  const title='';
  return (
    <div className={styles.vulnContainer}>
        <h2>{title}</h2>
    <ul className={styles.vulnTable}>
        <li className={styles.vulnTableHeader}>
            <div className={styles.col1}>CVE Code</div>
            <div className={styles.col2}>LPE</div>
            <div className={styles.col3}>LSV</div>
            <div className={styles.col4}>LPS</div>
            <div className={styles.col5}>Library</div>
            <div className={styles.col6}>Affects Version</div>
            <div className={styles.col7}>Fixed Version</div>
            <div className={styles.col8}>i</div>
        </li>
    </ul>
    <ul className={styles.vulnTable}>
        {vulnEntries}
    </ul>
    </div>
    
  );
}

export default SearchList;