import axios from 'axios';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const getNewAccessToken = async (token) => {
  try {
    const response = await axios(`${baseURL}/jwt/refresh/${token}`);
    if (response.status === 201) {
      const data = { rToken: response.headers.authorization, user: response.data }
      return data
    }
  }
  catch (error) {
    return error;
  }
};
export default getNewAccessToken;
