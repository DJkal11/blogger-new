import React, { useEffect, useState } from "react";
import {db} from "../firebase";
import { useAuth } from "../components/Auth";
import { Button} from "react-bootstrap";

import ReactReadMoreReadLess from "react-read-more-read-less";

function Blogs() {
const {currentUser} = useAuth();
 const [blogs, setBlogs] = useState([]);
 const [loading, setLoading] = useState(true);
 

 useEffect(() => {
    const getBlogsFromFirebase = [];
    const userBlogs = [];
    
    const subscriber = db.collection("blogs").onSnapshot((querySnapshot) => {
       querySnapshot.forEach((doc) => {
          getBlogsFromFirebase.push({
             ...doc.data(),
             key: doc.id
          });

          
       });
       getBlogsFromFirebase.forEach((item) =>{
          if(item.User === currentUser.email){
             userBlogs.push(item);
          }
        })
        setLoading(false)
       setBlogs(userBlogs);
    });

    return () => subscriber();
 });

 function handleDelete(event){
 const id = event.target.id;

 db.collection("blogs").doc(id).delete();
 }

 

   return (
    <div className="blogs">
    {loading? <h1 className="home">Loading...</h1> : <h1 className="home">Blogs</h1>}
    {blogs.length > 0 ? (blogs.map((blog) => {
      return <div key={blog.key} className="Card">
          <h2>{blog.Title}</h2>
          <p><ReactReadMoreReadLess
                charLimit={100}
                readMoreText={<b>Read-more▼</b>}
                readLessText={<b>Read-less▲</b>}
            >
                {blog.Content}
            </ReactReadMoreReadLess></p>
            <Button id={blog.key} onClick={handleDelete} variant="contained" className="btn btn-danger">
        Delete
      </Button>
       </div>
    })) : <div className="Card"><h2>No Blogs posted</h2></div>}
    
     <a className="logout" href="/logout" role="button">Log Out</a>
    
    </div>
   ) 
}

export default Blogs;