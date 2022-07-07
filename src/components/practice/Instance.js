import React, { useState } from "react";

const Instance = (props) => {
  const [ex, setEx] = useState("");
  const [ex2, setEx2] = useState("");

  const stateChanger = (e) => {
    setEx(e.target.value);
  };

  const stateChanger2 = (e) => {
    setEx2(e.target.value);
  };

  const titleChange = (e) => {
    console.log(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    console.log(ex, ex2);
    setEx("");
    setEx2("");
  };

  const someObject = {
    hat: 2,
    shoes: 3,
    sunglasses: "out of stock",
    shirt: "Volcom",
  };

  const [obj, setObj] = useState(someObject);

  const objHandler = (objects) => {
    setObj((prevObj) => {
      return [objects, ...prevObj];
    });
  };

  return (
    <div>
      <h2>{[ex, ex2]}</h2>
      <form onSubmit={submit}>
        <label>logging my words</label>
        <input type="text" value={ex2} onChange={stateChanger2}></input>;
        <label>changing the h2</label>
        <input type="text" value={ex} onChange={stateChanger}></input>;
        <button>submit</button>
      </form>
    </div>
  );
};

export default Instance;
