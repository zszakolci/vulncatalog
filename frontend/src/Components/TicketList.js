import React from 'react';
import TicketRef from './TicketRef';
import '../styles/ticketResults.scss'

function TicketList({ filteredCatalog }) {
 
  const ticketRefs = filteredCatalog.map(ticketRef =>  <TicketRef key={ticketRef.id} ticketRef={ticketRef} />);
  console.log(ticketRefs);
  return (
    <div className='ticket-container'>
        <h2>Related Tickets</h2>
    <ul className='ticket-table'>
        <li className='ticket-table-header'>
            <div className='ticket col-1'>LPE</div>
            <div className='ticket col-2'>LPS</div>
            <div className='ticket col-3'>CVE</div>
            <div className='ticket col-4'>Library</div>
            <div className='ticket col-5'>Affects Version</div>
            <div className='ticket col-6'>Fixed Version</div>
        </li>
         {ticketRefs}
      </ul>
    </div>
    
  );
}

export default TicketList;