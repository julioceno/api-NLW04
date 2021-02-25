import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid"


@Entity("surveys")
class Survey {
    @PrimaryColumn()
    readonly id: string; // o valor do id é definido pelo contrutor que está no final da classe

    @Column() // se o nome da sua coluna for igual ao atributo  não é necessário passar nada nos params
    title: String;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid() // o uuid vai gerar um id totalmente aleatório
        }
    }
}

export { Survey };
