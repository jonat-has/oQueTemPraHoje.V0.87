import CriarHeader from "../../components/Header/Header";
import CriarSearchBar from "../../components/SearchBars/SearchBar/SearchBar";
import styles from "./BodyReceitas.module.scss"
import CriarCardReceitaEncontrada from "../../components/Cards/CardReceitaEncontrada/CardReceitaEncontrada";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CriarBodyReceitas(){

    const [receitasencontradas, setReceitas] = useState< any[]>([]);

    const URL = 'http://localhost:3000/receitasEncontradas'

    useEffect(() => {

    async function getReceitas() {
    await axios.get(URL)
        .then(Response => {
            console.log(Response.data)
            const receitasEncontradas = Response.data;
            setReceitas(receitasEncontradas)
        })

    await axios.delete('localhost:3000/clearDespensa')
    .then(Response1 => {
        console.log(Response1)
    })
    }
    
    getReceitas()
        
    }, []);

    return(
        <div className={styles.pagina}>
            <CriarHeader/>
            <div className={styles.principal}>
                <CriarSearchBar/>
                <div className={styles.cardsReceitasEncontradas}>
                {receitasencontradas.map((objeto) => (
                    <Link to={'/PreparoReceita'} state={{ objeto:objeto }}>
                    <CriarCardReceitaEncontrada key={objeto.codigo} objeto={objeto} />
                    </Link>
                ))}

                </div>
            </div>
        </div>
    )
}