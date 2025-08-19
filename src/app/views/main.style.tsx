import styled from "styled-components";

export const MatchShuffle = styled('div')<{$teamCnt:number}>`
    @media (max-width: 1024px) {
        width: 100%;
        min-height: 0;
        padding: 50px 15px;
    }
    // mobile_view
    @media (max-width: 500px) {
        padding: 50px 5px;
    }
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 1280px;
    height: 100%;
    min-height: 860px;
    margin: 0 auto;
    padding: 50px 30px;
    /* border: none;
    border-radius: 10px;
    background-color: rgb(49 49 60 / .1); */
    box-sizing: border-box;

    .list_section {
        position: relative;
        display: flex;
        justify-content: ${({$teamCnt}) => $teamCnt > 2 ? 'center' : 'space-between'};
        flex-wrap: wrap;

        .list_wrap {
            position: relative;
            display: flex;
            ${({$teamCnt}) => $teamCnt > 2 ? 'width: calc(100% / 3)' : ''};
            margin: 0 0 35px;

            .list_parent {
                @media (max-width: 768px) {
                    margin: 0 4px;
                }
                margin: 0 50px;

                .list_child {
                    position: relative;
                    display: flex;
                    align-items: center;
                    margin: auto;
                    
                    .list_select {
                        @media (max-width: 1024px) {
                            top: 20px;
                        }
                        @media (max-width: 768px) {
                            top: 20px;
                            left: 10px;
                        }
                        // mobile_view
                        @media (max-width: 500px) {
                            top: 13px;
                            left: 7px;
                        }
                        position: absolute;
                        top: 21px;
                        left: 15px;
                    }

                    .list_check {
                        @media (max-width: 768px) {
                            top: 17.5px;
                            right: 9px;
                        }
                        // mobile_view
                        @media (max-width: 500px) {
                            top: 11px;
                            right: 6px;
                        }
                        position: absolute;
                        top: 20px;
                        right: 13px;
                    }

                    .list_image {
                        position: absolute;
                        top: 35%;
                        left: 10px;
                        transform: translateY(-35%);
                    }
                }
            }
        }
    }

    .control_section {
        @media (max-width: 768px) {
            width: 100%;
            height: 190px;
            padding: 25px 0 20px;
            margin-top: 40px;
        }
        // mobile_view
        @media (max-width: 500px) {
            height: 180px;
        }
        width: 560px;
        height: 210px;
        padding: 25px 45px;
        margin-top: 60px;
        border-radius: 20px;
        background-color: rgb(30 30 38 / 1);

        .info_section {
            @media (max-width: 768px) {
                width: 100%;
            }
            display: flex;
            flex-direction: column;
            width: 300px;
            margin: 0 auto 35px;
            color: #ffffff;
            text-align: center;

            .shuffle_count {
                @media (max-width: 768px) {
                    font-size: 1.4rem;
                }
                // mobile_view
                @media (max-width: 500px) {
                    font-size: 1.2rem;
                }
                font-size: 1.8rem;
                font-weight: 700;
                margin-bottom: 15px;
            }

            .shuffle_control {
                @media (max-width: 768px) {
                    font-size: 1rem;
                }
                // mobile_view
                @media (max-width: 500px) {
                    font-size: .9rem;
                }
                display: flex;
                justify-content: center;
                font-size: 1.3rem;

                button {
                    @media (max-width: 768px) {
                        font-size: .8rem;
                    }
                    // mobile_view
                    @media (max-width: 500px) {
                        font-size: .6rem;
                    }
                    padding: 3px 4px;
                    margin: 0 3px;
                    border: none;
                    border-radius: 5px;
                    font-size: .9rem;
                    font-weight: 700;
                    cursor: pointer;

                    &:active {
                        scale: .7;
                        transition: scale .3s;
                    }
                }

                .control_item {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 0 5px;

                    .control_title {
                        @media (max-width: 768px) {
                            font-size: 1.1rem;
                        }
                        // mobile_view
                        @media (max-width: 500px) {
                            font-size: 1rem;
                        }
                        font-size: 1.4rem;
                        margin-bottom: 3px;
                    }

                    .control_tool {
                        display: flex;
                        align-items: center;

                        .sec_time {
                            @media (max-width: 768px) {
                                width: 25px;
                            }
                            width: 35px;
                        }
                    }
                }
            }
        }
        
        .btn_section {
            @media (max-width: 768px) {
                flex-wrap: wrap;
                justify-content: center;
            }
            display: flex;
            justify-content: space-between;
            margin: 10px auto;
        }
    }
`;

