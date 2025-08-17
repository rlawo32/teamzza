import { create } from "zustand";

interface shuffleBaseStore {
    playerCount: number;
    setPlayerCount: (playerCount: number) => void;
    teamCount: number;
    setTeamCount: (teamCount: number) => void;
    
    insertPlayerCount: () => void;
    insertTeamCount: () => void;
    deletePlayerCount: () => void;
    deleteTeamCount: () => void;
}

const useShuffleBaseStore = create<shuffleBaseStore>((set, get) => ({
    // 임시
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
}));

export default useShuffleBaseStore;
export type { shuffleBaseStore };