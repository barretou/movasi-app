import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


export function Countdown() {
   const {minutes,
     seconds,
      hasFinished,
       isActive,
        startCountdown,
         resetCountdown} = useContext(CountdownContext)

    //isso vai tranformar em string os minutos. 
    //padStart é para completar o início com '0' caso o numero tenha menos de dois algarismos e por fim 
    //usa-se o split com nenhum argumento para separar numero a numero no contador
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

    //a mesma lógica é usada para os segundos.
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');    

    //returns the html wiht your respective variables.
    return(
    <div>       
        <div className={styles.CountdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>
        </div>

        {hasFinished ? (
            <button 
            disabled             
            className={styles.CountdownButton}>
               Ciclo encerrado
            </button>
        ) : (
            <>
        {isActive ? (
            <button 
            type='button' 
            onClick={resetCountdown}
            className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`}>
                Abandonar ciclo
            </button>
        ) : (
        <button 
        type='button' 
        onClick={startCountdown}
        className={styles.CountdownButton}>
            Iniciar ciclo
        </button>
        )} 
        </>
        )}       
    </div>
    );
}