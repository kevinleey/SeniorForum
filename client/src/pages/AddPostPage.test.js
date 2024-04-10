import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import AddPostForm from "./AddPostPage";
import { Provider } from "react-redux";
import store from "../app/store";
import { MemoryRouter } from "react-router-dom";
import { addPost } from "../features/posts/postsThunks";
import "@testing-library/jest-dom";

jest.mock("../features/posts/postsThunks", () => ({
  addPost: jest.fn(),
  fetchPosts: {
    pending: "fetchPosts/pending",
    fulfilled: "fetchPosts/fulfilled",
    rejected: "fetchPosts/rejected",
  },
  editPost: { fulfilled: "editPost/fulfilled" },
  deletePost: { fulfilled: "deletePost/fulfilled" },
}));

describe("AddPostForm Component", () => {
  it("should render properly", () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AddPostForm />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText("Add a new post")).toBeInTheDocument();
    expect(getByPlaceholderText("Input your post title")).toBeInTheDocument();
    expect(getByPlaceholderText("Input your post text")).toBeInTheDocument();
  });

  it("should call addPost thunk with correct data when button is clicked", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AddPostForm />
        </MemoryRouter>
      </Provider>,
    );

    const titleInput = getByPlaceholderText("Input your post title");
    const textInput = getByPlaceholderText("Input your post text");

    fireEvent.change(titleInput, { target: { value: "Test title" } });
    fireEvent.change(textInput, { target: { value: "Test text" } });

    expect(titleInput.value).toBe("Test title");
    expect(textInput.value).toBe("Test text");

    fireEvent.click(getByText("Add Post"));

    await waitFor(() => {
      expect(addPost).toHaveBeenCalledWith({
        title: "Test title",
        text: "Test text",
        categories: [],
      });
    });
  });
});
