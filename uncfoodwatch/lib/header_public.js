import styles from '../styles/Header.module.css'
import Link from 'next/link'


const Header_Public = () => { 
    return (
        <nav styles={styles.mainnav}>
            <div styles={styles.navItem}>
                <Link styles={styles.innerNav} href="/log_in"><a>Log In</a></Link> | 
                <Link styles={styles.innerNav} href="/sign_up"><a>Sign Up</a></Link>
            </div>
         </nav>
    )
}
export default Header_Public;