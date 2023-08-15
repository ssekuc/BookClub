import express = require("express");
const router = express.Router();

function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Home', page: 'home' });
}

router.get('/cartpage', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Adjust the path to match your directory structure
    console.log("Cart Page Prints")
    res.render('index',{title: 'Cart', page:'cartpage'})
    // res.sendFile(path.join(__dirname, '../my-react-app/public/index.html'));
});

/* GET home page. */
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/index', DisplayHomePage);

export default router;
