'use client'

import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown as arrow } from "@fortawesome/free-solid-svg-icons";

const LevelBoxStyle = styled('div')<{$teamCnt:number, $playerCnt:number, $show:boolean}>`
    @media (max-width: 1024px) {
    }
    position: absolute;
    top: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 12 : 10}px;
    left: 15px;
    z-index: ${({$show}) => $show ? 5 : 3};

    button {
        @media (max-width: 1300px) {
            height: 32px;
        }
        @media (max-width: 1024px) {
        }
        @media (max-width: 768px) {
        }
        // mobile_view
        @media (max-width: 500px) {
        }
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50px;
        height: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 36 : 32}px;
        padding: 5px 7px;
        border: none;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.buttonBgColor};
        color: ${({ theme }) => theme.textColor};
        font-size: 1rem;
        font-weight: 700;
        z-index: 10;
        cursor: pointer;
    }

    .select_box {
        @media (max-width: 1024px) {
        }
        // mobile_view
        @media (max-width: 500px) {
        }
        position: absolute;
        top: 105%;
        left: 0;
        width: 50px;
        height: 0;
        padding: 0 3px;
        border: 1px solid transparent;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.bgSubColor};
        text-align: center;
        z-index: 15;
        opacity: 0;
        transition: all 0.3s ease-in-out;
        transform-origin: top;
        transform: scaleY(0);
    }

    ul.select_list {
        @media (max-width: 1024px) {
        }
        // mobile_view
        @media (max-width: 500px) {
        }
        width: 100%;
        height: 0;
        padding: 0;
        border: none;
        border-radius: 5px;
        overflow: hidden;
        overflow-y: scroll;
        background-color: ${({ theme }) => theme.inputBgColor};
        color: ${({ theme }) => theme.textColor};
        text-align: center;
        cursor: pointer;
        z-index: 20;
        user-select: none;
        list-style:none;
        word-break: keep-all;
        transition: all 0.3s ease-in-out;
        
        &::-webkit-scrollbar {
            width: 2px;
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
        @media (max-width: 500px) {
        }
        padding: 6px 5px;
        border-bottom: 2px solid ${({ theme }) => theme.bgSubColor};
        font-size: 1.2rem;
        opacity: 0.9;

        .item_top {
            @media (max-width: 768px) {
            }
            // mobile_view
            @media (max-width: 500px) {
            }
            font-size: 1.1rem;
            font-weight: 700;
        }

        .item_bottom {
            // mobile_view
            @media (max-width: 500px) {
            }
            font-size: .9rem;
        }

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
            }
            // mobile_view
            @media (max-width: 500px) {
            }
            font-size: 1.4rem;
        }

        .select_text {
            // mobile_view
            @media (max-width: 500px) {
            }
            font-size: .9rem;
            letter-spacing: -0.1rem;
        }
    }

    .select_arrow {
        @media (max-width: 1024px) {
        }
        // mobile_view
        @media (max-width: 500px) {
        }
        display: inline-block;
        margin-left: 4px;
        color: ${({ theme }) => theme.textColor};
        font-weight: 700;
        transition: all .3s linear;
    }

    .select_box.show_select {
        @media (max-width: 768px) {
            
        }
        // mobile_view
        @media (max-width: 500px) {
        }
        transform: scaleY(1);
        padding: 4px 3px;
        height: 120px;
        border: 1px solid ${({ theme }) => theme.borderColor};
        z-index: 11;
        opacity: 1;
    }

    .select_list.show_select {
        @media (max-width: 768px) {
        }
        // mobile_view
        @media (max-width: 500px) {
        }
        transform: scaleY(1);
        height: 111px;
        z-index: 11;
        opacity: 1;
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
    updateSelectData: (data:{index:number; arrNo:number; level:number;}) => void;
    inputData: {id:string, lv:number, nm:string, idx:number, tmp:any};
    inputIdx: number;
    teamCnt: number;
    playerCnt: number;
}

const LevelBox = (props : SelectBoxShuffleProps) => {
    const selectBox:any = useRef<any>(null);
    const selectList:any = useRef<any>(null);
    const selectItem:any = useRef<any>([]);
    const selectArrow:any = useRef<any>(null);

    const [isSelectBoxShow, setIsSelectBoxShow] = useState<boolean>(false);
    const [isZIndexActive, setIsZIndexActive] = useState<boolean>(false);

    const selectItemList:string[] = ["1", "2", "3", "4", "5"];
        
    const customSelectBox = () => {
        const result:any[] = [];

        for(let i:number=0; i<selectItemList.length; i++) {
            const level:number = 5-i;
            result.push(<li key={"level_" + (i+props.inputData.id)} value={level}
                            onClick={() => onClickSelectItem(i, level)}
                            ref={(li:any) => (selectItem.current[i] = li)}>
                            <div className="item_top">
                                {selectItemList[level-1]}
                            </div>
                            <div className="item_bottom">
                                LEVEL
                            </div>
                        </li>)
                 
        }
        return result;
    }

    const onClickSelectBox = () => {
        setIsSelectBoxShow(!isSelectBoxShow);
        setTimeout(() => {
            setIsZIndexActive(!isZIndexActive);
        }, isSelectBoxShow ? 300 : 0)
    }

    const onClickSelectItem = (idx:number, level:number) => {
        setIsSelectBoxShow(false);
        props.updateSelectData({index:props.inputData.idx, arrNo:props.inputIdx, level:level});

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
                if(isSelectBoxShow && (!selectBox.current.contains(e.target))) {
                    setIsSelectBoxShow(false); 
                    setTimeout(() => {
                        setIsZIndexActive(false);
                    }, 300)
                }
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
        <LevelBoxStyle $teamCnt={props.teamCnt} $playerCnt={props.playerCnt} $show={isZIndexActive}>
            <button onClick={() => onClickSelectBox()} tabIndex={-1}>
                <div className="select_value">
                    <div className="select_level">
                        {selectItemList[props.inputData.lv-1]}
                    </div>
                    <div className="select_text">
                        LEVEL
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
        </LevelBoxStyle>
    )
}

export default LevelBox;
