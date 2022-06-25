import { useEffect, useState } from "react";
import "./styles/App.css";
import RepoList from "./components/RepoList";
import Error from "./components/ErrorState";
import LoadingState from "./components/LoadingState";

// Util/mapRepos
function mapRepos(rawRepo) {
  const { id, name, full_name } = rawRepo;
  return {
    id,
    name,
    fullName: full_name,
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
function getMicrosoftRepos(org = "microsoft") {
  return fetchWrapper(
    fetch(`https://api.---github.com/orgs/${org}/repos`),
    (data) => data.map(mapRepos)
  );
}

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

  const isLoading = request.status === networkStatus.LOADING;
  const hasError = request.status === networkStatus.ERROR;
  const networkError = request.error;

  useEffect(() => {
    async function fetchRepos() {
      const [error, repos] = await getMicrosoftRepos();
      if (error) {
        setRequest({
          data: [],
          status: networkStatus.ERROR,
          error,
        });
        return;
      }
      setRequest({ data: repos, status: networkStatus.OK, error: null });
    }

    fetchRepos();
  }, []);

  return (
    <>
      {isLoading ? <LoadingState /> : null}

      {hasError ? (
        <Error Code={networkError.code} Message={networkError.message} />
      ) : null}
      <>
        <div className="title">
          <h1>MICROSOFT</h1>
          <h1 id="RH">REPO HUB</h1>
        </div>
        <div></div>
        <div id="list-container">
          {request.data.map((repo) => (
            <RepoList key={repo.id} Name={repo.name} />
          ))}
        </div>
      </>
    </>
    /*
    <div className="App">
      {isLoading ? <p>Loading...</p> : null}
      {hasError ? (
        <div>
          <h2>{networkError.code}</h2>
          <p>{networkError.message}</p>
        </div>
      ) : null}
      {request.data.map((repo) => (
        <p key={repo.id}>{repo.name}</p>
      ))}
    </div>
    */
  );
}

export default App;
