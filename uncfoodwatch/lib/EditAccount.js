import styles from '../styles/Account.module.css'
import { useAuth } from '../context/AuthUserContext';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import  { updateEmail } from './useFirebaseDatabase.js'

const EditAccount = () => {
    const [passwordOne, setPasswordOne] = useState("");
    const router = useRouter();
    let [once, setOnce] = useState(true);
    const [error, setError] = useState(null);
    const { authUser, loading, } = useAuth();
    const remainder = authUser || loading;
    const [email, setEmail] = useState(authUser? authUser.email : "");

     useEffect(() => {
        if (!loading && !authUser)
          router.push('/')
      }, [authUser, loading])

      if (once) {
          if (!loading) {
              setEmail(authUser.email);
              setOnce(!once);
          }
      }
      
    const onSubmit = event => {
        setError(null)
        //check if passwords match. If they do, create user in Firebase
        // and redirect to your logged in page.
        if (authUser)
            updateEmail(authUser.uid, email)
        else {
            setError("You are not logged in")
        }
          
        event.preventDefault();
      };
    return (
        <Container className={styles.logBox}>
                  <Row className={styles.input}>
                    <Col className={styles.center}>
                      <Form
                        className="custom-form"
                        onSubmit={onSubmit}>
                        { error && <Alert color="danger">{error}</Alert>}
                        <FormGroup row>
                          <Label for="updateEmail" sm={4} className={styles.text}>Email</Label>
                          <Col sm={8}>
                            <Input
                              className={styles.Email}
                              type="email"
                              value={email}
                              onChange={(event) => {event.preventDefault(); setEmail(event.target.value)}}
                              name="email"
                              id="updatEmail"
                              placeholder="Email" />
                          </Col>
                        </FormGroup>
                        
                        <FormGroup row>
                          <Col>
                            <Button className={styles.button}>Update</Button>
                          </Col>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                </Container>
    )
}

export default EditAccount;