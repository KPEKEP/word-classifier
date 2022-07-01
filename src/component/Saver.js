import React from 'react'
import PropTypes from 'prop-types'
import { saveAs } from '@progress/kendo-file-saver';

function Saver({jsonObject}) {


    const handleOnClick = function () {
        saveAs(new Blob([JSON.stringify(jsonObject)]), 'file.json');        
    }
        
    return (
        <button onClick={handleOnClick}>Сохранить</button>
    )
}

Saver.propTypes = {
    jsonObject : PropTypes.object.isRequired
}

export default Saver
