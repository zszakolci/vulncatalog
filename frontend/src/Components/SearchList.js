import React from 'react';
import Vulnentry from './Vulnentry';
import '../styles/VulnResults.scss';
//import TicketRef from './TicketRef';

function SearchList({ filteredCatalog }) {
  const vulnEntries = filteredCatalog.map(vulnentry =>  <Vulnentry key={vulnentry.vulnerabilityid} vulnentry={vulnentry} />); 
  const title='';
  return (
    <div className='vuln-container'>
        <h2>{title}</h2>
    <ul className='vuln-table'>
        <li className='vuln-table-header'>
            <div className='vuln col-1'>CVE Code</div>
            <div className='vuln col-2'>LPE</div>
            <div className='vuln col-3'>LSV</div>
            <div className='vuln col-4'>LPS</div>
            <div className='vuln col-5'>Library</div>
            <div className='vuln col-6'>Affects Version</div>
            <div className='vuln col-7'>Fixed Version</div>
            <div className='vuln col-8'>i</div>
        </li>
    </ul>
    <ul className='vuln-table'>
        {vulnEntries}
    </ul>
    </div>
    
  );
}

export default SearchList;