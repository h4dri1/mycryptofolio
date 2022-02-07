import axios from 'axios';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const getNewAccessToken = async (token) => {
  try {
    const response = await axios(`${baseURL}/jwt/refresh/${token}`);
    if (response.status === 200) {
      return response.headers.authorization;
    }
  }
  catch (error) {
    return error;
  }
};
export default getNewAccessToken;
