import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createTourAPI = (tourData) => API.post("/tour", tourData);
export const getTourAPI = (page) => API.get(`/tour/?page=${page}`);
export const getOneTour = (id) => API.get(`/tour/${id}`);
export const deleteTourAPI = (id) => API.delete(`/tour/${id}`);

export const updateTourAPI = (updatedTourData, id) =>
  API.put(`/tour/${id}`, updatedTourData);

export const getTourByUserAPI = (UserId) =>
  API.get(`/tour/userTours/${UserId}`);

export const getToursBySearchAPI = (searchQuery) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`);

export const getTagToursAPI = (tag) => API.get(`/tour/tag/${tag}`);
export const getRelatedToursAPI = (tags) =>
  API.post(`/tour/relatedTours`, tags);

export const likeTourAPI = (id) => API.patch(`/tour/like/${id}`);
