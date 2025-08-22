'use client'

import styled from "styled-components";

import useShuffleFixStore from "./useShuffleFixStore";
import { useEffect } from "react";

const AutoBoxStyle = styled('div')`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 300px;
    padding: 20px 25px;
    border: 1px solid red;
    border-radius: 12px;
    background-color: rgba(34, 34, 34, .95);
    color: #222;
    font-size: 1rem;
    z-index: 99;

    .input_section {
        width: 100%;
        height: 80%; 

        textarea {
            width: 100%;
            height: 100%;
            padding: 12px;
            resize: none;
            border: none;
            border-radius: 8px;
            outline: none;
        }
    }

    .button_section {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
            margin: 5px;
        }
    }
`

const AutoBox = () => {
    const { autoList, setAutoList } = useShuffleFixStore();

    const updateAutoData = useShuffleFixStore((state) => state.updateAutoData);

    useEffect(() => {
        console.log(autoList)
    }, [autoList.raw])

    return (
        <AutoBoxStyle>
            <div className="input_section">
                <textarea onChange={(e) => updateAutoData({type:'raw', value:e.target.value})} value={autoList.raw} />
            </div>
            <div className="button_section">
                <button>완료</button>
                <button>취소</button>
            </div>
        </AutoBoxStyle>
    )
}

export default AutoBox;
