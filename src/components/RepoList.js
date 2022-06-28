import React from "react";
import RepoCard from "./RepoCard";

export default function RepoList(props) {
  return (
    <RepoCard key={props.id}>
      <a href={props.url} target="_blank" rel="noreferrer" id="repo-name">
        {props.name}
        <span className="material-symbols-outlined">open_in_new</span>
      </a>
      <div id="bottom-data">
        <p id="repo-description">{props.description}</p>
        <h2 id="repo-stargazers">
          {props.stargazers}
          <span className="material-symbols-outlined">hotel_class</span>
        </h2>
      </div>
    </RepoCard>
  );
}
