import React from 'react';
import TicketRef from './TicketRef';

function TicketList({ filteredCatalog }) {
 
  const ticketRefs = filteredCatalog.map(ticketRef =>  <TicketRef key={ticketRef.id} ticketRef={ticketRef} />);
  console.log(ticketRefs);
  return (
    <div>
    <table>
        <tbody>
         {ticketRefs}
      </tbody>
    </table>
    </div>
    
  );
}

export default TicketList;