import styled from "styled-components";

export const MatchShuffle = styled('div')<{$teamCnt:number, $playerCnt:number}>`
    @media (max-width: 1024px) {
    }
    // mobile_view
    @media (max-width: 500px) {
    }
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 1320px;
    height: 100%;
    min-height: 600px;
    padding: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? '60px 60px' : '30px 60px'};
    margin: 60px auto;
    /* border: none;
    border-radius: 10px;
    background-color: rgb(49 49 60 / .1); */
    box-sizing: border-box;
    
    .list_section {
        position: relative;
        display: flex;
        justify-content: ${({$teamCnt}) => $teamCnt <= 5 ? 'space-between' : 'flex-start'};
        flex-wrap: wrap;

        .list_wrap {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            @media (max-width: 1300px) {
                ${({$teamCnt}) => $teamCnt === 2 ? '' : 
                                  $teamCnt === 3 ? 'width: calc(100% / 3)' : 'width: calc(100% / 4)'};
            }
            ${({$teamCnt}) => $teamCnt === 2 ? '' : 
                              $teamCnt === 3 ? 'width: calc(100% / 3)' : 
                              $teamCnt === 4 ? 'width: calc(100% / 4)' : 'width: calc(100% / 5)'};
            margin: 0 0 25px;

            .list_parent {
                @media (max-width: 768px) {
                }
                position: relative;
                margin: 0 50px;

                .list_title {
                }

                .list_child {
                    position: relative;
    
                    .list_select {
                        @media (max-width: 1024px) {
                        }
                        @media (max-width: 768px) {
                        }
                        // mobile_view
                        @media (max-width: 500px) {
                        }
                        position: absolute;
                        top: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 12 : 10}px;
                        left: 15px;
                    }
                }
            }
        }
    }
`;

export const ListParent = styled('div')<{$camp:number, $idx:number, $teamCnt:number, $playerCnt:number, $shuffle:boolean}>`
    &::before {
		content: '';
		position: absolute;
        top: 17px;
        left: 50%;
        transform: translateX(-50%);    
		width: 110%;
		height: 100%;
		border: 2px solid ${({$camp}) => $camp === 0 ? "#1F85FD" : 
                                         $camp === 1 ? "#F60C50" :
                                         $camp === 2 ? "#FFD300" :
                                         $camp === 3 ? "#16A34A" : // #16A34A
                                         $camp === 4 ? "#9333EA" : // #9333EA
                                         $camp === 5 ? "#A0522D" :
                                         $camp === 6 ? "#FF5CA8" :
                                         $camp === 7 ? "#EA580C" : // #EA580C
                                         $camp === 8 ? "#4CFFD6" : "#A8FF00"};
        border-radius: 10px;
        z-index: -3;
        animation: ${({$shuffle, $camp}) => $shuffle ? $camp === 0 ? 'blinkBlue 2s infinite' : 
                                                       $camp === 1 ? 'blinkRed 2s infinite' :
                                                       $camp === 2 ? 'blinkYellow 2s infinite' :
                                                       $camp === 3 ? 'blinkGreen 2s infinite' : // #16A34A
                                                       $camp === 4 ? 'blinkPurple 2s infinite' : // #9333EA
                                                       $camp === 5 ? 'blinkBrown 2s infinite' :
                                                       $camp === 6 ? 'blinkPink 2s infinite' :
                                                       $camp === 7 ? 'blinkOrange 2s infinite' : // #EA580C
                                                       $camp === 8 ? 'blinkMint 2s infinite' : 'blinkLime 2s infinite' : ''};
	}

    @keyframes blinkBlue {
        0%, 100% {border-color: #1F85FD;}
        50% {border-color: #66B2FF;}
    }

    @keyframes blinkRed {
        0%, 100% {border-color: #F60C50;}
        50% {border-color: #FF6B6B;}
    }

    @keyframes blinkYellow {
        0%, 100% {border-color: #FFD300;}
        50% {border-color: #FFE066;}
    }

    @keyframes blinkGreen {
        0%, 100% {border-color: #16A34A;}
        50% {border-color: #66FF99;}
    }

    @keyframes blinkPurple {
        0%, 100% {border-color: #9333EA;}
        50% {border-color: #D1A3FF;}
    }

    @keyframes blinkBrown {
        0%, 100% {border-color: #A0522D;}
        50% {border-color: #C97F4E;}
    }

    @keyframes blinkPink {
        0%, 100% {border-color: #FF5CA8;}
        50% {border-color: #FFAADD;}
    }

    @keyframes blinkOrange {
        0%, 100% {border-color: #EA580C;}
        50% {border-color: #FFAB40;}
    }

    @keyframes blinkMint {
        0%, 100% {border-color: #4CFFD6;}
        50% {border-color: #A0FFF0;}
    }

    @keyframes blinkLime {
        0%, 100% {border-color: #A8FF00;}
        50% {border-color: #D4FF70;}
    }
`;

