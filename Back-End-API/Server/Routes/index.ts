import express from 'express';
const router = express.Router();

const bookController = require('../controllers/book')

import { UserDisplayName } from '../utils';


function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Home', page: 'home',displayName: UserDisplayName(req) });
}


router.get('/cart', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Adjust the path to match your directory structure
    console.log("Cart Page Prints")
    res.render('index',{title: 'Cart', page:'cart', displayName: UserDisplayName(req)})
    // res.sendFile(path.join(__dirname, '../my-react-app/public/index.html'));
});




/* GET home page. */
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/index', DisplayHomePage);

module.exports = router

export default router;

