import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { Survey } from "./Survey";
import { User } from "./User";


@Entity("surveys_users")
class SurveyUser {
    @PrimaryColumn()
    readonly id: string; // o valor do id é definido pelo contrutor que está no final da classe

    @Column() // se o nome da sua coluna for igual ao atributo  não é necessário passar nada nos params
    user_id: String;

    @ManyToOne( () => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    survey_id: string;

    @ManyToOne( () => Survey)
    @JoinColumn({ name: "survey_id" })
    survey: Survey;

    @Column()
    value: number

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid() // o uuid vai gerar um id totalmente aleatório
        }
    }
}

export { SurveyUser };
