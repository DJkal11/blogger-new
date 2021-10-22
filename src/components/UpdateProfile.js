import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "../components/Auth";
import { Link, useHistory } from "react-router-dom";
import {Button, Form, Card, Container, Alert} from "react-bootstrap";



function UpdateProfile(){
 
const history = useHistory();
const { currentUser, updateEmail, updatePassword } = useAuth();  
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");  

useEffect(() => {
  return () => {};
}, []);


const emailRef = useRef();
const passwordRef = useRef();
    function handleSubmit(event){
    event.preventDefault();
    
    const promises = [];
    setLoading(true);
    setError("");
    
     if(emailRef.current.value !== currentUser.email){
      promises.push(updateEmail(emailRef.current.value));
     }

     if(passwordRef.current.value){
      promises.push(updatePassword(passwordRef.current.value));
     }
     

    

    Promise.all(promises).then(() => {
      history.push("/login");
    }).catch(() => {
      setError("Failed to update account");
    }).finally(() => {
      setLoading(false);
    })
  
  
   }   

    return (
      <div>
        <Container className="d-flex align-items-center justify-content-center"
        style={{minHeight:"100vh"}}
        >
          <div className="w-100" style={{maxWidth: "400px"}}>
     <Card>
       <Card.Body>
         <h2 className="text-center mb-4">Update Profile</h2>
         {error && <Alert variant="danger">{error}</Alert>}
         <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required 
            defaultValue={currentUser.email}/>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required 
            placeholder="Leave blank to keep the same"/>
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
            Update
          </Button>
         </Form>
       </Card.Body>
     </Card>
     <div>
       <Link style={{color: "white"}} to="/Blogs">Cancel</Link>
     </div>
     </div>
     </Container>
      
      </div>
    )
}

export default UpdateProfile;