export function createControl (config, validation) {
    return {
        ...config, 
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

export function validate(value, validation = null) {
    if (!validation) return true
    let isValid = true
    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }
    // if (validation.email) {
    //     isValid = validateEmail(value) && isValid
    // }
    // if (validation.minLength) {
    //     isValid = value.length >= validation.minLength && isValid
    // }
    return isValid
}

export function validateForm (formControls) {
   let localFormValid = true
   localFormValid = formControls.question.valid && localFormValid
   localFormValid = !formControls.answers.map(answer => answer.valid).includes(false) && localFormValid
   return localFormValid
}