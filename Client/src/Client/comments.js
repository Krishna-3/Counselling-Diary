import React, { useState } from 'react';

function TextBox() {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
     const words = inputText.trim().split(/\s+/);
    setText(inputText);
    setWordCount(words.length);
  };

  return (
    <div>s
      <textarea
        value={text}
        onChange={handleInputChange}
        placeholder="Comment Below👇👇"
        rows={4}
      />
    </div>
  );
}

export default TextBox;
