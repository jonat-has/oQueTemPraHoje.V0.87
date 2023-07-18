import { Router } from 'express'
import IngredienteController from '../controllers/IngredienteController'
import ReceitaController from '../controllers/ReceitaController';
import DespensaController from '../controllers/DespensaController';
import ClienteController from '../controllers/ClienteController';
const router = Router();

router.get('/ingredientes',  IngredienteController.exibirIngredient)
router.get('/receitasEingredientes', ReceitaController.exibirReceitaEIngredientes)
router.get('/receitasEncontradas', ReceitaController.exibirReceitasEncotradas)
router.get('/ingredientesReceitasEncontradas', ReceitaController.exibirIngredientesReceitasEncontradas)
router.get('/ingredientesDespensa', DespensaController.exibirDespensa)

router.delete('/clearDespensa', DespensaController.limparDespensa)
router.delete('/excluirIngreDespensa/:id', DespensaController.excluiUmIngrediente)

router.put('/alterQtdIngrediente', DespensaController.alterarQtdIngrediente)

router.post('/insertInDespensa', DespensaController.insertDespensa)
router.post('/newuser', ClienteController.registrarCliente)

export default router;