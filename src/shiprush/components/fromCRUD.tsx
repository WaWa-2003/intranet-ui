import React from "react";
import FromListData from "./From/FromListData"; 
import FromCreate from "./From/FromCreate";

const FromCRUD: React.FC = () => { 
    return (
        <div className="flex">     
            <FromCreate /> 
            <FromListData />    
        </div> 
    )
}

export default FromCRUD; 
