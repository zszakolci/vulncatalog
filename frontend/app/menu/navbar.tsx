'use client'
import styles from './navbar.module.css';
import {useRouter, usePathname} from 'next/navigation';
import {Button } from "@mui/material";

function NavBar({admin,}:{admin:boolean}){

    const router = useRouter();
    const pathname = usePathname();
     
    return(
                <nav className={styles.navBar}>
                    <ul>
                        <li className={styles.navItem}>
                    <Button color={pathname === '/' ? 'primary' : 'secondary' } sx={{backgroundColor: pathname === '/'? '#D6D8E1' : 'none', fontStyle: pathname === '/'? 'bold' : 'none' }} onClick={() => router.push('/')}> 
                        Search Catalog
                    </Button>
                    </li> 
                    <li className={styles.navItem}>  
                    <Button color={pathname === '/admin' ? 'primary' : 'secondary' } sx={{backgroundColor: pathname === '/admin'? '#D6D8E1' : 'none', fontStyle: pathname === '/admin' ? 'bold' : 'none' }} onClick={() => router.push('/admin')}> 
                        Admin
                    </Button> 
                    </li> 
                    </ul>
                </nav>
    );
}

export default NavBar