'use client'

import * as Style from "./main.style";
import SelectBox from "./selectBox"

import useShuffleArrayStore from "../stores/useShuffleTeamStore";
import useShuffleFixStore from "../stores/useShuffleFixStore";
import { useEffect } from "react";
import useShuffleBaseStore from "../stores/useShuffleBaseStore";


const Main = () => {

    const { teams, createTeam } = useShuffleArrayStore();
    const { playerCount, teamCount, setPlayerCount, setTeamCount } = useShuffleBaseStore();
    const { fixList } = useShuffleFixStore();

    const insertPlayerCount = useShuffleBaseStore((state) => state.insertPlayerCount);
    const insertTeamCount = useShuffleBaseStore((state) => state.insertTeamCount);
    const deletePlayerCount = useShuffleBaseStore((state) => state.deletePlayerCount);
    const deleteTeamCount = useShuffleBaseStore((state) => state.deleteTeamCount);

    const updateInputData = useShuffleArrayStore((state) => state.updateInputData);
    const updateSelectData = useShuffleArrayStore((state) => state.updateSelectData);
    const updateFixData = useShuffleFixStore((state) => state.updateFixData);

    useEffect(() => {
        createTeam();
    }, [playerCount, teamCount])

    return (
        <Style.MatchShuffle>
            <div className="list_section">
                {teams.map((parent, idx1) => (
                    <div key={idx1} className="list_wrap" id={parent.length + "_t"}>
                        <div className="list_parent">
                            {idx1 === 0 ? 
                                <div className="team_camp team_blue">
                                    TeamBlue
                                </div> 
                                : 
                                <div className="team_camp team_red">
                                    TeamRed
                                </div>
                            }
                            {parent.map((child, idx2) => (
                                <div key={idx2} className="list_child">
                                    <div className="list_select">
                                        <SelectBox updateSelectData={updateSelectData} inputData={child} inputIdx={idx1} />
                                    </div>
                                    <Style.InputPlayerStyle onChange={(e) => updateInputData({index:child.id, arrNo:idx1, value:e.target.value})} value={child.nm} 
                                                type="text" id={"input_" + child.id} $camp={idx1}/>
                                    <div className="list_check">
                                        <Style.CheckStyle onChange={(e) => updateFixData({checked:e.target.checked, index:child.id, arrNo:idx1, value:idx2})} 
                                                    checked={fixList.some(data => data.id === child.id) ? true : false} type="checkbox" id={"chkbx" + child.id} />
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
            <button onClick={() => insertTeamCount()}>그룹 추가</button>
            <button onClick={() => insertPlayerCount()}>그룹원 추가</button>
            <button onClick={() => deleteTeamCount()}>그룹 삭제</button>
            <button onClick={() => deletePlayerCount()}>그룹원 삭제</button>
        </Style.MatchShuffle>
    )
}

export default Main;