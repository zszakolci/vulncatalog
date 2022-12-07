import React from 'react';
import '../styles/ticketResults.scss'

const createJiraURL = (ticket) => {
    const link = `https://issues.liferay.com/${ticket}`;
    return(
        <a href={link}>{ticket}</a>
    );
}

function TicketRef({ticketRef}) {

    const LPE = createJiraURL(ticketRef.lpeid);
    const LPS = createJiraURL(ticketRef.ticketid);

  return(
    <li className="Ticket-Result-Row">
        {/* <div className='ticket-col-1'>{ticketRef.id}</td> */}
        <div className='ticket col-1'>{LPE}</div>
        <div className='ticket col-2'>{LPS}</div>
        <div className='ticket col-3'>{ticketRef.vulnerabilityid}</div>
        <div className='ticket col-4'>{ticketRef.libraryid}</div>
        <div className='ticket col-5'>{ticketRef.affectedversion}</div>
        <div className='ticket col-6'>{ticketRef.fixedversion}</div>
    </li>
  );
}


export default TicketRef;