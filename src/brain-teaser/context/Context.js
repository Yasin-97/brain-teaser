import React, { createContext, useContext, useState } from "react";
import {
  novice,
  intermediate,
  expert,
} from "../difficultyLevel/difficultyLevel";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levelPoints, setLevelPoints] = useState();
console.log(difficulty);
  //function
  const getPhaseDifficulty = (diff) => {
    switch (diff) {
      case 1:
        setDifficulty(novice);
        break;
      case 2:
        setDifficulty(intermediate);
        break;
      case 3:
        setDifficulty(expert);
        break;
      default:
        break;
    }
  };

  const setNextLevel = () => setCurrentLevel((pre) => pre + 1);
  const getLevelPoints = (points) => setLevelPoints(points);

  function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const arraySimilarity = (arr1, arr2) => {
    const inCommon = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) inCommon.push(arr1[i]);
    }
    return {
      exactitude: ((inCommon.length / arr1.length) * 100).toFixed(),
      point: inCommon.length + "/" + arr1.length,
    };
  };

  const value = {
    //states
    difficulty,
    currentLevel,
    levelPoints,

    //functions
    getPhaseDifficulty,
    getLevelPoints,
    setNextLevel,
    shuffle,
    arraySimilarity,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
