import { Router } from 'express';
import AuthController from '../../../controllers/authController';
import { jwtAuth } from '../../../middlewares';
import { TOKEN_TYPE } from '../../../constants';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/refreshTokens', authController.refreshTokens);

router.post('/logout', jwtAuth(), authController.logout);

router.post('/changePassword', jwtAuth(), authController.changePassword);

router.post('/sendOtp', authController.sendOtp);

router.post('/verifyOtp', jwtAuth(TOKEN_TYPE.OTP_TOKEN), authController.verifyOtp);

router.get('/verifyOtp', jwtAuth(TOKEN_TYPE.OTP_TOKEN), authController.verifyOtp);

router.post(
  '/forgetPassword',
  jwtAuth(TOKEN_TYPE.FORGET_PASSWORD_TOKEN),
  authController.forgetPassword
);

export default router;
