import { Request, Response } from "express";
import { resolve } from "path"
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUserRepository } from "../repositories/surveysUsersRepository";
import { UsersRepository } from "../repositories/UserRepository";
import sendMailServices from "../services/sendMailServices";

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id} = request.body 

        const usersRepository = getCustomRepository(UsersRepository)
        const surveyRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUserRepository)
  
        const user = await usersRepository.findOne({ email })

        if (!user) {
            return response.status(400).json({
                error: "user does not exists",
            });
        }

        const survey = await surveyRepository.findOne({id: survey_id})

        if (!survey) {
            return response.status(400).json({
                error: "Survey does not exists!"
            })
        }

       

        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

        const surveyUserAleadyExists = await surveysUsersRepository.findOne({
            where: {user_id: user.id, value: null},
            relations: ["user", "survey"]
        })

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        if (surveyUserAleadyExists) {
            variables.id = surveyUserAleadyExists.id
            await sendMailServices.execute(email, survey.title, variables, npsPath)
       
            return response.json(surveyUserAleadyExists)
        }

        // Salvar as informações na tabela
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser)

        
        // Enviasr e-mail para o usuário
        
        variables.id = surveyUser.id

        await sendMailServices.execute(email, survey.title, variables, npsPath)


        return response.json(surveyUser)
    }


  
}

export { SendMailController }