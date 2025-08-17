import { create } from "zustand";

import useShuffleBaseStore from "./useShuffleBaseStore";

interface shuffleFixStore {
    fixList: {id:number, row:number, cell:number}[];
    setFixList: (fixList: {id:number, row:number, cell:number}[]) => void;
    updateFixData: (data: {checked: boolean; index: number; arrNo: number; value: number;}) => void;
}

const useShuffleFixStore = create<shuffleFixStore>((set, get) => ({
    fixList: [],
    setFixList: (fixList: {id:number, row:number, cell:number}[]) =>
        set((state: {fixList: {id:number, row:number, cell:number}[]}) => ({
            fixList: (state.fixList = fixList),
        })),
    updateFixData: (data: {checked: boolean; index: number; arrNo: number; value: number;}) => {
        if (data.checked) {
            const currentFixList = get().fixList;
            set({
                fixList: [...currentFixList, { id: data.index, row: data.arrNo, cell: data.value }],
            });
        } else {
            const currentFixList = get().fixList;
            set({
                fixList: currentFixList.filter((el) => el.id !== data.index),
            });
        }
    },
}));

export default useShuffleFixStore;
export type { shuffleFixStore };