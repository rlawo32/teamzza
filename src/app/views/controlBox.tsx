'use client'

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus as icon_plus, faMinus as icon_minus,
    faRotate as icon_refresh, faShuffle as icon_random,
    faScaleBalanced as icon_balance
} from "@fortawesome/free-solid-svg-icons";

import useShuffleTeamStore from "../stores/useShuffleTeamStore";
import useShuffleBaseStore from "../stores/useShuffleBaseStore";

const ControlBoxStyle = styled('div')`
    @media (max-width: 768px) {
        width: 100%;
        height: 190px;
        padding: 25px 0 20px;
        margin-top: 40px;
    }
    // mobile_view
    @media (max-width: 500px) {
        height: 180px;
    }

    .info_section {
        @media (max-width: 768px) {
            width: 100%;
        }
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: 0 auto 35px;
        color: #ffffff;
        text-align: center;

        .shuffle_count {
            @media (max-width: 768px) {
                font-size: 1.4rem;
            }
            // mobile_view
            @media (max-width: 500px) {
                font-size: 1.2rem;
            }
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 15px;
        }

        .shuffle_control {
            @media (max-width: 768px) {
                font-size: 1rem;
            }
            // mobile_view
            @media (max-width: 500px) {
                font-size: .9rem;
            }
            display: flex;
            justify-content: center;
            font-size: 1.3rem;

            button {
                @media (max-width: 768px) {
                    font-size: .8rem;
                }
                // mobile_view
                @media (max-width: 500px) {
                    font-size: .6rem;
                }
                padding: 3px 4px;
                margin: 0 3px;
                border: none;
                border-radius: 5px;
                font-size: .9rem;
                font-weight: 700;
                cursor: pointer;

                &:active {
                    scale: .7;
                    transition: scale .3s;
                }
            }

            .control_item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 0 5px;

                .control_title {
                    @media (max-width: 768px) {
                        font-size: 1.1rem;
                    }
                    // mobile_view
                    @media (max-width: 500px) {
                        font-size: 1rem;
                    }
                    font-size: 1.4rem;
                    margin-bottom: 3px;
                }

                .control_tool {
                    display: flex;
                    align-items: center;

                    .sec_time {
                        @media (max-width: 768px) {
                            width: 25px;
                        }
                        width: 35px;
                    }
                }
            }
        }
    }
    
    .btn_section {
        @media (max-width: 768px) {
            flex-wrap: wrap;
            justify-content: center;
        }
        display: flex;
        justify-content: space-between;
        margin: 10px auto;

        button {
            @media (max-width: 768px) {
                padding: 10px 20px;
                margin: 5px;
                font-size: 1.3rem;
            }
            // mobile_view
            @media (max-width: 500px) {
                padding: 7px 18px;
                margin: 5px;
                font-size: 1.1rem;
            }
            display: flex;
            align-items: center;
            margin: 0 10px;
            padding: 10px 30px;
            border: none;
            border-radius: 10px;
            box-shadow: 0 0 40px rgba(42,50,113, .68);
            background-color: rgb(28 28 31 / 1);
            color: #ffffff;
            font-size: 1.6rem;
            font-weight: 700;
            cursor: pointer;
            transition: 0.5s;
            transition-duration: .3s;

            &:hover {
                transform: scale(1.1);
                box-shadow: 0 0 20px rgba(42,50,113, .68);
                background-position: right center;
            }

            .btn_icon {
                margin-right: 7px;
            }
        }
    }
`

const ControlBox = () => {
    const { shuffleRandom, shuffleBalance, shuffleRefresh, insertRollback, activeRollback } = useShuffleTeamStore();
    const { shuffleCount, increaseShuffleCount, shuffleTime, increaseShuffleTime, decreaseShuffleTime, 
        reduceTime, increaseReduceTime, decreaseReduceTime } = useShuffleBaseStore();

    const onClickRandom = () => {
        insertRollback();
        let intervalTime:number = shuffleTime;
        const interval = setInterval(() => {
            shuffleRandom();    
            increaseShuffleCount();
            intervalTime -= reduceTime;
            if(intervalTime <= 0) {
                clearInterval(interval);
            }
        }, reduceTime);
    }

    const onClickBalance = () => {
        insertRollback();
        let intervalTime:number = shuffleTime;
        const interval = setInterval(() => {
            shuffleBalance();    
            increaseShuffleCount();
            intervalTime -= reduceTime;
            if(intervalTime <= 0) {
                clearInterval(interval);
            }
        }, reduceTime);
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
                            <button onClick={() => increaseShuffleTime()}><FontAwesomeIcon icon={icon_plus} className="btn_icon"/></button>
                            <div className="sec_time">{shuffleTime/1000}초</div>
                            <button onClick={() => decreaseShuffleTime()}><FontAwesomeIcon icon={icon_minus} className="btn_icon"/></button>
                        </div>
                    </div>
                    <div className="control_item shuffle_speed">
                        <div className="control_title">
                            셔플 속도
                        </div>
                        <div className="control_tool">
                            <button onClick={() => increaseReduceTime()}><FontAwesomeIcon icon={icon_plus} className="btn_icon"/></button>
                            <div className="sec_time">{reduceTime/1000}초</div>
                            <button onClick={() => decreaseReduceTime()}><FontAwesomeIcon icon={icon_minus} className="btn_icon"/></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn_section">
                <button onClick={() => onClickRandom()}>
                    <FontAwesomeIcon icon={icon_random} className="btn_icon"/>무작위
                </button>
                <button onClick={() => onClickBalance()}>
                    <FontAwesomeIcon icon={icon_balance} className="btn_icon"/>밸런스
                </button>
                <button onClick={() => shuffleRefresh()}>
                    <FontAwesomeIcon icon={icon_refresh} className="btn_icon"/>초기화
                </button>
            </div>

        </ControlBoxStyle>
    )
}

export default ControlBox;
