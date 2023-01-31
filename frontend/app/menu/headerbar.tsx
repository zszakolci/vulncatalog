'use client'

import styles from './headerbar.module.css';
import Logo from './logo.js';
import NavBar from './navbar';
import theme from '../admin/themes'
import { ThemeProvider } from '@mui/material';

function HeaderBar({admin,}:{admin:boolean}){

    const pageTitle =  "Liferay Vulnerability Catalog";
    return(
        <ThemeProvider theme={theme}>
        <header className={styles.headerBar}>
            <Logo />
            <div className={styles.title}>
                <h3>{pageTitle}</h3>
            </div>
            <NavBar admin={admin}/>
        </header>
        </ThemeProvider>
    );
}

export default HeaderBar