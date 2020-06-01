import React from 'react'
import myCSS from './AnswerItem.module.css'

const AnswerItem = ({answer, onAnswerClick, state}) => {
    const cls = [myCSS.AnswerItem]
    
    if (state === false) {
        cls.push(myCSS.error)
    } else if (state) {
        cls.push(myCSS.success)
    }
    return (
        <li className={cls.join(' ')} 
        onClick={()=> {onAnswerClick(answer.id)}}>
            {answer.text}
        </li>
    )
}

export default AnswerItem