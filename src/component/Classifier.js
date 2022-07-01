import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Classifier({word, definition, onScore, onWordChange}) { 
    const [, setInputValue] = useState(word);
    
    if (!word || !definition || !onScore) {
        return <></>;
    }
    
    const handleOnInput = (event) => {
        setInputValue(() => event.target.value);
        onWordChange(event);
    }
    return (
    <>
        <input key={word} type="text" defaultValue={word} onInput={handleOnInput}/>
        <p className="description"><i>-&nbsp;{definition}</i></p>
        <p>
            <ul>
                <li key="1">
                    <button className="button-easy" onClick={()=>onScore(word, 1)}>[1] Просто</button>
                </li>
                &nbsp;
                <li key="2">
                    <button className="button-medium" onClick={()=>onScore(word, 2)}>[2] Обычно</button>
                </li>
                &nbsp;
                <li key="3">
                    <button className="button-hard" onClick={()=>onScore(word, 3)}>[3] Сложно</button>
                </li>
            </ul>
        </p>
    </>
    )
}

Classifier.propTypes = {
    word : PropTypes.string, 
    definition : PropTypes.string,
    onScore : PropTypes.func,
    onWordChange : PropTypes.func
}

export default Classifier
