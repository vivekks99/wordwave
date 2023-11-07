import React, { useState } from 'react'
import Button from './components/Button'
import TextArea from './components/TextArea'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [inputType, setInputType] = useState('Type');
  const [isRecording, setIsRecording] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  
  const {transcript, browserSupportsSpeechRecognition, resetTranscript} = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  function handleType(){
    setInputType('Type');
  }
  function handleSpeak(){
    setInputType('Speak');
  }
  function handleRecord(){
    if(isRecording){
      setIsRecording(false);
      SpeechRecognition.stopListening();
      setTextareaValue(textareaValue + transcript + '. ');
      resetTranscript();
    }
    else{
      setIsRecording(true);
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }
  }

  return (
    <div className='container'>
      <h1>WordWave</h1>
      <div className="upper">
        <div className="upper-txt">
          <div className='description'>A Versatile App for Effortless Text Formatting and Converting Spoken Words to Written Text.</div>
          <div className="upper-title">Enter Your Text</div>
        </div>
        <div className="upper-btn">
          <Button category="feature-toggle" title="Type" handleClick={handleType} inputType={inputType} />
          <Button category="feature-toggle" title="Speak" handleClick={handleSpeak} inputType={inputType} />
        </div>
      </div>
      {inputType === 'Speak' && 
      <div className='record-btn'><Button category={`${isRecording ? "record-active" : "record-inactive"}`} title={`${isRecording ? "Stop Recording" : "Start Recording"}`} handleClick={handleRecord} /></div>}
      <TextArea textareaValue={textareaValue} setTextareaValue={setTextareaValue} transcript={transcript} isRecording={isRecording} />
    </div>
  )
}

export default App