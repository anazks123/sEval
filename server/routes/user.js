const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes

router.get('/view', userController.view);
router.get('/user', userController.userLogin);
router.get('/myResult/:id',userController.myresult)
router.get('/myattendance/:id',userController.myattendance)
router.post('/userLogin', userController.userLogins);
router.get('/', userController.login);
router.get('/adminlogin', userController.adminlogin);
router.post('/adminLogin', userController.adminLogin);

router.post('/', userController.find);

// router.post('/adminLogin', userController.adminLogin);
router.post('/result', userController.finds);

router.get('/addLog', userController.log);
router.get('/result', userController.views);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);


router.post('/addLog', userController.addLog);

router.get('/addresult', userController.forms);
router.post('/addresult', userController.creates);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);


router.get('/viewuser/:id', userController.viewall);
router.get('/viewresult/:id', userController.viewalls);
router.get('/:id',userController.delete);

// router.get('/viewme/:id',userController.viewme)

router.get('/viewLog/:id', userController.viewLog);

module.exports = router;