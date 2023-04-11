import React, { useState } from 'react';
import styles from './SearchList.module.scss';
import Box from '@mui/material/Box';
import { Grow, Collapse, Paper, Button, IconButton, Alert } from '@mui/material';
import CVEEntry from './cveEntry';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Vulnentry({ vulnentry }) {
  const admin = true;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const createJiraURL = (ticket) => {
    const link = `https://issues.liferay.com/${ticket}`;
    return (
      <a
        className={styles.link}
        target="_blank"
        rel="noreferrer noopener"
        href={link}
      >
        {ticket}
      </a>
    );
  };

  const ticketSchema = Yup.object().shape({
    lpe: Yup.string()
      .notRequired()
      .lowercase()
      .matches(/^(lpe-[0-9]{4,10})?$/, {
        message: 'Please enter a valid LPE',
        excludeEmptyString: true
      }),
    lsv: Yup.string()
      .notRequired()
      .lowercase()
      .matches(/^(lsv-[0-9]{3,10})?$/, {
        message: 'Please enter a valid LSV',
        excludeEmptyString: true
      }),
    lps: Yup.string().required('Ticked ID is required'),
    affectedVersion: Yup.array()
      .nullable(true).min(1)
      .required('Please choose the affected version')
  });

  const formik = useFormik({
    initialValues: {
      lpe: vulnentry.lpeId,
      lsv: vulnentry.lsvId,
      lps: vulnentry.id,
      affectedLibrary: vulnentry.affectedLibrary,
      affectedVersion: vulnentry.affectedVersions,
      fixedVersion: vulnentry.fixedVersions
    },
    validationSchema: ticketSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit();
      setSubmitting(false);
    }
  });

  const handleSubmit = (e) => {
    setEditMode(false);
    e.stopPropagation();
  }

  const handleClick = (e) => {
    setRowOpened(!rowOpened);
  };

  const handleMouseEnter = () => {
    setElev(2);
  }

  const handleMouseLeave = () => {
    setElev(10);
  }

  const handleEditIconClick = (e) => {
    e.stopPropagation();
    setEditMode(true);
  }

  const handleDeleteIconClick = (e) => {
    e.stopPropagation();
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const deleteTicket= () => {
    setDialogOpen(false);
  }

  const handleAddIconClick = () => {

  }

  const renderLPSAlert = () => {
    return(
      formik.touched.lps && formik.errors.lps ? (
        <Alert
          sx={{ border: '0px', fontSize: '14px', padding: '0px' }}
          variant="outlined"
          severity="warning"
        >
          {formik.errors.lps}
        </Alert>
      ) : null 
    );
  }

  const renderLPSInput = () => {
    return (
      <input
              required
              className={`inputField ${
                formik.touched.lps && formik.errors.lps ? 'invalid' : ''
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lps}
              name="lps"
              label="LPS"
              type="text"
              placeholder="LPS*"
            />
    );
  }
  const LPE = createJiraURL(vulnentry.lpeId);
  const LPS = createJiraURL(vulnentry.id);
  const LSV = createJiraURL(vulnentry.lsvId);

  const affectedV = vulnentry.affectedVersions.map((obj) => obj.id).join(', '); //reduce((acc, curr) => acc.id + ", " + curr.id);
  const fixedV = vulnentry.fixedVersions.map((obj) => obj.id).join(', '); //reduce((acc,curr)=> acc.id + ", " + curr.id);
  const library = vulnentry.library ? vulnentry.library : '-';
  
  const vulnList = vulnentry.vulnerabilities.map((cve) => (
    <CVEEntry key={cve.id} cve={cve} totalLength={vulnentry.vulnerabilities.length} />
  ));

  const [rowOpened, setRowOpened] = useState(true);
  const [editMode, setEditMode] = React.useState(false);
  const [elev,setElev] = React.useState(10);

  return (
    <div>
    <Grow in={true}>
      <Box>
        <Paper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} elevation={elev} onClick={handleClick} sx={{display: "flex", justifyContent: "space-between", padding: "20px 30px", backgroundColor: "#F6FCFC", marginBottom: "20px", "&:hover": {transition: "0.3s", backgroundColor: "#DBE9E9", cursor: rowOpened ? "n-resize" :"s-resize"}}}>
          <div className={styles.col3} data-label="LPS">
            {editMode ? (
              renderLPSAlert(),
              renderLPSInput()
            )
            : LPS}
          </div>
          <div className={styles.col1} data-label="LPE">
            {LPE}
          </div>
          <div className={styles.col2} data-label="LSV">
            {LSV}
          </div>
          <div className={styles.col4} data-label="Library">
            {library}
          </div>
          <div className={styles.col5} data-label="Affects Version">
            {affectedV}
          </div>
          <div className={styles.col6} data-label="Fixed Version">
            {fixedV}
          </div>
          <div className={styles.col7} data-label="Edit">
            <IconButton>
              {editMode ?
              <CheckCircleIcon onClick={handleSubmit} sx={{}} color="primary"/> : 
              <EditIcon onClick={handleEditIconClick} sx={{}} color="primary"/>}
            </IconButton>
          </div>
          <div className={styles.col8} data-label="Delete">
            <IconButton>
              <DeleteForeverIcon onClick={handleDeleteIconClick} sx={{}} color="primary"/>
            </IconButton>
          </div>
          <div className={styles.col9} data-label="Add">
            <IconButton>
              <AddCircleIcon onClick={handleAddIconClick} sx={{}} color="primary"/>
            </IconButton>
          </div>
        </Paper>
        <Collapse in={rowOpened}>
          {vulnList}  
        </Collapse>
      </Box>
    </Grow>
    <Dialog
        open={dialogOpen}
        /* TransitionComponent={Transition} */
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{elevation: 10}}
      >
        <DialogTitle>{"Do you really want to delete this entry from the catalog?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This operation will delete the ticket, but will not delete the corresponding vulnerabilities!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" startIcon={<CancelIcon/>} onClick={handleDialogClose}>Noo way, it was a mistake!</Button>
          <Button variant="contained" color="success" startIcon={<CheckCircleOutlineIcon/>} onClick={deleteTicket}>Absolutely, exterminate this ticket!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Vulnentry;
