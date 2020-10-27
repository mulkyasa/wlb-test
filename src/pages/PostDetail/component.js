import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { loadPostDetail } from "./action";

export default function Component() {
  const dispatch = useDispatch();
  const location = useLocation();

  const pathId = location.pathname.split("/");
  const pathIdLength = pathId.length - 1;
  const id = pathId[pathIdLength];

  const data = useSelector((state) => state.postDetail.data);
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(loadPostDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
        <h4>{data.title}</h4>
      </div>
      <p>{data.body}</p>
    </>
  );
}
