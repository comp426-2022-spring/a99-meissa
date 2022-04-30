import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  //Optional error handling
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    if(passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log("Success. The user is created in firebase")
        router.push("/logged_in");
      })
      .catch(error => {
        setError(error.message)
      });
    else
      setError("Password do not match")
    event.preventDefault();
  };

  const goToLogin = () =>{
      router.push('log_in')
  }

  const goToHome = e =>{
      router.push('/')
  }

  return (
    <Container className="text-center" style={{ padding: '40px 0px'}}>
      <Row>
        <Col>
          <Form style={{maxWidth: '400px', margin: 'auto', textAlign: 'center'}} onSubmit={onSubmit}>
          { error && <Alert color="danger">{error}</Alert>}
            <FormGroup row>
              <Label for="signUpEmail" sm={4}>Email</Label>
              <Col sm={8}>
                <Input
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
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpPassword2" sm={4}>Confirm Password</Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row>
             <Col>
               <Button >Sign Up</Button>
             </Col>
           </FormGroup>
          </Form>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div style={{textAlign: 'center'}}>
          <Button onClick={goToLogin}>Back to Login</Button>
          </div>
          <br></br>
          <div style={{textAlign: 'center'}}>
          <Button style={{textAlign: 'center'}} onClick={goToHome}>Back to Home</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp;