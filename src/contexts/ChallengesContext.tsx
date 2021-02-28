import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel:number;
    completeChallenge: () => void;
    resetChallenge: () => void;
    startNewChallenge: () => void;
    levelUp: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengeProvider({children, ...rest}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setcurrentExperience] = useState(rest.currentExperience ?? 1);
    const [challengesCompleted, setchallengesCompleted] = useState(rest.challengesCompleted ?? 1);

    const [activeChallenge, setactiveChallenge] = useState(null);
    const[isLevelModalOpen, setisLevelModalOpen] = useState(false);
    const experienceToNextLevel = Math.pow((level + 1)*4,2);

    useEffect(() => {
        Notification.requestPermission();
    }, )

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(level));
        Cookies.set('challengesCompleted', String(level));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp(){
        setLevel(level + 1);
        setisLevelModalOpen(true)
    }

    function closeLevelUpModal(){
        setisLevelModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor (Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setactiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio',{
            body: `valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setactiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge){
            return;
            }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
    }

        setcurrentExperience(finalExperience);
        setactiveChallenge(null);
        setchallengesCompleted(challengesCompleted + 1);
    }

    return(
        <ChallengesContext.Provider value={{level,
         currentExperience,
          challengesCompleted,
          startNewChallenge,
           levelUp,
           experienceToNextLevel,
           activeChallenge,
           completeChallenge,
           closeLevelUpModal,
           resetChallenge}}>
            {children}

            {isLevelModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}