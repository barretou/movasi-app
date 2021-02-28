import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext  = createContext({} as CountdownContextData)

export function CountdownProvider({children}:CountdownProviderProps ) {
    const {startNewChallenge} = useContext(ChallengesContext);
    let countdownTimeout: NodeJS.Timeout;

    const [time, setTime] = useState(0.05*60);
    //retoa os minutos, como sempre vai ser um numero inteiro, 
    //usamos o mathfloor para arredondar pra baixo a divisão time/60.

    //verifica se o countdown está ativo ou não, parado ou contando.
    const [isActive, setIsActive] = useState(false);
    const[hasFinished, sethasFinished] = useState(false);

    const minutes = Math.floor(time / 60);

    //retona o resto que não coube na divisão.

    const seconds = time % 60;
    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        sethasFinished(false);
        setTime(0.1*60);
        
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                    setTime(time -1);
                    }, 1000)
                } else if (isActive &&  time == 0){
                    sethasFinished(true);
                    setIsActive(false);
                    startNewChallenge();
                }
            }, [isActive, time])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );

}