export const ListChild = styled('div')<{$idx:number, $teamCnt:number, $playerCnt:number}>`
    position: relative;
    display: flex;
    align-items: center;
    @media (max-width: 1300px) {
        width: 210px;
        height: 54px;
    }
    width: ${({$teamCnt, $playerCnt}) => $teamCnt < 4 ? 310 : 
                                         $teamCnt === 4 ? 250 : 210}px;
    height: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 60 : 54}px;
    margin: 5px 0;
    border-radius: 20px;
    text-align: center;
    transition: transform .2s ease-in-out;
	overflow: hidden;

    .list_check {
        @media (max-width: 1300px) {
            top: 12px;
        }
        @media (max-width: 768px) {
        }
        // mobile_view
        @media (max-width: 500px) {
        }
        position: absolute;
        top: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 14 : 12}px;
        right: 13px;
    }

    &.scale-up {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }
    &.scale-down {
        transform: scale(1);
        transition: transform 0.3s ease;
    }
`;

export const ControlSection = styled('div')<{$pos:string, $teamCnt:number, $playerCnt:number}>`
    position: fixed;
    ${({$pos, $teamCnt, $playerCnt}) => $pos === 'top' ? 'top: 0' : 'bottom: 20px'};
    z-index: 99;
    display: flex;
    margin-top: 5px;
    padding: 6px;
    border: none;
    border-radius: 12px;
    background: ${({ theme }) => theme.boxBgColor};

    .button_section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 4px 6px;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.boxBgSubColor};
        color: ${({ theme }) => theme.boxTextColor};
        gap: 6px;

        button {
            display: flex;
            align-items: center;
            height: 40px;
            margin: 0 3px;
            padding: 0 12px;
            border: 1px solid ${({ theme }) => theme.boxBorderColor};
            border-radius: 8px;
            background: inherit;
            color: ${({ theme }) => theme.boxTextColor};
            font-size: 1.2rem;
            font-weight: 400;
            cursor: pointer;
            transition: all .5s;

            &:hover {
                border: 1px solid ${({ theme }) => theme.boxTextColor};
            }

            &:last-child {
                border: 1px solid ${({ theme }) => theme.boxTextColor};
                background-color: ${({ theme }) => theme.boxTextColor};
                color: ${({ theme }) => theme.boxBgSubColor};
                font-weight: 700;

                &:hover {
                    border: 1px solid ${({ theme }) => theme.boxBorderColor};
                }
            }
        }
    }

`;

