import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const Notification = () => {
  const message = useSelector((state) => state.message);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (message) {
    return <div style={style}>{message}</div>;
  } else return null;
};

export default Notification;
