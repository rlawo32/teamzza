import { create } from "zustand";

interface shuffleBaseStore {
    teamIdStorage: string[];
    
    playerCount: number;
    setPlayerCount: (playerCount: number) => void;
    insertPlayerCount: () => void;
    deletePlayerCount: () => void;

    teamCount: number;
    setTeamCount: (teamCount: number) => void;
    insertTeamCount: () => void;
    deleteTeamCount: () => void;

    rollbackCount: number;
    setRollbackCount: (teamCount: number) => void;
    insertRollbackCount: () => void;
    deleteRollbackCount: () => void;
}

const useShuffleBaseStore = create<shuffleBaseStore>((set, get) => ({
    teamIdStorage: ['bl', 're', 'yl', 'gr', 'pu', 'br', 'pi', 'or', 'mi', 'li'],
    playerCount: 5,
    setPlayerCount: (playerCount: number) =>
        set((state: {playerCount: number}) => ({
            playerCount: (state.playerCount = playerCount),
        })),
    insertPlayerCount: () => {
        const playerCount = get().playerCount;
        set({
            playerCount: playerCount + 1,
        });
    },
    deletePlayerCount: () => {
        const playerCount = get().playerCount;
        if(playerCount > 1) {
            set({
                playerCount: playerCount - 1,
            });
        }
    },
    teamCount: 2,
    setTeamCount: (teamCount: number) =>
        set((state: {teamCount: number}) => ({
            teamCount: (state.teamCount = teamCount),
        })),
    insertTeamCount: () => {
        const teamCount = get().teamCount;
        set({
            teamCount: teamCount + 1,
        });
    },
    deleteTeamCount: () => {
        const teamCount = get().teamCount;
        if(teamCount > 2) {
            set({
                teamCount: teamCount - 1,
            });
        }
    },
    rollbackCount: 0,
    setRollbackCount: (rollbackCount: number) =>
        set((state: {rollbackCount: number}) => ({
            rollbackCount: (state.rollbackCount = rollbackCount),
        })),
    insertRollbackCount: () => {
        const rollbackCount = get().rollbackCount;
        set({
            rollbackCount: rollbackCount + 1,
        });
    },
    deleteRollbackCount: () => {
        const rollbackCount = get().rollbackCount;
        if(rollbackCount > 0) {
            set({
                rollbackCount: rollbackCount - 1,
            });
        }
    },
}));

export default useShuffleBaseStore;
export type { shuffleBaseStore };
