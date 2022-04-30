import styles from '../styles/Header.module.css'
import Link from 'next/link'
import signOut from '../lib/useFirebaseAuth'
import { useAuth } from '../context/AuthUserContext';

const Header_Private = () => { 
    const { signOut } = useAuth();
    return (
        <nav styles={styles.mainnav}>
            <div styles={styles.navItem}>
                <Link href="/logged_in"><a>Cases</a></Link> |
                <Link href="/account"><a>Account</a></Link> |
                <Link href="/" onClick={signOut}><a>Sign Out</a></Link>
            </div>
         </nav>
    )
}
export default Header_Private;