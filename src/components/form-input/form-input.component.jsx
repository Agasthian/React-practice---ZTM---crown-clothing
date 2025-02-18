//This component seperates the form input fileds into seperate component used in signUpComponent.jsx
import React from 'react'
import {FormInputLabel, Input,Group} from './form-input.styles.jsx'

const FormInput = ({label, ...otherProps}) => {
  return (
    <Group >
        <Input {...otherProps} />
        <FormInputLabel shrink={otherProps.value.length}> {label}</FormInputLabel>
    </Group>
  )
}

export default FormInput