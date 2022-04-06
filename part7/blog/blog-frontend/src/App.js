import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, setType } from "./reducers/messageReducer";
import { setBlogs } from "./reducers/blogsReducer";
import { setUser, setUsername, setPassword } from "./reducers/usersReducer";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Message from "./components/Message";
import UserView from "./components/UserView";

const App = () => {
  const user = useSelector((state) => state.user.user);
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setUsername(""));
      dispatch(setPassword(""));
    } catch (exception) {
      dispatch(setType("error"));
      dispatch(setMessage("Wrong credentials"));
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
  };

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
    } else return null;
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <UserView blogs={blogs} />
      <Message />
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
        ? [...blogs]
            .sort((a, b) => {
              return a.likes - b.likes;
            })
            .map((blog) => (
              <Blog key={blog.id} blog={blog} username={user.username} />
            ))
        : null}
      {!user ? (
        <LoginForm
          user={user}
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      ) : null}
      {user ? <BlogForm /> : null}
    </div>
  );
};

export default App;
