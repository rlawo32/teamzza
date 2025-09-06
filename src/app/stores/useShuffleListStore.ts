import { create } from "zustand";

import useShuffleBaseStore from "./useShuffleBaseStore";

interface shuffleListStore {
    autoList: {cnt:number, raw:string};
    setAutoList: (autoList: {cnt:number, raw:string}) => void;
    fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[];
    setFixList: (fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]) => void;
    rollbackList: {id:string, idx:number, arr:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]}[];
    setRollbackList: (rollbackList: {id:string, idx:number, arr:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]}[]) => void;
    
    updateAutoData: (data: {type:string, value:any}) => void;
    updateFixData: (data: {checked:boolean; index:number; id:string, arrNo:number; value:number; tmp:any;}) => void;
    updateRollbackData: (data: {title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]) => void;
    deleteRollbackData: () => void;
}

const useShuffleListStore = create<shuffleListStore>((set, get) => ({
    autoList: {cnt:5, raw:''},
    setAutoList: (autoList: {cnt:number, raw:string}) =>
        set((state: {autoList: {cnt:number, raw:string}}) => ({
            autoList: (state.autoList = autoList),
        })),
    updateAutoData: (data: {type:string, value:any}) => {
        const currentAutoList:{cnt:number, raw:string} = get().autoList;
        if (data.type === 'cnt') {
            currentAutoList.cnt = data.value;
            set({
                autoList: currentAutoList,
            });
        } else {
            currentAutoList.raw = data.value;
            set({
                autoList: currentAutoList,
            });
        }
    },
    fixList: [],
    setFixList: (fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]) =>
        set((state: {fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]}) => ({
            fixList: (state.fixList = fixList),
        })),
    updateFixData: (data: {checked:boolean; index:number; id:string; arrNo:number; value:number;}) => {
        const currentFixList: {idx:number, id:string, row:number, cell:number, tmp:any}[] = get().fixList;
        if (data.checked) {
            set({
                fixList: [...currentFixList, { idx: data.index, id: data.id, row: data.arrNo, cell: data.value, tmp:null }],
            });
        } else {
            set({
                fixList: currentFixList.filter((el) => el.idx !== data.index),
            });
        }
    },
    rollbackList: [],
    setRollbackList: (rollbackList: {id:string, idx:number, arr:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]}[]) =>
        set((state: {rollbackList: {id:string, idx:number, arr:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]}[]}) => ({
            rollbackList: (state.rollbackList = rollbackList),
        })),
    updateRollbackData: (data: {title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]) => {
        const {rollbackCount, increaseRollbackCount} = useShuffleBaseStore.getState();
        const currentRollbackList:{id:string, idx:number, arr:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]}[] = get().rollbackList;
        set({
            rollbackList: [...currentRollbackList, { id:'rb_'+(rollbackCount+1), idx:rollbackCount+1, arr:data }],
        });
        increaseRollbackCount();
    },
    deleteRollbackData: () => {
        const {decreaseRollbackCount} = useShuffleBaseStore.getState();
        const currentRollbackList:{id:string, idx:number, arr:{title:string, target:boolean, list: {idx:number, id:string, lv:number, nm:string, tmp:any}[]}[]}[] = get().rollbackList;
        if(currentRollbackList.length > 0) {
            set({ 
                rollbackList: currentRollbackList.slice(0, -1) 
            });
        }
        decreaseRollbackCount();
    },
}));

export default useShuffleListStore;
export type { shuffleListStore };
