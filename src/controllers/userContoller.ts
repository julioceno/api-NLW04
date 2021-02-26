import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
import * as yup from "yup"
import { AppError } from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRespository = getCustomRepository(UsersRepository)

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
        })

        try {
            await schema.validate(request.body, {abortEarly: false})            
        
        } catch (err) {
            throw new AppError(err)
        }

        const userAlreadyExists = await usersRespository.findOne({ email });
        
        if (userAlreadyExists) {
            throw new AppError("User already exists!")
        }

        const user = usersRespository.create({
            name, 
            email
        })

        await usersRespository.save(user)

        return response.status(201).send(user)
    }

}

export { UserController };
