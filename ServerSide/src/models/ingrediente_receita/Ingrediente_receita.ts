import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from "typeorm";
import { Receita } from "../receita/Receita";
import { Ingredientes } from "../ingredientes/Ingrediente";


@Entity()
export class Ingredientes_receita {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo_receita: number;

    @Column()
    codigo_ingredientes: number;

    @Column()
    qtd_ingrediente: number;

    @ManyToOne(() => Receita, (receita) => receita.ingredientes)
    @JoinColumn({ name: 'codigo_receita' })
    receita: Receita;

    @ManyToOne(() => Ingredientes, (ingrediente) => ingrediente.receitas)
    @JoinColumn({ name: 'codigo_ingredientes' })
    ingrediente: Ingredientes;
}





/*codigo_receita int PK 
codigo_ingrediente int PK 
qtd_ingrediente int*/