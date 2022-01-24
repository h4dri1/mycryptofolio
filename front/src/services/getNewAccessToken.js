import axios from 'axios';

export const getNewAccessToken = async (token) => {
    try {
      const response = await axios(`https://dev.mycryptofolio.fr/v1/jwt/refresh/${token}`)
      console.log(response.status, response.data, response.headers.authorization)
      if (response.status === 200){
        console.log('New AccessToken')
        localStorage.setItem('accessToken', response.headers.authorization);
      }
    } catch (error) {
    console.log(error.response)
    dispatch(logout())
    }
  };