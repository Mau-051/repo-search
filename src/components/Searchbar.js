import React from "react";

export default function Searchbar({ getOrgRepos }) {
  const titleOrg = document.getElementById("org");
  const tabTitle = document.getElementById("tab-title");

  function orgsearch(event) {
    event.preventDefault();
    const eValue = event.target[0].value;
    getOrgRepos(eValue);
    titleOrg.innerHTML = eValue;
    tabTitle.innerHTML = `${eValue.toUpperCase()} REPO HUB`;
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
