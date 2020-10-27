import { Home, Posts, CreatePost, PostDetail } from "./pages";

const routes = [
  {path: "/", exact: true, name: "Home", component: Home },
  {path: "/post-detail", component: PostDetail },
  {path: "/posts", name: "Posts", component: Posts },
  {path: "/create-post", name: "New Post", component: CreatePost },
];

export default routes;
