'use client'

import styled from "styled-components";

import { useEffect, useRef, useState } from "react";

import useShuffleListStore from "../stores/useShuffleListStore";

const CountBoxStyle = styled('div')`
    @media (max-width: 1024px) {
    }
    position: relative;
    margin: 0 5px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 24px;
        padding: 5px 7px;
        border: 1px solid grey;
        border-radius: 7px;
        background-color: ${({ theme }) => theme.buttonBgColor};
        color: ${({ theme }) => theme.textColor};
        font-size: 1.1rem;
        font-weight: 700;
        text-align: center;
        z-index: 10;
        cursor: pointer;
    }

    .select_box {
        position: absolute;
        top: 105%;
        left: 0;
        height: 0;
        width: 30px;
        padding: 0 3px;
        border: none;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.bgSubColor};
        text-align: center;
        z-index: 11;
        transition: all 0.3s ease-in-out;
    }

    ul.select_list {
        @media (max-width: 1024px) {
        }
        // mobile_view
        @media (max-width: 480px) {
        }
        height: 0;
        width: 24px;
        padding: 0;
        border: none;
        border-radius: 5px;
        overflow: hidden;
        overflow-y: scroll;
        background-color: ${({ theme }) => theme.inputBgColor};
        color: ${({ theme }) => theme.textColor};
        text-align: center;
        cursor: pointer;
        z-index: 12;
        user-select: none;
        list-style:none;
        word-break: keep-all;
        transition: all 0.3s ease-in-out;
        
        &::-webkit-scrollbar {
            width: 1px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(205, 205, 205, 1);
            border-radius: 1px;
        }

        &::-webkit-scrollbar-track {
            background: rgba(200, 200, 200, .1);
            border-radius: 1px;
        }
    }

    ul.select_list li {
        @media (max-width: 1024px) {
        }
        @media (max-width: 768px) {
        }
        // mobile_view
        @media (max-width: 480px) {
        }
        padding: 3px 5px;
        border-bottom: 2px solid ${({ theme }) => theme.bgSubColor};
        font-size: 1.2rem;
        opacity: 0.9;

        &:last-child {
            border: none;
        }
    }

    .select_box.show_select {
        @media (max-width: 768px) {
        }
        // mobile_view
        @media (max-width: 480px) {
        }
        padding: 5px 3px;
        height: 130px;
        z-index: 11;
    }

    .select_list.show_select {
        @media (max-width: 768px) {
        }
        // mobile_view
        @media (max-width: 480px) {
        }
        height: 120px;
        z-index: 11;
    }

    ul.select_list li.rs_active {
        color: rgb(255 68 56 / 1);
        font-weight: 700;
        opacity: 1;
    }
`

const CountBox = () => {
    const selectBox:any = useRef<any>(null);
    const selectList:any = useRef<any>(null);
    const selectItem:any = useRef<any>([]);

    const { autoList } = useShuffleListStore();

    const updateAutoData = useShuffleListStore((state) => state.updateAutoData);

    const [isSelectBoxShow, setIsSelectBoxShow] = useState<boolean>(false);
        
    const customSelectBox = () => {
        const selectItemList:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result:any[] = [];

        for(let i:number=0; i<selectItemList.length; i++) {
            result.push(<li key={"cnt_" + i} value={selectItemList[i]}
                            onClick={() => onClickSelectItem(i, selectItemList[i])}
                            ref={(li:any) => (selectItem.current[i] = li)}>
                {selectItemList[i]}</li>);
        }

        return result;
    }

    const onClickSelectItem = (idx:number, cnt:number) => {
        setIsSelectBoxShow(false);

        updateAutoData({type:'cnt', value:cnt});

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
            
            const handleOutsideClose = (e: {target: any}) => {
                if(isSelectBoxShow && (!selectBox.current.contains(e.target))) setIsSelectBoxShow(false);
            };
            document.addEventListener('click', handleOutsideClose);
            
            return () => document.removeEventListener('click', handleOutsideClose);
        } else {
            selectBox.current.className = selectBox.current.className.replace(' show_select', '');
            selectList.current.className = selectList.current.className.replace(' show_select', '');
        }
    }, [isSelectBoxShow])

    return (
        <CountBoxStyle>
            <button onClick={() => setIsSelectBoxShow(!isSelectBoxShow)}>
                {autoList.cnt}
            </button>
            <div className="select_box" ref={selectBox}>
                <ul className="select_list" ref={selectList}>
                    {customSelectBox()}
                </ul>
            </div>
        </CountBoxStyle>
    )
}

export default CountBox;
