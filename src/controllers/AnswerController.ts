import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUserRepository } from "../repositories/surveysUsersRepository";

class AnswerController {
    async excute(request: Request, response: Response) {
        const { value } = request.params
        const { u } = request.query


        const surveysUsersRepository = getCustomRepository(SurveysUserRepository);
   
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if (!surveyUser) {
            throw new AppError("Survey User does not exists") 
        }
   
        surveyUser.value = Number(value)

        await surveysUsersRepository.save(surveyUser)
   
        return response.json(surveyUser)
    }
}

export { AnswerController }