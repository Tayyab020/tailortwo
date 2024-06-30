 import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.195.160:3000",
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
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return response;
  } catch (error) {
    handleError(error);
  }
};
export const resetPassword = async (email, code, password) => {
  try {
    const response = await api.post('/reset-password', { email, code, password });
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

export const getCustomerAppointments = async (customerId) => {
  try {
    const response = await api.get(`/customer-appointments/${customerId}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await api.delete(`/appointments/${id}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserDetails = async (userId, data) => {
  try {
    const response = await api.put(`/users/${userId}`, data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
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
