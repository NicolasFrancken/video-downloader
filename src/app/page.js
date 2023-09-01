"use client";

import axios from "axios";

import { useState } from "react";
import { FiDownload, FiRotateCcw } from "react-icons/fi";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [text, setText] = useState("");
  const [platformName, setPlatformName] = useState("youtube");
  const [quality, setQuality] = useState("lowestvideo");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePlatformChange = () => {
    if (platformName === "youtube") {
      setPlatformName("vimeo");
      setQuality("360p");
    } else {
      setPlatformName("youtube");
      setQuality("lowestvideo");
    }
  };

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  const handleClick = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      setText("");

      const res = await axios.post(
        `/api/${platformName}`,
        {
          url: inputValue,
          quality: quality,
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
      setErrorMessage(e.response.data.message);
    }
  };

  return (
    <div className="h-screen bg-gray-200 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-3xl text-gray-900 font-bold mr-10">
          {platformName === "youtube" ? (
            <span className="text-red-700">Youtube</span>
          ) : (
            <span className="text-green-500">Vimeo</span>
          )}{" "}
          Downloader
        </h1>
        <button
          onClick={handlePlatformChange}
          className="bg-gray-900 py-1 px-1 rounded-full hover:opacity-50 transition-opacity ease-linear duration-200"
        >
          <FiRotateCcw className="w-3 h-3 text-gray-200" />
        </button>
      </div>
      <div className="flex items-center justify-center">
        <input
          className="box-border w-96 h-10 border-2 border-r-0 border-gray-900 rounded-s-lg px-2 focus:outline-none font-semibold text-gray-900"
          onChange={handleChange}
          value={inputValue}
          placeholder="URL"
        />
        {platformName === "youtube" ? (
          <select
            value={quality}
            onChange={handleQualityChange}
            className="box-border h-10 border-2 border-gray-900 text-gray-900 font-semibold focus:outline-none hover:cursor-pointer "
          >
            <option
              value="lowestvideo"
              className="text-gray-900 font-semibold border-2 border-gray-900 h-10 hover:cursor-pointer"
            >
              Lowest
            </option>
            <option
              value="highestvideo"
              className="text-gray-900 font-semibold border-2 border-gray-900 h-10"
            >
              Highest
            </option>
          </select>
        ) : (
          <select
            value={quality}
            onChange={handleQualityChange}
            className="box-border h-10 border-2 border-gray-900 text-gray-900 font-semibold focus:outline-none hover:cursor-pointer "
          >
            <option
              value="360p"
              className="text-gray-900 font-semibold border-2 border-gray-900 h-10 hover:cursor-pointer"
            >
              360p
            </option>
            <option
              value="480p"
              className="text-gray-900 font-semibold border-2 border-gray-900 h-10"
            >
              480p
            </option>
            <option
              value="720p"
              className="text-gray-900 font-semibold border-2 border-gray-900 h-10"
            >
              720p
            </option>
            <option
              value="1080p"
              className="text-gray-900 font-semibold border-2 border-gray-900 h-10"
            >
              1080p
            </option>
          </select>
        )}

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
        {errorMessage ? (
          <h3 className="text-red-600 text-lg mt-10 font-semibold">
            {errorMessage}
          </h3>
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
