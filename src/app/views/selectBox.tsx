'use client'

import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronDown as arrow} from "@fortawesome/free-solid-svg-icons";

const SelectBoxShuffleStyle = styled('div')`
    @media (max-width: 1024px) {
        top: -3.5px;
    }
    position: absolute;
    top: -3.6px;
    left: 1px;

    button {
        @media (max-width: 1024px) {
            width: 45px;
            height: 32px;
            padding: 4px 6px;
        }
        @media (max-width: 768px) {
            height: 29px;
            padding: 3px 5px;
        }
        // mobile_view
        @media (max-width: 480px) {
            width: 36px;
            height: 23px;
            font-size: .8rem;
        }
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50px;
        height: 36px;
        padding: 5px 7px;
        border: 1px solid grey;
        border-radius: 7px;
        background: rgba(42,50,73, .5);
        color: rgb(255 255 255 / 1);
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
    }

    .select_box {
        @media (max-width: 1024px) {
            width: 45px;
        }
        // mobile_view
        @media (max-width: 480px) {
            width: 36px;
        }
        position: absolute;
        top: 105%;
        left: 0;
        height: 0;
        width: 50px;
        padding: 0 3px;
        border: none;
        border-radius: 5px;
        background-color: rgb(28 28 31 / 1);
        text-align: center;
        z-index: 2;
        transition: all 0.3s ease-in-out;
    }

    ul.select_list {
        @media (max-width: 1024px) {
            width: 39px;
        }
        // mobile_view
        @media (max-width: 480px) {
            width: 30px;
        }
        height: 0;
        width: 44px;
        padding: 0;
        border: none;
        border-radius: 5px;
        overflow: hidden;
        overflow-y: scroll;
        background-color: rgb(40 40 48 / 1);
        /* background-color: rgb(49 49 60 / 1); */
        color: rgb(255 255 255 / 1);
        text-align: center;
        cursor: pointer;
        z-index: 3;
        user-select: none;
        list-style:none;
        word-break: keep-all;
        transition: all 0.3s ease-in-out;
        
        &::-webkit-scrollbar {
            width: 1px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgb(255 255 255 / 1);
            border-radius: 1px;
        }

        &::-webkit-scrollbar-track {
            background: rgba(200, 200, 200, .1);
            border-radius: 1px;
        }
    }

    ul.select_list li {
        @media (max-width: 1024px) {
            width: 39px;
            padding: 5px;
            font-size: 1rem;
        }
        @media (max-width: 768px) {
            font-size: .9rem;
        }
        // mobile_view
        @media (max-width: 480px) {
            width: 30px;
            padding: 4px;
            font-size: .7rem;
        }
        padding: 6px 5px;
        border-bottom: 1px solid rgb(28 28 31 / 1);
        font-size: 1.2rem;
        opacity: 0.9;

        &:last-child {
            border: none;
        }
    }

    .select_value {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .select_level {
            @media (max-width: 768px) {
                font-size: 1.2rem;
            }
            // mobile_view
            @media (max-width: 480px) {
                font-size: 1rem;
            }
            font-size: 1.4rem;
        }

        .select_rank {
            // mobile_view
            @media (max-width: 480px) {
                font-size: .7rem;
            }
            font-size: .8rem;
            letter-spacing: -0.1rem;
        }
    }

    .select_arrow {
        @media (max-width: 1024px) {
            margin-left: 5px;
        }
        // mobile_view
        @media (max-width: 480px) {
            margin-left: 4px;
        }
        display: inline-block;
        margin-left: 6px;
        color: rgb(255 255 255 / 1);
        font-weight: 700;
        transition: all .3s linear;
    }

    .select_box.show_select {
        @media (max-width: 768px) {
            height: 110px;
            
        }
        // mobile_view
        @media (max-width: 480px) {
            
        }
        padding: 5px 3px;
        height: 130px;
    }

    .select_list.show_select {
        @media (max-width: 768px) {
            height: 100px;
        }
        // mobile_view
        @media (max-width: 480px) {
            
        }
        height: 120px;
    }

    ul.select_list li.rs_active {
        color: rgb(255 68 56 / 1);
        font-weight: 700;
        opacity: 1;
    }

    .select_arrow.show_select {
        transform: rotate(180deg);
    }
`

interface SelectBoxShuffleProps {
    updateSelectData: (data:{index:number; arrNo:number; value:number;}) => void;
    inputData: {id:number; lv:number; nm:string;};
    inputIdx: number;
}

const SelectBoxShuffle = (props : SelectBoxShuffleProps) => {
    const selectBox:any = useRef<any>(null);
    const selectList:any = useRef<any>(null);
    const selectItem:any = useRef<any>([]);
    const selectArrow:any = useRef<any>(null);

    const [isSelectBoxShow, setIsSelectBoxShow] = useState<boolean>(false);

    const selectItemList:string[] = ["E", "D", "C", "B", "A"];
        
    const customSelectBox = () => {
        const result:any[] = [];

        for(let i:number=0; i<selectItemList.length; i++) {
            const level:number = 5-i;
            result.push(<li key={"level_" + (i+props.inputData.id)} value={level}
                            onClick={() => onClickSelectItem(i, level)}
                            ref={(li:any) => (selectItem.current[i] = li)}>
                {selectItemList[level-1]} RANK</li>)
        }

        return result;
    }

    const onClickSelectItem = (idx:number, level:number) => {
        setIsSelectBoxShow(false);
        props.updateSelectData({index:props.inputData.id, arrNo:props.inputIdx, value:level});

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
            selectArrow.current.className += " show_select";
            
            const handleOutsideClose = (e: {target: any}) => {
                // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
                if(isSelectBoxShow && (!selectBox.current.contains(e.target))) setIsSelectBoxShow(false);
            };
            document.addEventListener('click', handleOutsideClose);
            
            return () => document.removeEventListener('click', handleOutsideClose);
        } else {
            selectBox.current.className = selectBox.current.className.replace(' show_select', '');
            selectList.current.className = selectList.current.className.replace(' show_select', '');
            selectArrow.current.className = selectArrow.current.className.replace(' show_select', '');
        }
    }, [isSelectBoxShow])

    return (
        <SelectBoxShuffleStyle>
            <button onClick={() => setIsSelectBoxShow(!isSelectBoxShow)}>
                <div className="select_value">
                    <div className="select_level">
                        {selectItemList[props.inputData.lv-1]}
                    </div>
                    <div className="select_rank">
                        RANK
                    </div>
                </div>
                <div className="select_arrow" ref={selectArrow}>
                    <FontAwesomeIcon icon={arrow} />
                </div>
            </button>
            <div className="select_box" ref={selectBox}>
                <ul className="select_list" ref={selectList}>
                    {customSelectBox()}
                </ul>
            </div>
        </SelectBoxShuffleStyle>
    )
}

export default SelectBoxShuffle;
