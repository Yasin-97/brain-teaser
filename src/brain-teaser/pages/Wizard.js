import React, { useState, useEffect } from "react";
import WizardIntro from "../components/WizardIntro";
import RememberSession from "../components/RememberSession";
import MemorizeSession from "../components/MemorizeSession";
import Conclusion from "../components/Conclusion";
import Overlay from "../components/Overlay";
import data from "../routes/hard";
export default function Wizard() {
  //states
  const [renderIntro, setRenderIntro] = useState(true);
  const [renderRemeSession, setRenderRemeSession] = useState(false);
  const [memoTime, setMemoTime] = useState();
  const [rememTime, setRememTime] = useState();
  const [nextLevel, setNextLevel] = useState();
  const [quit, setQuit] = useState();
  const [memoSavedTime, setMemoSavedTime] = useState();
  const [rememSavedTime, setRememSavedTime] = useState();
  console.log("memoSavedTime now", memoSavedTime, rememSavedTime);

  //fucntions

  const isIntroRender = (isTrue) => setRenderIntro(isTrue);

  const isMemoTimeEnd = (duration) => setMemoTime(duration);
  const isMemoSavedTime = (savedTime) => setMemoSavedTime(savedTime);

  const isRememRender = (isTrue) => setRenderRemeSession(isTrue);
  const isRememTimeEnd = (duration) => setRememTime(duration);
  const isRememSavedTime = (savedTime) => setRememSavedTime(savedTime);

  const isNextLevel = (nextLevel) => setNextLevel(nextLevel);

  const isQuit = (quit) => setQuit(quit);


  if (renderIntro)
    return (
      <WizardIntro
        description={data.introDescription}
        renderIntroOver={isIntroRender}
      />
    );
  else {
    if (memoTime !== 0)
      return (
        <MemorizeSession
          memoDuration={data.levels[0].memoDuration}
          durationEnd={isMemoTimeEnd}
          savedTime={isMemoSavedTime}
        />
      );
    else {
      if (!renderRemeSession) {
        return (
          <Overlay isRememRender={isRememRender} savedTime={memoSavedTime} />
        );
      } else {
        if (rememTime !== 0) {
          return (
            <RememberSession
              durationEnd={isRememTimeEnd}
              rememDuration={data.levels[0].rememDuration}
              words={words}
              savedTime={isRememSavedTime}
            />
          );
        }
        return (
          <Conclusion
            quit={isQuit}
            nextLevel={isNextLevel}
            savedTime={rememSavedTime}
          />
        );
      }
    }
  } 
}
