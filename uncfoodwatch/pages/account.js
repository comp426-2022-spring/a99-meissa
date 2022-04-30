import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/AccountMain.module.css'
import { useAuth } from '../context/AuthUserContext';
import { useState } from 'react';
import { firebase } from '../lib/useFirebaseDatabase';
import Link from 'next/link'
import EditAccount from '../lib/EditAccount';
import Header_Private from '../lib/header_private';
import { Button } from 'reactstrap';

const AccountPage = () => {
    const [view, setView] = useState(0);
    const { authUser, loading } = useAuth();
    const remainder = authUser || loading;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { deleteUser } = useAuth();

  const onSubmit = () => {
        deleteUser()
        console.log("Success. The user is deleted in firebase")
        alert("Your account has been deleted")
      setView(1)
  };

  const { updateUser } = useAuth();
  const forUser = () => {
      updateUser(password)
      console.log("Password has been updated")
      alert("Your password has been updated")
    setView(0)
  }


    return (
        <div className={styles.html}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <div className={styles.body}>
                <Header_Private></Header_Private>
                <div className={styles.top}>
                    <div className={styles.leftHalf}>
                        <a className={styles.tableft} style = {{
                            backgroundColor: '#7BAFD4',
                            color: 'black',
                        }}>Edit Account</a>
                        <Link href="log_in">
                        <a className={styles.tab} href='#delete' style = {{
                            backgroundColor: '#00539B',
                            color: 'black'
                        }} onClick={onSubmit}>Delete Account</a></Link>
                    </div>
                    <div className={styles.mainUpper}>
                        <br></br>
                    <div>
                     <input
                        className={styles.input}
                        placeholder='Enter the New Password..'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <Button onClick={forUser}>Update Password</Button></div>
                    </div>
                    
                </div>
                
            </div>
        </div>
        

 

        
    )
}

export default AccountPage
