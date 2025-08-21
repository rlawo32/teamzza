import { create } from "zustand";

import useShuffleBaseStore from "./useShuffleBaseStore";
import useShuffleFixStore from "./useShuffleFixStore";

interface shuffleTeamStore {
    teamList: {idx:number, id:string, lv:number, nm:string, tmp:any}[][];
    setTeamList: (teamList: {idx:number, id:string, lv:number, nm:string, tmp:any}[][]) => void;

    createTeam: () => void;
    insertTeam: () => void;
    deleteTeam: () => void;
    insertPlayer: () => void;
    deletePlayer: () => void;

    updateInputData: (data: {index: number; arrNo: number; input: string;}) => void;
    updateSelectData: (data: {index: number; arrNo: number; level: number;}) => void;
    
    shuffleRandom: () => void;
    shuffleBalance: () => void;
    shuffleRefresh: () => void;
    insertRollback: () => void;
    activeRollback: () => void;
}

const useShuffleTeamStore = create<shuffleTeamStore>((set, get) => ({
    teamList: [[]],
    setTeamList: (teamList: {idx:number, id:string, lv:number, nm:string, tmp:any}[][]) =>
        set((state: {teamList: {idx:number, id:string, lv:number, nm:string, tmp:any}[][]}) => ({
            teamList: (state.teamList = teamList),
        })),
    createTeam: () => {
        const {teamIdStorage, playerCount, teamCount} = useShuffleBaseStore.getState();

        let tempList:{idx:number, id:string, lv:number, nm:string, tmp:any}[][] = Array.from({length: teamCount}, () => Array.from({length: playerCount}));
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
        // 순서 blue, red, yellow, green, purple, brown, pink, orange, mint, line 
        let idx:number = 1;
        for(let i=0; i<tempList.length; i++) {
            for(let j=0; j<tempList[i].length; j++) {
                tempList[i][j] = {idx:idx, id:teamIdStorage[i]+'_'+(j+1), lv:5, nm:'', tmp:null};
                idx += 1;
            }
        }

        set({ teamList: tempList });
    },
    insertTeam: () => {
        const {teamIdStorage, playerCount, teamCount, increaseTeamCount} = useShuffleBaseStore.getState();
        const {setFixList, setRollbackList} = useShuffleFixStore.getState();

        let tempList:{idx:number, id:string, lv:number, nm:string, tmp:any}[] = [];
        
        if(teamCount < 10) {
            tempList = Array.from({length: playerCount})
            let idx:number = playerCount * teamCount + 1;
            for(let i=0; i<playerCount; i++) {
                tempList[i] = {idx:idx, id:teamIdStorage[teamCount]+'_'+(i+1), lv:5, nm:'', tmp:null};
                idx += 1;
            }

            set({ teamList: [...get().teamList, tempList] });
            increaseTeamCount();
            setFixList([]);
            setRollbackList([]);
        }
    },
    deleteTeam: () => {
        const {teamCount, decreaseTeamCount} = useShuffleBaseStore.getState();
        const {setFixList, setRollbackList} = useShuffleFixStore.getState();

        if(teamCount > 2) {
            set({ teamList: get().teamList.slice(0, -1) });
            decreaseTeamCount();
            setFixList([]);
            setRollbackList([]);
        }
    },
    insertPlayer: () => {
        const {teamIdStorage, playerCount, increasePlayerCount} = useShuffleBaseStore.getState();
        const {setFixList, setRollbackList} = useShuffleFixStore.getState();
        let idx:number = 1;

        if(playerCount < 10) {
            const newTeamList = get().teamList.map((team, teamIdx) => {
                for(let i:number=0; i<team.length; i++) {
                    team[i].idx = idx;
                    idx += 1;
                }
                const newPlayer:{idx:number, id:string, lv:number, nm:string, tmp:any} = {idx:idx, id:teamIdStorage[teamIdx]+'_'+(team.length+1), lv:5, nm:'', tmp:null};
                idx += 1;

                return [...team, newPlayer]; 
            });
            
            set({ teamList: newTeamList });
            increasePlayerCount();
            setFixList([]);
            setRollbackList([]);
        }
    },
    deletePlayer: () => {
        const {playerCount, decreasePlayerCount} = useShuffleBaseStore.getState();
        const {setFixList, setRollbackList} = useShuffleFixStore.getState();
        let idx:number = 1;

        if(playerCount > 1) {
            const newTeamList = get().teamList.map((team, teamIdx) => {
                team = team.slice(0, -1);
                for(let i:number=0; i<team.length; i++) {
                    team[i].idx = idx;
                    idx += 1;
                }

                return team; 
            });

            set({ teamList: newTeamList });
            decreasePlayerCount();
            setFixList([]);
            setRollbackList([]);
        }
    },
    updateInputData: (data: {index: number; arrNo: number; input: string;}) => {
        const currentTeamList = JSON.parse(JSON.stringify(get().teamList));
        const index = currentTeamList[data.arrNo].findIndex((item: {idx: number}) => item.idx === data.index);
        
        if (index !== -1) { 
            currentTeamList[data.arrNo][index].nm = data.input;
        }

        set({ teamList: currentTeamList });
    },
    updateSelectData: (data: {index: number; arrNo: number; level: number;}) => {
        const currentTeamList = JSON.parse(JSON.stringify(get().teamList));
        const index = currentTeamList[data.arrNo].findIndex((item: {idx: number}) => item.idx === data.index);
        
        if (index !== -1) {
            currentTeamList[data.arrNo][index].lv = data.level;
        }

        set({ teamList: currentTeamList }); 
    },
    shuffleRandom: () => {
        const copyFixList:{idx:number, id:string, row:number, cell:number, tmp:any}[] = useShuffleFixStore.getState().fixList;
        const copyTeamList:{idx:number, id:string, lv:number, nm:string, tmp:any}[][] = JSON.parse(JSON.stringify(get().teamList));
    
        for(let i=copyTeamList.length-1; i>=0; i--) { 
            for(let j=copyTeamList[i].length-1; j>=0; j--) {
                const n = Math.floor(Math.random() * (i+1));
                const m = Math.floor(Math.random() * (j+1));
                [copyTeamList[n][j], copyTeamList[i][m]] = [copyTeamList[i][m], copyTeamList[n][j]];
            }
        }

        if(copyFixList.length > 0) { 
            for(let i=0; i<copyFixList.length; i++) {
                for(let j=0; j<copyTeamList.length; j++) {
                    for(let x=0; x<copyTeamList[j].length; x++) {
                        if(j === copyFixList[i].row && x === copyFixList[i].cell) {
                            const tempBox:{idx:number, id:string, lv:number, nm:string, tmp:any} = copyTeamList[j][x];
                            let row:number = -1;
                            let cell:number = -1;
                            for(let y=0; y<copyTeamList.length; y++) {
                                cell = copyTeamList[y].findIndex((item) => item.idx === copyFixList[i].idx);
                                if(cell !== -1) {
                                    row = y;
                                    break;
                                }
                            }
                            copyTeamList[j][x] = copyTeamList[row][cell];
                            copyTeamList[row][cell] = tempBox;
                        }
                    }
                }
            }
        }

        set({ teamList: copyTeamList });
    },
    shuffleBalance: () => {
        const copyFixList:{idx:number, id:string, row:number, cell:number, tmp:any}[] = useShuffleFixStore.getState().fixList;
        const copyTeamList:{idx:number, id:string, lv:number, nm:string, tmp:any}[][] = JSON.parse(JSON.stringify(get().teamList));
        const {playerCount, teamCount} = useShuffleBaseStore.getState();
        
        const temp1DemList:{idx:number, id:string, lv:number, nm:string, tmp:any}[] = [];
        let temp2DemList:{idx:number, id:string, lv:number, nm:string, tmp:any}[][] = Array.from({length: teamCount}, () => Array.from({length: playerCount}));
        const tempCompare:{idx:number, sum:number, len:number}[] = [];

        for(let i=0; i<copyTeamList.length; i++) {
            for(let j=0; j<copyTeamList[i].length; j++) {
                if(copyTeamList[i][j].nm.length < 1) {
                    copyTeamList[i][j].lv = 1;
                }
                temp1DemList.push(copyTeamList[i][j]);
            }
        }

        for(let i=temp1DemList.length-1; i>=0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [temp1DemList[i], temp1DemList[j]] = [temp1DemList[j], temp1DemList[i]];
        }

        temp1DemList.sort((a, b) => {
            return b.lv - a.lv;
        });


        for(let i=0; i<teamCount; i++) {
            tempCompare[i] = {idx:i, sum:0, len:temp2DemList[i].length};
        }

        let tmpIdx:number = 0;

        for(let i=0; i<playerCount; i++) {
            tempCompare.sort((a, b) => {
                return a.sum - b.sum;
            });
            for(let j=0; j<teamCount; j++) {
                if(temp2DemList[tempCompare[j].idx].length-1 >= i) {
                    temp2DemList[tempCompare[j].idx][i] = temp1DemList[tmpIdx++];
                }
            }
            for(let j=0; j<teamCount; j++) {
                if(temp2DemList[tempCompare[j].idx].length-1 >= i) {
                    tempCompare[j].sum += temp2DemList[tempCompare[j].idx][i].lv;   
                }
            }
        }
        
        for(let i=0; i<copyTeamList.length; i++) {
            for(let j=0; j<copyTeamList[i].length; j++) {
                if(copyTeamList[i][j].nm.length < 1) {
                    copyTeamList[i][j].lv = 5;
                }
            }
        }

        if(copyFixList.length > 0) { 
            for(let i=0; i<copyFixList.length; i++) {
                for(let j=0; j<temp2DemList.length; j++) {
                    for(let x=0; x<temp2DemList[j].length; x++) {
                        if(j === copyFixList[i].row && x === copyFixList[i].cell) {
                            const tempBox:{idx:number, id:string, lv:number, nm:string, tmp:any} = temp2DemList[j][x];
                            let row:number = -1;
                            let cell:number = -1;
                            for(let y=0; y<temp2DemList.length; y++) {
                                cell = temp2DemList[y].findIndex((item) => item.id === copyFixList[i].id);
                                if(cell !== -1) {
                                    row = y;
                                    break;
                                }
                            }
                            temp2DemList[j][x] = temp2DemList[row][cell];
                            temp2DemList[row][cell] = tempBox;
                        }
                    }
                }
            }
        }

        set({ teamList: temp2DemList });
    },
    shuffleRefresh: () => {
        const {setTeamCount, setPlayerCount, setShuffleCount, setShuffleTime, setReduceTime, setRollbackCount} = useShuffleBaseStore.getState();
        const {setFixList, setRollbackList} = useShuffleFixStore.getState();
        const {setTeamList, createTeam} = get();

        setTeamList([[]]);
        setFixList([]);
        setRollbackList([]);
        setTeamCount(2);
        setPlayerCount(5);
        setShuffleCount(0);
        setShuffleTime(5000);
        setReduceTime(200);
        setRollbackCount(0);
        createTeam();
    },
    insertRollback: () => {
        const {updateRollbackData} = useShuffleFixStore.getState();
        updateRollbackData(get().teamList);
    },
    activeRollback: () => {
        const {rollbackCount} = useShuffleBaseStore.getState();
        const {rollbackList, deleteRollbackData} = useShuffleFixStore.getState();

        if(rollbackList.length > 0) {         
            set({ teamList: rollbackList[rollbackCount-1].arr });

            deleteRollbackData();
        }
    },
}));

export default useShuffleTeamStore;
export type { shuffleTeamStore };
