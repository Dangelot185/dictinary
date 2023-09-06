import Heading from "./Heading";
import searchImg from "./assets/icon-search.svg";
import Content from "./Content";
import { useState  } from "react";
import dictImg from "./assets/logo.svg";
import "./style.css";


function App() {

  const [word, setWord] = useState("");
  const [results, setResults] = useState(null);

  const searchWord = async () => {
    const response = await fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
    );

    const data = await response.json();

    setResults(data[0]);
  };



  const heading = () => {

    const audio = results?.phonetics.find(phone => phone.audio !== "").audio;

    return {
      audioUrl: audio,
      word: results?.word,
      phonetic: results?.phonetic,
    }
  };

  const [darkMode, setDarkMode] = useState(false);

  return ( 
    <div className={darkMode ? 'dark-mode': 'light-mode'}>
      <div className="container mx-auto px-10">
        
        <div class="h-20 grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-indigo-600 font-bold
              text-2xl mt-6"> <img src={dictImg} width={20}/> 
            </h2>
          </div>

          <div className="flex justify-end">
            <nav className="my-2 h-14 flex flex-row items-center justify-items-end">
                <select name="text-sm" id="sel-option">
                  <option value="serif">Serif</option>
                  <option value="homa">Homa</option>
                </select>
                <div className="switch-checkbox">
                  <label className="switch">
                    <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
                    <span className="slider round"> </span>
                  </label>
                </div>
                      
                <span className="icon-span" style={{ color: darkMode ? "#c96dfd" : "grey" }}>☾</span>
            </nav>
          </div>

        </div>

        <input type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="w-full bg-gray-100 border-none outline-none rounded-lg px-3 py-4 shadow-sm" />
        
        <button className="-mx-14 px-3 py-4 rounded-lg" onClick={searchWord}>
          <img src={searchImg} width={18} />
        </button>

        {results?.meanings?.length > 0 && (
          <>
            <Heading {...heading()} />
            {results.meanings.map((content, index) => {
              return <Content {...content} key={index} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
