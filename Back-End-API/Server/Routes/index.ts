import express from 'express';
import path from 'path';
const router = express.Router();

function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Home', page: 'home' });
}

// Route to serve the React app's index.html file
router.get('/search', (req, res) => {
    // Adjust the path to match your directory structure
    res.sendFile(path.join(__dirname, '../my-react-app/public/index.html'));
});

/* GET home page. */
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/index', DisplayHomePage);

export default router;
