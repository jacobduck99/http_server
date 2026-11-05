import { Request, Response } from "express";
import { createUser, deleteAllUsers, getUser, updateUser } from '../db/queries/users.js';
import { config } from '../config.js';
import { Forbidden, Unauthorized } from '../api/errors.js';
import { hashPassword, checkPasswordHash, makeJWT, makeRefreshToken, extractBearerToken, validateJWT } from '../auth/auth.js';
import { createUserRefreshToken } from '../db/queries/refreshTokens.js';

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
    const { email, password } = params;
    const userEmail = await getUser(email);
    if (userEmail === undefined){
        throw new Unauthorized("incorrect email or password", 401);
    }
    const { hashedPassword, ...user } = userEmail;
    const verifyPw = await checkPasswordHash(password, hashedPassword);
    if (verifyPw === false){
        throw new Unauthorized("incorrect email or password", 401);
    }

    const oneHour = 60 * 60;
    const secret = config.api.jwtToken;
    const jwtToken = makeJWT(user.id, oneHour, secret);

    const sixtyDays = 60 * 24 * 60 * 60 * 1000;
    const refreshExpires = new Date(Date.now() + sixtyDays);
    const refreshToken = makeRefreshToken();
    await createUserRefreshToken(refreshToken, user.id, refreshExpires);

    res.status(200).json({ ...user, token: jwtToken, refreshToken: refreshToken });
}

export async function handlerUpdateUserLogin(req: Request, res: Response) {
      const header = req.get("Authorization");
      const token = extractBearerToken(header);
      if (token === undefined) {
        throw new Unauthorized("access token malformed or missing", 401);
      }

      const userId = validateJWT(token, config.api.jwtToken);
      const { email, password } = req.body;
      const hashedPw = await hashPassword(password);

      const user = await updateUser(userId, email, hashedPw);
      if (!user) {
        throw new Unauthorized("user not found", 401);
      }

      const { hashedPassword, ...updatedUser } = user;
      res.status(200).json(updatedUser);
}
