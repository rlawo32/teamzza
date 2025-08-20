import { create } from "zustand";

interface shuffleBaseStore {
    teamIdStorage: string[];
    
    playerCount: number;
    setPlayerCount: (playerCount: number) => void;
    increasePlayerCount: () => void;
    decreasePlayerCount: () => void;

    teamCount: number;
    setTeamCount: (teamCount: number) => void;
    increaseTeamCount: () => void;
    decreaseTeamCount: () => void;

    shuffleCount: number;
    setShuffleCount: (shuffleCount: number) => void;
    increaseShuffleCount: () => void;

    shuffleTime: number;
    setShuffleTime: (shuffleTime: number) => void;
    increaseShuffleTime: () => void;
    decreaseShuffleTime: () => void;
    reduceTime: number;
    setReduceTime: (reduceTime: number) => void;
    increaseReduceTime: () => void;
    decreaseReduceTime: () => void;

    rollbackCount: number;
    setRollbackCount: (teamCount: number) => void;
    increaseRollbackCount: () => void;
    decreaseRollbackCount: () => void;
}

const useShuffleBaseStore = create<shuffleBaseStore>((set, get) => ({
    teamIdStorage: ['bl', 're', 'yl', 'gr', 'pu', 'br', 'pi', 'or', 'mi', 'li'],
    playerCount: 5,
    setPlayerCount: (playerCount: number) =>
        set((state: {playerCount: number}) => ({
            playerCount: (state.playerCount = playerCount),
        })),
    increasePlayerCount: () => {
        const playerCount = get().playerCount;
        if(playerCount < 10) {
            set({playerCount: playerCount + 1});
        }
    },
    decreasePlayerCount: () => {
        const playerCount = get().playerCount;
        if(playerCount > 1) {
            set({playerCount: playerCount - 1});
        }
    },
    teamCount: 2,
    setTeamCount: (teamCount: number) =>
        set((state: {teamCount: number}) => ({
            teamCount: (state.teamCount = teamCount),
        })),
    increaseTeamCount: () => {
        const teamCount = get().teamCount;
        if(teamCount < 10) {
            set({teamCount: teamCount + 1});
        }
    },
    decreaseTeamCount: () => {
        const teamCount = get().teamCount;
        if(teamCount > 2) {
            set({teamCount: teamCount - 1});
        }
    },
    shuffleCount: 0,
    setShuffleCount: (shuffleCount: number) =>
        set((state: {shuffleCount: number}) => ({
            shuffleCount: (state.shuffleCount = shuffleCount),
        })),
    increaseShuffleCount: () => {
        const shuffleCount = get().shuffleCount;
        set({shuffleCount: shuffleCount + 1});
    },
    shuffleTime: 5000,
    setShuffleTime: (shuffleTime: number) =>
        set((state: {shuffleTime: number}) => ({
            shuffleTime: (state.shuffleTime = shuffleTime),
        })),
    increaseShuffleTime: () => {
        const shuffleTime = get().shuffleTime;
        if(shuffleTime < 10000) {
            set({shuffleTime: shuffleTime + 1000});
        }
    },
    decreaseShuffleTime: () => {
        const shuffleTime = get().shuffleTime;
        if(shuffleTime > 1000) {
            set({shuffleTime: shuffleTime - 1000});
        }
    },
    reduceTime: 200,
    setReduceTime: (reduceTime: number) =>
        set((state: {reduceTime: number}) => ({
            reduceTime: (state.reduceTime = reduceTime),
        })),
    increaseReduceTime: () => {
        const reduceTime = get().reduceTime;
        if(reduceTime < 1000) {
            set({reduceTime: reduceTime + 100});
        }
    },
    decreaseReduceTime: () => {
        const reduceTime = get().reduceTime;
        if(reduceTime > 100) {
            set({reduceTime: reduceTime - 100});
        }
    },
    rollbackCount: 0,
    setRollbackCount: (rollbackCount: number) =>
        set((state: {rollbackCount: number}) => ({
            rollbackCount: (state.rollbackCount = rollbackCount),
        })),
    increaseRollbackCount: () => {
        const rollbackCount = get().rollbackCount;
        set({rollbackCount: rollbackCount + 1});
    },
    decreaseRollbackCount: () => {
        const rollbackCount = get().rollbackCount;
        if(rollbackCount > 0) {
            set({rollbackCount: rollbackCount - 1});
        }
    },
}));

export default useShuffleBaseStore;
export type { shuffleBaseStore };
