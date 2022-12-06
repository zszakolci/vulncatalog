import React from 'react';

function Vulnentry({vulnentry}) {
  return(
    <tr className="ResultRow">
        <td>{vulnentry.id}</td>
        <td>{vulnentry.url}</td>
        <td>{vulnentry.description}</td>
    </tr>
  );
}

export default Vulnentry;