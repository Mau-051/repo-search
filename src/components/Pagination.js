import React, { useEffect, useState } from "react";

function calculatePages(totalRepos, reposPerPage) {
  const pageNumber = Math.ceil(totalRepos / reposPerPage);
  return Array(pageNumber).fill(null);
}

export default function Pagination({ reposPerPage, totalRepos, paginate }) {
  const [pages, setPages] = useState(() =>
    calculatePages(totalRepos, reposPerPage)
  );

  useEffect(() => {
    setPages(calculatePages(totalRepos, reposPerPage));
  }, [totalRepos, reposPerPage]);

  return (
    <nav>
      <ul id="pagination">
        {pages.map((_, index) => {
          const number = index + 1;
          return (
            <li key={number}>
              <a onClick={() => paginate(number)} href="!#">
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
