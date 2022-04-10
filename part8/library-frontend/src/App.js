import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  if (!token) {
    return (
      <>
        <LoginForm
          setToken={setToken}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </>
    );
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} token={token} setToken={setToken} />

      <Books show={page === "books"} />

      <NewBook
        show={page === "add"}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
