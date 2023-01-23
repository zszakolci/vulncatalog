import Link from 'next/link';
import styles from './headerbar.module.css';
import Logo from './logo.js';
import NavBar from './navbar';

function HeaderBar({admin,}:{admin:boolean}){
console.log({admin});

    const pageTitle = admin ? "Add Vulnerability Record": "Search in Vulnerability Catalog";
    return(
        <header className={styles.headerBar}>
            <Logo />
            <div className={styles.title}>
                <h3>{pageTitle}</h3>
            </div>
            <NavBar admin={admin}/>
        </header>
    );
}

export default HeaderBar