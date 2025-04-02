import React, { useState,useEffect,useRef } from "react";
import "./mainSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileWink } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";

const mainSection = () => {
  const [inputVal, setinputVal] = useState("");
  const [query, setquery] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setloader] = useState(false);
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  const basicQueries = [
    {
      text: "Summarize the key advancements in artificial intelligence over the last decade.",
      icon: faWandMagicSparkles,
    },
    {
      text: "Generate a short story prompt that involves a talking animal and a lost object.",
      icon: faFaceSmileWink,
    },
    {
      text: "Explain the concept of supply and demand in economics.",
      icon: faLightbulb,
    },
    {
      text: "Give me three tips for improving my focus while working from home.",
      icon: faStar,
    },
  ];

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function run(prompt) {
    setloader(true);
    const chatSession = model.startChat({
      generationConfig,
      history: history
        .map((item) => [
          { role: "user", parts: [{ text: item.user }] },
          { role: "model", parts: [{ text: item.gemini }] },
        ])
        .flat(),
    });

    const result = await chatSession.sendMessage(prompt);
    let text = result.response.text();
    let arr = text.split("**");
    let modifiedResponse = "";
    for (let i = 0; i < arr.length; i++) {
      if (i % 2 === 0) {
        modifiedResponse += arr[i];
      } else {
        modifiedResponse += "<b>" + arr[i] + "</b>";
      }
    }
    let modifiedResponse2 = "";
    let arr2 = modifiedResponse.split("\n");
    for (let i = 0; i < arr2.length; i++) {
      modifiedResponse2 += arr2[i] + "<br/>";
    }
    setResponse(modifiedResponse2);
    setHistory((prevHistory) => [
      ...prevHistory,
      { user: prompt, gemini: modifiedResponse2 },
    ]);
    setloader(false);
  }

  const handleBasicQuery = async (e) => {
    setquery(e.target.innerText);
    await run(e.target.innerText);
    setloader(false);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    setquery(inputVal);
    await run(inputVal);
    setinputVal("");
  };

  return (
    <>
    <div
    id="content"
    className="sm:pl-[10%] pl-[15%] min-h-[100vh] min-w-[100vw] flex flex-col items-center gap-24"
    >
    <div className="w-[100%] sm:w-[95%] lg:w-[85%] lg:p-8 md:p-4 p-2 max-h-[80vh] overflow-scroll">
      {history.map((item, idx) => (
        <div key={idx}>
          <div className="flex justify-end px-8 py-2 gap-2">
            <h5 className="bg-gray-700 p-4 w-fit rounded-3xl rounded-tr-[0]">
              {item.user}
            </h5>
            <img
              className="h-12 w-12 border-2 border-gray-100 rounded-full"
              src="https://i.pinimg.com/736x/32/c0/00/32c000969ce1ccf225ec33b334044266.jpg"
              alt="user"
            ></img>
          </div>
          <div className="p-8 px-2 md:px-4 max-w-[85%] h-fit w-fit ml-2 flex gap-4">
            <img
              src="https://brandlogo.org/wp-content/uploads/2024/06/Gemini-Icon-300x300.png"
              className="w-8 h-8"
              alt="gemini"
            ></img>
            <p
              dangerouslySetInnerHTML={{
                __html: item.gemini
                  .split("**")
                  .reduce(
                    (acc, part, i) =>
                      acc + (i % 2 === 1 ? `<b>${part}</b>` : part),
                    ""
                  )
                  .split("\n")
                  .join("<br/>"),
              }}
            ></p>
          </div>
        </div>
      ))}
      {loading && (
        <div>
          <div className="flex justify-end px-8 py-2 gap-2">
          <h5 className="bg-gray-700 p-4 w-fit rounded-3xl rounded-tr-[0]">
          {query}
          </h5>
          <img className="h-12 w-12 border-2 border-gray-100 rounded-full"src="https://i.pinimg.com/736x/32/c0/00/32c000969ce1ccf225ec33b334044266.jpg"></img>
          </div>
        <div className="p-8 px-2 ml-2 flex gap-4 min-h-[50vh]">
          <img
            src="https://brandlogo.org/wp-content/uploads/2024/06/Gemini-Icon-300x300.png"
            className="w-8 h-8"
            alt="gemini"
          ></img>
          <div>
            <div className="w-[400px] h-[20px] rounded-[25px] relative loader m-2 bg-[#3a3a3a5b] loader"></div>
            <div className="w-[600px] h-[20px] rounded-[25px] relative loader m-2 bg-[#3a3a3a5b] loader"></div>
            <div className="w-[700px] h-[20px] rounded-[25px] relative loader m-2 bg-[#3a3a3a5b] loader"></div>
          </div>
        </div>
        <AlwaysScrollToBottom/>
        </div>
      )}

      {history.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center gap-24 pt-12">
          <div className="w-full flex flex-col gap-4 justify-center items-center">
            <h1 className="sm:text-5xl text-3xl font-bold">Hello! Dev</h1>
            <h3 className="sm:text-3xl text-2xl">How can I help you...?</h3>
          </div>
          <div className="flex gap-6 justify-center md:gap-3 flex-col md:flex-wrap md:flex-row lg:gap-4">
            {basicQueries.map((query, idx) => (
              <div
                key={idx}
                className="text-white text-lg h-48 w-60 p-4 flex  justify-center items-center hover:scale-[1.05] hover:border-gray-100 relative card"
                onClick={handleBasicQuery}
              >
                <p> {query.text}</p>
                <FontAwesomeIcon
                  icon={query.icon}
                  className="absolute bottom-6 right-6 text-gray-100"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

        <div className="w-full flex justify-center fixed bottom-12">
          <form
            onSubmit={submitHandle}
            className="flex flex-row justify-between align-center py-2 px-6 rounded-xl sm:w-[80%] md:w-[70%] w-[75%] inputForm"
          >
            <input
              type="text"
              placeholder="enter your prompt"
              className="md:px-4 px-1 text-[17px] md:text-md py-1 w-[90%] outline-none"
              value={inputVal}
              onChange={(e) => setinputVal(e.target.value)}
            />
            {inputVal ? (
              <button className="cursor-pointer text-white md:text-xl text-md">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            ) : (
              <button disabled className="cursor-no-drop text-gray-400 md:text-xl text-md">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default mainSection;
