import React from "react";

export default function Error(props) {
  var info = "";
  if (props.Code >= 500) {
    info = "🤐 i wont say who's fault it is but it's not mine (it is)";
  } else if (props.Code >= 400) {
    info = "🤐 i wont say who's fault it is but it's not mine (yours)";
  } else {
    info = "🤔🤔🤔";
  }

  return (
    <div id="error-box">
      <h2>{props.Code}</h2>
      <p>{props.Message}</p>
      <p>{info}</p>
    </div>
  );
}
