import React from 'react'
import PropTypes from 'prop-types'

function Loader({onJSONUploaded}) {
    const fileToDataUrl = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.addEventListener('load', event => {
                resolve(JSON.parse(event.currentTarget.result));
            });
            
            fileReader.addEventListener('error', event => {
                reject(new Error(event.currentTarget.error));
            });
            
            fileReader.readAsText(file);
        });
    }

    const handleSelect = async (event) => {
        const files = [...event.target.files];
        const jsons = await Promise.all(files.map(o => fileToDataUrl(o)));
        onJSONUploaded(jsons);
    }

    return (
    <div>
        <label for="files" >&nbsp;Загрузить словарь&nbsp;</label>
        <input id="files" style={{visibility:"hidden"}} type="file" accept="text/javascript,application/json" onChange={handleSelect}/>
    </div>
    )
}

Loader.propTypes = {
    onJSONUploaded : PropTypes.func
}

export default Loader
