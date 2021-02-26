import { Request, Response } from "express";
import { resolve } from "path"
import { getCustomRepository, Not, IsNull } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUserRepository } from "../repositories/surveysUsersRepository";
import { UsersRepository } from "../repositories/UserRepository";
import sendMailServices from "../services/sendMailServices";


async function asendingThankYouEmail( survey_id  ) {

    const surveysUsersRepository = getCustomRepository(SurveysUserRepository)

    const surveysUsers = await surveysUsersRepository.find({
        survey_id,
        value: Not(IsNull())
    });

    const detractor = surveysUsers.filter( survey => survey.value >= 0 && survey.value <= 6 ).length

    const promoters = surveysUsers.filter( survey => survey.value >= 9 && survey.value <= 10).length

    const totalAnswers = surveysUsers.length;

    const calculate = Number(
        (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
    )

    return calculate
}

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

        // Enviar npc por email e agradecer por responder
        const usersRepository = getCustomRepository(UsersRepository)

        const user =  await usersRepository.findOne({id: surveyUser.user_id})
        const email = user.email

        const nps = await asendingThankYouEmail(surveyUser.survey_id)
        
        const variables = {
            name: user.name,
            title: "Você fez a diferença!",
            description: "Sabemos que nem sempre é fácil tirar um pouco do seu tempo para responder perguntas como esta, porém são esse tipo de perguntas que nos ajudam a melhorar o nosso atendimento nós agradecemos a sua contribuição.",
            nps
        }

        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'resultNpsMail.hbs')

        await sendMailServices.execute(email, "Você fez a diferença!", variables, npsPath)

        return response.json(surveyUser)
    }
}

export { AnswerController }
