import React, { useState } from "react";
import myCSS from "./Auth.module.css";
import Button from "../../UI/Button/Button";
import Input from '../../UI/Input/Input';

const initialFormControls = {
    email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter valid e-mail',
        valid: false,
        touched: false,
        validation: {
            required: true,
            email: true
        }
    },
    password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter valid password',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 6
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const Auth = (props) => {
  const [formControls, setControls] = useState(initialFormControls)
  
  const onLogin = (evt) => {
  };
  const onRegister = (evt) => {
  };
  const submitHandler = (evt) => {
    evt.preventDefault();
  };

  const validateControl = (value, validation) => {
    if (!validation) return true
    let isValid = true
    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }
    if (validation.email) {
        isValid = validateEmail(value) && isValid
    }
    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
    }
    return isValid
  }

  const onInputChange = (evt, controlName) => {
      const localFormControls = {...formControls}
      const control = {...formControls[controlName]}

      control.value = evt.target.value
      control.touched = true
      control.valid = validateControl(control.value, control.validation)
      localFormControls[controlName]=control
      setControls(localFormControls)
  }

  const renderInputs = () => {
      return Object.keys (formControls).map( (controlName, index) => {
        const control = formControls[controlName]
        return (
              <Input key={controlName+index}
                value={control.value}
                valid={control.valid}
                type={control.type}
                touched={control.touched}
                label={control.label}
                errorMessage={control.errorMessage}
                shouldValidate={!!control.validation}
                onChange={ evt => {onInputChange (evt, controlName)}}
                 />
          )
      })
  }

  return (
    <div className={myCSS.Auth}>
      <div>
        <h1>Login</h1>
        <form onSubmit={submitHandler} className={myCSS.AuthForm}>
          {renderInputs()}
          <Button type="success" onClick={onLogin}>
            Log in
          </Button>
          <Button type="primary" onClick={onRegister}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
