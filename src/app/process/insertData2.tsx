
'use client';

import Image from "next/image";
import styled from "styled-components";
import * as Style from "./insertData.style";

import {useAtom, useAtomValue} from "jotai";
import {processStep, produceTeam, shuffleCount} from "./jotaiAtoms";
import {
    updateInputData, updateSelectData, 
    updateCheckData, activeRandom, activeBalance
} from "./jotaiActions"
import { useRef } from "react";

const StepStyle = styled('div')<{$step:number; $team:number;}>`
    display: ${({$step}) => $step > 1 ? "block" : "none"};
    align-items: center;
    justify-content: center;
    height: 100%;

    .gate_section {
        position: absolute;
        height: 100%;
        background: silver;
        opacity: 0;
        transition: all .8s cubic-bezier(0.95, 0.25, 0.25, 1.25);

        &.gate_left {
            left: -50%;
            width: 50%;
            z-index: 5;

            &.gate_close {
                opacity: 1;
                transform: translateX(100%);
            }
        }

        &.gate_right {
            right: -50%;
            width: 50%;
            z-index: 5;

            &.gate_close {
                opacity: 1;
                transform: translateX(-100%);
            }
        }
    }
    
    .list_section {
        position: relative;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: ${({$team}) => $team * 400}px;
        max-width: 1200px;
        min-width: 800px;

        .list_wrap {
            position: relative;
            display: flex;

            .list_parent {
                display: block;
                width: 330px;
                margin: 50px 0 0;
    
                .list_child {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }

    .info_section {
        width: 50px;
        margin: 30px auto;
        color: #6cacc5;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }

    .btn_section {
        display: flex;
        flex-wrap: wrap;
        width: 250px;
        margin: auto;
        opacity: 1;
        transition: opacity .8s ease;

        .btn_footer {
            margin: auto;
        }

        &.btn_visible {
            opacity: 0;
        }
    }
`;

const InsertData2 = () => {
    // const gateLeftRef:any = useRef<any>();
    // const gateRightRef:any = useRef<any>();
    const btnSecRef:any = useRef<any>();

    const [shCount, setShCount] = useAtom(shuffleCount);
    const [step] = useAtom(processStep);
    const [, setInputData] = useAtom(updateInputData);
    const [, setSelectData] = useAtom(updateSelectData);
    const [checkData, setCheckData] = useAtom(updateCheckData);
    const [, setRandomData] = useAtom(activeRandom);
    const [, setBalanceData] = useAtom(activeBalance);

    const teams = useAtomValue(produceTeam);

    const shuffleTime:number = 3000;
    const decrease:number = 150;

    const onActiveSelectBox = ():any[] => {
        const list:any[] = [];
        const textBox:string[] = ["E", "D", "C", "B", "A"];

        for(let i=4; i>=0; i--) {
            list.push(<option key={i} value={i+1}>{textBox[i]}</option>);
        }

        return list;
    }
    
    const onClickRandom = () => {
        // gateLeftRef.current.className += " gate_close";
        // gateRightRef.current.className += " gate_close";
        btnSecRef.current.className += " btn_visible";
        setShCount(shCount+1);

        let intervalTime:number = shuffleTime;
        let interval = setInterval(() => {
            setRandomData();    
            intervalTime -= decrease;
            if(intervalTime === 0) {
                clearInterval(interval);
                // gateLeftRef.current.className = gateLeftRef.current.className.replace(' gate_close', '');
                // gateRightRef.current.className = gateRightRef.current.className.replace(' gate_close', '');
                btnSecRef.current.className = btnSecRef.current.className.replace(' btn_visible', '');
            }
        }, decrease);
    }

    const onClickBalance = () => {
        btnSecRef.current.className += " btn_visible";
        setShCount(shCount+1);

        let intervalTime:number = shuffleTime;
        let interval = setInterval(() => {
            setBalanceData();    
            intervalTime -= decrease;
            if(intervalTime === 0) {
                clearInterval(interval);
                btnSecRef.current.className = btnSecRef.current.className.replace(' btn_visible', '');
            }
        }, decrease);
    }

    return (
        <StepStyle $step={step} $team={teams.length}>
            <div>
                <div className="list_section">
                    {/* <div className="gate_section gate_left" ref={gateLeftRef} />
                    <div className="gate_section gate_right" ref={gateRightRef} /> */}
                    {teams.map((parent, idx1) => (
                        <div key={idx1} className="list_wrap" id={parent.length + "_t"}>
                            <div className="list_parent">
                                {parent.map((child, idx2) => (
                                    <div key={idx2} className="list_child">
                                        <Style.FadeUp $timing={idx2} $team={teams.length}>
                                            <div className="list_select">
                                                <Style.SelectStyle onChange={(e) => setSelectData({index:child.id, arrNo:idx1, value:parseInt(e.target.value)})} value={child.lv}>
                                                    {onActiveSelectBox()}
                                                </Style.SelectStyle>    
                                                <Style.ToolTipStyle className="tooltip">
                                                    Level
                                                </Style.ToolTipStyle>
                                            </div>
                                            <Style.InputPlayerStyle onChange={(e) => setInputData({index:child.id, arrNo:idx1, value:e.target.value})} value={child.nm} 
                                                        type="text" id={"input_" + child.id} placeholder="이름 입력" />
                                            <div className="list_check">
                                                <Style.CheckStyle onChange={(e) => setCheckData({checked:e.target.checked, index:child.id, arrNo:idx1, value:idx2})} 
                                                            checked={checkData.some(data => data.id === child.id) ? true : false} type="checkbox" id={"chkbx" + child.id} />
                                                <Style.LabelStyle htmlFor={"chkbx" + child.id} className="check-box" />
                                                <Style.ToolTipStyle className="tooltip">
                                                    Fix
                                                </Style.ToolTipStyle>
                                            </div>
                                        </Style.FadeUp>
                                    </div>
                                ))}
                            </div>
                            <Style.FadeUp $timing={parent.length+5} $team={teams.length}
                                          style={idx1 < teams.length-1 ? {display: "inline-block"} : {display: "none"}}>
                                <Image src={"/images/vs_image.png"} alt={"VS"} height={120} width={120} className="list_image" />
                            </Style.FadeUp>
                        </div>
                    ))}
                </div>
                <Style.FadeUp $timing={0} $team={teams.length}>
                    <div className="info_section">
                        {shCount}
                    </div>
                </Style.FadeUp>
                <div className="btn_section" ref={btnSecRef}>
                    <Style.FadeUp $timing={0} $team={teams.length}>
                        <Style.BtnStyle onClick={() => onClickRandom()}>무작위</Style.BtnStyle>
                    </Style.FadeUp>
                    <Style.FadeUp $timing={1} $team={teams.length}>
                        <Style.BtnStyle onClick={() => onClickBalance()}>밸런스</Style.BtnStyle>
                    </Style.FadeUp>
                    <div className="btn_footer">
                        <Style.FadeUp $timing={2} $team={teams.length}>
                            <Style.BtnStyle onClick={() => window.location.reload()}>처음으로</Style.BtnStyle>
                        </Style.FadeUp>
                    </div>
                </div>
            </div>
        </StepStyle>
    )
}

export default InsertData2;
