import axios from 'axios';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const getNewAccessToken = async (token) => {
  try {
    const response = await axios(`${baseURL}/jwt/refresh/${token}`);
    if (response.status === 201) {
      const data = {
        newAccessToken: response.headers.authorization,
        userData: response.data
      }
      return data;
    }
  }
  catch (error) {
    if (error.response.status === 403) {
      localStorage.removeItem('refreshToken');
    }
    return error;
  }
};
export default getNewAccessToken;
