import { useState } from 'react';
import './App.css';
import Classifier from './component/Classifier';
import Loader from './component/Loader';
import { saveAs } from '@progress/kendo-file-saver';

function App() {
  const [currentJSON, setCurrentJSON] = useState({});
  const [word, setWord] = useState({word : undefined, definition : undefined});
  const [isDirty, setIsDirty] = useState(false);

  const handleOnSave = function () {
    setIsDirty( () => false);
    saveAs(new Blob([JSON.stringify(currentJSON)]), 'file.json');        
  }

  const nextWord = (dictionary) => {
    const wordName = Object.keys(dictionary).find((item) => !dictionary[item]["score"]);
    const result = { "word" : wordName, "definition" : dictionary[wordName].definition};
    
    return result;
  }

  const handleOnJSONLoaded = (resultArray) => {
    setCurrentJSON( () => resultArray[0]);
    setWord( () => nextWord(resultArray[0]));
  }
  
  const handleOnScore = (word, score) => {
    setIsDirty(()=>true);
    setCurrentJSON( (prev) => {
      prev[word]["score"] = score;
      setWord( () => nextWord(prev));
      return prev;
    });
  }
  
  const handleOnWordChange = (event) => {
    const wordName = event.target.value;
    if (currentJSON[wordName]) {
      setWord( () => ({ "word": wordName, "definition" : currentJSON[wordName].definition}));
    }
  }

  const handleKey = (event) => {
    if (!word || !word.word) {
      return;
    }

    if (event.key === "1") {
      handleOnScore(word.word, 1);
    }

    if (event.key === "2") {
      handleOnScore(word.word, 2);
    }

    if (event.key === "3") {
      handleOnScore(word.word, 3);
    }

  }

  window.onbeforeunload = () => {
    word && word.word && isDirty && handleOnSave();
  }

  return (
    <div className="App" tabIndex={-1} onKeyPress={handleKey}>
      <header className="App-header">
        <Loader onJSONUploaded={handleOnJSONLoaded}/>
        <br/>
        <Classifier {...word} onScore={handleOnScore} onWordChange={handleOnWordChange}/>
        <br/>
        {word && word.word && <p><button onClick={handleOnSave}>Сохранить словарь</button></p>}
      </header>
    </div>
  );
}

export default App;
