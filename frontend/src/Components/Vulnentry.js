import React from 'react';
import '../styles/VulnResults.scss';

function Vulnentry({vulnentry}) {
  return(
    <li className="Vuln-Result-Row">
        <div className='vuln col-1'><a href={vulnentry.url}>{vulnentry.id}</a></div>
        <div className='vuln col-2'>{vulnentry.description}</div>
    </li>
  );
}

export default Vulnentry;