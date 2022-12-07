import React from 'react';
import '../styles/VulnResults.scss';

function Vulnentry({vulnentry}) {
  return(
    <li className="Vuln-Result-Row">
        <div className='vuln col-1'>{vulnentry.id}</div>
        <div className='vuln col-2'><a href={vulnentry.url}>{vulnentry.url}</a></div>
        <div className='vuln col-3'>{vulnentry.description}</div>
    </li>
  );
}

export default Vulnentry;