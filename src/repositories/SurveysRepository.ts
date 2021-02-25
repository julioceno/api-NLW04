import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {} // essa classe só está aqui pra fazer herança com outra classe que tem todos
                                                      // os metodos como o (create, save, etc...) exportamos está classe  
                                                      // e posteriormente podemos chamar ela em outros módulos, mas ela terá
                                                      // todos os metodos que a classe "Repository" tem.
export { SurveysRepository }