'use client'

import styled from "styled-components";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus as icon_plus, faMinus as icon_minus,
    faRotate as icon_refresh, faShuffle as icon_random,
    faScaleBalanced as icon_balance, faRotateLeft as icon_rollback,
} from "@fortawesome/free-solid-svg-icons";

import useShuffleTeamStore from "./useShuffleTeamStore";
import useShuffleBaseStore from "./useShuffleBaseStore";

const ControlBoxStyle = styled('div')`
    @media (max-width: 768px) {
    }
    // mobile_view
    @media (max-width: 500px) {
    }
    height: 130px;
    padding: 5px 10px;

    .info_section {
        @media (max-width: 768px) {
        }
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: 0 auto 15px;
        color: #ffffff;
        text-align: center;

        .shuffle_count {
            @media (max-width: 768px) {
            }
            // mobile_view
            @media (max-width: 500px) {
            }
            font-size: 1.8rem;
            font-weight: 700;
            margin: 0 0 10px 0;
        }

        .shuffle_control {
            @media (max-width: 768px) {
            }
            // mobile_view
            @media (max-width: 500px) {
            }
            position: relative;
            display: flex;
            justify-content: center;
            font-size: 1.3rem;

            button {
                @media (max-width: 768px) {
                }
                // mobile_view
                @media (max-width: 500px) {
                }
                padding: 3px 4px;
                margin: 0 3px;
                border: none;
                border-radius: 5px;
                font-size: .7rem;
                font-weight: 700;
                cursor: pointer;

                &:active {
                    scale: .7;
                    transition: scale .3s ease-in-out;
                }
            }

            .control_item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 0 7px;

                .control_title {
                    @media (max-width: 768px) {
                    }
                    // mobile_view
                    @media (max-width: 500px) {
                    }
                    font-size: 1.4rem;
                    margin-bottom: 3px;
                }

                .control_tool {
                    display: flex;
                    align-items: center;

                    .sec_time {
                        @media (max-width: 768px) {
                        }
                        width: 35px;
                    }
                }
            }

            .shuffle_option {
                @media (max-width: 768px) {
                }
                // mobile_view
                @media (max-width: 480px) {
                }
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 3px;
                right: -40px;

                .option_section {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 0 4px;

                    .control_title {
                        font-size: .9rem;
                        font-weight: 400;
                        margin-bottom: 6px;
                    }

                    input {
                        transform: scale(0.8);
                        cursor: pointer;
                    }
                }
            }
        }
    }
    
    .btn_section {
        @media (max-width: 768px) {
        }
        display: flex;
        justify-content: space-between;

        button {
            @media (max-width: 768px) {
            }
            // mobile_view
            @media (max-width: 500px) {
            }
            display: flex;
            align-items: center;
            margin: 0 5px;
            padding: 10px 30px;
            border: none;
            border-radius: 10px;
            box-shadow: 0 0 40px rgba(42,50,113, .68);
            background-color: rgb(28 28 31 / 1);
            color: #ffffff;
            font-size: 1.3rem;
            font-weight: 700;
            cursor: pointer;
            transition: 0.5s;
            transition-duration: .3s;

            .btn_icon {
                margin-right: 7px;
            }

            &:active {
                scale: .95;
                transition: scale .1s ease-in-out;
            }
        }
    }
`

