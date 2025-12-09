import React from "react";

export default function List(props){
        return(
            <div className='ingridient'>
            <h3>Ingredients on hand:</h3>
            <ul className="list">
             {props.mess.map((message, index) => (
                    <li key={index}>{message}</li>
                 ))}
            </ul>
        
          </div>
       
        )
}