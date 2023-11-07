import React from 'react'

function Button({title, handleClick, textareaValue='', category, inputType}) {
  return (
    <button disabled={category === 'action' && textareaValue.length === 0} className={`btn ${category} ${inputType === title && "active"}`} onClick={() => handleClick()}>{title}</button>
  )
}

export default Button