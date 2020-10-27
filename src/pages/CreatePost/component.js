import React, { useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { submitPost, loadAPost, updatePost } from "./action";

export default function Component(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/");
  const pathLength = path.length - 1;
  const id = path[pathLength];
  const editPath = path[2];

  const isLoading = useSelector((state) => state.loading.isLoading);
  const submitIsLoading = useSelector((state) => state.loading.submitIsLoading);
  const data = useSelector((state) => state.createPost.data);

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { title: "", body: "" }
  );

  useEffect(() => {
    if (editPath === "edit") {
      dispatch(loadAPost(id));
      setInputValues({ title: data.title, body: data.body });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data]);

  const _handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ [name]: value });
  };

  const _handleOnSubmit = (e) => {
    const { title, body } = inputValues;

    e.preventDefault();
    if (editPath === "edit") {
      dispatch(updatePost(id, body));
    } else {
      dispatch(submitPost(title, body));
    }

    setInputValues({ title: "", body: "" });
    props.history.push("/posts");
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="page-title">
        <h4>{editPath === "edit" ? "Edit A Post" : "Add New Post"}</h4>
      </div>

      <form className="form" onSubmit={_handleOnSubmit}>
        <div className="form__group">
          <input
            id="title"
            name="title"
            type="text"
            className="form__control"
            placeholder="Title"
            onChange={_handleOnChange}
            value={inputValues.title}
            disabled={editPath === "edit" ? true : false}
          />
        </div>
        <div className="form__group">
          <textarea
            id="body"
            name="body"
            type="text"
            className="form__text-editor"
            onChange={_handleOnChange}
            value={inputValues.body}
          ></textarea>
        </div>
        <div className="form__submit">
          <button
            type="submit"
            className="form__submit__btn"
            disabled={submitIsLoading}
          >
            {submitIsLoading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </>
  );
}
