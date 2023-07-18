import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { Ingredientes_receita } from '../ingrediente_receita/Ingrediente_receita';
import { Ingredientes_despensa } from '../ingrediente_despensa/Ingredientes_despensa';

@Entity()
export class Ingredientes {
    
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  nome: string;

  @Column()
  unidade: string;

  @OneToMany(() => Ingredientes_receita, (ingredienteReceita) => ingredienteReceita.ingrediente)
  receitas: Ingredientes_receita[];

  @OneToMany(() => Ingredientes_despensa, (ingredienteDespensa) => ingredienteDespensa.ingrediente)
  despensas: Ingredientes_despensa[];
}