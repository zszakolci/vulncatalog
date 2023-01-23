import Link from 'next/link';
import styles from './navbar.module.css';

function NavBar(){

    return(
            <div className={styles.navBarContainer}>
                <nav className={styles.navBar}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link className={styles.link} href='/'>
                                Search Catalog
                            </Link>        
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.link} href='/'>
                                Admin
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
    );
}

export default NavBar