export const InputWrapperStyle = styled('div')<{$camp:number, $idx:string, $teamCnt:number, $playerCnt:number, $shuffle:boolean}>`
	
	&::before {
		content: '';
		position: absolute;
		width: 200%;
		height: 200%;
		background-color: ${({$camp}) => $camp === 0 ? "#1F85FD" : 
                                         $camp === 1 ? "#F60C50" :
                                         $camp === 2 ? "#FFD300" :
                                         $camp === 3 ? "#00C853" : // #16A34A
                                         $camp === 4 ? "#A259FF" : // #9333EA
                                         $camp === 5 ? "#A0522D" :
                                         $camp === 6 ? "#FF5CA8" :
                                         $camp === 7 ? "#FF6D00" : // #EA580C
                                         $camp === 8 ? "#4CFFD6" : "#A8FF00"};
        border-radius: 18px;
        z-index: -2;
	}

    /* &::after {
		content: '';
		position: absolute;
        top: 30%;
        left: -50%;
		width: 200%;
		height: 50%;
        border-radius: 18px;
        z-index: -1;
        background: ${({$shuffle}) => $shuffle ? 'conic-gradient(from 0deg, #333333 25% 50%, transparent 25% 100%)' : ''};
        animation: ${({$shuffle}) => $shuffle ? 'rotate 4s linear infinite' : ''};
    } */

    .dot {
        content: '';
        position: absolute;
        top: 3px;
        left: 20px;
        display: block;
        @media (max-width: 1300px) {
            width: calc(159px * .05);
        }
        width: ${({$teamCnt}) => $teamCnt < 4 ? 'calc(259px * .05)' : 
                                 $teamCnt === 4 ? 'calc(199px * .05)' : 'calc(159px * .05)'};
        height: 90%;
        border-radius: 50%;
        transition: ${({$shuffle, $idx}) => $shuffle ? 'opacity .' + $idx.substring($idx.length - 1) + 's ease' : ''};
        animation: ${({$shuffle}) => $shuffle ? 'atom 2s infinite linear' : ''};
        animation-delay: ${({$shuffle, $idx}) => $shuffle ? '.' + $idx.substring($idx.length - 1) + 's' : ''};
        opacity: ${({$shuffle}) => $shuffle ? '1' : '0'};
        z-index: -2;
    }

    .dot::after {
        content: '';
        position: absolute;
        left: calc(10% - .4em);
        top: -8px;
        height: 30px;
        width: 40px;
        background: ${({$camp}) => $camp === 0 ? "#66B2FF" : 
                                   $camp === 1 ? "#FF6B6B" :
                                   $camp === 2 ? "#FFE066" :
                                   $camp === 3 ? "#66FF99" :
                                   $camp === 4 ? "#D1A3FF" :
                                   $camp === 5 ? "#C97F4E" :
                                   $camp === 6 ? "#FFAADD" :
                                   $camp === 7 ? "#FFAB40" :
                                   $camp === 8 ? "#A0FFF0" : "#D4FF70"};
        border: none;
        border-radius: 25%;
    }

    @keyframes rotate {
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes atom {
        0% {transform: translateX(0) rotate(0);}
        30%{transform: translateX(${({$teamCnt}) => $teamCnt < 4 ? 'calc(259px - (259px * .01))' : 
                                                    $teamCnt === 4 ? 'calc(199px - (199px * .01))' : 'calc(159px - (159px * .01))'}) rotate(0);}
        50% {transform: translateX(${({$teamCnt}) => $teamCnt < 4 ? 'calc(259px - (259px * .01))' : 
                                                     $teamCnt === 4 ? 'calc(199px - (199px * .01))' : 'calc(159px - (159px * .01))'}) rotate(180deg);}
        80% {transform: translateX(0) rotate(180deg);}
        100% {transform: translateX(0) rotate(360deg);}
    }
`;

