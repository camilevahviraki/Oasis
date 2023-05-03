import React, { useState } from "react";

const LimitText = (props) => {
  const { limit, text, className, more } = props;

  const [showAll, setShowAll] = useState(false);
  let textArr = [];

  if (text) {
    textArr = text.split("");
  }
  let newTextArr = [];

  textArr.map((elmnt) => {
    if (newTextArr.length <= limit) {
      newTextArr = [...newTextArr, elmnt];
    }
  });

  return (
    <>
      <p className={className || "p"}>
        {!showAll ? (
          <>
            {newTextArr.join("")}
            {newTextArr.length === textArr.length ? null : "..."}
          </>
        ) : (
          <>{text}</>
        )}
      </p>
      {more && newTextArr.length !== textArr.length ? (
        <span
          className="limit-text-show-less"
          onClick={() => setShowAll(!showAll)}
        >
          {!showAll ? "more" : "show less"}
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default LimitText;
