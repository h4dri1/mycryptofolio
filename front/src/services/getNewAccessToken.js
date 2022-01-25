import axios from 'axios';

const getNewAccessToken = async (token) => {
  try {
    const response = await axios(`https://dev.mycryptofolio.fr/v1/jwt/refresh/${token}`);
    console.log(response.status, response.data, response.headers.authorization);
    if (response.status === 200) {
      return response.headers.authorization;
    }
  }
  catch (error) {
    return error;
  }
};
export default getNewAccessToken;
