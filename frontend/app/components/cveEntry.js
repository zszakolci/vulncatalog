import React from 'react';
import styles from './SearchList.module.scss';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import ClickAwayListener from '@mui/material/ClickAwayListener';

function CVEEntry({ cve }) {
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const description = (info) => {
    const color = cve.description === '' ? 'disabled' : 'info';

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
          disableTouchListener
        >
          <IconButton onClick={handleTooltipOpen}>
            <InfoIcon color={color} />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    );
  };

  const handleClick = () => {};

  return (
    <li className={styles.vulnResultRowCVE} onClick={handleClick}>
      <div className={styles.vulncol} data-label="Vulnerability Id">
        <a
          className={styles.link}
          target="_blank"
          rel="noreferrer noopener"
          href={cve.url}
        >
          {cve.id}
        </a>
      </div>
      <div className={styles.infocol} data-label="Description">
        {description(cve.description)}
      </div>
    </li>
  );
}

export default CVEEntry;
