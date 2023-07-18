import { Column, Entity, PrimaryColumn, ManyToOne,JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Despensa } from "../despensa/Despensa";
import { Ingredientes } from "../ingredientes/Ingrediente";



@Entity()
export class Ingredientes_despensa {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    codigo_despensa: number;

    @Column()
    codigo_ingrediente: number;

    @Column()
    qtd_ingrediente: number

    @ManyToOne(() => Despensa, (despensa) => despensa.ingredientes)
    @JoinColumn({ name: 'codigo_despensa' })
    despensa: Despensa;

    @ManyToOne(() => Ingredientes, (ingrediente) => ingrediente.despensas)
    @JoinColumn({ name: 'codigo_ingrediente' })
    ingrediente: Ingredientes;
}

/*codigo_despensa int PK 
codigo_ingrediente int PK 
qtd_ingrediente in*/