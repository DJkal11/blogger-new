import React from "react";
import {useParams} from "react-router-dom";


function BlogPage(){
    const params = useParams();
    console.log(params);
    return <div>
    <h1> Blog Article: {params} </h1>
    </div>
}

export default BlogPage;