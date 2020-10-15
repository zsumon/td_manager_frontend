import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const post = (url, data) => axios.post(url, data, {headers: {"Authorization": "Bearer " + localStorage.jwt},});
const get = url => axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.jwt}});

export async function register(userDetails) {
  return axios.post(BASE_URL + "/register", userDetails);
}

export async function login(credential) {
  return axios.post(BASE_URL + "/authenticate", credential);
}

export async function getCurrentUserTodos() {
  return get(BASE_URL + "/todos");
}

export async function addTodo(todoItem) {
  return post(BASE_URL + "/todos", todoItem);
}

export async function updateTodoItem(todoItem) {
  return axios.patch(BASE_URL + "/todos", todoItem, {headers: {"Authorization": "Bearer " + localStorage.jwt}});
}

export async function deleteTodoItem(id) {
  return axios.delete(BASE_URL + "/todos/" + id, {headers: {"Authorization": "Bearer " + localStorage.jwt}});
}

export function isLoggedIn() {
  return localStorage.jwt !== "" && localStorage.jwt !== null && localStorage.jwt && localStorage.jwt.length;
}

export function getPublicTodos() {
  return get(BASE_URL + "/public-todos");
}

export function loadProfileByUserName(userName) {
  return get(BASE_URL + "/user?user_name=" + userName);
}

export function loadCurrentUserProfile() {
  return get(BASE_URL + "/user");
}
