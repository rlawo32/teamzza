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
    max-width: 1280px;
    height: 100%;
    min-height: 600px;
    padding: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? '100px 30px 60px' : '60px 30px'};
    margin: 30px auto;
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
            ${({$teamCnt}) => $teamCnt === 2 ? '' : 
                              $teamCnt === 3 ? 'width: calc(100% / 3)' : 
                              $teamCnt === 4 ? 'width: calc(100% / 4)' : 'width: calc(100% / 5)'};
            margin: 0 0 25px;

            .list_parent {
                @media (max-width: 768px) {
                }
                margin: 0 50px;

                .list_title {
                }

                .list_child {
                }
            }
        }
    }
`;

export const ListChild = styled('div')<{$idx:number, $teamCnt:number, $playerCnt:number}>`
    position: relative;
    display: flex;
    align-items: center;
    width: ${({$teamCnt}) => $teamCnt < 4 ? 310 : 
                             $teamCnt === 4 ? 250 : 210}px;
    height: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 60 : 54}px;
    margin: 5px 0;
    border-radius: 20px;
    text-align: center;
    transition: transform 0.4s ease-in-out;
	overflow: hidden;
    
    .list_select {
        @media (max-width: 1024px) {
        }
        @media (max-width: 768px) {
        }
        // mobile_view
        @media (max-width: 500px) {
        }
        position: absolute;
        top: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 12 : 7}px;
        left: 15px;
    }

    .list_check {
        @media (max-width: 768px) {
        }
        // mobile_view
        @media (max-width: 500px) {
        }
        position: absolute;
        top: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 14 : 9}px;
        right: 13px;
    }

    &.scale-up {
        transform: scale(1.03);
    }
    &.scale-down {
        transform: scale(1);
    }
`

export const ControlSection = styled('div')<{$pos:string, $teamCnt:number, $playerCnt:number}>`
    position: fixed;
    ${({$pos, $teamCnt, $playerCnt}) => $pos === 'top' ? 'top: 0' : 'bottom: 20px'};
    z-index: 99;
    display: flex;
    margin-top: 5px;
    padding: 6px;
    border: none;
    border-radius: 12px;
    background: rgba(34, 34, 34 , 0.8);

    .button_section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 4px 6px;
        border-radius: 8px;
        background-color: #222222CC;
        color: #DEDEDE;
        gap: 6px;

        button {
            display: flex;
            align-items: center;
            height: 40px;
            margin: 0 3px;
            padding: 0 12px;
            border: 1px solid #4E4E4E;
            border-radius: 8px;
            background: inherit;
            color: #dedede;
            font-size: 1.2rem;
            font-weight: 400;
            cursor: pointer;
            transition: all .5s;

            &:hover {
                border: 1px solid #dedede;
            }

            &:last-child {
                border: 1px solid #dedede;
                background-color: #F9F9F9;
                color: #222;
                font-weight: 700;

                &:hover {
                    border: 1px solid #4E4E4E;
                }
            }
        }
    }

`;

export const InputWrapperStyle = styled('div')<{$camp:number, $idx:number, $teamCnt:number, $playerCnt:number, $shuffle:boolean}>`
	
	&::before {
		content: '';
		position: absolute;
		width: 200%;
		height: 200%;
		background-color: ${({$camp}) => $camp === 0 ? "#1F85FD" : 
                                         $camp === 1 ? "#F60C50" :
                                         $camp === 2 ? "#FFD300" :
                                         $camp === 3 ? "#00C853" :
                                         $camp === 4 ? "#A259FF" :
                                         $camp === 5 ? "#A0522D" :
                                         $camp === 6 ? "#FF5CA8" :
                                         $camp === 7 ? "#FF6D00" :
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
        width: ${({$teamCnt}) => $teamCnt < 4 ? 'calc(259px * .05)' : 
                                 $teamCnt === 4 ? 'calc(199px * .05)' : 'calc(159px * .05)'};
        height: 90%;
        border-radius: 50%;
        transition: ${({$shuffle, $idx}) => $shuffle ? 'opacity .' + $idx + 's ease' : ''};
        animation: ${({$shuffle}) => $shuffle ? 'atom 2s infinite linear' : ''};
        animation-delay: ${({$shuffle, $idx}) => $shuffle ? '.' + $idx + 's' : ''};
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
        background: #333333;
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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
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
            color: black;
            opacity: 0.4;

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
    @media (max-width: 1024px) {
    }
    @media (max-width: 768px) {
    }
    // mobile_view
    @media (max-width: 500px) {
    }
    position: relative;
    width: ${({$teamCnt}) => $teamCnt < 4 ? 300 : 
                             $teamCnt === 4 ? 240 : 200}px;
    height: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 52 : 46}px;
    margin: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? '7px 5px' : '6px'};
    padding: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? '10px 45px 10px 70px' : '7px 45px 7px 70px'};
    border: 0px solid ${({$camp}) => $camp === 0 ? "#1F85FD" : 
                                     $camp === 1 ? "#F60C50" :
                                     $camp === 2 ? "#FFD300" :
                                     $camp === 3 ? "#00C853" :
                                     $camp === 4 ? "#A259FF" :
                                     $camp === 5 ? "#A0522D" :
                                     $camp === 6 ? "#FF5CA8" :
                                     $camp === 7 ? "#FF6D00" :
                                     $camp === 8 ? "#4CFFD6" : "#A8FF00"};
    border-radius: 15px;
    /* background: rgb(28 28 31 / 1);
    color: #ffffff; */
    background-color: #F9F9F9;
    color: #222;
    font-size: ${({$teamCnt, $playerCnt}) => $teamCnt <= 5 && $playerCnt < 7 ? 1.8 : 1.5}rem;

    &:focus {
        outline: 1px solid #ffffff;
    }

    &::placeholder {
        color: gray;
        font-size: 18px;
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
            background-color: #14B8A6;
            color: #1E293B;
            font-size: 1rem;
            font-weight: 700;
            box-shadow: 0px 0px 0px 0px #D1D5DB;
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
    border: 1px solid #D1D5DB;
    border-radius: 7px;
    background-color: transparent;
    color: #222;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    box-sizing: border-box;
    box-shadow: 0px 2px 0px 0px #D1D5DB;
    cursor:pointer;
    user-select: none;

    transition-property: transform;
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
