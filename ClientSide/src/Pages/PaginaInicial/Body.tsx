    import CriarBotao from "../../components/Botoes/Botao";
    import CriarCardDespensa from "../../components/Cards/CardDespensa/CardDespensa";
    import CriarCardIngredientes from "../../components/Cards/CardIngrediente/CardIngrediente";
    import CriarHeader from "../../components/Header/Header";
    import CriarSearchBar from "../../components/SearchBars/SearchBar/SearchBar";
    import styles from "./Body.module.scss"
    import axios from "axios";
    import { useState, useEffect } from 'react'
   import { Link } from "react-router-dom";

   export default function CriarBodyInicial(){
       
       const [lista, setLista] = useState< any[]>([]);
       const [cards,setCards] = useState<any[]>([]);

        const URL = 'http://localhost:3000/ingredientes'

        useEffect(() => {

        async function getIngredientes() {
        await axios.get(URL)
            .then(Response => {
                console.log(Response.data)
                const lista = Response.data;
                setLista(lista)
            })
        }

        async function getDespensa() {
            await axios.get('http://localhost:3000/ingredientesDespensa')
            .then( ResponseDespensa => {
                const newCards = ResponseDespensa.data
                setCards(newCards)
            })
            
        }

        getDespensa()
        getIngredientes()
        }, []);

         
          const addCard = async ({ objeto }: any) => {
            const cardExistente = cards.find((card) => card.codigo === objeto.codigo);
        
            if (!cardExistente) {
              const newCards = [...cards, objeto];
              setCards(newCards);
              
              const data = {
                codigo_despensa: 1,
                qtd_ingrediente: 1500,
              };
          
              const postData = (objeto: any) => ({
                ...data,
                codigo_ingrediente: objeto.codigo,
              });

              await axios.post('http://localhost:3000/insertInDespensa', postData(objeto));
            }
          };
        
          const removeCard = async (objeto: any) => {
            try {
              const updatedCards = cards.filter((card) => card.codigo !== objeto.codigo);
              setCards(updatedCards);
              
              console.log('teste',objeto.codigo)
              await axios.delete(`http://localhost:3000/excluirIngreDespensa/${objeto.codigo}`)
              .then(response => (
                console.log('item foi excluido: ',response.data)
              )
                );

            } catch (error) {
              console.error('Erro ao excluir ingrediente da despensa:', error);
            }
          };

        return(
            <>
                <CriarHeader />
                <main className={styles.main}>
                    <div className={styles.divisorDespensa}>
                        <h2 className={styles.textoDespensa}>Despensa</h2>
                        <div className={styles.divisorCardBotao}>
                            <div className={styles.cardsDespensa}>
                            {cards.map((objeto) => (
                                <CriarCardDespensa key={objeto.codigo} objeto={objeto} removeCard={removeCard} />
                            ))}
                            </div>
                            <div className={styles.botao}>
                            <Link to={'/ReceitasEncontradas'}>
                            <CriarBotao/>
                            </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.divisorAddIngredientes}>
                        <h2 className={styles.adicionarIngredientes}>Adicionar ingredientes</h2>
                        <div className={styles.searchBar}>
                            <CriarSearchBar/>
                        </div>
                        <div className={styles.cardsIngredientes}>
                            {lista.map((objeto,index) => (
                                <button onClick={() => addCard({ objeto })}>
                                <CriarCardIngredientes key={index} objeto={objeto} />
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
            </>
        )
    }
