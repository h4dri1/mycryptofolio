import parseJwt from 'src/services/parseJwt';

const isTokenExpired = (token) => {
  // extract expiration date from the paylod of jwt, if token is missing exp = 0
  const { exp } = !token ? { exp: 0 } : parseJwt(token);
  // Check if it's expired  // * with an advance of 2 sec in case of high latence
  console.log(`Still ${((exp * 1000) - Date.now()) * 0.001} s before next refresh`);
  return (exp * 1000) < (Date.now() + 5000);
};

export default isTokenExpired;
