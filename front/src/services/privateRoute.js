import axios from 'axios';
import isTokenExpired from './isTokenExpired';
import getNewAccessToken from './getNewAccessToken';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const refreshToken = localStorage.getItem('refreshToken');

const privateRoute = axios.create({
  baseURL: baseURL,
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
