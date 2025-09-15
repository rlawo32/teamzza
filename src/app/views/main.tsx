'use client'

import * as Style from "./main.style";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil as pencil } from "@fortawesome/free-solid-svg-icons";

import useShuffleBaseStore from "../stores/useShuffleBaseStore";
import useShuffleTeamStore from "../stores/useShuffleTeamStore";
import useShuffleListStore from "../stores/useShuffleListStore";

import LevelBox from "./levelBox"
import ControlBox from "./controlBox";
import AutoBox from "./autoBox";
import CompleteBox from "./completeBox";

const Main = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLDivElement[]>([]);
    const captureRef = useRef<HTMLDivElement>(null);

    const { teamList, createTeam, insertTeam, deleteTeam, insertPlayer, deletePlayer, activeLocalLoad } = useShuffleTeamStore();
    const { shuffleProgress, playerCount, teamCount, rollbackCount } = useShuffleBaseStore();
    const { fixList, rollbackList } = useShuffleListStore();

    const updateTitleData = useShuffleTeamStore((state) => state.updateTitleData);
    const updateTargetData = useShuffleTeamStore((state) => state.updateTargetData);
    const updateTargetAllData = useShuffleTeamStore((state) => state.updateTargetAllData);
    const updateInputData = useShuffleTeamStore((state) => state.updateInputData);
    const updateSelectData = useShuffleTeamStore((state) => state.updateSelectData);
    const updateFixData = useShuffleListStore((state) => state.updateFixData);

    const [isModal, setIsModal] = useState<boolean>(false);

    const insertTitle = () => {
        if (titleRef.current) {
            titleRef.current.blur();
            updateTargetAllData({target:false});
        }
    }
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('LastList');
            data ? activeLocalLoad() : createTeam();
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (titleRef.current && !titleRef.current.contains(event.target as Node)) {
                insertTitle();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        let current:number = 0;
        let timeoutId:NodeJS.Timeout;

        const animate = () => {
            inputRef.current.forEach(el => el?.classList.remove('scale-up', 'scale-down'));

            const el:HTMLDivElement|null = inputRef.current[current];
            if(el) {
                el.classList.add('scale-up');
                setTimeout(() => el.classList.replace('scale-up', 'scale-down'), 60);
            }

            current++;

            if(current < inputRef.current.length) {
                timeoutId = setTimeout(animate, 60);
            } else {
                current = 0;
                timeoutId = setTimeout(animate, 1500);
            }
        };

        if(shuffleProgress) {
            animate();
        }

        return () => clearTimeout(timeoutId);
    }, [shuffleProgress]);

    return (
        <Style.MatchShuffle $teamCnt={teamCount} $playerCnt={playerCount}>
            <AutoBox isModal={isModal} setIsModal={setIsModal} />
            <CompleteBox />
            <Style.ControlSection $pos="top" $teamCnt={teamCount} $playerCnt={playerCount}>
                <div className="button_section">
                    <button onClick={() => insertTeam()}>그룹 추가</button>
                    <button onClick={() => deleteTeam()}>그룹 삭제</button>
                    <button onClick={() => insertPlayer()}>그룹원 추가</button>
                    <button onClick={() => deletePlayer()}>그룹원 삭제</button>
                    <button onClick={() => setIsModal(true)}>자동 입력</button>
                </div>
            </Style.ControlSection>
            <div className="list_section" ref={captureRef}>
                {teamList.map((parent, idx1) => (
                    <div key={idx1} className="list_wrap" id={idx1 + "_t"}>
                        <div className="list_parent">
                            <Style.ListParent $camp={idx1} $idx={idx1+1} $teamCnt={teamCount} $playerCnt={playerCount} $shuffle={shuffleProgress}>
                                <Style.GroupCampStyle $camp={idx1}>
                                    <div className="list_title">
                                        {
                                            parent.target ? <input onChange={(e) => updateTitleData({arrNo:idx1, title:e.target.value})} value={parent.title} 
                                                                type="text" ref={titleRef} autoFocus={true} spellCheck={false} 
                                                                onKeyDown={(e) => {if (e.key === 'Enter') { insertTitle(); }}} /> : parent.title
                                        }
                                    </div>
                                    {
                                        parent.target ? <></> : 
                                            <button onClick={() => updateTargetData({arrNo:idx1, target:true})}>
                                                <FontAwesomeIcon icon={pencil} className="btn_icon" />
                                            </button>
                                    }
                                </Style.GroupCampStyle>
                                {parent.list.map((child, idx2) => (
                                    <div className="list_child" key={idx2}>
                                        <Style.ListChild $idx={(idx1*playerCount)+(idx2+1)} $teamCnt={teamCount} $playerCnt={playerCount} ref={el => {if (el) inputRef.current[(idx1*playerCount)+idx2] = el;}}>
                                            <Style.InputWrapperStyle $camp={idx1} $idx={String(idx1*playerCount)+(idx2+1)} $teamCnt={teamCount} $playerCnt={playerCount} $shuffle={shuffleProgress}>
                                                <Style.InputPlayerStyle onChange={(e) => updateInputData({index:child.idx, arrNo:idx1, input:e.target.value})} value={child.nm} placeholder="플레이어 입력"
                                                            type="text" id={"input_" + child.id} spellCheck={false} $camp={idx1} $teamCnt={teamCount} $playerCnt={playerCount} tabIndex={(idx1*playerCount)+(idx2+1)} />
                                                <div className="dot" />
                                            </Style.InputWrapperStyle>
                                            <div className="list_check">
                                                <Style.CheckStyle onChange={(e) => updateFixData({checked:e.target.checked, index:child.idx, id:child.id, arrNo:idx1, value:idx2, tmp:null})} 
                                                            checked={fixList.some(data => data.idx === child.idx) ? true : false} type="checkbox" id={"chkbx" + child.id}  $teamCnt={teamCount} $playerCnt={playerCount} />
                                                <Style.LabelStyle htmlFor={"chkbx" + child.id} className="check_box" $teamCnt={teamCount} $playerCnt={playerCount}>
                                                    고정
                                                </Style.LabelStyle>
                                            </div>
                                        </Style.ListChild>
                                        <LevelBox updateSelectData={updateSelectData} inputData={child} inputIdx={idx1} teamCnt={teamCount} playerCnt={playerCount} />
                                    </div>
                                ))}
                            </Style.ListParent>
                        </div>
                    </div>
                ))}
            </div>
            <Style.ControlSection $pos="bottom" $teamCnt={teamCount} $playerCnt={playerCount}>
                <ControlBox captureRef={captureRef} />
            </Style.ControlSection>
        </Style.MatchShuffle>
    )
}

export default Main;
