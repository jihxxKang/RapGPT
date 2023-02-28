import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [userInputs, setUserInputs] = useState({
    rap_name: "",
    city: "",
    angry: "",
    bugatti: "",
    is_rapper: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setUserInputs((prevUserInputs) => ({
      ...prevUserInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userPrompt =
      "My name is " +
      userInputs.rap_name +
      ", and I represent " +
      userInputs.city +
      ". This is what happens when I get angry. " +
      userInputs.angry +
      " By the way, the color of my bugatti is " +
      userInputs.bugatti +
      (userInputs.is_rapper === "yes"
        ? ". And I am a rapper"
        : ". But I'm not a rapper") +
      ". Can you write me a rap verse that I can spit on the street?";
    //
    console.log(userPrompt);
    const url = "/api/hello";
    const res = await axios.post(url, {
      userPrompt: userPrompt,
    });

    console.log(res.data.result);
    setResult(res.data.result);
    return true;
  };

  return (
    <>
      <h1>RapGPT</h1>
      <form onSubmit={handleSubmit}>
        <h3>What is your rap name?</h3>
        <input
          name="rap_name"
          value={userInputs.rap_name}
          onChange={handleChange}
          autoComplete="off"
        ></input>
        <h3>Which city do you represent?</h3>
        <input
          name="city"
          value={userInputs.city}
          onChange={handleChange}
          autoComplete="off"
        ></input>
        <h3>What happens when you get angry?</h3>
        <input
          name="angry"
          value={userInputs.angry}
          onChange={handleChange}
          autoComplete="off"
        ></input>
        <h3>What color is your Bugatti(s)?</h3>
        <input
          name="bugatti"
          value={userInputs.bugatti}
          onChange={handleChange}
          autoComplete="off"
        ></input>
        <h3>Are you a rapper?</h3>
        <input
          type="radio"
          name="is_rapper"
          value="yes"
          checked={userInputs.is_rapper === "yes"}
          onChange={handleChange}
          autoComplete="off"
        />
        Yes
        <br />
        <input
          type="radio"
          name="is_rapper"
          value="no"
          checked={userInputs.is_rapper === "no"}
          onChange={handleChange}
          autoComplete="off"
        />{" "}
        No
        <br />
        <br />
        <button type="submit">Generate</button>
      </form>
      <br />
      <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>
    </>
  );
}

/*
What is your rap name?
Which city do you represent?
What happens when you get angry?
What color is your Bugatti(s)?
Are you a rapper?
*/
