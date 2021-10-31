import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useAuth } from "../components/Auth";
import {db} from "../firebase"
import {useHistory } from "react-router-dom";


function Compose(props) {
const {currentUser} = useAuth();
const history = useHistory();
  const [blog, setBlog] = useState({
    User: currentUser.email,
      Title: "",
    Content: ""
    
  });

 
 
    
    
  

  function handleChange(event){
    const {name, value} = event.target;
console.log(currentUser.email);
    setBlog((preValue) =>{
      return {...preValue, [name]: value};
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

   db.collection("blogs").add(blog);
    
    
    setBlog({
      User: currentUser.email,
        Title: "",
        Content: ""
    });
   history.push("/Blogs");
  }

  
    return (
      <div>
     <div className="Compose">
       <h1>Compose</h1>
       <form onSubmit={handleSubmit}>
      <TextField required name="Title" id="Title" label="Title" value={blog.Title} onChange={handleChange}/>

      <div className="space">
      <TextField
          id="filled-multiline-static"
          name="Content"
          label="Content"
          multiline
          rows={4}
          value={blog.Content}
          onChange={handleChange}
          variant="filled"
        />
        </div>

        <div className="space">
        <Button onClick={handleSubmit} variant="contained" color="secondary">
        Compose
      </Button>
      </div>
      </form>
     </div>
     
     
     </div>
    )
}

export default Compose;