import React from 'react'
import './button.styles.scss'


/*
default

inverted

google sign in

* */

//define a variable that updates the class name of button based on this variable
const BUTTON_TYPE_CLASSES = {
    google : 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
  return (
    <button 
        className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
        {...otherProps}
    >
        {children}
    </button>
  )
}


export default Button