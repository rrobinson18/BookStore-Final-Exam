import * as express from 'express';

import db from '../../db';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let categories = await db.categories.getCatorgories();
        res.json(categories);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;