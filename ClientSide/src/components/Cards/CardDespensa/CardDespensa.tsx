import styles from './CardDespensa.module.scss'
import {BsFillTrash3Fill} from 'react-icons/bs'
import CriarInputSpinner from '../../Inputs/InputSpinner'
import Vector1 from '../../../assets/Vector1.svg'

export default function CriarCardDespensa( { objeto , removeCard }:any ){
    
    return(
        <div className={styles.principal}>
            <div className={styles.imagem}>
                <img src={ Vector1 } alt="Imagem-Ingrediente" />
            </div>
            <div className={styles.descricao}>
                <h2 className={styles.tituloCard}> { objeto.nome }</h2>
                <div className={styles.quantidade}>
                    <h3 className={styles.quantidadeTexto}>{ objeto.unidade }</h3>
                    <div className={styles.input}>
                        <CriarInputSpinner/>
                    </div>
                </div>
            </div>
            <button className={styles.lixeira} onClick={() => removeCard(objeto)}>
                <BsFillTrash3Fill/>
            </button>      
        </div>
    )
}