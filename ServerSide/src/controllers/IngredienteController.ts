import { Request, Response, NextFunction } from "express";
import { AppDataSource } from '../data-source';
import { Ingredientes } from '../models/ingredientes/Ingrediente';
import { Ingredientes_receita } from "../models/ingrediente_receita/Ingrediente_receita";

export default {

async exibirIngredient (req: Request, res: Response){
  try {
    const ingredientes = await AppDataSource.manager.find(Ingredientes)
    return res.status(200).send(ingredientes)
  } catch (error) {
    return res.status(404).send('Erro')
  }
},


};