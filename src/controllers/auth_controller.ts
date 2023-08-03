import {Request,Response} from "express";

 const login = (req:Request,res:Response) => {
    console.log(req.headers.authorization);
    res.status(200).json({"test":"tes"});
};

export default { login };
