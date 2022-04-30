// Set up Logged In View
import styles from '../styles/Form.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import Header_Private from '../lib/header_private';
import firebase from '../firebase/clientApp.js';
// Using ReactQuill to hold Cases
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
// import { database } from '../firebase/clientApp';


import {Container, Row, Col, Button, Head, Input} from 'reactstrap';

// Logged In Functions
const LoggedIn = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

// Create Database and access notes
const database = firebase.firestore();
// Create notes collection
const dbInstance = database.collection('notes');
// Hide and show based on input
const [isInputVisible, setInputVisible] = useState(false);
// Note styles
const [noteTitle, setNoteTitle] = useState('');
const [noteDesc, setNoteDesc] = useState('')
const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }

    const addDesc = (value) => {
        setNoteDesc(value)
    }

    const saveNote = () => {
        dbInstance.add({
            noteTitle: noteTitle,
            noteDesc: noteDesc
        })
            .then(() => {
                setNoteTitle('')
                setNoteDesc('')
                getNotes();
            })
    }

  useEffect(() => {
      getNotes();
  }, [])
  
 const [notesArray, setNotesArray] = useState([]);
 
 // Retreave Notes from Database
 const getNotes = () => {
  dbInstance.get()
      .then((data) => {
          setNotesArray(data.docs.map((item) => {
              return { ...item.data(), id: item.id }
          }));
      })
}
  // HTML For Page
  return (

    <div>
      
      <div>
        <Header_Private></Header_Private>
        <br/>
        <div className='total'>
        <>
            <div className={styles.btnContainer}>
                <button
                    onClick={inputToggle}
                    className={styles.button}>
                    Add a New Note
                </button>
            </div>

            {isInputVisible ? (
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder='Enter the Title..'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                    />
                    <div className={styles.ReactQuill}>
                        <ReactQuill
                            onChange={addDesc}
                            value={noteDesc}
                        />
                    </div>
                    <button
                        onClick={saveNote}
                        className={styles.saveBtn}>
                        Save Note
                    </button>
                </div>
            ) : (
                <></>
            )}
        </>
        <div className={styles.notesDisplay}>
                {notesArray.map((note) => {
                    return (
                        <div className={styles.notesInner}>
                            <h4>{note.noteTitle}</h4>
                            <div dangerouslySetInnerHTML={{ __html: note.noteDesc }}></div>
                        </div>
                    )
                })}
            </div>
            </div>
      </div>
    </div>

  )
}

// Export Page
export default LoggedIn;