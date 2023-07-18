import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ingredientes_receita } from "../ingrediente_receita/Ingrediente_receita";

@Entity()
export class Receita {

    @PrimaryGeneratedColumn()
    codigo: number;

    @Column()
    nome: string;

    @Column()
    imagem: string;

    @Column()
    tempo_de_preparo: number;

    @Column()
    resumo: string;

    @Column()
    instrucoes: string;

    @OneToMany(() => Ingredientes_receita, (ingredienteReceita) => ingredienteReceita.receita)
    ingredientes: Ingredientes_receita[];
}


/*codigo int PK 
nome varchar(100) 
imagem varchar(300) 
tempo_de_preparo int 
resumo varchar(300) 
instrucoes*/