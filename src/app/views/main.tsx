'use client'

import * as Style from "./main.style";
import SelectBox from "./selectBox"

import useShuffleBaseStore from "./useShuffleBaseStore";
import useShuffleTeamStore from "./useShuffleTeamStore";
import useShuffleFixStore from "./useShuffleFixStore";
import { useEffect } from "react";


const Main = () => {

    const { teamList, createTeam, insertTeam, deleteTeam, shuffleRandom, shuffleBalance, insertRollback, activeRollback } = useShuffleTeamStore();
    const { playerCount, teamCount, rollbackCount, setPlayerCount, setTeamCount } = useShuffleBaseStore();
    const { fixList, tempList } = useShuffleFixStore();

    const insertPlayerCount = useShuffleBaseStore((state) => state.insertPlayerCount);
    const insertTeamCount = useShuffleBaseStore((state) => state.insertTeamCount);
    const deletePlayerCount = useShuffleBaseStore((state) => state.deletePlayerCount);
    const deleteTeamCount = useShuffleBaseStore((state) => state.deleteTeamCount);

    const updateInputData = useShuffleTeamStore((state) => state.updateInputData);
    const updateSelectData = useShuffleTeamStore((state) => state.updateSelectData);
    const updateFixData = useShuffleFixStore((state) => state.updateFixData);

    const onClickShuffle = (flag:string) => {
        insertRollback();
        if(flag === 'R') {
            shuffleRandom();
        } else {
            shuffleBalance();
        }
    }
    
    useEffect(() => {
        createTeam();
    }, [])

    useEffect(() => {
        console.log(teamList);
    }, [teamList])

    return (
        <Style.MatchShuffle $teamCnt={teamCount}>
            <div className="list_section">
                {teamList.map((parent, idx1) => (
                    <div key={idx1} className="list_wrap" id={parent.length + "_t"}>
                        <div className="list_parent">
                            <Style.GroupCampStyle $camp={idx1}>
                                Team
                                {
                                    idx1 === 0 ? 'Blue'     :
                                    idx1 === 1 ? 'Red'      :
                                    idx1 === 2 ? 'Yellow'   :
                                    idx1 === 3 ? 'Green'    :
                                    idx1 === 4 ? 'Purple'   :
                                    idx1 === 5 ? 'Brown'    :
                                    idx1 === 6 ? 'Pink'     : 
                                    idx1 === 7 ? 'Orange'   :
                                    idx1 === 8 ? 'Mint'     : 'Lime'
                                }
                            </Style.GroupCampStyle>
                            {parent.map((child, idx2) => (
                                <div key={idx2} className="list_child">
                                    <div className="list_select">
                                        <SelectBox updateSelectData={updateSelectData} inputData={child} inputIdx={idx1} />
                                    </div>
                                    <Style.InputPlayerStyle onChange={(e) => updateInputData({index:child.idx, arrNo:idx1, input:e.target.value})} value={child.nm} 
                                                type="text" id={"input_" + child.id} $camp={idx1}/>
                                    <div className="list_check">
                                        <Style.CheckStyle onChange={(e) => updateFixData({checked:e.target.checked, index:child.idx, id:child.id, arrNo:idx1, value:idx2, tmp:null})} 
                                                    checked={fixList.some(data => data.idx === child.idx) ? true : false} type="checkbox" id={"chkbx" + child.id} />
                                        <Style.LabelStyle htmlFor={"chkbx" + child.id} className="check_box">
                                            고정
                                        </Style.LabelStyle>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => insertTeam()}>그룹 추가</button>
            <button onClick={() => insertPlayerCount()}>그룹원 추가</button>
            <button onClick={() => deleteTeam()}>그룹 삭제</button>
            <button onClick={() => deletePlayerCount()}>그룹원 삭제</button>
            <button onClick={() => onClickShuffle('R')}>무작위 셔플</button>
            <button onClick={() => onClickShuffle('B')}>밸런스 셔플</button>
            <button onClick={() => activeRollback()}>되돌리기</button>
        </Style.MatchShuffle>
    )
}

export default Main;
