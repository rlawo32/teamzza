import styled from "styled-components";

export const LevelBoxStyle = styled('div')<{$teamCnt:number, $playerCnt:number, $show:boolean, $mode:string|undefined}>`
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
            font-size: 1.2rem;
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
            font-size: ${({$mode}) => $mode === 'D' ? 1.4 : 1.2}rem;
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
        height: ${({ $playerCnt }) => $playerCnt > 2 ? 120 : 85}px;
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
        height: ${({ $playerCnt }) => $playerCnt > 2 ? 111 : 76}px;
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
