import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

//function to return some action on chllengebox components.

export function ChallengeBox() {
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext);

    function handleChallengeSucess() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }
//return the html with your respective variables created before. 
    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? ( 
                <div className={styles.challengeActive}>          
                    <header>Ganhe {activeChallenge.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type='button' className={styles.challengeFailButton} onClick={handleChallengeFailed}>Falhei</button>
                        <button type='button' className={styles.challengeSucessButton} onClick={handleChallengeSucess}>Completei</button>
                    </footer>
                </div> ) : (
             
                    <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio.</strong>
                    <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                    </p>
                </div>) }
        </div>
    );
}