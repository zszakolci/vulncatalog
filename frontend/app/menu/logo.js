import Link from "next/link";
import Image from "next/image";
import styles from './logo.module.css';
import logo from '../../public/logo.png';

function Logo(){
    return(
            <div className="header__logo">
                <Link href="/">
                    <Image className={styles.logo} src={logo} width={50} height={50} alt="Vulnerability Catalog" />
                </Link>
            </div>
    );
}

export default Logo;