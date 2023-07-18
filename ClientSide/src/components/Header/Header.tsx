import CreateBotoesHeader from "../BotoesHeader/BotoesHeader";
import styles from "./Header.module.scss"

export default function CriarHeader(){
    return(
        <>
            <header className={styles.header}>
                <div className={styles.logo}>O QUE TEM PRA HOJE?</div>
                <CreateBotoesHeader />
            </header>
        </>
    )
}