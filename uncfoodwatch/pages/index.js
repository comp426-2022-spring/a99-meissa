// Home Page
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SignUp from './sign_up'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header_Public from '../lib/header_public'



export default function Home() {

  // As we move from prototype to user ready app, we would work more on routes 
  
  // const router = useRouter()

  // const handleClick = (e, path) => {
  //   if (path === "/about") {
  //     console.log("I clicked on the About Page");
  //   }
  //   if (path === "/posts") {
  //     console.log("I clicked on the Posts Page");
  //   }
  // };
  return (
    <div className={styles.container}>
      <Header_Public></Header_Public>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          UNC <a>FOODWATCH!</a>
        </h1>

        <p className={styles.description}>
        It is a Fact of Life, Food Poisoning Happens, so Document It to Protect Others{' '}
        </p>

        <p><b>How Does It Work?</b> Enter the name of the restaurant you ate at + your food experience, and post! <br/>
        You can also look at other community member's posts so you know which dishes to avoid.</p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}