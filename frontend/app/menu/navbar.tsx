import Link from 'next/link';
import styles from './navbar.module.css';

function NavBar({admin,}:{admin:boolean}){

    return(
                <nav className={styles.navBar}>
                    <ul>
                        <li hidden={!admin} className={styles.navItem}>
                    <Link className={styles.link} href='/'>
                        Search Catalog
                    </Link>  
                    </li> 
                    <li hidden={admin} className={styles.navItem}>   
                    <Link className={styles.link} href='/admin'>
                        Admin
                    </Link>
                    </li> 
                    </ul>
                </nav>
    );
}

export default NavBar