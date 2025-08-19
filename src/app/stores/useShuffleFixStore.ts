import { create } from "zustand";

import useShuffleBaseStore from "./useShuffleBaseStore";

interface shuffleFixStore {
    fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[];
    setFixList: (fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]) => void;
    tempList: {id:string, idx:number, arr:{idx:number, id:string, lv:number, nm:string, tmp:any}[][]}[];
    setTempList: (tempList: {id:string, idx:number, arr:{idx:number, id:string, lv:number, nm:string, tmp:any}[][]}[]) => void;
    
    updateFixData: (data: {checked:boolean; index:number; id:string, arrNo:number; value:number; tmp:any;}) => void;
    updateTempData: (data: {idx:number, id:string, lv:number, nm:string, tmp:any}[][]) => void;
    deleteTempData: () => void;
}

const useShuffleFixStore = create<shuffleFixStore>((set, get) => ({
    fixList: [],
    setFixList: (fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]) =>
        set((state: {fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]}) => ({
            fixList: (state.fixList = fixList),
        })),
    tempList: [],
    setTempList: (tempList: {id:string, idx:number, arr:{idx:number, id:string, lv:number, nm:string, tmp:any}[][]}[]) =>
        set((state: {tempList: {id:string, idx:number, arr:{idx:number, id:string, lv:number, nm:string, tmp:any}[][]}[]}) => ({
            tempList: (state.tempList = tempList),
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
    updateTempData: (data: {idx:number, id:string, lv:number, nm:string, tmp:any}[][]) => {
        const {rollbackCount, insertRollbackCount} = useShuffleBaseStore.getState();
        const currentTempList = get().tempList;
        set({
            tempList: [...currentTempList, { id:'rb_'+rollbackCount, idx:rollbackCount, arr:data }],
        });
        insertRollbackCount();
    },
    deleteTempData: () => {
        const {deleteRollbackCount} = useShuffleBaseStore.getState();
        const currentTempList = get().tempList;
        if(currentTempList.length > 0) {
            set({ 
                tempList: currentTempList.slice(0, -1) 
            });
        }
        deleteRollbackCount();
    },
}));

export default useShuffleFixStore;
export type { shuffleFixStore };
