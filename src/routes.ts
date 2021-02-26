import { Router } from 'express';
import { UserController } from "./controllers/userContoller";
import { SurveysController } from "./controllers/SurveysController"
import { SendMailController } from './controllers/sendMailController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';

const router = Router()

const userController = new UserController()

const surveysController = new SurveysController()

const sendMailCOntroller = new SendMailController

const answerController = new AnswerController()

const npsController = new NpsController()

router.post('/users', userController.create)

router.post('/surveys', surveysController.create)
router.get('/surveys', surveysController.show)

router.post('/sendMail', sendMailCOntroller.execute)

router.get('/answers/:value', answerController.excute)

router.get('/nps/:survey_id', npsController.execute)

export { router }
