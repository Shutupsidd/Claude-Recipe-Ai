import React from "react";

export default function Showbtn(props){
    return(
        
            <div className='want-recipe'>
                <div>
                <h4 className='h-recipe'>Ready for a Recipe ?</h4>
                <span className='p-recipe'>Generate a recipe from your list of Ingredient.</span>
                </div>
                <>
                <button type="submit" onClick={props.onClick}>Generate Recipe</button>            
                </>
            </div>
    )
}