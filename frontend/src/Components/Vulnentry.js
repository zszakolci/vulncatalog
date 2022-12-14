import React from 'react';
import '../styles/VulnResults.scss';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Link from 'react';
function Vulnentry({vulnentry}) {


  const createJiraURL = (ticket) => {
    const link = `https://issues.liferay.com/${ticket}`;
    return(
        <a target="_blank" rel="noreferrer noopener" href={link}>{ticket}</a>
    );
  }
  const handleTooltipClose = () => {
    setOpen(false);
  };
  
  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const description = (info) => {
    const color= vulnentry.description === '' ? 'disabled' : 'info';

    return (
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
      title={info} 
      placement="top-start" 
      arrow  
      open={open} 
      onClose={handleTooltipClose}
      disableFocusListener
      disableHoverListener
      disableTouchListener>
        <IconButton onClick={handleTooltipOpen}>
          <InfoIcon color={color}/>
        </IconButton>
      </Tooltip>
        </ClickAwayListener>
    );
  }

  const LPE = createJiraURL(vulnentry.lpeId);
  const LPS = createJiraURL(vulnentry.ticketid);
  const LSV = createJiraURL(vulnentry.lsvId);
  const [open, setOpen] = React.useState(false);

  return(
    <li className="Vuln-Result-Row" >
        <div className='vuln col-1' data-label='Vulnerability Id'>
          <a  target="_blank" rel="noreferrer noopener" href={vulnentry.url}>{vulnentry.vulnerabilityid}</a>
        </div>
        <div className='vuln col-2' data-label='LPE'>{LPE}</div>
        <div className='vuln col-3' data-label='LSV'>{LSV}</div>
        <div className='vuln col-4' data-label='LPS'>{LPS}</div>
        <div className='vuln col-5' data-label='Library'>{vulnentry.libraryid}</div>
        <div className='vuln col-6' data-label='Affects Version'>{vulnentry.affectedversion}</div>
        <div className='vuln col-7' data-label='Fixed Version'>{vulnentry.fixedversion}</div>
        <div className='vuln col-8' data-label='Description'>{description(vulnentry.description)}</div>
    </li>
  );
}

export default Vulnentry;