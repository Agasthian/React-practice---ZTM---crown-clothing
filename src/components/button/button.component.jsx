import React from 'react'
import {BaseButton,GoogleButton,InvertedButton} from'./button.styles.jsx'


/*
default

inverted

google sign in

* */

//define a variable that updates the class name of button based on this variable
export const BUTTON_TYPE_CLASSES = {
    base:'base',
    google : 'google-sign-in',
    inverted: 'inverted'
}
//Get button function it takes in buttonType string and should return any of 3 button components from style.jsx
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
  {
    [BUTTON_TYPE_CLASSES.base] : BaseButton,
    [BUTTON_TYPE_CLASSES.google] : GoogleButton,
    [BUTTON_TYPE_CLASSES.inverted] : InvertedButton

  }[buttonType])


const Button = ({children, buttonType, ...otherProps}) => {

  const CustomButton = getButton(buttonType)

  return (
    <CustomButton {...otherProps}>{children} </CustomButton>
  )
}


export default Button