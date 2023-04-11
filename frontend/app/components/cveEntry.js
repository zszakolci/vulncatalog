import React from 'react';
import styles from './SearchList.module.scss';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Paper, Button } from '@mui/material';
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
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CVESearch from './cveSearch';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CVEEntry({ cve, totalLength }) {
  const admin = true;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteAssocDialogOpen, setDeleteAssocDialogOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [elev,setElev] = React.useState(10);
  const [editMode, setEditMode] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const cveSearchRef = React.useRef(null);
  const [selectedValue, setSelectedValue] = React.useState([cve.id])
  const [description, setDescription] = React.useState(cve.description);
  const vulnSchema = Yup.object().shape({
    cveSearch: Yup.array()
      .nullable(true).min(1)
      .required('Please choose a vulnerability or add a new one.'),
    url: Yup.string()
      .url('Please enter a valid URL')
      .required('URL field is required')
  });

  const formik = useFormik({
    initialValues: {
      cveSearch: cve.id,
      url: cve.url,
      description: cve.description
    },
    validationSchema: vulnSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleCommitIconClick();
      setSubmitting(false);
    }
  });

  const handleSubmit = () => {

  }

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
/*   const description = (info) => {
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
  }; */

  const handleClick = () => {};
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

  const deleteVulnerability = () => {
    setDialogOpen(false);
  }

  const deleteAssociation = () => {
    setDialogOpen(false);
    setDeleteAssocDialogOpen(false);
  }

  const handleDeleteAssociationIconClick = () =>
  {
    setDeleteAssocDialogOpen(true);
  }

  const handleDeleteAssocDialogClose = () => {
    setDeleteAssocDialogOpen(false);
  }

  const handleCommitIconClick = () => {
    setEditMode(false);
  }

  return (
    <div>
    <Paper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} elevation={elev} sx={{display: "flex", justifyContent: "", marginLeft: "40px", padding: "10px 15px",marginBottom: "20px", backgroundColor: "#fbf3de", "&:hover": {transition: "0.3s"} }}>
      <div className={styles.vulncol} data-label="Vulnerability Id">
        {editMode ? <CVESearch formik={formik} selectedValue={selectedValue} multiple={false} ref={cveSearchRef}/> : <a
          className={styles.link}
          target="_blank"
          rel="noreferrer noopener"
          href={cve.url}
        >
          {cve.id}
        </a> }
      </div>
      <div className={styles.descCol} >
        {editMode ? <textarea
            maxlength="255"
            className='editVulnTextArea'
            placeholder="DESCRIPTION"
            autoFocus={true}
            onChange={(e) => setDescription(e.target.value) }
            value={description}
          />: cve.description}
      </div>
      <div className={styles.editCol} data-label="Edit">
        {editMode ? 
          <IconButton>
            <CheckCircleIcon onClick={handleCommitIconClick} sx={{}} color="primary"/>
          </IconButton>
          : 
          <IconButton>
            <EditIcon onClick={handleEditIconClick} sx={{}} color="primary"/>
          </IconButton>
        }
      </div>
      <div className={styles.delCol} data-label="Delete">
      <IconButton disabled={totalLength < 2}>
        <DeleteForeverIcon  onClick={handleDeleteIconClick} sx={{}} color={totalLength > 1 ? "primary" : "disabled"}/>
      </IconButton>
      </div>
      <div className={styles.delCol} data-label="DeleteAssoc">
        <IconButton disabled={totalLength < 2}>
          <ElectricalServicesIcon onClick={handleDeleteAssociationIconClick} sx={{ }} color={totalLength > 1 ? "primary" : "disabled"}/>
        </IconButton>
      </div>
    </Paper>
    <Dialog
        open={dialogOpen}
        /* TransitionComponent={Transition} */
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{elevation: 10}}
      >
        <DialogTitle>{"Do you really want to delete this vulnerability from the catalog?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This operation will permanently delete the vulnerability from the catalog! If there are other tickets with this vulnerability, the associations will be lost from there too!
            If you just want to delete the association, click &quot;Delete association&quot; button
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" startIcon={<CancelIcon/>} onClick={handleDialogClose}>Noo way, it was a mistake!</Button>
          <Button variant="contained" color="success" startIcon={<CheckCircleOutlineIcon/>} onClick={deleteVulnerability}>Absolutely, exterminate this vulnerability!</Button>
          <Button variant="contained" color="secondary" startIcon={<ElectricalServicesIcon/>} onClick={deleteAssociation}>Delete association</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteAssocDialogOpen}
        /* TransitionComponent={Transition} */
        keepMounted
        onClose={handleDeleteAssocDialogClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{elevation: 10}}
      >
        <DialogTitle>{"This will delete the association between the ticket and the vulnerability. Continue?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This operation will only delete the association, but the vulnerability will still remain in the calatalog.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" startIcon={<CancelIcon/>} onClick={handleDeleteAssocDialogClose}>Noo way, it was a mistake!</Button>
          <Button variant="contained" color="success" startIcon={<CheckCircleOutlineIcon/>} onClick={deleteAssociation}>Disconnect vulnerability</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CVEEntry;
