import { Request, Response } from 'express';

import db from '../database/connections';
import jwt from 'jsonwebtoken';

export default class AccountController {

  async authenticate(request: Request, response: Response) {
    // Read username and password from request body
    const { email, password } = request.body;

    // Filter user from the users array by email and password
    const user = await db('users').where({ email, password }).first();

    if (user) {
      // Generate an access token
      const { name, email } = user;
      const accessToken = jwt.sign({ email }, String(process.env.JWT_SECRET));

      response.json({
        name,
        accessToken
      });
    } else {
      return response.status(401).json({ message: 'Email ou Senha incorretos!'});
    }
  }
  
  async changePassword(request: Request, response: Response) {
    // Read username and password from request body
    const { password, newPassword } = request.body;
    const { email }  = request.user;

    const user = await db('users').where({ email, password }).first();

    if (!user) {
      return response.status(401).json({ message: 'Ops não foi possivel trocar sua senha, senha atual invalida!'});
    }

    try {
      await db('users')
      .where('id', user.id)
      .update('password', newPassword);
    } catch (error) {
      return response.status(401).json({ message: 'Ops não foi possivel trocar sua senha, por favor tente mais tarde!'});
    }

    return response.status(204).send();
  }
}
