import React, { useRef } from "react";
import play from "./assets/icon-play.svg";
import "./style.css";

const Heading = ({ audioUrl, word, phonetic}) => {

  const ref = useRef();

  const playAudio = () => {

    ref.current.play();
  };

  return (
    <div className="flex flex-row justify-between my-5">
      <h3 className="font-blod text-3xl font-serif capitalize">
        {word}
        <span className="block text-normal text-sm text-indigo-600">
          {phonetic}
        </span>
      </h3>
      <button onClick={playAudio} className="h-12 w-12 rounded-full flex flex-row items-center justify-center">
          <img src={play} width={58} />
      </button>

      <audio className="hidden" ref={ref} src={audioUrl} />
    </div>
  )
}

export default Heading;

