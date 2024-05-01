import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  let [length, setLength] = useState(6);
  let [password, setPassword] = useState("");
  let [isNumAllowed, setNumAllowed] = useState(true);
  let [isCharAllowed, setCharAllowed] = useState(true);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialCharacters = "!#$%&*+-./?@^_";

    if (isNumAllowed) str += numbers;
    if (isCharAllowed) str += specialCharacters;

    for (let index = 0; index < length; index++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [isNumAllowed, isCharAllowed, length]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumAllowed, passwordGenerator, isCharAllowed]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    alert("Copied");
  }, [password]);
  return (
    <>
      <div className=" h-screen w-screen flex justify-center items-center ">
        <div className="bg-slate-500 w-full rounded-md  max-w-max  h-max py-8 px-8 absolute ">
          <h1 className="text-5xl  my-8 font-black text-center text-white">
            Random Password Generator
          </h1>
          <div>
            <div className="flex my-8 ">
              <input
                className="w-full outline-none px-1 py-2"
                type="text"
                value={password}
                placeholder="Password"
                ref={passwordRef}
                readOnly
              />
              <button
                onClick={copyPassword}
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-l px-5 py-3 me-2 mx-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Copy
              </button>
            </div>
            <div className="flex gap-8 my-3">
              <div className="flex">
                <input
                  type="range"
                  min="6"
                  max="25"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
                <label
                  className=" text-red-600  font-medium px-3 text-xl"
                  htmlFor="slider"
                >
                  Length: {length}
                </label>
              </div>
              <div className="flex gap-7">
                <div>
                  <input
                  type="checkbox"
                  defaultChecked="Number"
                  id="stateInput"
                  onClick={() => {
                    setNumAllowed((prev) => !prev);
                  }}
                />
                <label className="text-white px-3 text-xl" htmlFor="Number">
                  Number
                </label></div>
                <div>
                <input
                  type="checkbox"
                  defaultChecked="Special Character"
                  id="stateInput"
                  onClick={() => {
                    setCharAllowed((prev) => !prev);
                  }}
                />
                <label
                  className="text-white px-3 text-xl"
                  htmlFor="Special Character"
                >
                  Special Character
                </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
