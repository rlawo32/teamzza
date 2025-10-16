import { create } from "zustand";

import useShuffleTeamStore from "./useShuffleTeamStore";

interface shuffleBaseStore {
    teamTitleStorage: string[];
    teamIdStorage: string[];

    themeMode: boolean;
    setThemeMode: (themeMode: boolean) => void;

    /*
        LOL - TOP, JUG, MID, ADC, SUP
        BattleGround - tier 1, tier 2, tier 3, tier 4
        OverWatch - Tank, Deal, Deal, Heal, Heal
        Valorant - 
    */
    shuffleModeStorage: {id:string, target:boolean, cnt:number, fix:boolean, list:{idx:number, lv:number, tmp:string}[]}[];
    updateModeTarget: (data: {id: string; target: boolean;}) => void;

    shuffleProgress: boolean;
    setShuffleProgress: (shuffleProgress: boolean) => void;
    shuffleComplete: boolean;
    setShuffleComplete: (shuffleProgress: boolean) => void;
    shuffleRandomChk: boolean;
    setShuffleRandomChk: (shuffleRandomChk: boolean) => void;
    shuffleBalanceChk: boolean;
    setShuffleBalanceChk: (shuffleBalanceChk: boolean) => void;
    shuffleOneClickChk: boolean;
    setShuffleOneClickChk: (shuffleOneClickChk: boolean) => void;
    shuffleActiveChk: boolean;
    setShuffleActiveChk: (shuffleActiveChk: boolean) => void;
    shuffleCompleteChk: boolean;
    setShuffleCompleteChk: (shuffleActiveChk: boolean) => void;
    
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
    teamTitleStorage: ['TeamBlue', 'TeamRed', 'TeamYellow', 'TeamGreen', 'TeamPurple', 'TeamBrown', 'TeamPink', 'TeamOrange', 'TeamMint', 'TeamLime'],
    teamIdStorage: ['bl', 're', 'yl', 'gr', 'pu', 'br', 'pi', 'or', 'mi', 'li'],
    themeMode: true,
    setThemeMode: (themeMode: boolean) =>
        set((state: {themeMode: boolean}) => ({
            themeMode: (state.themeMode = themeMode),
        })),
    shuffleModeStorage: [
        {id:'D', target:true, cnt:5, fix:false, list:[]},
        {id:'L', target:false, cnt:5, fix:true, list:[{idx:1, lv:5, tmp:'TOP'}, {idx:2, lv:4, tmp:'JUG'}, {idx:3, lv:3, tmp:'MID'}, {idx:4, lv:2, tmp:'ADC'}, {idx:5, lv:1, tmp:'SUP'}]},
        {id:'B', target:false, cnt:4, fix:true, list:[{idx:1, lv:4, tmp:'1 Tier'}, {idx:2, lv:3, tmp:'2 Tier'}, {idx:3, lv:2, tmp:'3 Tier'}, {idx:4, lv:1, tmp:'4 Tier'}]},
        {id:'O', target:false, cnt:5, fix:false, list:[{idx:1, lv:3, tmp:'Tank'}, {idx:2, lv:2, tmp:'Deal'}, {idx:3, lv:1, tmp:'Heal'}]},
        {id:'V', target:false, cnt:5, fix:false, list:[{idx:1, lv:5, tmp:'1 Tier'}, {idx:2, lv:4, tmp:'2 Tier'}, {idx:3, lv:3, tmp:'3 Tier'}, {idx:4, lv:2, tmp:'4 Tier'}, {idx:5, lv:1, tmp:'5 Tier'}]},
    ], // Default, LOL, BattleGround, OverWatch, Valorant
    updateModeTarget: (data: {id: string; target: boolean;}) => {
        const {teamList, setTeamList} = useShuffleTeamStore.getState();
        const currentShuffleModeStorage:{id:string, target:boolean, cnt:number, fix:boolean, list:{idx:number, lv:number, tmp:string}[]}[] = JSON.parse(JSON.stringify(get().shuffleModeStorage));
        
        const result = currentShuffleModeStorage.find((item) => item.id === data.id);

        if(result) {
            result.target = data.target;

            currentShuffleModeStorage.filter((item) => item.id !== data.id).forEach((item) => {
                item.target = false;
            });
            set({shuffleModeStorage: currentShuffleModeStorage});

            let idx:number = 1;
            let newTeamList;
            if(result.id !== 'D') {
                set({playerCount: result.cnt});

                newTeamList = teamList.map((team, teamIdx) => {
                    const len:number = Math.abs(result.cnt - team.list.length);
                    if(result.cnt < team.list.length) {
                        team.list = team.list.slice(0, -len);
                    } else {
                        for(let i:number=0; i<len; i++) {
                            team.list.push({idx:0, id:get().teamIdStorage[teamIdx]+'_'+(team.list.length+1), lv:0, nm:'', tmp:0, as:''});
                        }
                    }
                    for(let i:number=0; i<team.list.length; i++) {
                        team.list[i].idx = idx;
                        if(result.id === 'O') {
                            team.list[i].lv = result.list[i > 1 ? i > 2 ? 2 : 1 : i].lv;
                            team.list[i].tmp = result.list[i > 1 ? i > 2 ? 2 : 1 : i].tmp;
                            team.list[i].as = '';
                        } else {
                            team.list[i].lv = result.list[i].lv;
                            team.list[i].tmp = result.list[i].tmp;
                            team.list[i].as = result.id === 'L' ? '' : '';
                        }
                        idx += 1;
                    }

                    return {title:team.title, target:team.target, list:team.list}; 
                });
            } else {
                newTeamList = teamList.map((team, teamIdx) => {
                    for(let i:number=0; i<team.list.length; i++) {
                        team.list[i].idx = idx;
                        team.list[i].lv = (get().playerCount)-i;
                        team.list[i].tmp = (get().playerCount)-i;
                        team.list[i].as = 'LEVEL';
                        idx += 1;
                    }

                    return {title:team.title, target:team.target, list:team.list}; 
                });
            }

            setTeamList(newTeamList);
        }
        
    },
    shuffleProgress: false,
    setShuffleProgress: (shuffleProgress: boolean) =>
        set((state: {shuffleProgress: boolean}) => ({
            shuffleProgress: (state.shuffleProgress = shuffleProgress),
        })),
    shuffleComplete: false,
    setShuffleComplete: (shuffleComplete: boolean) =>
        set((state: {shuffleComplete: boolean}) => ({
            shuffleComplete: (state.shuffleComplete = shuffleComplete),
        })),
    shuffleRandomChk: true,
    setShuffleRandomChk: (shuffleRandomChk: boolean) =>
        set((state: {shuffleRandomChk: boolean}) => ({
            shuffleRandomChk: (state.shuffleRandomChk = shuffleRandomChk),
        })),
    shuffleBalanceChk: false,
    setShuffleBalanceChk: (shuffleBalanceChk: boolean) =>
        set((state: {shuffleBalanceChk: boolean}) => ({
            shuffleBalanceChk: (state.shuffleBalanceChk = shuffleBalanceChk),
        })),
    shuffleOneClickChk: false,
    setShuffleOneClickChk: (shuffleOneClickChk: boolean) =>
        set((state: {shuffleOneClickChk: boolean}) => ({
            shuffleOneClickChk: (state.shuffleOneClickChk = shuffleOneClickChk),
        })),
    shuffleActiveChk: false,
    setShuffleActiveChk: (shuffleActiveChk: boolean) =>
        set((state: {shuffleActiveChk: boolean}) => ({
            shuffleActiveChk: (state.shuffleActiveChk = shuffleActiveChk),
        })),
    shuffleCompleteChk: true,
    setShuffleCompleteChk: (shuffleCompleteChk: boolean) =>
        set((state: {shuffleCompleteChk: boolean}) => ({
            shuffleCompleteChk: (state.shuffleCompleteChk = shuffleCompleteChk),
        })),
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
