import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.180.160:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility function to handle errors
const handleError = (error) => {
  const errorMessage = error.response && error.response.data && error.response.data.message 
    ? error.response.data.message 
    : error.message;

  throw new Error(errorMessage);
};

export const login = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const signup = async (data) => {
  try {
    const response = await api.post("/register", data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const signout = async () => {
  try {
    const response = await api.post("/logout");
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getAllBlogs = async () => {
  try {
    const response = await api.get("/blog/all");
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const submitBlog = async (data) => {
  try {
    const response = await api.post("/blog", data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blog/${id}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getCommentsById = async (id) => {
  try {
    const response = await api.get(`/comment/${id}`, {
      validateStatus: false,
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const postComment = async (data) => {
  try {
    const response = await api.post("/comment", data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blog/${id}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const updateBlog = async (data) => {
  try {
    const response = await api.put("/blog", data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const updateProfileImage = async (id, profileImage) => {
  try {
      console.log('API ma a gyaa', id, profileImage);
      const response = await api.post(`/updateProfileImage/${id}`, { profileImage }); // Ensure profileImage is sent as an object
      return response;
  } catch (error) {
      console.error('Error in API call:', error); // Add this for debugging
      handleError(error);
  }
};

export const getProfileImage = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/profile-image`);
    return response; 
  } catch (error) {
    handleError(error);
    return { status: error.response?.status || 500, data: { profileImage: null } };
  }
};

export const createAppointment = async (data) => {
  try {
    const response = await api.post("/appointments", data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getAppointment = async (tailorId) => {
  try {
    const response = await api.get(`/appointment/${tailorId}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getAllChats = async () => {
  return await api.get('/chats');
};

export const getChatById = async (chatId) => {
  return await api.get(`/chats/${chatId}`);
};

export const sendMessage = async (chatId, message) => {
  return await api.post(`/chats/${chatId}/messages`, { message });
};
export const getChats = async () => {
  try {
    const response = await api.get("/chats");
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Axios interceptor for auto token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;
    const errorMessage = error.response && error.response.data && error.response.data.message;

    if (
      errorMessage === 'Unauthorized' &&
      (error.response.status === 401 || error.response.status === 500) &&
      originalReq &&
      !originalReq._isRetry
    ) {
      originalReq._isRetry = true;

      try {
        await api.get("/refresh", { withCredentials: true });
        return api.request(originalReq);
      } catch (error) {
        handleError(error);
      }
    }
    handleError(error);
  }
);
