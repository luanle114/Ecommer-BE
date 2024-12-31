const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = async(payload) => {
  const access_token = jwt.sign({
    ...payload,
  }, process.env.ACCESS_TOKEN, { expiresIn: '30s'});
  return access_token;
};

const generalRefreshToken = async(payload) => {
  const refresh_token = jwt.sign({
    ...payload,

  }, process.env.REFRESH_TOKEN, { expiresIn: '365d'});
  return refresh_token;
};

const refreshTokenService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if(err){
          reject({
            status: 'Error',
            message: 'The refresh token is invalid',
          });
        }
        const access_token = await generalAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
        resolve({
          status: 'Success',
          message: 'The token is refreshed successfully',
          access_token,
        });
      });
    }
    catch(err){
      reject(err);
    }
  });
};



module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenService,
}