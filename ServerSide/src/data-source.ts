import "reflect-metadata"
import { DataSource } from "typeorm"
import { Ingredientes } from "./models/ingredientes/Ingrediente"
import { Cliente } from "./models/cliente/Cliente"
import { Receita } from "./models/receita/Receita"
import { Ingredientes_receita } from "./models/ingrediente_receita/Ingrediente_receita"
import { Despensa } from "./models/despensa/Despensa"
import { Ingredientes_despensa } from "./models/ingrediente_despensa/Ingredientes_despensa"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '8591',
    database: 'oquetemprahoje',
    entities: [ Ingredientes, Cliente, Receita, Ingredientes_receita, Despensa, Ingredientes_despensa ],
    synchronize: true,
})
