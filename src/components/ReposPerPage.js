import React from "react";

export default function ReposPerPage({ reposPerPage, setReposPerPage }) {
  return (
    <div id="repos-per-page">
      <label>Show</label>
      <select
        value={reposPerPage}
        onChange={(e) => {
          const selectedRepos = e.target.value;
          setReposPerPage(selectedRepos);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="30">30</option>
      </select>
      <label>per page</label>
    </div>
  );
}
