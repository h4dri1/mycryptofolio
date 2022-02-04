import axios from 'axios';
import isTokenExpired from './isTokenExpired';
import getNewAccessToken from './getNewAccessToken';

const refreshToken = localStorage.getItem('refreshToken');

const privateRoute = axios.create({
  baseURL: 'https://dev.mycryptofolio.fr/v1',
  headers: '',
});

privateRoute.interceptors.request.use(async (req) => {
  const accessToken = req.headers.Authorization;

  if (isTokenExpired(accessToken) && refreshToken) {
    const newAccessToken = await getNewAccessToken(refreshToken);
    req.headers.Authorization = newAccessToken;
    return req;
  }
  return req;
});

export default privateRoute;
