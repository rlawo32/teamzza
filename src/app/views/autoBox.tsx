'use client'

import styled from "styled-components";

import { useEffect, useRef } from "react";

import useShuffleFixStore from "../stores/useShuffleFixStore";
import useShuffleTeamStore from "../stores/useShuffleTeamStore";

import CountBox from "./countBox";

const ModalOverlay = styled('div')<{$show:boolean}>`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: ${({$show}) => $show ? 999 : -99};
    opacity: ${({$show}) => $show ? 1 : 0};
    transition: opacity .2s ease-out, z-index ${({$show}) => $show ? '.1s' : '.2s'} ease;
`

const AutoBoxStyle = styled('div')<{$show:boolean}>`
    display: block;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%) ${({$show}) => $show ? 'scale(1)' : 'scale(0.7)'};
    width: 600px;
    height: 300px;
    padding: 20px 25px;
    border: 1px solid red;
    border-radius: 12px;
    background-color: rgba(34, 34, 34, .95);
    color: #222;
    font-size: 1rem;
    z-index: ${({$show}) => $show ? 99 : -99};
    opacity: ${({$show}) => $show ? 1 : 0};
    transition: opacity .2s ease-out, z-index ${({$show}) => $show ? '.1s' : '2s'} ease, transform .3s ease-out;

    .input_section {
        width: 100%;
        height: 80%; 

        .textarea_title {
            width: 100%;
            height: 5%;
            margin-bottom: 7px;
            padding: 0 2px;
            color: #ffffff;
            font-size: 1.1rem;
        }

        textarea {
            width: 100%;
            height: 94%;
            padding: 12px;
            resize: none;
            border: none;
            border-radius: 8px;
            outline: none;
        }
    }

    .option_section {
        display: flex;
        align-items: center;
        justify-content: right;
        width: 100%;
        height: 10%;
        margin-top: 10px;
        color: #ffffff;
        font-size: 1.1rem;
    }

    .button_section {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
            margin: 5px;
        }
    }
`

interface AutoBoxProps {  
    isModal: boolean,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AutoBox = (props: AutoBoxProps) => {
    const modalRef:any = useRef<any>(null);

    const { autoList } = useShuffleFixStore();

    const updateAutoData = useShuffleFixStore((state) => state.updateAutoData);
    const activeAutoInput = useShuffleTeamStore((state) => state.activeAutoInput);

    const onClickActive = () => {
        if(autoList.raw === '') {
            alert('플레이어를 입력해주세요.');
        } else if(autoList.raw.split(/[,\s\/|]+/).filter(Boolean).length <= autoList.cnt) {
            alert('입력된 플레이어 수보다 지정된 그룹원 수가 더 많습니다.');
        } else {
            activeAutoInput(); 
            props.setIsModal(false);
        }
    }

    useEffect(() => {
        console.log(autoList)
    }, [autoList.raw])
    
    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent)=> {
            if(modalRef.current && !modalRef.current.contains(e.target)) {
                props.setIsModal(false);
            }
        }
        window.addEventListener('mousedown',handleClickOutside)

        return()=>{
            window.removeEventListener('mousedown',handleClickOutside)
        }
    })

    return (
        <ModalOverlay $show={props.isModal}>
            <AutoBoxStyle $show={props.isModal} ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <div className="input_section">
                    <div className="textarea_title">
                        플레이어 입력
                    </div>
                    <textarea onChange={(e) => updateAutoData({type:'raw', value:e.target.value})} value={autoList.raw} placeholder="ex) 홍길동, 아무개" />
                </div>
                <div className="option_section">
                    한 그룹당 <CountBox />명 씩
                </div>
                <div className="button_section">
                    <button onClick={() => onClickActive()}>완료</button>
                    <button onClick={() => props.setIsModal(false)}>취소</button>
                </div>
            </AutoBoxStyle>
        </ModalOverlay>
    )
}

export default AutoBox;
