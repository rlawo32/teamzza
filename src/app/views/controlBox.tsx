
'use client'

import * as Style from "./controlBox.style";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus as icon_plus, faMinus as icon_minus,
    faRotate as icon_refresh, faShuffle as icon_random,
    faSliders as icon_option
} from "@fortawesome/free-solid-svg-icons";

import useShuffleTeamStore from "../stores/useShuffleTeamStore";
import useShuffleBaseStore from "../stores/useShuffleBaseStore";

const ControlBox = () => {
    const optionRef:any = useRef<any>(null);

    const { shuffleRandom, shuffleBalance, shuffleReset, insertRollback, activeLocalSave } = useShuffleTeamStore();
    const { setShuffleProgress, setShuffleCompleteChk, shuffleRandomChk, setShuffleRandomChk, 
            shuffleBalanceChk, setShuffleBalanceChk, shuffleOneClickChk, setShuffleOneClickChk, 
            shuffleActiveChk, setShuffleActiveChk, shuffleCount, increaseShuffleCount, 
            shuffleTime, setShuffleTime, reduceTime, setReduceTime, 
            increaseShuffleTime, decreaseShuffleTime, increaseReduceTime, decreaseReduceTime } = useShuffleBaseStore();

    const [activeOption, setActiveOption] = useState<boolean>(false);

    const onClickControl = (flag:string, type:string) => {
        if(!shuffleOneClickChk)
        if(flag === 'time') {
            type === 'increase' ? increaseShuffleTime() : decreaseShuffleTime();
        } else {
            type === 'increase' ? increaseReduceTime() : decreaseReduceTime();
        }
    }

    const onClickShuffle = () => {
        if(!shuffleActiveChk) { 
            insertRollback();
            setShuffleActiveChk(true);
            setShuffleProgress(true);
            if(shuffleRandomChk) {
                onClickRandom();
            } else if(shuffleBalanceChk) {
                onClickBalance();
            }
        }
    }

    const onClickRandom = () => {
        let intervalTime:number = shuffleTime;
        const interval = setInterval(() => {
            shuffleRandom();    
            increaseShuffleCount();
            intervalTime -= reduceTime;
            if(intervalTime <= 0) {
                setShuffleActiveChk(false);
                setShuffleProgress(false);
                setShuffleCompleteChk(true);
                activeLocalSave();
                clearInterval(interval);
            }
        }, reduceTime);
    }

    const onClickBalance = () => {
        let intervalTime:number = shuffleTime;
        const interval = setInterval(() => {
            shuffleBalance();    
            increaseShuffleCount();
            intervalTime -= reduceTime;
            if(intervalTime <= 0) {
                setShuffleActiveChk(false);
                setShuffleProgress(false);
                setShuffleCompleteChk(true);
                activeLocalSave();
                clearInterval(interval);
            }
        }, reduceTime);
    }
    
    const onClickShuffleOption = (flag:string) => {
        if(flag === 'oneClick') {
            setShuffleOneClickChk(!shuffleOneClickChk);
            if(!shuffleOneClickChk) {
                setShuffleTime(1000);
                setReduceTime(1000);
            } else {
                setShuffleTime(5000);
                setReduceTime(200);
            }
        } else if(flag === 'random') {
            setShuffleRandomChk(!shuffleRandomChk);
            setShuffleBalanceChk(!shuffleBalanceChk);
        } else if(flag === 'balance') {
            setShuffleRandomChk(!shuffleRandomChk);
            setShuffleBalanceChk(!shuffleBalanceChk);
        }
    }

    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent)=> {
            if(!optionRef.current.contains(e.target)) {
                setActiveOption(false);
            }
        }
        window.addEventListener('click', handleClickOutside)

        return()=>{
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <Style.ControlBoxStyle $show={activeOption}>
            <div className="control_section" ref={optionRef}>
                <div className="option_section">
                    <div className="option_box shuffle_control">
                        <div className="box_title">셔플 시간/속도 조절</div>
                        <div className="option_item shuffle_time">
                            <div className="option_title">
                                셔플 시간
                            </div>
                            <div className="option_tool">
                                <button onClick={() => onClickControl('time', 'increase')}><FontAwesomeIcon icon={icon_plus} className="btn_icon"/></button>
                                <div className="sec_time">{shuffleTime/1000}초</div>
                                <button onClick={() => onClickControl('time', 'decrease')}><FontAwesomeIcon icon={icon_minus} className="btn_icon"/></button>
                            </div>
                        </div>
                        <div className="option_item shuffle_speed">
                            <div className="option_title">
                                셔플 속도
                            </div>
                            <div className="option_tool">
                                <button onClick={() => onClickControl('speed', 'increase')}><FontAwesomeIcon icon={icon_plus} className="btn_icon"/></button>
                                <div className="sec_time">{reduceTime/1000}초</div>
                                <button onClick={() => onClickControl('speed', 'decrease')}><FontAwesomeIcon icon={icon_minus} className="btn_icon"/></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="option_section">
                    <div className="option_box shuffle_setting">
                        <div className="box_title">셔플 설정</div>
                        <div className="option_item">
                            <div className="option_title">
                                1회 셔플
                            </div>
                            <div className="option_tool">
                                <label className="option_toggle" htmlFor="shuffleOneChk">
                                    <input type="checkbox" id="shuffleOneChk" checked={shuffleOneClickChk} onChange={() => onClickShuffleOption('oneClick')} />
                                    <div className="toggle_slider">
                                        <Style.ToggleEffectOn $show={shuffleOneClickChk}>{shuffleOneClickChk ? 'ON' : ''}</Style.ToggleEffectOn> 
                                        <Style.ToggleEffectOff $show={shuffleOneClickChk}>{shuffleOneClickChk ? '' : 'OFF'}</Style.ToggleEffectOff>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="option_box">
                        <div className="box_title">셔플 종류</div>
                        <div className="option_item shuffle_type">
                            <div className="option_title">
                                무작위
                            </div>
                            <div className="option_tool">
                                <label className="option_radio" htmlFor="shuffleRandomChk">
                                    <input type="radio" id="shuffleRandomChk" name="shuffleType" 
                                           checked={shuffleRandomChk} onChange={() => onClickShuffleOption('random')} />
                                    <div className="radio_check"></div>
                                </label>
                            </div>
                        </div>
                        <div className="option_item">
                            <div className="option_title">
                                밸런스
                            </div>
                            <div className="option_tool">
                                <label className="option_radio" htmlFor="shuffleBalanceChk">
                                    <input type="radio" id="shuffleBalanceChk" name="shuffleType" 
                                           checked={shuffleBalanceChk} onChange={() => onClickShuffleOption('balance')} />
                                    <div className="radio_check"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="info_section">
                <div className="shuffle_count">셔플 횟수 {shuffleCount}회</div>
                <button onClick={(e) => {
                        e.stopPropagation(); // option box 이벤트 버블링 차단
                        setActiveOption(!activeOption);}}>
                        <FontAwesomeIcon icon={icon_option} className="btn_icon"/>
                </button>
            </div>
            <div className="btn_section">
                <button onClick={() => onClickShuffle()}>
                    <FontAwesomeIcon icon={icon_random} className="btn_icon"/>섞기
                </button>
                <button onClick={() => shuffleReset()}>
                    <FontAwesomeIcon icon={icon_refresh} className="btn_icon"/>초기화
                </button>
            </div>
        </Style.ControlBoxStyle>
    )
}

export default ControlBox;
