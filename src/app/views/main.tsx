'use client'

import * as Style from "./main.style";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPencil as pencil} from "@fortawesome/free-solid-svg-icons";

import useShuffleBaseStore from "./useShuffleBaseStore";
import useShuffleTeamStore from "./useShuffleTeamStore";
import useShuffleFixStore from "./useShuffleFixStore";

import SelectBox from "./selectBox"
import ControlBox from "./controlBox";
import AutoBox from "./autoBox";

const Main = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { teamList, createTeam, insertTeam, deleteTeam, insertPlayer, deletePlayer } = useShuffleTeamStore();
    const { playerCount, teamCount, rollbackCount } = useShuffleBaseStore();
    const { fixList, rollbackList } = useShuffleFixStore();

    const updateTitleData = useShuffleTeamStore((state) => state.updateTitleData);
    const updateTargetData = useShuffleTeamStore((state) => state.updateTargetData);
    const updateTargetAllData = useShuffleTeamStore((state) => state.updateTargetAllData);
    const updateInputData = useShuffleTeamStore((state) => state.updateInputData);
    const updateSelectData = useShuffleTeamStore((state) => state.updateSelectData);
    const updateFixData = useShuffleFixStore((state) => state.updateFixData);

    const [isModal, setIsModal] = useState<boolean>(false);
    
    useEffect(() => {
        createTeam();
    }, [])

    useEffect(() => {
        console.log(playerCount);
    }, [teamList])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                inputRef.current.blur();
                updateTargetAllData({target:false});
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    /* 
        명단 변환
        명단 작성시 , / | 공백 등으로 이름 구분
        1그룹당 그룹원 수 설정 (자동 계산 ex. 그룹원 수를 4로 할 경우 최대 입력 인원 40명 / 6으로 할 경우 최대 입력 인원 60명)

    */

    return (
        <Style.MatchShuffle $teamCnt={teamCount} $playerCnt={playerCount}>
            {isModal ? <AutoBox /> : <></>}
            <Style.ControlSection $pos="top">
                <div className="button_section">
                    <button onClick={() => insertTeam()}>그룹 추가</button>
                    <button onClick={() => deleteTeam()}>그룹 삭제</button>
                    <button onClick={() => insertPlayer()}>그룹원 추가</button>
                    <button onClick={() => deletePlayer()}>그룹원 삭제</button>
                    <button onClick={() => setIsModal(true)}>자동 입력</button>
                </div>
            </Style.ControlSection>
            <div className="list_section">
                {teamList.map((parent, idx1) => (
                    <div key={idx1} className="list_wrap" id={idx1 + "_t"}>
                        <div className="list_parent">
                            <Style.GroupCampStyle $camp={idx1}>
                                {
                                    parent.target ? <input onChange={(e) => updateTitleData({arrNo:idx1, title:e.target.value})} value={parent.title} 
                                                        type="text" ref={inputRef} autoFocus={true} /> : parent.title
                                }
                                <button onClick={() => updateTargetData({arrNo:idx1, target:true})}>
                                    <FontAwesomeIcon icon={pencil} className="btn_icon" />
                                </button>
                            </Style.GroupCampStyle>
                            {parent.list.map((child, idx2) => (
                                <div key={idx2} className="list_child">
                                    <Style.InputPlayerStyle onChange={(e) => updateInputData({index:child.idx, arrNo:idx1, input:e.target.value})} value={child.nm} 
                                                type="text" id={"input_" + child.id} spellCheck={false} $camp={idx1} $teamCnt={teamCount} $playerCnt={playerCount} />
                                    <div className="list_select">
                                        <SelectBox updateSelectData={updateSelectData} inputData={child} inputIdx={idx1} teamCnt={teamCount} playerCnt={playerCount} />
                                    </div>
                                    <div className="list_check">
                                        <Style.CheckStyle onChange={(e) => updateFixData({checked:e.target.checked, index:child.idx, id:child.id, arrNo:idx1, value:idx2, tmp:null})} 
                                                    checked={fixList.some(data => data.idx === child.idx) ? true : false} type="checkbox" id={"chkbx" + child.id} />
                                        <Style.LabelStyle htmlFor={"chkbx" + child.id} className="check_box" $teamCnt={teamCount} $playerCnt={playerCount}>
                                            고정
                                        </Style.LabelStyle>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Style.ControlSection $pos="bottom">
                <ControlBox />
            </Style.ControlSection>
        </Style.MatchShuffle>
    )
}

export default Main;
