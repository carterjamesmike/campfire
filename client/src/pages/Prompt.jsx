import React, { useState } from 'react'

const Prompt = () => {
    const [storyPrompt, setStoryPrompt] = useState('')

    // const handleStoryPrompt = async () => {
    //     const response = await fetch('/api/generate-story-prompt');
    //     const data = await response.text();
    //     console.log(data)
    //     setStoryPrompt(data);
    // };

    const handlePromptGenerator = () => { 
        fetch('/api/generate-story-prompt')
        .then(response => response.json())
        .then(data => setStoryPrompt(data.text))
        .catch(err => console.log(err))
    };



  return (
    <div>
        <h1>Prompt</h1>
        <button 
        className='border-2 border-black'
        onClick={handlePromptGenerator}>Generate Story Prompt</button>
        <p>{storyPrompt}</p>
    </div>
  )
}

export default Prompt