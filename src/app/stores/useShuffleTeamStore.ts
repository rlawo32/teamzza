import { create } from "zustand";

import useShuffleBaseStore from "./useShuffleBaseStore";
import useShuffleListStore from "./useShuffleListStore";

interface shuffleTeamStore {
    teamList: {title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[];
    setTeamList: (teamList: {title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]) => void;

    createTeam: () => void;
    insertTeam: () => void;
    deleteTeam: () => void;
    insertPlayer: () => void;
    deletePlayer: () => void;

    updateTitleData: (data: {arrNo: number; title: string;}) => void;
    updateTargetData: (data: {arrNo: number; target: boolean;}) => void;
    updateTargetAllData: (data: {target: boolean;}) => void;
    updateInputData: (data: {index: number; arrNo: number; input: string;}) => void;
    updateSelectData: (data: {index: number; arrNo: number; level: number;}) => void;
    
    shuffleRandom: () => void;
    shuffleBalance: () => void;
    shuffleReset: () => void;
    shuffleClean: () => void;
    insertRollback: () => void;
    activeRollback: () => void;
    activeAutoInput: () => void;
    activeLocalSave: () => void;
    activeLocalLoad: () => void;
}

const useShuffleTeamStore = create<shuffleTeamStore>((set, get) => ({
    teamList: [],
    setTeamList: (teamList: {title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]) =>
        set((state: {teamList: {title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]}) => ({
            teamList: (state.teamList = teamList),
        })),
    createTeam: () => {
        const {teamTitleStorage, teamIdStorage, playerCount, teamCount} = useShuffleBaseStore.getState();

        const tempList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = Array.from({ length: teamCount }, () => ({title: '', target:false, list: Array.from({ length: playerCount })}));
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
            tempList[i].title = teamTitleStorage[i];
            for(let j=0; j<tempList[i].list.length; j++) {
                tempList[i].list[j] = {idx:idx, id:teamIdStorage[i]+'_'+(j+1), lv:5, nm:'', tmp:null};
                idx += 1;
            }
        }

        set({ teamList: tempList });
    },
    insertTeam: () => {
        const {teamTitleStorage, teamIdStorage, playerCount, teamCount, increaseTeamCount} = useShuffleBaseStore.getState();

        const tempList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]} = {title:teamTitleStorage[teamCount], target:false, list:Array.from({length: playerCount})};
        
        if(teamCount < 10) {
            let idx:number = playerCount * teamCount + 1;
            for(let i=0; i<playerCount; i++) {
                tempList.list[i] = {idx:idx, id:teamIdStorage[teamCount]+'_'+(i+1), lv:5, nm:'', tmp:null};
                idx += 1;
            }

            set({ teamList: [...get().teamList, tempList] });
            increaseTeamCount();
            get().shuffleClean();
        }
    },
    deleteTeam: () => {
        const {teamCount, decreaseTeamCount} = useShuffleBaseStore.getState();

        if(teamCount > 2) {
            set({ teamList: get().teamList.slice(0, -1) });
            decreaseTeamCount();
            get().shuffleClean();
        }
    },
    insertPlayer: () => {
        const {teamIdStorage, playerCount, increasePlayerCount} = useShuffleBaseStore.getState();
        let idx:number = 1;

        if(playerCount < 10) {
            const newTeamList = get().teamList.map((team, teamIdx) => {
                for(let i:number=0; i<team.list.length; i++) {
                    team.list[i].idx = idx;
                    idx += 1;
                }
                const newPlayer:{idx:number, id:string, lv:number, nm:string, tmp:any} = {idx:idx, id:teamIdStorage[teamIdx]+'_'+(team.list.length+1), lv:5, nm:'', tmp:null};
                idx += 1;

                return {title:team.title, target:team.target, list:[...team.list, newPlayer]}; 
            });
            
            set({ teamList: newTeamList });
            increasePlayerCount();
            get().shuffleClean();
        }
    },
    deletePlayer: () => {
        const {playerCount, decreasePlayerCount} = useShuffleBaseStore.getState();
        let idx:number = 1;

        if(playerCount > 1) {
            const newTeamList = get().teamList.map((team, teamIdx) => {
                team.list = team.list.slice(0, -1);
                for(let i:number=0; i<team.list.length; i++) {
                    team.list[i].idx = idx;
                    idx += 1;
                }

                return team; 
            });

            set({ teamList: newTeamList });
            decreasePlayerCount();
            get().shuffleClean();
        }
    },
    updateTitleData: (data: {arrNo: number; title: string;}) => {
        const currentTeamList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = JSON.parse(JSON.stringify(get().teamList));
        
        currentTeamList[data.arrNo].title = data.title;

        set({ teamList: currentTeamList });
    },
    updateTargetData: (data: {arrNo: number; target: boolean;}) => {
        const currentTeamList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = JSON.parse(JSON.stringify(get().teamList));
        
        currentTeamList[data.arrNo].target = data.target;

        set({ teamList: currentTeamList });
    },
    updateTargetAllData: (data: {target: boolean;}) => {
        const currentTeamList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = JSON.parse(JSON.stringify(get().teamList));
        
        for(let i:number=0; i<currentTeamList.length; i++) {
            currentTeamList[i].target = data.target;
        }

        set({ teamList: currentTeamList });
    },
    updateInputData: (data: {index: number; arrNo: number; input: string;}) => {
        const currentTeamList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = JSON.parse(JSON.stringify(get().teamList));
        const index = currentTeamList[data.arrNo].list.findIndex((item: {idx: number}) => item.idx === data.index);
        
        if (index !== -1) { 
            currentTeamList[data.arrNo].list[index].nm = data.input;
        }

        set({ teamList: currentTeamList });
    },
    updateSelectData: (data: {index: number; arrNo: number; level: number;}) => {
        const currentTeamList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = JSON.parse(JSON.stringify(get().teamList));
        const index = currentTeamList[data.arrNo].list.findIndex((item: {idx: number}) => item.idx === data.index);
        
        if (index !== -1) {
            currentTeamList[data.arrNo].list[index].lv = data.level;
        }

        set({ teamList: currentTeamList }); 
    },
    shuffleRandom: () => {
        const copyFixList:{idx:number, id:string, row:number, cell:number, tmp:any}[] = useShuffleListStore.getState().fixList;
        const copyTeamList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = JSON.parse(JSON.stringify(get().teamList));
    
        for(let i=copyTeamList.length-1; i>=0; i--) { 
            for(let j=copyTeamList[i].list.length-1; j>=0; j--) {
                const n = Math.floor(Math.random() * (i+1));
                const m = Math.floor(Math.random() * (j+1));
                [copyTeamList[n].list[j], copyTeamList[i].list[m]] = [copyTeamList[i].list[m], copyTeamList[n].list[j]];
            }
        }

        if(copyFixList.length > 0) { 
            for(let i=0; i<copyFixList.length; i++) {
                for(let j=0; j<copyTeamList.length; j++) {
                    for(let x=0; x<copyTeamList[j].list.length; x++) {
                        if(j === copyFixList[i].row && x === copyFixList[i].cell) {
                            const tempBox:{idx:number, id:string, lv:number, nm:string, tmp:any} = copyTeamList[j].list[x];
                            let row:number = -1;
                            let cell:number = -1;
                            for(let y=0; y<copyTeamList.length; y++) {
                                cell = copyTeamList[y].list.findIndex((item) => item.idx === copyFixList[i].idx);
                                if(cell !== -1) {
                                    row = y;
                                    break;
                                }
                            }
                            copyTeamList[j].list[x] = copyTeamList[row].list[cell];
                            copyTeamList[row].list[cell] = tempBox;
                        }
                    }
                }
            }
        }

        set({ teamList: copyTeamList });
    },
    shuffleBalance: () => {
        const copyFixList:{idx:number, id:string, row:number, cell:number, tmp:any}[] = useShuffleListStore.getState().fixList;
        const copyTeamList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = JSON.parse(JSON.stringify(get().teamList));
        const {playerCount, teamCount} = useShuffleBaseStore.getState();
        
        const temp1DemList:{idx:number, id:string, lv:number, nm:string, tmp:any}[] = [];
        const temp2DemList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = Array.from({ length: teamCount }, () => ({title: '', target:false, list: Array.from({ length: playerCount })}));
        const tempCompare:{idx:number, sum:number, len:number}[] = [];

        for(let i=0; i<copyTeamList.length; i++) {
            for(let j=0; j<copyTeamList[i].list.length; j++) {
                if(copyTeamList[i].list[j].nm.length < 1) {
                    copyTeamList[i].list[j].lv = 1;
                }
                temp1DemList.push(copyTeamList[i].list[j]);
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
            tempCompare[i] = {idx:i, sum:0, len:temp2DemList[i].list.length};
        }

        let tmpIdx:number = 0;

        for(let i=0; i<playerCount; i++) {
            tempCompare.sort((a, b) => {
                return a.sum - b.sum;
            });
            for(let j=0; j<teamCount; j++) {
                temp2DemList[tempCompare[j].idx].title = copyTeamList[tempCompare[j].idx].title;
                temp2DemList[tempCompare[j].idx].target = copyTeamList[tempCompare[j].idx].target;
                if(temp2DemList[tempCompare[j].idx].list.length-1 >= i) {
                    temp2DemList[tempCompare[j].idx].list[i] = temp1DemList[tmpIdx++];
                }
            }
            for(let j=0; j<teamCount; j++) {
                if(temp2DemList[tempCompare[j].idx].list.length-1 >= i) {
                    tempCompare[j].sum += temp2DemList[tempCompare[j].idx].list[i].lv;   
                }
            }
        }
        
        for(let i=0; i<copyTeamList.length; i++) {
            for(let j=0; j<copyTeamList[i].list.length; j++) {
                if(copyTeamList[i].list[j].nm.length < 1) {
                    copyTeamList[i].list[j].lv = 5;
                }
            }
        }

        if(copyFixList.length > 0) { 
            for(let i=0; i<copyFixList.length; i++) {
                for(let j=0; j<temp2DemList.length; j++) {
                    for(let x=0; x<temp2DemList[j].list.length; x++) {
                        if(j === copyFixList[i].row && x === copyFixList[i].cell) {
                            const tempBox:{idx:number, id:string, lv:number, nm:string, tmp:any} = temp2DemList[j].list[x];
                            let row:number = -1;
                            let cell:number = -1;
                            for(let y=0; y<temp2DemList.length; y++) {
                                cell = temp2DemList[y].list.findIndex((item) => item.id === copyFixList[i].id);
                                if(cell !== -1) {
                                    row = y;
                                    break;
                                }
                            }
                            temp2DemList[j].list[x] = temp2DemList[row].list[cell];
                            temp2DemList[row].list[cell] = tempBox;
                        }
                    }
                }
            }
        }

        set({ teamList: temp2DemList });
    },
    shuffleReset: () => { // 완전 초기화
        const {setTeamCount, setPlayerCount, setShuffleCount, setShuffleTime, setReduceTime, setRollbackCount, setShuffleRandomChk, setShuffleBalanceChk, setShuffleOneClickChk} = useShuffleBaseStore.getState();
        const {setFixList, setRollbackList} = useShuffleListStore.getState();
        const {setTeamList, createTeam} = get();

        localStorage.removeItem('LastList');
        setTeamList([]);
        setFixList([]);
        setRollbackList([]);
        setTeamCount(2);
        setPlayerCount(5);
        setShuffleCount(0);
        setShuffleTime(5000);
        setReduceTime(200);
        setRollbackCount(0);
        setShuffleRandomChk(true);
        setShuffleBalanceChk(false);
        setShuffleOneClickChk(false);
        createTeam();
    },
    shuffleClean: () => { // 부분 초기화
        const {setShuffleCount, setRollbackCount} = useShuffleBaseStore.getState();
        const {setFixList, setRollbackList} = useShuffleListStore.getState();

        setFixList([]);
        setRollbackList([]);
        setShuffleCount(0);
        setRollbackCount(0);
    },
    insertRollback: () => {
        const {updateRollbackData} = useShuffleListStore.getState();
        updateRollbackData(get().teamList);
    },
    activeRollback: () => {
        const {rollbackCount} = useShuffleBaseStore.getState();
        const {rollbackList, deleteRollbackData} = useShuffleListStore.getState();

        if(rollbackList.length > 0) {         
            set({ teamList: rollbackList[rollbackCount-1].arr });

            deleteRollbackData();
        }
    },
    activeAutoInput: () => {
        const {teamTitleStorage, teamIdStorage, setPlayerCount, setTeamCount} = useShuffleBaseStore.getState();
        const {autoList} = useShuffleListStore.getState();

        const autoPlayerList:string[] = autoList.raw.split(/[,\s\/|]+/).filter(Boolean);
        const autoPlayerCount:number = autoList.cnt;
        const autoTeamCount:number = Math.ceil(autoPlayerList.length / autoList.cnt);

        setPlayerCount(autoPlayerCount);
        setTeamCount(autoTeamCount);

        const tempList:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = Array.from({ length: autoTeamCount }, () => ({title: '', target:false, list: Array.from({ length: autoPlayerCount })}));
        
        let idx:number = 1;
        for(let i=0; i<tempList.length; i++) {
            tempList[i].title = teamTitleStorage[i];
            for(let j=0; j<tempList[i].list.length; j++) {
                tempList[i].list[j] = {idx:idx, id:teamIdStorage[i]+'_'+(j+1), lv:5, nm:autoPlayerList[idx-1], tmp:null};
                idx += 1;
            }
        }

        set({ teamList: tempList });
    },
    activeLocalSave: () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('LastList', JSON.stringify(get().teamList));
        }
    },
    activeLocalLoad: () => {
        const {setPlayerCount, setTeamCount} = useShuffleBaseStore.getState();
        if (typeof window !== 'undefined') {
            const data:string|null = localStorage.getItem('LastList');
            if(data) {
                const parsedData:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[] = JSON.parse(data);
                setTeamCount(parsedData.length);
                setPlayerCount(parsedData[0].list.length);
                set({ teamList: parsedData });
            } else {
                setTeamCount(2);
                setPlayerCount(5);
                set({ teamList: [] });
            }
        }
    },
}));

export default useShuffleTeamStore;
export type { shuffleTeamStore };
