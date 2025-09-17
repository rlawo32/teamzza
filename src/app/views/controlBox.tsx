'use client'

import * as Style from "./controlBox.style";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus as icon_plus, faMinus as icon_minus,
    faRotate as icon_refresh, faShuffle as icon_random,
    faSliders as icon_option, faCopy as icon_copy
} from "@fortawesome/free-solid-svg-icons";
import { toPng } from 'html-to-image';

import useShuffleTeamStore from "../stores/useShuffleTeamStore";
import useShuffleBaseStore from "../stores/useShuffleBaseStore";

const ControlBox = (props : { captureRef:any }) => {
    const optionRef:any = useRef<any>(null);

    const { teamList, shuffleRandom, shuffleBalance, shuffleReset, insertRollback, activeLocalSave } = useShuffleTeamStore();
    const { setShuffleProgress, setShuffleComplete, shuffleRandomChk, setShuffleRandomChk, 
            shuffleBalanceChk, setShuffleBalanceChk, shuffleOneClickChk, setShuffleOneClickChk, 
            shuffleCompleteChk, setShuffleCompleteChk, shuffleActiveChk, setShuffleActiveChk, 
            shuffleCount, increaseShuffleCount, shuffleTime, setShuffleTime, reduceTime, setReduceTime, 
            increaseShuffleTime, decreaseShuffleTime, increaseReduceTime, decreaseReduceTime } = useShuffleBaseStore();

    const [activeOption, setActiveOption] = useState<boolean>(false);
    const [activeReset, setActiveReset] = useState<boolean>(false);
    const [oneCaptureChk, setOneCaptureChk] = useState<boolean>(false);
    const [captureCopyChk, setCaptureCopyChk] = useState<boolean>(false);

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
                if(shuffleCompleteChk) {
                    setShuffleComplete(true);
                }
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
                if(shuffleCompleteChk) {
                    setShuffleComplete(true);
                }
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
        } else if(flag === 'complete') {
            setShuffleCompleteChk(!shuffleCompleteChk);
        }
    }

    const onClickShuffleReset = async () => {
        if(!shuffleActiveChk) {
            shuffleReset();
            setActiveReset(true);
            setTimeout(() => setActiveReset(false), 3000);
        }
    }

    const dataURLtoBlob = (dataurl:string):Blob => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    const onClickShuffleCopy = async () => {
        if(!shuffleActiveChk) {
            try {
                if (props.captureRef.current && !oneCaptureChk) {
                    const section = props.captureRef.current;
                    setOneCaptureChk(true);
                    
                    try {
                        const dataUrl = await toPng(section, {
                            width: props.captureRef.current.offsetWidth, 
                            height: props.captureRef.current.offsetHeight,
                            quality: 0.95,
                            style: {
                                margin: '0',
                            },
                        });
                        const imageBlob = dataURLtoBlob(dataUrl); // Base64를 Blob으로 변환
                        const imageItem = new ClipboardItem({ 'image/png': imageBlob });
                        await navigator.clipboard.write([imageItem])
                            .then(() => {
                                setCaptureCopyChk(true);
                                setTimeout(() => setCaptureCopyChk(false), 3000);
                                setOneCaptureChk(false);
                            }).catch(err => console.log('Copy failed : ' + err));
                    } catch (error) {
                        if (error instanceof Error) {
                            console.error(`캡처 또는 전송 중 오류 발생: ${error.message}`);
                        } else {
                            console.error('캡처 또는 전송 중 알 수 없는 오류 발생');
                        }
                    } 
                } else {
                    alert('잠시 후 시도해주세요');
                }
            } catch (err) {
                console.error('복사 실패:', err);
            }
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
                        <div className="option_item">
                            <div className="option_title">
                                결과 효과
                            </div>
                            <div className="option_tool">
                                <label className="option_toggle" htmlFor="shuffleCompleteChk">
                                    <input type="checkbox" id="shuffleCompleteChk" checked={shuffleCompleteChk} onChange={() => onClickShuffleOption('complete')} />
                                    <div className="toggle_slider">
                                        <Style.ToggleEffectOn $show={shuffleCompleteChk}>{shuffleCompleteChk ? 'ON' : ''}</Style.ToggleEffectOn> 
                                        <Style.ToggleEffectOff $show={shuffleCompleteChk}>{shuffleCompleteChk ? '' : 'OFF'}</Style.ToggleEffectOff>
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
                <button onClick={() => onClickShuffle()} className="btn_main">
                    <FontAwesomeIcon icon={icon_random} className="btn_icon"/>셔플
                </button>
                <button onClick={() => onClickShuffleReset()} className="btn_sub sub_reset" title="초기화">
                    <div className={activeReset ? "reset_message active" : "reset_message"}>
                        초기화 완료
                    </div>
                    <FontAwesomeIcon icon={icon_refresh} className="btn_icon"/>
                </button>
                <button onClick={() => onClickShuffleCopy()} className="btn_sub sub_copy" title="결과 캡쳐">
                    <div className={captureCopyChk ? "copy_message active" : "copy_message"}>
                        클립보드로 복사되었습니다.
                    </div>
                    {
                        !captureCopyChk && oneCaptureChk ? <div className="capture_loading" /> : <FontAwesomeIcon icon={icon_copy} className="btn_icon"/>
                    }
                </button>
            </div>
        </Style.ControlBoxStyle>
    )
}

export default ControlBox;
