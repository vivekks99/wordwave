import React, { useState } from 'react'
import Button from './Button'

function TextArea({textareaValue, setTextareaValue, transcript, isRecording}) {
  const [showClipboard, setShowClipboard] = useState(true);


  function handleToUpperCase(){
    let newText = textareaValue.toUpperCase();
    setTextareaValue(newText);
  }
  function handleToLowerCase(){
    let newText = textareaValue.toLowerCase();
    setTextareaValue(newText);
  }

  function handleRemoveWhiteSpace(){
    // 1. Split your text into Arr based on newline to we can retain it. But remove extra newlines from here.
    let newArr = textareaValue.split('\n').filter( (element) => {return element.length!==0} );

    // 2. Remove whitespaces from the strings.
    for(let i = 0; i < newArr.length; i++){
      newArr[i] = newArr[i].replace(/\s+/g, ' ');
    }

    // 3. Craete new string.
    let newStr = '';
    for(let i = 0; i < newArr.length; i++){
      newStr += newArr[i] + '\n';
    }

    // 4. Remove any remaining whitespaces.
    newStr = newStr.trim();
    newStr = newStr.replaceAll('\n ', '\n');
    setTextareaValue(newStr);
  }

  function handleCapitalize(){
    let sentences = textareaValue.split('\n').filter( (element) => {return element.length!==0} );
    let newStr = '';
    for(let sentence = 0; sentence < sentences.length; sentence++){
      let words = sentences[sentence].split(' ');
      for (let word = 0; word < words.length; word++) {
        // newStr += words[word][0].toUpperCase() + words[word].substr(1) + ' ';
        newStr +=  words[word].charAt(0).toUpperCase() + words[word].slice(1).toLowerCase();
        if (words.length - word !== 1){
          newStr = newStr + ' ';
        }
      }
      newStr += '\n';
    }
    newStr = newStr.trim();
    setTextareaValue(newStr);
  }


  function handleClipboard(){
    navigator.clipboard.writeText(textareaValue);
    setTimeout(() => {
      setShowClipboard(true);
    }, 2000);
    setShowClipboard(false);
  }

  return (
    <div>
        <div className="txtarea">
          <textarea disabled={isRecording} rows="10" value={textareaValue + transcript} onChange={(e) => setTextareaValue(e.target.value)}></textarea>
          <div className='clipboard'>
            <div className="cross-icon" onClick={() => setTextareaValue('')}><i className="fas fa-times"></i></div>
            {showClipboard ? <div className='clipboard-icon' onClick={handleClipboard}><i className="fas fa-clipboard"></i></div> :
            <div className='tick-icon'><i className="fas fa-check"></i></div>}
          </div>
        </div>
        
        <div className="summary">
            <div className='word-count'>Word Count: {textareaValue.split(/\s+/).filter( (element) => {return element.length!==0} ).length}</div>
            <div>Character Count: {textareaValue.length}</div>
        </div>
        <div className="action-btns">
            <Button category="action" textareaValue={textareaValue} title="Convet to UpperCase" handleClick={handleToUpperCase} />
            <Button category="action" textareaValue={textareaValue} title="Convet to LowerCase" handleClick={handleToLowerCase} />
            <Button category="action" textareaValue={textareaValue} title="Capitalize" handleClick={handleCapitalize} />
            <Button category="action" textareaValue={textareaValue} title="Remove White-Spaces" handleClick={handleRemoveWhiteSpace} />
        </div>
    </div>
  )
}

export default TextArea