export const GroupCampStyle = styled('div')<{$camp:number}>`
    @media (max-width: 1300px) {
        font-size: 2rem;
    }
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 210px;
    height: 30px;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 auto 10px;
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({$camp}) => $camp === 0 ? "#1F85FD" : 
                          $camp === 1 ? "#F60C50" :
                          $camp === 2 ? "#FFD300" :
                          $camp === 3 ? "#00C853" :
                          $camp === 4 ? "#A259FF" :
                          $camp === 5 ? "#A0522D" :
                          $camp === 6 ? "#FF5CA8" :
                          $camp === 7 ? "#FF6D00" :
                          $camp === 8 ? "#4CFFD6" : "#A8FF00"};
    input {
        width: 120px;
        padding: 5px 10px;
        border: 2px solid ${({$camp}) => $camp === 0 ? "#1F85FD" : 
                                         $camp === 1 ? "#F60C50" :
                                         $camp === 2 ? "#FFD300" :
                                         $camp === 3 ? "#00C853" :
                                         $camp === 4 ? "#A259FF" :
                                         $camp === 5 ? "#A0522D" :
                                         $camp === 6 ? "#FF5CA8" :
                                         $camp === 7 ? "#FF6D00" :
                                         $camp === 8 ? "#4CFFD6" : "#A8FF00"};
        border-radius: 10px;
        outline: none;
    }
    button {
        position: relative;
        top: 2px;
        right: -10px;
        display: flex;
        width: 12px;
        height: 12px;
        border: none;
        background: none;
        cursor: pointer;

        .btn_icon {
            width: 11px;
            height: 11px;
            font-size: 1.5rem;
            color: ${({ theme }) => theme.textColor};
            opacity: 0.7;

            &:hover {
                opacity: 1;
            }
        }

        &:focus {
            outline: none;
            .btn_icon {
                opacity: 1;
            }
        }
    }
`

export const InputPlayerStyle = styled('input')<{$camp:number, $teamCnt:number, $playerCnt:number}>`
    @media (max-width: 1300px) {
        width: 200px;
        height: 46px;
        font-size: 1.5rem;
    }
    @media (max-width: 1024px) {
    }
    @media (max-width: 768px) {
    }
    // mobile_view
    @media (max-width: 500px) {
    }
    position: relative;
    left: 0px;
    width: ${({$teamCnt}) => $teamCnt < 4 ? 300 : 
                             $teamCnt === 4 ? 240 : 200}px;
    height: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 52 : 46}px;
    margin: 7px 5px;
    padding: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? '10px 45px 10px 70px' : '7px 45px 7px 70px'};
    border: none;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.inputBgColor};
    color: ${({ theme }) => theme.textColor};
    font-size: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 1.8 : 1.5}rem;
    font-weight: 700;

    &:focus {
        outline: none;
    }

    &::placeholder {
        @media (max-width: 1300px) {
            font-size: 1.3rem;
        }
        color: rgba(128, 128, 128, .3);
        font-size: ${({$teamCnt, $playerCnt}) => $teamCnt < 5 && $playerCnt < 7 ? 1.8 : 1.3}rem;
        opacity: 0.7;
    }
`;

export const CheckStyle = styled('input')<{$teamCnt:number, $playerCnt:number}>`
    display: none;

    &:checked {

        + .check_box {
            @media (max-width: 1024px) {
            }
            @media (max-width: 768px) {
            }
            // mobile_view
            @media (max-width: 500px) {
            }
            padding: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? '6px 0 0' : '3px 0 0'};
            margin-top: 4px;
            margin-bottom: 2px;
            border: none;
            border-radius: 7px;
            background-color: red;
            color: #ffffff;
            font-size: 1rem;
            font-weight: 700;
            box-shadow: 0px 0px 0px 0px ${({ theme }) => theme.borderColor};
            /* transition: all .1s ease-in-out; */
        }
    }
`;

export const LabelStyle = styled('label')<{$teamCnt:number, $playerCnt:number}>`
    @media (max-width: 1024px) {
    }
    @media (max-width: 768px) {
    }
    // mobile_view
    @media (max-width: 500px) {
    }
    position: relative;
    display: inline-block;
    width: 30px;
    height: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 25 : 21}px;
    padding: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? '5px 0 0' : '3px 0 0'};
    margin: 3px 0 0 0;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 7px;
    background-color: transparent;
    color: ${({ theme }) => theme.textColor};
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    box-sizing: border-box;
    box-shadow: 0px 2px 0px 0px ${({ theme }) => theme.borderColor};
    cursor:pointer;
    user-select: none;
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
