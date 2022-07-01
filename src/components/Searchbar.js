import React from "react";

export default function Searchbar({ setOrgRepos }) {
  function orgsearch(event) {
    event.preventDefault();
    const eValue = event.target[0].value;
    setOrgRepos(eValue);
  }

  return (
    <form onSubmit={orgsearch}>
      <input
        id="serch-bar"
        type="text"
        placeholder="Enter organization name. Example: Microsoft"
        autoComplete="off"
      />
      <button type="submit">
        <span className="material-symbols-rounded">search</span>
      </button>
    </form>
  );
}
