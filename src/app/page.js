"use client";

import axios from "axios";

import { useState } from "react";
import { FiDownload } from "react-icons/fi";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      setText("");

      const res = await axios.post(
        "/api/youtube",
        {
          url: inputValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      setText(res.data.message);
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(e);
    }
  };

  return (
    <div className="h-screen bg-gray-200 flex flex-col items-center justify-center">
      <h1 className="text-3xl text-gray-900 font-bold mb-10">
        YouTube Video Downloader
      </h1>
      <div className="flex items-center justify-center">
        <input
          className="box-border w-96 h-10 border-2 border-r-0 border-gray-900 rounded-s-lg px-2 focus:outline-none font-semibold text-gray-900"
          onChange={handleChange}
          value={inputValue}
          placeholder="URL"
        />
        <button
          className="box-border text-gray-200 h-10 bg-gray-900 rounded-e-lg px-4 py-2 hover:opacity-50 transition-opacity duration-150 ease-linear"
          onClick={handleClick}
        >
          <FiDownload className="w-5 h-5" />
        </button>
      </div>
      <div className="h-40">
        {isLoading ? (
          <div className="h-2 w-96 bg-gray-900 mt-12 rounded-full overflow-hidden">
            <div className="h-full w-96 bg-blue-500 animate-loading rounded-full"></div>
          </div>
        ) : (
          ""
        )}
        {text !== "" ? (
          <h3 className="text-gray-900 text-lg mt-10 font-semibold">{text}</h3>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
