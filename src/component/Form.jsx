import { useState } from "react";

export default function Form(props){
  
    return(
       <form action={props.add}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="e.g Oregano"
          

        />
        <button  id="search-btn" >
          + Add Ingredient
        </button>
      </form>
    )
}