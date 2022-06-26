import React from "react";
import RepoCard from "./RepoCard";

export default function RepoList(props) {
  console.log(props);

  return (
    <RepoCard key={props.id}>
      <a href={props.url} target="_blank" id="repo-name">
        {props.name}
        <span class="material-symbols-outlined">open_in_new</span>
      </a>
      <div id="bottom-data">
        <p id="repo-description">{props.description}</p>
        <h2 id="repo-stargazers">
          {props.stargazers}
          <span class="material-symbols-outlined">hotel_class</span>
        </h2>
      </div>
    </RepoCard>
  );
}
