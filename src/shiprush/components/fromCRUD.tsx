import React from "react";
import FromListData from "./From/FromListData"; 
import FromCreate from "./From/FromCreate";

const FromCRUD: React.FC = () => { 
    return (
        <div>
            <div className="fromData--list-container">
                <FromCreate /> 
            </div>
            
            <div className="fromData--list-container">                              
                <FromListData />           
            </div>
        </div> 
    )
}

export default FromCRUD; 
