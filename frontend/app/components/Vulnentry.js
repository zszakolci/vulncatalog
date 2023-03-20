import React, { useState } from 'react';
import styles from './SearchList.module.scss';
import Box from '@mui/material/Box';
import { Grow, Collapse } from '@mui/material';
import CVEEntry from './cveEntry';
function Vulnentry({ vulnentry }) {
  const createJiraURL = (ticket) => {
    const link = `https://issues.liferay.com/${ticket}`;
    return (
      <a
        className={styles.link}
        target="_blank"
        rel="noreferrer noopener"
        href={link}
      >
        {ticket}
      </a>
    );
  };

  const handleClick = (e) => {
    setRowOpened(!rowOpened);
  };

  const LPE = createJiraURL(vulnentry.lpeId);
  const LPS = createJiraURL(vulnentry.id);
  const LSV = createJiraURL(vulnentry.lsvId);

  const affectedV = vulnentry.affectedVersions.map((obj) => obj.id).join(', '); //reduce((acc, curr) => acc.id + ", " + curr.id);
  const fixedV = vulnentry.fixedVersions.map((obj) => obj.id).join(', '); //reduce((acc,curr)=> acc.id + ", " + curr.id);
  const library = vulnentry.library ? vulnentry.library : '-';
  const vulnList = vulnentry.vulnerabilities.map((cve) => (
    <CVEEntry key={cve.id} cve={cve} />
  ));
  const [rowOpened, setRowOpened] = useState(false);
  return (
    <Grow in={true}>
      <Box>
        <li className={styles.vulnResultRow} onClick={handleClick}>
          <div className={styles.col1} data-label="LPE">
            {LPE}
          </div>
          <div className={styles.col2} data-label="LSV">
            {LSV}
          </div>
          <div className={styles.col3} data-label="LPS">
            {LPS}
          </div>
          <div className={styles.col4} data-label="Library">
            {library}
          </div>
          <div className={styles.col5} data-label="Affects Version">
            {affectedV}
          </div>
          <div className={styles.col6} data-label="Fixed Version">
            {fixedV}
          </div>
        </li>
        <Collapse in={rowOpened}>
          {
            <li>
              <ul className={styles.vulnTable}>{vulnList}</ul>
            </li>
          }
        </Collapse>
      </Box>
    </Grow>
  );
}

export default Vulnentry;
