import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Classifier({word, definition, onScore, onWordChange}) { 
    const [inputValue, setInputValue] = useState(word);
    console.log(inputValue);

    if (!word || !definition || !onScore) {
        return <></>;
    }
    
    const handleOnInput = (event) => {
        setInputValue(() => event.target.value);
        onWordChange(event);
    }
    return (
    <div>
        <input key={word} type="text" defaultValue={word} onInput={handleOnInput}/>
        <p><i>-&nbsp;{definition}</i></p>
        <ul style={{paddingLeft : 0}}>
            <li key="1" style={{display:"inline"}}>
                <button onClick={()=>onScore(word, 1)}>Просто</button>
            </li>
            &nbsp;
            <li key="2" style={{display:"inline"}}>
                <button onClick={()=>onScore(word, 2)}>Норм</button>
            </li>
            &nbsp;
            <li key="3" style={{display:"inline"}}>
                <button onClick={()=>onScore(word, 3)}>Сложно</button>
            </li>
        </ul>
    </div>
    )
}

Classifier.propTypes = {
    word : PropTypes.string, 
    definition : PropTypes.string,
    onScore : PropTypes.func,
    onWordChange : PropTypes.func
}

export default Classifier
