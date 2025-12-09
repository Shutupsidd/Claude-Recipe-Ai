import { useEffect, useRef, useState } from 'react';
import Claude from './Claude';
import Showbtn from './Showbtn';
import List from './List';
import Form from './Form';

export default function Main() {

  const [response, setResponse] = useState("");

  const [recipeShown, setRecipeShown] = useState(false);

  const [loading, setLoading] = useState(false)

  const textRef =useRef(null);

    async function getResponse() {
    setLoading(true);
    setRecipeShown(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: messages }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch recipe");
      }

      const data = await res.json();
      setResponse(data.recipe); // recipe is the markdown string
    } catch (err) {
      console.error(err);
      setResponse("Sorry, something went wrong while generating your recipe.");
    } finally {
      setLoading(false);
    }
  }

  // one for the list
  const [messages, setMessages] = useState([]);

  // one for the current input value

  

  function addIngredient(formData){
  const newIngredient = (formData.get("search") || "").trim()
  if (!newIngredient) return
  setMessages(prev => [...prev, newIngredient])
  }

/*  const handleClick = () => {
    const trimmed = input.trim();
    if (!trimmed) return; // ignore empty input
    changeIngredient(trimmed); // add to list
    setInput(''); // clear input field
  };
  const changeIngredient = (value) => {
    setMessages((prev) => [...prev, value]); // append new ingredient
  };*/
 
  useEffect(()=>{
    if(recipeShown && textRef.current){
      textRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      }); 
    }
  },[recipeShown ]);
   
  
  return (
    
        <main className="main">

          <Form add={addIngredient}/>

          {messages.length > 0 && <List mess={messages}/>}
            
          <Showbtn onClick={getResponse} disabled={loading || messages.length <= 3} />
            
          {recipeShown  && (
            <div ref={textRef}>
              {loading? <p>Thinking...</p>: <Claude text={response} />}
            </div>
          )}
        </main>      
    
  );
}
