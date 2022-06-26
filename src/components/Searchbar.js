import React from "react";

export default function Searchbar() {
  return (
    <>
      <input
        id="serch-bar"
        placeholder="Enter organization name. Example: Microsoft"
      ></input>
      <span class="material-symbols-rounded">search</span>
    </>
  );
}
