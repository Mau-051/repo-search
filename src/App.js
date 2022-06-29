import { useEffect, useState } from "react";
import "./styles/App.css";
import RepoList from "./components/RepoList";
import Error from "./components/ErrorState";
import LoadingState from "./components/LoadingState";
import Searchbar from "./components/Searchbar";
import Pagination from "./components/Pagination";

// Util/mapRepos

function mapRepos(rawRepo) {
  const { id, name, html_url, description, stargazers_count } = rawRepo;
  return {
    id,
    name,
    url: html_url,
    description,
    stargazers: stargazers_count,
  };
}

// Utils/errorManager
function errorManager(error) {
  return {
    message: error.message,
    code: error?.HTTP_CODE,
  };
}

// [error, response]
function fetchWrapper(fetchPromise, mapperCb, errorMapper = errorManager) {
  return fetchPromise
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => [null, mapperCb(data)]);
      }

      return response
        .json()
        .then((jsonError) => [
          errorManager({ ...jsonError, HTTP_CODE: response.status }),
          null,
        ]);
    })
    .catch((err) => [errorMapper(err), null]);
}

// Services/Repos
function getOrgRepos(org) {
  return fetchWrapper(
    fetch(`https://api.github.com/orgs/${org}/repos`),
    (data) => data.map(mapRepos)
  );
}

//search

const networkStatus = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  OK: "OK",
  ERROR: "ERROR",
};

function App() {
  const [request, setRequest] = useState({
    status: networkStatus.LOADING,
    data: [],
    error: null,
  });
  const [organization, setOrganization] = useState("microsoft");

  // pagination
  const [orgRepos, setOrgRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(10);

  const isLoading = request.status === networkStatus.LOADING;
  const hasError = request.status === networkStatus.ERROR;
  const networkError = request.error;

  useEffect(() => {
    async function fetchRepos() {
      const [error, repos] = await getOrgRepos(organization);
      if (error) {
        setRequest({
          data: [],
          status: networkStatus.ERROR,
          error,
        });
        return;
      }
      setRequest({ data: repos, status: networkStatus.OK, error: null });
      setOrgRepos(repos);
    }
    fetchRepos();
  }, [organization]);

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirsRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = orgRepos.slice(indexOfFirsRepo, indexOfLastRepo);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading ? <LoadingState /> : null}

      {hasError ? (
        <Error Code={networkError.code} Message={networkError.message} />
      ) : null}
      <>
        <div className="title">
          <h1 id="org">MICROSOFT</h1>
          <h1 id="RH">REPO HUB</h1>
        </div>
        <div id="search-container">
          <Searchbar getOrgRepos={setOrganization} />
        </div>

        <div id="list-container">
          {currentRepos.map((repo) => (
            <RepoList
              key={repo.id}
              name={repo.name}
              url={repo.url}
              description={repo.description}
              stargazers={repo.stargazers}
            />
          ))}
        </div>
        <Pagination
          reposPerPage={reposPerPage}
          totalRepos={orgRepos.length}
          paginate={paginate}
        />
      </>
    </>
  );
}

export default App;
