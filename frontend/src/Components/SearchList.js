import React from 'react';
import Vulnentry from './Vulnentry';
//import TicketRef from './TicketRef';

function SearchList({ filteredCatalog }) {
  const vulnEntries = filteredCatalog.map(vulnentry =>  <Vulnentry key={vulnentry.id} vulnentry={vulnentry} />); 
  //const ticketRefs = filteredCatalog[1].map(ticketRef =>  <TicketRef key={ticketRef.id} ticketRef={ticketRef} />);
 console.log(vulnEntries);
  return (
    <div>
    <table>
        <tbody>
        {vulnEntries}
      </tbody>
    </table>
    </div>
    
  );
}

export default SearchList;