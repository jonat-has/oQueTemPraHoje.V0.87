import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Ingredientes_despensa } from '../models/ingrediente_despensa/Ingredientes_despensa'
import { Ingredientes } from '../models/ingredientes/Ingrediente'


export default {
    
    async insertDespensa(req: Request, res: Response) {
        try {
    
            if (!req.body || typeof req.body.codigo_ingrediente === 'undefined' || typeof req.body.qtd_ingrediente === 'undefined') {
                return res.status(400).send('As propriedades codigo_ingrediente e qtd_ingrediente são obrigatórias' + req.body);
            }
    
            const valoresInsert = {
                codigo_despensa: req.body.codigo_despensa,
                codigo_ingrediente: req.body.codigo_ingrediente,
                qtd_ingrediente: req.body.qtd_ingrediente
            };
    
            await AppDataSource
                .createQueryBuilder()
                .insert()
                .into(Ingredientes_despensa)
                .values([valoresInsert])
                .execute();
    
            return res.status(200).send('Ingredientes inseridos com sucesso');
        } catch (err) {
            return res.status(500).send('Erro ao inserir ingredientes: ' + err.message);
        }
    }, 
    
    async exibirDespensa( req: Request, res: Response) {
        try{

            const despensa = await AppDataSource
            .createQueryBuilder()
            .select("ingredientes")
            .from(Ingredientes, "ingredientes")
            .where(qb => {
                const subQuery = qb
                .subQuery()
                .select("codigo_ingrediente")
                .from(Ingredientes_despensa, "ingredientes_despensa")
                .where("codigo_despensa = :codigoDespensa", { codigoDespensa: 1 })
                .getQuery();
                
                return "ingredientes.codigo IN " + subQuery;
            })
            .getMany();
            return res.status(200).send(despensa)
        } catch(err) {
            return res.status(500).send('Error: ' + err.message)
        }

    },

    async limparDespensa( req: Request, res: Response) {
        try {

            await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Ingredientes_despensa)
            .where('codigo_despensa = 1')
            .execute()

            return res.status(200).send('Despensa Limpa')
        } catch(err) {
            return res.status(500).send('Error: ' + err.message)
        }
    },

    async alterarQtdIngrediente( req: Request, res: Response) {
        try {

            await AppDataSource
            .createQueryBuilder()
            .update(Ingredientes_despensa)
            .set({
                qtd_ingrediente: req.body.qtd_ingrediente
            })
            .where('codigo_despensa = :codigo' , {codigo: 1})
            .andWhere('codigo_ingrediente = :codigoIngre', {codigoIngre: req.body.codigo_ingrediente})
            .execute()

            return res.status(200).send('Quantidade atualizada')
        } catch(err) {
            return res.status(500).send('Error: ' + err.message)
        }
    },

    async excluiUmIngrediente( req: Request, res: Response) {
        try {

            const queryBuilder = AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Ingredientes_despensa)
            .where('codigo_despensa = :codigoDespensa', { codigoDespensa: 1 })
            .andWhere('codigo_ingrediente = :codigoIngrediente', { codigoIngrediente: req.params.id });
          
          const query = queryBuilder.getQuery();
          
          const result = await queryBuilder.execute();

        } catch (err) {
            return res.status(500).send('Error: ' + err.message)
        }
    }

}
