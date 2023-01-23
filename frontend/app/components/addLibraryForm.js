import { Autocomplete, Button, TextField } from "@mui/material";
import styles from './addLibraryForm.module.css'
import LibrarySearch from './librarySearch'

//import useSWR from 'swr'

function AddLibraryForm(){

    return (
        <div className='box' >
            <form className="addLibraryForm">
                <div className={styles.listItem}>
                     <input className="inputField" type="text" placeholder="Library" />
                </div>
                <Button className={styles.addButton} variant="contained">
                    Add
                </Button >
            </form>
        </div>
      );
}


export default AddLibraryForm;