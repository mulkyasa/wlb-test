import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deletePostList, deletePostListSuccess, loadPostsList } from "./action";
import { submitPostSuccess, updatePostSuccess } from "../CreatePost/action";
import Modal from "../../components/Modal";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";

export default function Component() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.listOfPosts.data);
  const totalData = useSelector((state) => state.listOfPosts.totalData);
  const isDeleted = useSelector((state) => state.listOfPosts.isDeleted);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const deleteIsLoading = useSelector((state) => state.loading.deleteIsLoading);
  const isPostSubmitted = useSelector(
    (state) => state.createPost.isPostSubmitted
  );
  const isPostUpdated = useSelector((state) => state.createPost.isPostUpdated);

  const [modal, setModal] = useState({ isActive: false, id: "" });
  const [pagination, setPagination] = useState({ current: 1 });

  useEffect(() => {
    dispatch(loadPostsList(pagination.current));
  }, [dispatch, pagination]);

  useEffect(() => {
    if (isPostSubmitted || isPostUpdated) {
      setModal({ isActive: true });
    }
  }, [isPostSubmitted, isPostUpdated]);

  const toggle = (id) => {
    setModal({ isActive: !modal.isActive, id });
    dispatch(deletePostListSuccess(false));
    dispatch(submitPostSuccess(false));
    dispatch(updatePostSuccess(false));
  };

  const _handleOnDelete = () => {
    dispatch(deletePostList(modal.id));
  };

  const _handleOnPagination = (e) => {
    const { innerText } = e.target;
    if (innerText === "Prev") {
      setPagination({ current: pagination.current - 1 });
    } else if (innerText === "Next") {
      setPagination({ current: pagination.current + 1 });
    } else {
      setPagination({ current: Number(innerText) });
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / 5); i++) {
    pageNumbers.push(i);
  }

  const columns = [
    {
      dataField: "id",
      text: "No.",
      isKey: true,
    },
    {
      dataField: "title",
      text: "Title",
    },
    {
      dataField: "action",
      text: "Action",
    },
  ];

  const newData = data.map((item) => {
    const action = (
      <div className="actions">
        <Link to={`/post-detail/${item.id}`}>
          <button className="actions__btn">
            <i className="far fa-eye"></i>
          </button>
        </Link>
        <Link to={`/create-post/edit/${item.id}`}>
          <button className="actions__btn">
            <i className="far fa-edit"></i>
          </button>
        </Link>
        <button className="actions__btn" onClick={() => toggle(item.id)}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    );

    return { ...item, action };
  });

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
        <h4>List of Posts</h4>
      </div>

      <Modal isOpen={modal.isActive}>
        {isDeleted || isPostSubmitted || isPostUpdated ? (
          <>
            <i className="far fa-check-circle modal__icon-success"></i>
            <p>
              {isDeleted
                ? "Deleted!"
                : isPostSubmitted
                ? "New Post Created!"
                : isPostUpdated
                ? "Post Updated!"
                : null}
            </p>
            <button className="modal__button" onClick={toggle}>
              Ok
            </button>
          </>
        ) : (
          <>
            <i className="far fa-times-circle modal__icon"></i>
            <p>Are you sure?</p>
            <button
              className="modal__button"
              onClick={_handleOnDelete}
              disabled={deleteIsLoading}
            >
              {deleteIsLoading ? "Deleting..." : "Delete"}
            </button>
            <button className="modal__button" onClick={toggle}>
              Cancel
            </button>
          </>
        )}
      </Modal>

      <DataTable columns={columns} data={newData} />
      <Pagination
        onClick={_handleOnPagination}
        pageNumbers={pageNumbers}
        state={pagination}
      />
    </>
  );
}