export const InputValueStyle = styled('input')`
    width: 100px;
    margin: 20px 10px;
    padding: 18px 0 13px 20px;
    border: none;
    border-radius: 15px;
    background: rgba(42,50,73, .68);
    color: #ffffff;
    font-size: 2.2rem;
    outline: none;

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::placeholder {
        color: gray;
        font-size: 17px;
        opacity: 0.7;
    }
`;

export const GroupCampStyle = styled('div')<{$camp:number}>`
    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
    // mobile_view
    @media (max-width: 500px) {
        font-size: 1.5rem;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    svg {
        // mobile_view
        @media (max-width: 500px) {
            height: 25px; 
            width: 25px;
        }
        height: 35px; 
        width: 35px;
    }
    color: ${({$camp}) => $camp === 0 ? "#1F85FD" : 
                          $camp === 1 ? "#F60C50" :
                          $camp === 2 ? "#FFD300" :
                          $camp === 3 ? "#00C853" :
                          $camp === 4 ? "#A259FF" :
                          $camp === 5 ? "#A0522D" :
                          $camp === 6 ? "#FF5CA8" :
                          $camp === 7 ? "#FF6D00" :
                          $camp === 8 ? "#4CFFD6" : "#A8FF00"};
`

export const InputPlayerStyle = styled('input')<{$camp:number}>`
    @media (max-width: 1024px) {
        width: 240px;
        padding: 10px 40px 10px 60px;
        font-size: 1.8rem;
    }
    @media (max-width: 768px) {
        width: 170px;
        margin: 10px 2px;
        padding: 10px 35px 10px 56px;
        font-size: 1.5rem;
    }
    // mobile_view
    @media (max-width: 500px) {
        width: 130px;
        margin: 5px 2px;
        padding: 7px 25px 8px 42px;
        border-radius: 10px;
        font-size: 1.3rem;
    }
    width: 300px;
    margin: 10px 5px;
    padding: 10px 45px 10px 75px;
    border: 3px solid ${({$camp}) => $camp === 0 ? "#1F85FD" : 
                                     $camp === 1 ? "#F60C50" :
                                     $camp === 2 ? "#FFD300" :
                                     $camp === 3 ? "#00C853" :
                                     $camp === 4 ? "#A259FF" :
                                     $camp === 5 ? "#A0522D" :
                                     $camp === 6 ? "#FF5CA8" :
                                     $camp === 7 ? "#FF6D00" :
                                     $camp === 8 ? "#4CFFD6" : "#A8FF00"};
    border-radius: 15px;
    background: rgb(28 28 31 / 1);
    color: #ffffff;
    font-size: 2.2rem;

    &:focus {
        outline: 1px solid #ffffff;
    }

    &::placeholder {
        color: gray;
        font-size: 18px;
        opacity: 0.7;
    }
`;

export const BtnStyle= styled('button')`
    @media (max-width: 768px) {
        padding: 10px 20px;
        margin: 5px;
        font-size: 1.3rem;
    }
    // mobile_view
    @media (max-width: 500px) {
        padding: 7px 18px;
        margin: 5px;
        font-size: 1.1rem;
    }
    display: flex;
    align-items: center;
    margin: 0 10px;
    padding: 10px 30px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 40px rgba(42,50,113, .68);
    background-color: rgb(28 28 31 / 1);
    color: #ffffff;
    font-size: 1.6rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.5s;
    transition-duration: .3s;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(42,50,113, .68);
        background-position: right center;
    }

    .btn_icon {
        margin-right: 7px;
    }
`;

