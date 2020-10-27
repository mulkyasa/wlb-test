import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadPosts } from "./action";
import Pagination from "../../components/Pagination";

export default function Component() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.dataPosts.data);
  const totalData = useSelector((state) => state.dataPosts.totalData);
  const isLoading = useSelector((state) => state.loading.isLoading);

  const [pagination, setPagination] = useState({ current: 1 });

  useEffect(() => {
    dispatch(loadPosts(pagination.current));
  }, [dispatch, pagination]);

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

  const articleItem = data.map((item) => {
    return (
      <article key={item.id}>
        <div className="post">
          <div className="post__date">
            <span className="post__date-day">28</span>
            <span className="post__date-month">Okt</span> -{" "}
            <span className="post__date-year">2020</span>
          </div>

          <div className="post__wrapper">
            <h2 className="post__title">
              <Link to={`/post-detail/${item.id}`} className="post__title-text">
                {item.title}
              </Link>
            </h2>

            <div className="post__info">
              <span>By Yasa Mulky Al Afgani</span>
            </div>

            <div className="post__article">
              <p>{item.body}</p>
              <button className="post__button">Read More</button>
            </div>
          </div>
        </div>
      </article>
    );
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
        <h4>Latest Posts</h4>
      </div>
      {articleItem}
      <Pagination
        onClick={_handleOnPagination}
        pageNumbers={pageNumbers}
        state={pagination}
      />
    </>
  );
}
