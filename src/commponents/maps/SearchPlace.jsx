import React, { useState } from "react";
import KakaoMap from "./KakaoMap";

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>     
      <KakaoMap searchPlace={place} />
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="ex.강남역 10번 출구..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
    </>
  );
};

export default SearchPlace;