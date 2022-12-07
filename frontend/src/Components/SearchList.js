import React from 'react';
import Vulnentry from './Vulnentry';
import '../styles/VulnResults.scss';
//import TicketRef from './TicketRef';

function SearchList({ filteredCatalog }) {
  const vulnEntries = filteredCatalog.map(vulnentry =>  <Vulnentry key={vulnentry.id} vulnentry={vulnentry} />); 
 console.log(vulnEntries);
  return (
    <div className='vuln-container'>
        <h2>Vulnerability Description</h2>
    <ul className='vuln-table'>
        <li className='vuln-table-header'>
            <div className='vuln col-1'>CVE Code</div>
            <div className='vuln col-2'>URL</div>
            <div className='vuln col-3'>Description</div>
        </li>
        {vulnEntries}
    
    </ul>
    </div>
    
  );
}

export default SearchList;