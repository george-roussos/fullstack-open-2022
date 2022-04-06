import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import Blog from "./Blog";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "george",
    url: "dummy",
    likes: 5,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog-info");
  expect(div).toHaveTextContent(
    /Component testing is done with react-testing-library/
  );
});

test("shows url and likes when button is clicked", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "george",
    url: "dummy",
    likes: 5,
    user: { username: "george" },
  };

  const { container } = render(<Blog blog={blog} />);
  const button = screen.getByText("show details");
  userEvent.click(button);
  expect(container).toHaveTextContent(/like/);
});
