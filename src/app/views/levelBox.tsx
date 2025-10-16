'use client'

import * as Style from "./levelBox.style";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown as arrow } from "@fortawesome/free-solid-svg-icons";

interface SelectBoxShuffleProps {
    updateSelectData: (data:{index:number; arrNo:number; name:string; level:number;}) => void;
    inputData: {id:string, lv:number, nm:string, idx:number, tmp:any, as:string};
    inputIdx: number;
    teamCnt: number;
    playerCnt: number;
}

const LevelBox = (props : SelectBoxShuffleProps) => {
    const selectBox:any = useRef<any>(null);
    const selectList:any = useRef<any>(null);
    const selectItem:any = useRef<any>([]);
    const selectArrow:any = useRef<any>(null);

    const { shuffleModeStorage } = useShuffleBaseStore();

    const [isSelectBoxShow, setIsSelectBoxShow] = useState<boolean>(false);
    const [isZIndexActive, setIsZIndexActive] = useState<boolean>(false);
        
    // DEFAULT(LEVEL)
    // GAME - LOL, VALORANT, OVERWATCH, SUDDEN, 
    // SPORT - SOCCER, BASKETBALL, 
    // SCHOOL - GROUP PLAY, POSITION, 
    const customSelectBox = () => {
        const result:any[] = [];
        const levelLength:number = props.playerCnt;

        const data = shuffleModeStorage.find((item) => item.target === true);

        if(data) {
            selectItem.current = [];
            if(data.id !== 'D') {
                for(let i:number=0; i<data.list.length; i++) {
                    result.push(<li key={"level_" + (i+props.inputData.id)}
                                    onClick={() => onClickSelectItem(i, data.list[i].tmp, data.list[i].lv)}
                                    ref={(li:any) => (selectItem.current[i] = li)}>
                                    <div className="item_top">
                                        {data.list[i].tmp}
                                    </div>
                                    <div className="item_bottom">
                                    </div>
                                </li>)
                }
            } else {
                for(let i:number=0; i<levelLength; i++) {
                    const level:number = levelLength-i;
                    result.push(<li key={"level_" + (i+props.inputData.id)} value={level}
                                    onClick={() => onClickSelectItem(i, String(level), level)}
                                    ref={(li:any) => (selectItem.current[i] = li)}>
                                    <div className="item_top">
                                        {level}
                                    </div>
                                    <div className="item_bottom">
                                        LEVEL
                                    </div>
                                </li>)
                }
            }
        }
        return result;
    }

    const onClickSelectBox = () => {
        setIsSelectBoxShow(!isSelectBoxShow);
        setTimeout(() => {
            setIsZIndexActive(!isZIndexActive);
        }, isSelectBoxShow ? 300 : 0)
    }

    const onClickSelectItem = (idx:number, name:string, level:number) => {
        setIsSelectBoxShow(false);
        setTimeout(() => {
            setIsZIndexActive(false);
        }, 300)
        props.updateSelectData({index:props.inputData.idx, arrNo:props.inputIdx, name:name, level:level});

        selectItem.current[idx].className = selectItem.current[idx].className.replace('rs_active', '');
        selectItem.current[idx].className += 'rs_active';

        for(let i:number=0; i<selectItem.current.length; i++) {
            if(i !== idx) {
                selectItem.current[i].className = selectItem.current[i].className.replace('rs_active', '');
            }
        }
    }

    useEffect(() => {
        if(isSelectBoxShow) {
            selectBox.current.className += " show_select";
            selectList.current.className += " show_select";
            selectArrow.current.className += " show_select";
            
            const handleOutsideClose = (e: {target: any}) => {
                if(isSelectBoxShow && (!selectBox.current.contains(e.target))) {
                    setIsSelectBoxShow(false); 
                    setTimeout(() => {
                        setIsZIndexActive(false);
                    }, 300)
                }
            };
            document.addEventListener('click', handleOutsideClose);
            
            return () => document.removeEventListener('click', handleOutsideClose);
        } else {
            selectBox.current.className = selectBox.current.className.replace(' show_select', '');
            selectList.current.className = selectList.current.className.replace(' show_select', '');
            selectArrow.current.className = selectArrow.current.className.replace(' show_select', '');
        }
    }, [isSelectBoxShow])

    return (
        <Style.LevelBoxStyle $teamCnt={props.teamCnt} $playerCnt={props.playerCnt} $show={isZIndexActive} $mode={shuffleModeStorage.find((item) => item.target === true)?.id}>
            <button onClick={() => onClickSelectBox()} tabIndex={-1}>
                <div className="select_value">
                    <div className="select_level">
                        {props.inputData.tmp}
                    </div>
                    <div className="select_text">
                        {props.inputData.as}
                    </div>
                </div>
                <div className="select_arrow" ref={selectArrow}>
                    <FontAwesomeIcon icon={arrow} />
                </div>
            </button>
            <div className="select_box" ref={selectBox}>
                <ul className="select_list" ref={selectList}>
                    {customSelectBox()}
                </ul>
            </div>
        </Style.LevelBoxStyle>
    )
}

export default LevelBox;