export const QuickBtnStyle = styled('button')`
    flex: 1 1 auto;
    margin: 10px;
    padding: 10px 15px;
    text-align: center;
    transition: 0.5s;
    background-size: 200% auto;
    color: #6cacc5;
    box-shadow: 0 0 40px rgba(42,50,113, .68);
    border: none;
    border-radius: 10px;
    background-image: linear-gradient(to right, rgba(42,50,113) 0%, rgba(42,50,73, .88) 51%, rgba(42,50,113) 100%);
    cursor: pointer;
    &:hover {
        background-position: right center;
    }
`;

export const CheckStyle = styled('input')`
    display: none;

    &:checked {

        + .check_box {
            @media (max-width: 1024px) {
                padding: 4px 0 0;
            }
            @media (max-width: 768px) {
                padding: 5px 0 0;
            }
            // mobile_view
            @media (max-width: 500px) {
                padding: 4px 0 0;
            }
            padding: 6px 0 0;
            border: none;
            border-radius: 7px;
            background-color: red;
        }
    }
`;

export const LabelStyle = styled('label')`
    @media (max-width: 1024px) {
        width: 25px;
        height: 20px;
        padding: 3px 0 0;
        font-size: .9rem;
    }
    @media (max-width: 768px) {
        padding: 4px 0 0;
        font-size: .8rem;
    }
    // mobile_view
    @media (max-width: 500px) {
        height: 17px;
        width: 20px;
        padding: 3px 0 0;
        font-size: .7rem;
    }
    position: relative;
    display: inline-block;
    width: 30px;
    height: 25px;
    padding: 5px 0 0;
    margin: 3px 0 0 0;
    border: 1px solid #7B7A8E;
    border-radius: 7px;
    background-color: transparent;
    color: #ffffff;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    box-sizing: border-box;
    cursor:pointer;
    user-select: none;

    transition-property: transform;

    &:hover {

        + .tooltip {
            // mobile_view
            @media (max-width: 500px) {
                top: -20px;
            }
            top: -23px;
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
            color: #c97874;
            z-index: 0;
        }
    }
`;

export const SelectStyle = styled('select')`
    @media (max-width: 1024px) {
        font-size: 1.2rem;
    }
    @media (max-width: 768px) {
        font-size: 1rem;
    }
    // mobile_view
    @media (max-width: 500px) {
        font-size: .9rem;
        padding: 3px 2px;
    }
    padding: 5px 7px 5px 5px;
    border: none;
    border-radius: 10px;
    background: rgb(68 68 71 / 1);
    color: #ffffff;
    font-size: 1.5rem;
    cursor: pointer;
    outline: none;

    &:hover {
        + .tooltip {
            // mobile_view
            @media (max-width: 500px) {
                top: -23px;
            }
            top: -25px;
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
            color: #c97874;
            z-index: 0;
        }
    }
`;

export const ToolTipStyle = styled('div')`
    @media (max-width: 1024px) {
        width: calc(100% + 5px);
    }
    // mobile_view
    @media (max-width: 500px) {
        height: 16px;
        padding: 3px 7px;
        font-size: .9rem;
    }
    position: absolute;
    top: -13px;
    width: 100%;
    height: 18px;
    padding: 3px 8px;
    border-radius: 10px;
    background: white;
    /* background: rgb(28 28 31 / 1); */
    font-size: 1rem;
    font-weight: 700;
    color: #c97874;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: -1;

    &::before {
        @media (max-width: 1024px) {
            left: 42%;
        }
        // mobile_view
        @media (max-width: 500px) {
            bottom: -2px;
        }
        position: absolute;
        content: "";
        height: 8px;
        width: 8px;
        /* background: rgb(28 28 31 / 1); */
        background: white;
        bottom: -3px;
        left: 40%;
        transform: translate(-50%) rotate(45deg);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: -1;
    }
`;

export const LoadingContainerStyle = styled('div')`
	text-align: center;
	width: 100%;
	height: 2em;
	margin-top: 1em;
`;

export const LoadingItemStyle = styled('div')<{$timing:number}>`
    // mobile_view
    @media (max-width: 500px) {
        font-size: 1.3rem;
    }
    display: inline-block;
    position: relative;
    padding: 0 .2em;
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    animation: bounce .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) infinite alternate;
    animation-delay: ${({$timing}) => $timing * .06}s;

    @keyframes bounce {
        0%{transform: translateY(0px);}
        100% {transform: translateY(-.8em);}
    }
`;
