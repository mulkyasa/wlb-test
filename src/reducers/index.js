import { combineReducers } from "redux";
import loading from "./loading";
import dataPosts from "../pages/Home/reducer";
import listOfPosts from "../pages/Posts/reducer";
import postDetail from "../pages/PostDetail/reducer";
import createPost from "../pages/CreatePost/reducer";

export default combineReducers({
  loading,
  dataPosts,
  postDetail,
  listOfPosts,
  createPost,
});
