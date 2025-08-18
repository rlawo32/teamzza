import { create } from "zustand";

interface shuffleFixStore {
    fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[];
    setFixList: (fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]) => void;
    
    updateFixData: (data: {checked:boolean; index:number; id:string, arrNo:number; value:number; tmp:any;}) => void;
}

const useShuffleFixStore = create<shuffleFixStore>((set, get) => ({
    fixList: [],
    setFixList: (fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]) =>
        set((state: {fixList: {idx:number, id:string, row:number, cell:number, tmp:any}[]}) => ({
            fixList: (state.fixList = fixList),
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
}));

export default useShuffleFixStore;
export type { shuffleFixStore };
