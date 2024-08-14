import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Hi products');
})

export default router;
