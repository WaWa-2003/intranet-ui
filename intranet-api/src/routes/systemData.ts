import SystemCardData from "../models/SystemCardData";
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', async(_req:Request, res:Response) => {
    const data = await SystemCardData.findAll();
    res.json(data); 
})

router.post('/', async(req:Request, res: Response) => {
    const newData = await SystemCardData.create(req.body);
    res.status(201).json(newData); 
})

router.put('/:id', async(req:Request, res:Response) =>{
    const { id } = req.params; 
    await SystemCardData.update(req.body, { where: { id: Number(id) }});
    res.json({ success: true }); 
})

router.delete('/:id', async (req: Request, res:  Response) => {
    const { id } = req.params; 
    await SystemCardData.destroy({ where: { id: Number(id) }});
    res.json({ success: true }); 
})

export default router; 