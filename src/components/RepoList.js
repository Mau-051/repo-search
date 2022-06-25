import React from "react";
import RepoCard from "./RepoCard";

export default function RepoList(props) {
  return (
    <RepoCard>
      <p key={props.key}>{props.Name}</p>
    </RepoCard>
  );
}
