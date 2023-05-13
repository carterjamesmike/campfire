import React, { useState } from 'react'

const Prompt = () => {
    const [storyPrompt, setStoryPrompt] = useState('Nothing yet')

    const handlePromptGenerator = () => { 
        fetch('http://localhost:3001/prompt')
        .then(response => response.json())
        .then(data => setStoryPrompt(data.storyPrompt))
        .then(console.log(storyPrompt))
        .catch(err => console.log(err))
    };

console.log(storyPrompt)

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