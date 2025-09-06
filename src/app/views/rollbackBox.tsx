'use client'

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft as icon_rollback } from "@fortawesome/free-solid-svg-icons";

import useShuffleBaseStore from "../stores/useShuffleBaseStore";
import useShuffleTeamStore from "../stores/useShuffleTeamStore";

const RollbackBoxStyle = styled('div')<{$show:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 110px;
    right: 50%;
    width: 25px;
    height: 25px;
    border: ${({ theme }) => theme.borderColor};
    border-radius: 7px;
    background-color: ${({ theme }) => theme.buttonBgColor};
    z-index: 99;
    opacity: ${({ $show }) => $show ? 1 : 0};
    transition: opacity .4s ease-out;
    cursor: pointer;
        
    &:hover {
        border: 1px solid ${({ theme }) => theme.borderSubColor};
    }

    &:active {
        scale: .8;
        transition: scale .2s ease-in-out;
    }

    button {
        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.textColor};
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
    }
`

const RollbackBox = () => {

    const { rollbackCount } = useShuffleBaseStore();
    const { activeRollback } = useShuffleTeamStore();

    return (
        <RollbackBoxStyle $show={rollbackCount > 0 ? true : false}>
            <button onClick={() => activeRollback()} title={"되돌리기"}>
                <FontAwesomeIcon icon={icon_rollback} className="btn_icon"/>
            </button>
        </RollbackBoxStyle>
    )
}

export default RollbackBox;
