import axios from "axios";

export const GET_POSTS = "get_posts";
export const GET_POST = "get_post";
export const DELETE_POST = "delete_post";
export const CREATE_POST = "create_post";
export const CREATE_COMMENT = "create_comment";

const ROOT_URL = "https://simple-blog-api.crew.red";

export function getPosts() {
  const request = axios.get(`${ROOT_URL}/posts`);
  return {
    type: GET_POSTS,
    payload: request
  };
}
export function getPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}?_embed=comments`);
  return {
    type: GET_POST,
    payload: request
  };
}
export function getComments() {
  const request = axios.get(`${ROOT_URL}/comments`);
  return {
    type: GET_POSTS,
    payload: request
  };
}
export function deletePost(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/posts/${id}`)
    .then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  };
}
export function createPost(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/posts`, values)
    .then(() => callback());
  return {
    type: CREATE_POST,
    payload: request
  };
}
export function createComment(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/comments`, values)
    .then(() => callback());
  return {
    type: CREATE_COMMENT,
    payload: request
  };
}
