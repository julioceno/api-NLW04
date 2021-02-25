import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';


class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRespository = getCustomRepository(UsersRepository)

        const userAlreadyExists = await usersRespository.findOne({ email });
        
        if (userAlreadyExists) {
            return response.status(400).json({
                error: "user already exists!"
            })
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
