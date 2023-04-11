import React from 'react';
import Vulnentry from './Vulnentry';
import styles from './SearchList.module.scss';
import { Grow, Paper } from '@mui/material';

function SearchList({ filteredCatalog }) {
  const vulnEntries = filteredCatalog.map((vulnentry) => (
    <Vulnentry key={vulnentry.id} vulnentry={vulnentry} />
  ));
  const title = '';
  return (
    <div className={styles.vulnContainer}>
      <h2>{title}</h2>
      <Grow in={true}>
        <Paper elevation={10} sx={{display: "flex", justifyContent: "space-between",fontSize: "14", fontWeight:"bold", letterSpacing: "0.03em", padding: "20px 30px", backgroundColor: "#95A5A6", marginBottom:"20px"}}>
          <div className={styles.col1}>LPE</div>
          <div className={styles.col2}>LSV</div>
          <div className={styles.col3}>LPS</div>
          <div className={styles.col4}>Library</div>
          <div className={styles.col5}>Affects Version</div>
          <div className={styles.col6}>Fixed Version</div>
          <div className={styles.col7}></div>
          <div className={styles.col8}></div>
          <div className={styles.col9}></div>
        </Paper>
      </Grow>
      
      {/* <ul className={styles.vulnTable}>
        <Grow in={true}>
          <li className={styles.vulnTableHeader}>
            <div className={styles.col1}>LPE</div>
            <div className={styles.col2}>LSV</div>
            <div className={styles.col3}>LPS</div>
            <div className={styles.col4}>Library</div>
            <div className={styles.col5}>Affects Version</div>
            <div className={styles.col6}>Fixed Version</div>
          </li>
        </Grow>
      </ul> */}
      {/* <ul className={styles.vulnTable}>{vulnEntries}</ul> */}
      {vulnEntries}
    </div>
  );
}

export default SearchList;
