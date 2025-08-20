import { create } from "zustand";

import useShuffleBaseStore from "./useShuffleBaseStore";

interface shuffleFixStore {
    fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[];
    setFixList: (fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]) => void;
    rollbackList: {id:string, idx:number, arr:{idx:number, id:string, lv:number, nm:string, tmp:any}[][]}[];
    setRollbackList: (rollbackList: {id:string, idx:number, arr:{idx:number, id:string, lv:number, nm:string, tmp:any}[][]}[]) => void;
    
    updateFixData: (data: {checked:boolean; index:number; id:string, arrNo:number; value:number; tmp:any;}) => void;
    updateRollbackData: (data: {idx:number, id:string, lv:number, nm:string, tmp:any}[][]) => void;
    deleteRollbackData: () => void;
}

const useShuffleFixStore = create<shuffleFixStore>((set, get) => ({
    fixList: [],
    setFixList: (fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]) =>
        set((state: {fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]}) => ({
            fixList: (state.fixList = fixList),
        })),
    rollbackList: [],
    setRollbackList: (rollbackList: {id:string, idx:number, arr:{idx:number, id:string, lv:number, nm:string, tmp:any}[][]}[]) =>
        set((state: {rollbackList: {id:string, idx:number, arr:{idx:number, id:string, lv:number, nm:string, tmp:any}[][]}[]}) => ({
            rollbackList: (state.rollbackList = rollbackList),
        })),
    updateFixData: (data: {checked:boolean; index:number; id:string; arrNo:number; value:number;}) => {
        if (data.checked) {
            const currentFixList = get().fixList;
            set({
                fixList: [...currentFixList, { idx: data.index, id: data.id, row: data.arrNo, cell: data.value, tmp:null }],
            });
        } else {
            const currentFixList = get().fixList;
            set({
                fixList: currentFixList.filter((el) => el.idx !== data.index),
            });
        }
    },
    updateRollbackData: (data: {idx:number, id:string, lv:number, nm:string, tmp:any}[][]) => {
        const {rollbackCount, increaseRollbackCount} = useShuffleBaseStore.getState();
        const currentRollbackList = get().rollbackList;
        set({
            rollbackList: [...currentRollbackList, { id:'rb_'+(rollbackCount+1), idx:rollbackCount+1, arr:data }],
        });
        increaseRollbackCount();
    },
    deleteRollbackData: () => {
        const {decreaseRollbackCount} = useShuffleBaseStore.getState();
        const currentRollbackList = get().rollbackList;
        if(currentRollbackList.length > 0) {
            set({ 
                rollbackList: currentRollbackList.slice(0, -1) 
            });
        }
        decreaseRollbackCount();
    },
}));

export default useShuffleFixStore;
export type { shuffleFixStore };
