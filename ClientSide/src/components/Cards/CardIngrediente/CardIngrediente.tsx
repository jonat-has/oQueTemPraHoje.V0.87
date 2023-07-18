import styles from './CardIngrediente.module.scss';
import Vector1 from '../../../assets/Vector1.svg';

export interface ObjetoIngredientes {
  codigo: number;
  nome: string;
  unidade: string;
}

interface CardIngredienteProps {
  objeto: ObjetoIngredientes;
}

export default function CriarCardIngredientes({ objeto }: CardIngredienteProps) {
  return (
    <div className={styles.principal}>
      <div className={styles.imagem}>
        <img src={ Vector1 } alt="" />
      </div>
      <div>
        <h2 className={styles.texto}>{objeto.nome}</h2>
        <h2 className={styles.texto}>{objeto.unidade}</h2>
      </div>
    </div>
  );
}
