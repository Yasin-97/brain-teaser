import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../context/Context";
import Card from "./Card";
import styles from "../css/main.min.module.css";
import Button from "./Button";
import Loading from "../components/Loading";

export default function MemorizeSession() {
  //context
  const { phase, words, currentLevel, dispathcSessionStorage, memoTimeSaver } =
    useDataContext();
  const { route, levels } = phase;

  //route
  const history = useHistory();

  //get session storaged time
  const memoContinued = dispathcSessionStorage({
    type: "GET_ITEM",
    payload: {
      item: "memoContinued",
    },
  });

  //state
  const [counter, setCounter] = useState(
    memoContinued ? memoContinued : levels[currentLevel].memoDuration
  );

  //effects
  useEffect(() => {
    let timer;
    dispathcSessionStorage({
      type: "SET_ITEM",
      payload: { item: "memoSavedTime", value: counter },
    });
    dispathcSessionStorage({
      type: "SET_ITEM",
      payload: { item: "memoContinued", value: counter },
    });
    if (words) {
      if (counter > 0) {
        timer = setTimeout(() => {
          setCounter((prev) => prev - 1);
        }, 1000);
      } else {
        memoTimeSaver(counter);
        history.replace(`/wizard/${route}/${currentLevel}/overlay`);
        dispathcSessionStorage({
          type: "REMOVE",
          payload: { item: "memoContinued" },
        });
      }
    }
    return () => clearTimeout(timer);
  }, [counter, words]);

  //fucntion
  const buttonAction = () => {
    memoTimeSaver(counter);
    history.replace(`/wizard/${route}/${currentLevel}/overlay`);
    dispathcSessionStorage({
      type: "SET_ITEM",
      payload: {
        item: "memoSavedTime",
        value: counter,
      },
    });
    dispathcSessionStorage({
      type: "REMOVE",
      payload: { item: "memoContinued" },
    });
  };

  return (
    <Card
      className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_around}`}
    >
      <div>
        <h1 className={styles.wizard_memo_header}>Remember the order</h1>
        <div className={styles.wizard_memo_collection}>
          {!words ? (
            <Loading />
          ) : (
            words.map(({ id, word }) => (
              <p className={styles.wizard_memo_word} key={id}>
                {word}
              </p>
            ))
          )}
        </div>
      </div>
      <div>
        <Button
          className={styles.wizard_memo_btn}
          disabled={!words && true}
          onClick={() => buttonAction()}
          duration={counter}
          text={"FINISH"}
        />
      </div>
    </Card>
  );
}
