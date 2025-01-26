import axios from 'axios';
import { toast } from "react-hot-toast";
import { logout,refreshToken } from "Redux/Slices/AuthSlice";
import store from 'Redux/store';

const instance = axios.create();
instance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// // Request Interceptor
// instance.interceptors.request.use((config) => {
//   console.log('before useSelector ');
//   const { token } = useSelector(state=>state.auth);
//   console.log('after useSelector ',token);
//   if (token?.access) {
//     config.headers.Authorization = `Bearer ${token.access}`;
//   }
//   return config;
// });

// Response Interceptor
instance.interceptors.response.use(
  (response) => response, // if api will be successfully called then response will be returned as it is
  async (error) => { // if api failed then this part will be executed 
    const originalRequest = error.config;
    if (error.response?.status === 401) {
       // Check if it's a refresh token failure
       if (originalRequest.url.includes("refresh_access_token/")) {
        // Both tokens are expired
        // Clear localStorage and Redux state
        store.dispatch(logout());

        // Redirect to login page
        // toast.error("Session expired, please log in again.");
        alert('Session expired, please log in again.');
        window.location.href = '/signin'   ;


        return Promise.reject(error);
      }
      originalRequest._retry = true;
      const { refresh } = store.getState().auth.token;
      console.log("refresh ",refresh);

      if (refresh) {
        const result = await store.dispatch(refreshToken(refresh)); // make api call(refresh_access_token to get new access token)
        if (result?.payload?.access) {
          originalRequest.headers.Authorization = `Bearer ${result.payload.access}`;
          return instance(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
