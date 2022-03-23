import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Message from "./components/Message";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setType("error");
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
        setType(null);
      }, 2000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } else return null;
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} type={type} />
      {user ? (
        <div>
          <p>
            <b>{user.username}</b> logged in
            <button onClick={handleLogOut} style={{ marginLeft: 10 }}>
              log out
            </button>
          </p>
        </div>
      ) : null}
      {user
        ? blogs
            .sort((a, b) => {
              return a.likes - b.likes;
            })
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                setBlogs={setBlogs}
                username={user.username}
              />
            ))
        : null}
      {!user ? (
        <LoginForm
          user={user}
          setUser={setUser}
          username={username}
          setUsername={setUsername}
          handleLogin={handleLogin}
          password={password}
          setPassword={setPassword}
        />
      ) : null}
      {user ? (
        <BlogForm
          message={message}
          setMessage={setMessage}
          type={type}
          setType={setType}
          setBlogs={setBlogs}
        />
      ) : null}
    </div>
  );
};

export default App;
