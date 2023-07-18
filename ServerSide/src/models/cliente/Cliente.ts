import { Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinColumn, AfterInsert } from 'typeorm';
import { Despensa } from '../despensa/Despensa';
import { AppDataSource } from '../../data-source';

@Entity()
export class Cliente {
    
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  usuario: string;

  @Column()
  senha: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @OneToOne(() => Despensa, despensa => despensa.cliente)
  despensa: Despensa;

  @AfterInsert()
  async nova_despensa(){
    await AppDataSource.createQueryBuilder()
    .insert()
    .into(Despensa)
    .values({ codigo_cliente: this.codigo })
    .execute()
  }
}

/*Columns:
codigo int PK 
usuario varchar(20) 
senha varchar(32) 
nome varchar(100) 
email varchar(30)*/