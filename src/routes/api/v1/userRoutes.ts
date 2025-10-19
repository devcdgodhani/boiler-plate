import { Router } from 'express';
import UserController from '../../../controllers/UserController';
import UserValidator from '../../../validations/userValidators';

const router = Router();
const userController = new UserController();
const userValidator = new UserValidator();

/***********Fetch users api ************/
router.get('/getOne', userValidator.getOne, userController.getOne);

router.get('/getAll', userController.getAll);

router.get('/getById', userController.getById);

router.get('/getWithPagination', userController.getWithPagination);

router.post('/getOne', userController.getOne);

router.post('/getAll', userController.getAll);

router.post('/getById', userController.getById);

router.post('/getWithPagination', userController.getWithPagination);

/***********Update users api ************/

router.put('/bulkUpdate', userController.updateManyByFilter);

router.put('/updateOneByFilter', userController.updateOneByFilter);

router.put('/updateManyByFilter', userController.updateManyByFilter);

/***********Create users api ************/

router.post('/bulkCreate', userController.create);

router.post('/', userController.create);

/***********Delete users api ************/

router.delete('/deleteByFilter', userController.deleteByFilter);

export default router;
