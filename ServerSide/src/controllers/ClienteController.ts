import { Request,Response } from 'express'
import { AppDataSource } from '../data-source'
import { Cliente } from '../models/cliente/Cliente'
import { hash } from 'bcrypt'


export default {

    async registrarCliente(req: Request, res: Response) {

        const { usuario, senha, nome, email} = req.body

        const clienteExist = await AppDataSource.manager.exists(Cliente, email)
        const userExist = await AppDataSource.manager.exists(Cliente, usuario)

        if (clienteExist) {
            res.status(400).send('Email ja registrado')
        } else if (userExist) {
            res.status(400).send('Nome de usuario ja ultilizado')
        }

        const hashSenha = await hash(senha, 8)

        const newclient = {
            usuario: usuario,
            senha: hashSenha,
            nome: nome,
            email: email
            
        }

        await AppDataSource.createQueryBuilder()
       .insert()
       .into(Cliente)
       .values([newclient])
       .execute()

       res.status(201).send('Cliente registrado')
    }

}