import { Column, Entity, PrimaryGeneratedColumn,OneToOne,OneToMany,JoinColumn } from "typeorm";
import { Cliente } from "../cliente/Cliente";
import { Ingredientes_despensa } from "../ingrediente_despensa/Ingredientes_despensa";

@Entity()
export class Despensa {

    @PrimaryGeneratedColumn()
    codigo: number;

    @Column()
    codigo_cliente: number;

    @OneToOne(() => Cliente)
    @JoinColumn({ name: 'codigo_cliente' })
    cliente: Cliente;

    @OneToMany(() => Ingredientes_despensa, (ingredienteDespensa) => ingredienteDespensa.despensa)
    ingredientes: Ingredientes_despensa;

}
/*codigo int PK 
codigo_cliente int*/