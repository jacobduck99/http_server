import { Request, Response } from "express";
import { createUser, deleteAllUsers, getUserEmail } from '../db/queries/users.js';
import { config } from '../config.js';
import { Forbidden, Unauthorized } from '../api/errors.js';
import { hashPassword, checkPasswordHash, makeJWT, extractBearerToken } from '../auth/auth.js';

export async function handlerCreateUser(req: Request, res: Response){
    const params = req.body;
    const hashedPw = await hashPassword(params.password);


    const newUser = await createUser({
        email: params.email,
        hashedPassword: hashedPw,
    });
    const { hashedPassword, ...user } = newUser;
    res.status(201).json(user);
}

export async function handlerDeleteAllUsers(req: Request, res: Response){
    if (config.api.platform !== "dev"){
        throw new Forbidden("Forbidden", 403);
    }
    const deleteUsers = await deleteAllUsers();
    res.status(200).json({ Deleted: "users deleted"})
}


export async function handlerLoginUser(req: Request, res: Response){
    const params = req.body;
    //might need to change 
    const { email, password, id } = params;
    const userEmail = await getUserEmail(email);
    if (userEmail === undefined){
        throw new Unauthorized("incorrect email or password", 401);
    }
    const { hashedPassword, ...user } = userEmail;
    const verifyPw = await checkPasswordHash(password, hashedPassword);
    if (verifyPw === false){
        throw new Unauthorized("incorrect email or password", 401);
    }
    
    //might need to change 
    // const header = req.get('Authorization') as any;
    // const getBearerToken = extractBearerToken(header);
    //might need to change 
    // console.log("get bearer", getBearerToken);
    const secret = 'secret';
    const jwtToken = makeJWT(id, 60 * 60, secret);
    console.log("jwt token", jwtToken);
    res.status(200).json(user);
}
