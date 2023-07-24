import express from 'express';
const router = express.Router();





function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Home', page: 'home' });
}



/* GET home page. */
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/index', DisplayHomePage);


module.exports = router

export default router;