const ControlBox = () => {
    const { shuffleRandom, shuffleBalance, shuffleRefresh, insertRollback, activeRollback } = useShuffleTeamStore();
    const { setShuffleProgress, shuffleRandomChk, setShuffleRandomChk, 
        shuffleBalanceChk, setShuffleBalanceChk, shuffleOneClickChk, setShuffleOneClickChk, 
        shuffleActiveChk, setShuffleActiveChk, shuffleCount, increaseShuffleCount, shuffleTime, setShuffleTime, 
        increaseShuffleTime, decreaseShuffleTime, reduceTime, setReduceTime, increaseReduceTime, decreaseReduceTime } = useShuffleBaseStore();

    const onClickControl = (flag:string, type:string) => {
        if(!shuffleOneClickChk)
        if(flag === 'time') {
            type === 'increase' ? increaseShuffleTime() : decreaseShuffleTime();
        } else {
            type === 'increase' ? increaseReduceTime() : decreaseReduceTime();
        }
    }

    const onClickShuffle = () => {
        if(shuffleRandomChk) {
            onClickRandom();
        } else if(shuffleBalanceChk) {
            onClickBalance();
        }
    }

    const onClickRandom = () => {
        if(!shuffleActiveChk) { 
            insertRollback();
            setShuffleActiveChk(true);
            setShuffleProgress(true);
            let intervalTime:number = shuffleTime;
            const interval = setInterval(() => {
                shuffleRandom();    
                increaseShuffleCount();
                intervalTime -= reduceTime;
                if(intervalTime <= 0) {
                    setShuffleActiveChk(false);
                    setShuffleProgress(false);
                    clearInterval(interval);
                }
            }, reduceTime);
        }
    }

    const onClickBalance = () => {
        if(!shuffleActiveChk) { 
            insertRollback();
            setShuffleActiveChk(true);
            setShuffleProgress(true);
            let intervalTime:number = shuffleTime;
            const interval = setInterval(() => {
                shuffleBalance();    
                increaseShuffleCount();
                intervalTime -= reduceTime;
                if(intervalTime <= 0) {
                    setShuffleActiveChk(false);
                    setShuffleProgress(false);
                    clearInterval(interval);
                }
            }, reduceTime);
        }
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

    return (
        <ControlBoxStyle>
            <div className="info_section">
                <div className="shuffle_count">셔플 횟수 {shuffleCount}회</div>
                <div className="shuffle_control">
                    <div className="control_item shuffle_time">
                        <div className="control_title">
                            셔플 시간
                        </div>
                        <div className="control_tool">
                            <button onClick={() => onClickControl('time', 'increase')}><FontAwesomeIcon icon={icon_plus} className="btn_icon"/></button>
                            <div className="sec_time">{shuffleTime/1000}초</div>
                            <button onClick={() => onClickControl('time', 'decrease')}><FontAwesomeIcon icon={icon_minus} className="btn_icon"/></button>
                        </div>
                    </div>
                    <div className="control_item shuffle_speed">
                        <div className="control_title">
                            셔플 속도
                        </div>
                        <div className="control_tool">
                            <button onClick={() => onClickControl('speed', 'increase')}><FontAwesomeIcon icon={icon_plus} className="btn_icon"/></button>
                            <div className="sec_time">{reduceTime/1000}초</div>
                            <button onClick={() => onClickControl('speed', 'decrease')}><FontAwesomeIcon icon={icon_minus} className="btn_icon"/></button>
                        </div>
                    </div>
                    <div className="shuffle_option">
                        <div className="option_section">
                            <div className="control_title">
                                1회 셔플
                            </div>
                            <div className="control_tool">
                                <input type="checkbox" checked={shuffleOneClickChk} onChange={() => onClickShuffleOption('oneClick')} />
                            </div>
                        </div>
                        <div className="option_section">
                            <div className="control_title">
                                무작위
                            </div>
                            <div className="control_tool">
                                <input type="checkbox" checked={shuffleRandomChk} onChange={() => onClickShuffleOption('random')} />
                            </div>
                        </div>
                        <div className="option_section">
                            <div className="control_title">
                                밸런스
                            </div>
                            <div className="control_tool">
                                <input type="checkbox" checked={shuffleBalanceChk} onChange={() => onClickShuffleOption('balance')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn_section">
                <button onClick={() => onClickShuffle()}>
                    <FontAwesomeIcon icon={icon_random} className="btn_icon"/>섞기
                </button>
                <button onClick={() => shuffleRefresh()}>
                    <FontAwesomeIcon icon={icon_refresh} className="btn_icon"/>초기화
                </button>
                <button onClick={() => activeRollback()}>
                    <FontAwesomeIcon icon={icon_rollback} className="btn_icon"/>되돌리기
                </button>
            </div>

        </ControlBoxStyle>
    )
}

export default ControlBox;
