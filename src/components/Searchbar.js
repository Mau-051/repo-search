import React from "react";

export default function Searchbar(props) {
  const titleOrg = document.getElementById("org");

  function orgsearch(event) {
    event.preventDefault();
    props.getOrgRepos(event.target[0].value);
    titleOrg.innerHTML = event.target[0].value;
  }

  return (
    <form onSubmit={orgsearch}>
      <input
        id="serch-bar"
        type="text"
        placeholder="Enter organization name. Example: Microsoft"
        autocomplete="off"
      />
      <button type="submit">
        <span class="material-symbols-rounded">search</span>
      </button>
    </form>
  );
}
