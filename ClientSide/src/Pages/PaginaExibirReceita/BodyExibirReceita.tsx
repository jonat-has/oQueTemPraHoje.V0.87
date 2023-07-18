import CriarHeader from "../../components/Header/Header";
import styles from "./BodyExibirReceita.module.scss"
import { useLocation } from 'react-router-dom'
import  axios  from "axios";
import { useEffect,useState } from "react";

export default function CriarBodyExibirReceita() {

    let { state: { objeto } } = useLocation();
    const [lista, setLista] = useState< any[]>([]);

    useEffect(() => {

        async function getIngredientes() {
        await axios.get('http://localhost:3000/receitasEingredientes')
            .then(Response => {
                console.log(Response.data)
                const lista = Response.data;
                setLista(lista)
                console.log(lista)
            })
        }   
        
        getIngredientes()

        }, []);

      
    console.log(objeto)
    return (
        <>
        <CriarHeader />
        <main className={styles.main}>
            <div className={styles.receita}>
                <div className={styles.divisorImgIngredientes}>
                    <div className={styles.imagem}>
                        <img src="https://fyoti.com.br/wp-content/uploads/2022/08/Receita-de-Bolo-de-chocolate-decorado.jpg" alt="imagem-receita" />
                    </div>
                    <div className={styles.ingredientes}>
                        <ul>
                        {lista
                        .filter((ingredientes) => ingredientes.codigo_receita == objeto.codigo)
                        .map((ingredientes) => (
                        <li>{ingredientes.nome}</li>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className={styles.textos}>
                    <div className={styles.textoReceita}>
                        <h2>{ objeto.nome }</h2>
                        <p>{ objeto.resumo }</p>

                        <p><b>Modo de preparo:</b></p>

                        <p>
                            { objeto.instrucoes}
                        </p>
                                      
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}