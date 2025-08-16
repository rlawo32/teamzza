import { create } from "zustand";

interface shuffleArrayStore {
    activeProgressTab: string;
    setActiveProgressTab: (tabId: string) => void;
    inputMemberEmail: string;
    setInputMemberEmail: (email: string) => void;
    inputTermsAgree: object;
    setInputTermsAgree: (termsAgree: object) => void;
}

const useShuffleArrayStore = create<shuffleArrayStore>((set) => ({
    // 임시
    activeProgressTab: "joinProgress1",
    setActiveProgressTab: (tabId: string) =>
        set((state: {activeProgressTab: string}) => ({
            activeProgressTab: (state.activeProgressTab = tabId),
        })),
    inputMemberEmail: "",
    setInputMemberEmail: (email: string) =>
        set((state: {inputMemberEmail: string}) => ({
            inputMemberEmail: (state.inputMemberEmail = email),
        })),
    inputTermsAgree: {},
    setInputTermsAgree: (termsAgree: object) =>
        set((state: {inputTermsAgree: object}) => ({
            inputTermsAgree: (state.inputTermsAgree = termsAgree),
        })),
}));

export default useShuffleArrayStore;
export type { shuffleArrayStore };