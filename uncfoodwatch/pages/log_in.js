// Set up Log-In Page
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import { addUser } from '../lib/useFirebaseDatabase'
import styles from '../styles/Account.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Header_Public from '../lib/header_public'

// Log In Functions
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [name, setName] = useState("");
  const [onyen, setOnyen] = useState("");
  const [institution, setInstitution] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);
  const { authUser, loading } = useAuth();
  const remainder = authUser || loading;
  const { signInWithEmailAndPassword } = useAuth();

  // Check Passwords
  const onSubmit = event => {
    setError(null)
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    
    signInWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log("Success. The user is logged in");
        //addUser(authUser.user.providerData.uid, name, email, onyen, institution);
        router.push("/logged_in");
      })
      .catch(error => {
        // An error occurred. Set error message to be displayed to user
        setError(error.message)
      });
    event.preventDefault();
  };

  // HTML for Page
  return (
    <div className={styles.html}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <div>
            <Header_Public></Header_Public>

            <Container className="text-center" style={{ padding: '40px 0px'}}>
                <Row>
                    <Col>
                        <Form style={{maxWidth: '400px', margin: 'auto'}} onSubmit={onSubmit}>
                        { error && <Alert color="danger">{error}</Alert>}
                            <FormGroup row>
                                <Label for="signUpEmail" sm={4}>Email</Label>
                                <Col sm={8}>
                                    <Input
                                    className={styles.Email}
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    name="email"
                                    id="signUpEmail"
                                    placeholder="Email" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="signUpPassword" sm={4}>Password</Label>
                                <Col sm={8}>
                                    <Input
                                        className={styles.Email}
                                        type="password"
                                        name="passwordOne"
                                        value={passwordOne}
                                        onChange={(event) => setPasswordOne(event.target.value)}
                                        id="signUpPassword"
                                        placeholder="Password" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Button>Login</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>  
        </div>
    </div>

  )
}

// Export Page
export default LogIn;