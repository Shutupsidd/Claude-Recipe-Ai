import React from "react";
import Markdown from "react-markdown";

  export default function Claude(props){
    return(
        <section className="suggested-recipe-container" aria-live="polite">
                <Markdown>{props.text}</Markdown>
        </section>    
       )
}