'use client'

import styled from "styled-components";

import useShuffleBaseStore from "./useShuffleBaseStore";
import { useEffect, useRef } from "react";
import FixedConfettiEffect from "./fixedConfettiEffect";

const ModalOverlay = styled('div')<{$show:boolean}>`
    position: fixed;
    inset: 0;
    background-color: ${({ theme }) => theme.overlayColor};
    z-index: ${({$show}) => $show ? 999 : -99};
    opacity: ${({$show}) => $show ? 1 : 0};
    transition: opacity .2s ease-out, z-index ${({$show}) => $show ? '.1s' : '.2s'} ease;
`

const CompleteBoxStyle = styled('div')<{$show:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%) ${({$show}) => $show ? 'scale(1)' : 'scale(0.7)'};
    width: 300px;
    height: 150px;
    padding: 20px 25px;
    border: none;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.modalBgReverseColor};
    color: ${({ theme }) => theme.inputBgColor};
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    user-select: none;
    z-index: ${({$show}) => $show ? 99 : -99};
    opacity: ${({$show}) => $show ? 1 : 0};
    transition: opacity .2s ease-out, z-index ${({$show}) => $show ? '.1s' : '2s'} ease, transform .3s ease-out;
`

const CompleteBox = () => {
    const modalRef:any = useRef<any>(null);

    const { shuffleCompleteChk, setShuffleCompleteChk } = useShuffleBaseStore();

    useEffect(() => {
        if (!shuffleCompleteChk) return;

        const timer = setTimeout(() => {
            setShuffleCompleteChk(false);
        }, 3500);

        return () => clearTimeout(timer);
    }, [shuffleCompleteChk])
    
    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent)=> {
            if(modalRef.current && !modalRef.current.contains(e.target)) {
                setShuffleCompleteChk(false);
            }
        }
        window.addEventListener('mousedown',handleClickOutside)

        return()=>{
            window.removeEventListener('mousedown',handleClickOutside)
        }
    })

    return (
        <ModalOverlay $show={shuffleCompleteChk}>
            <CompleteBoxStyle $show={shuffleCompleteChk} ref={modalRef} onClick={(e) => e.stopPropagation()}>
                셔플 완료!
            </CompleteBoxStyle>
            {shuffleCompleteChk ? <FixedConfettiEffect /> : <></>}
        </ModalOverlay>
    )
}

export default CompleteBox;
