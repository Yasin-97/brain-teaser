import React, { useState } from "react";
import RememberSession from "../components/RememberSession";
import MemorizeSession from '../components/MemorizeSession'
export default function Wizard() {
  const [getPlaying, setGetPlaying] = useState(false);
  const words = [
    { id: '0', word: "man" },
    { id: '1', word: "woman" },
    { id: '2', word: "kid" },
    { id: '3', word: "Harry potter" },
    { id: '4', word: "overWhelmed" },
    { id: '5', word: "mindfullness" },
  ];
// return <MemorizeSession />
  return <RememberSession time={18} words={words} level={5} />;
}
