import React from 'react';

function TicketRef({ticketRef}) {
  return(
    <tr className="ResultRow">
        <td>{ticketRef.id}</td>
        <td>{ticketRef.lpeid}</td>
        <td>{ticketRef.ticketid}</td>
        <td>{ticketRef.vulnerabilityid}</td>
        <td>{ticketRef.libraryid}</td>
        <td>{ticketRef.affectedversion}</td>
        <td>{ticketRef.fixedversion}</td>
    </tr>
  );
}

export default TicketRef;