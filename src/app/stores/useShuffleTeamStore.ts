import { create } from "zustand";

import useShuffleBaseStore from "./useShuffleBaseStore";

interface shuffleTeamStore {
    teams: {id:number, lv:number, nm:string}[][];
    setTeams: (teams: {id:number, lv:number, nm:string}[][]) => void;

    createTeam: () => void;
    updateInputData: (data: {index: number; arrNo: number; value: string;}) => void;
    updateSelectData: (data: {index: number; arrNo: number; value: number;}) => void;
}

const useShuffleTeamStore = create<shuffleTeamStore>((set, get) => ({
    teams: [[]],
    setTeams: (teams: {id:number, lv:number, nm:string}[][]) =>
        set((state: {teams: {id:number, lv:number, nm:string}[][]}) => ({
            teams: (state.teams = teams),
        })),
    createTeam: () => {
        const {playerCount, teamCount} = useShuffleBaseStore.getState();
        const composition = (playerCount * teamCount) / teamCount;

        let temp2DemList:{id:number, lv:number, nm:string}[][] = Array.from({length: teamCount}, () => Array.from({length: composition}));
/*
        if(realPlayerCount % realTeamCount !== 0) {
            let tempComposition:number = Math.ceil(realPlayerCount/realTeamCount);
            let tempPersonnel:number = realPlayerCount;
            const cellArray:number[] = [];
            let idx:number = 0;
            
            for(let i=1; i<=realTeamCount; i++) {
                cellArray[idx++] = tempComposition;
                tempPersonnel -= tempComposition;
                if((realTeamCount - i) === 2 && tempPersonnel % 2 === 0) {
                    tempComposition = tempPersonnel / 2;
                } else if((realTeamCount - i) === 3 && tempPersonnel % 3 === 0) {
                    tempComposition = tempPersonnel / 3;
                } else if((realTeamCount - i) === 1) {
                    tempComposition = tempPersonnel;
                }
            }

            temp2DemList = [];
            temp2DemList = Array.from({length: realTeamCount});

            for(let i=0; i<realTeamCount; i++) {
                temp2DemList[i] = Array.from({length: cellArray[i]});
            }
        }
*/
        for(let i=0; i<temp2DemList.length; i++) {
            let plus:number = 1;
            for(let j=0; j<temp2DemList[i].length; j++) {
                temp2DemList[i][j] = {id:i+plus, lv:5, nm:''};
                plus += teamCount;
            }
        }    

        set({ teams: temp2DemList });
    },
    updateInputData: (data: {index: number; arrNo: number; value: string;}) => {
        const state = get(); 
        const copyTempDataList = JSON.parse(JSON.stringify(state.teams));
        const index = copyTempDataList[data.arrNo].findIndex((item: {id: number}) => item.id === data.index);
        
        if (index !== -1) { 
            copyTempDataList[data.arrNo][index].nm = data.value;
        }

        set({ teams: copyTempDataList });
    },
    updateSelectData: (data: {index: number; arrNo: number; value: number;}) => {
        const state = get(); 
        const copyTempDataList = JSON.parse(JSON.stringify(state.teams));
        const index = copyTempDataList[data.arrNo].findIndex((item: {id: number}) => item.id === data.index);
        
        if (index !== -1) {
            copyTempDataList[data.arrNo][index].lv = data.value;
        }

        set({ teams: copyTempDataList }); 
    },
}));

export default useShuffleTeamStore;
export type { shuffleTeamStore };