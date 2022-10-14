import express from 'express';
let router = express.Router();
import { displayAboutMePage, displayContactMePage, displayHomePage, displayProjectsPage, displayServicesPage } from '../controllers'

/* GET home page. */
router.get('/', displayHomePage);

/* GET home page. */
router.get('/home', displayHomePage);

/* GET About me page. */
router.get('/aboutme', displayAboutMePage);

/* GET Projects page. */
router.get('/projects', displayProjectsPage);

/* GET Services */
router.get('/services', displayServicesPage);

/* GET Contact me page. */
router.get('/contactme', displayContactMePage);


export default router;