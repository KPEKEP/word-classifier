import { useState } from 'react';
import './App.css';
import Classifier from './component/Classifier';
import Loader from './component/Loader';
import Saver from './component/Saver';

function App() {
  const [currentJSON, setCurrentJSON] = useState({});
  const [word, setWord] = useState({word : undefined, definition : undefined});

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

    console.log(word, event.key);
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
  return (
    <div className="App" tabIndex={-1} onKeyPress={handleKey}>
      <header className="App-header">
        <p><Loader onJSONUploaded={handleOnJSONLoaded}/></p>
        <br/>
        <p><Classifier {...word} onScore={handleOnScore} onWordChange={handleOnWordChange}/>        </p>
        <br/>
        {(word && word.word) && <p><Saver jsonObject={currentJSON} /></p>}
      </header>
    </div>
  );
}

export default App;
