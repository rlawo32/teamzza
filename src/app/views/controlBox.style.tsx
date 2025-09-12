import styled from "styled-components";

export const ControlBoxStyle = styled('div')<{$show:boolean}>`
    @media (max-width: 768px) {
    }
    // mobile_view
    @media (max-width: 500px) {
    }
    width: 300px;
    height: 100%;

    .info_section {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 6px 0;
        color: ${({ theme }) => theme.boxTextColor};
        text-align: center;

        button {
            @media (max-width: 768px) {
            }
            // mobile_view
            @media (max-width: 500px) {
            }
            position: absolute;
            top: 10px;
            right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 3px;
            border: none;
            background-color: transparent;
            color: ${({ theme }) => theme.textColor};
            cursor: pointer;

            &:active {
                scale: .7;
                transition: scale .3s ease-in-out;
            }

            &:hover {
                opacity: .7;
            }

            .btn_icon {
                position: absolute;
                font-size: 1.5rem;
                font-weight: 700;
            }
        }

        .shuffle_count {
            @media (max-width: 768px) {
            }
            // mobile_view
            @media (max-width: 500px) {
            }
            font-size: 1.8rem;
            font-weight: 700;
            margin: 0 0 20px 0;
        }
    }

    .control_section {
        @media (max-width: 768px) {
        }
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: ${({$show}) => $show ? 150 : 0}px;
        margin: 0 auto 5px;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        background-color: ${({ theme }) => theme.boxBgColor};
        color: ${({ theme }) => theme.textColor};
        font-size: 1.3rem;
        opacity: ${({$show}) => $show ? 1 : 0};
        overflow: hidden;
        transition: height .3s ease-in-out, opacity .3s ease-in-out;

        .option_section {
            @media (max-width: 768px) {
            }
            // mobile_view
            @media (max-width: 500px) {
            }
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: calc(100% / 2);
            height: 100%;

            .option_box {
                @media (max-width: 768px) {
                }
                // mobile_view
                @media (max-width: 480px) {
                }
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                padding-top: 15px;

                &.shuffle_control {
                    flex-direction: column;
                    /* border-right: 1px solid black; */

                    .option_item {
                        margin: 10px 0;

                        button {
                            @media (max-width: 768px) {
                            }
                            // mobile_view
                            @media (max-width: 500px) {
                            }
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 3px 4px;
                            margin: 0 3px;
                            border: none;
                            border-radius: 5px;
                            background-color: ${({ theme }) => theme.textColor};
                            color: ${({ theme }) => theme.boxBgSubColor};
                            cursor: pointer;

                            &:active {
                                scale: .7;
                                transition: scale .3s ease-in-out;
                            }
                        }
                    }
                }

                &.shuffle_setting {
                    /* border-bottom: 1px solid black; */
                }

                .box_title {
                    position: absolute;
                    top: 5px;
                    width: 120px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    text-align: center;
                }

                .option_item {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 0 4px;

                    .option_title {
                        font-size: 1rem;
                        font-weight: 500;
                        margin-bottom: 6px;
                    }

                    .option_tool {
                        display: flex;
                        align-items: center;

                        .btn_icon {
                            font-size: .8rem;
                            font-weight: 700;
                        }

                        .sec_time {
                            @media (max-width: 768px) {
                            }
                            width: 35px;
                            text-align: center;
                        }
                        
                        .option_toggle {
                            position: relative;

                            input {
                                display: none;

                                &:checked + .toggle_slider {
                                    background-color: #66bb6a;

                                    &::before {
                                        transform: translateX(20px);
                                    }
                                }
                            }

                            .toggle_slider {
                                position: relative;
                                display: flex;
                                align-items: center;
                                width: 35px;
                                height: 15px;
                                border-radius: 34px;
                                background-color: red;
                                font-size: .75rem;
                                font-weight: 700;
                                user-select: none;
                                cursor: pointer;
                                
                                &::before {
                                    content: "";
                                    position: absolute;
                                    bottom: 3px;
                                    left: 3px;
                                    width: 9px;
                                    height: 9px;
                                    border-radius: 50%;
                                    background-color: #fff;
                                    transition: .4s;
                                }
                            }
                        }

                        .option_radio {
                            position: relative;

                            input {
                                display: none;

                                &:checked + .slider {
                                    color: #0DFF92;
                                    border: 5px solid #0DFF92;

                                    &::before {
                                        background: #0DFF92;
                                    }
                                }
                            }

                            .radio_check {
                                display: block;
                                position: absolute;
                                border: 5px solid #AAAAAA;
                                border-radius: 100%;
                                height: 25px;
                                width: 25px;
                                top: 30px;
                                left: 20px;
                                z-index: 5;
                                transition: border .25s linear;

                                &::before {
                                    display: block;
                                    position: absolute;
                                    content: '';
                                    border-radius: 100%;
                                    height: 15px;
                                    width: 15px;
                                    top: 5px;
                                    left: 5px;
                                    margin: auto;
                                    transition: background 0.25s linear;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    .btn_section {
        @media (max-width: 768px) {
        }
        display: flex;
        justify-content: center;
        padding: 0 10px 15px;

        button {
            @media (max-width: 768px) {
            }
            // mobile_view
            @media (max-width: 500px) {
            }
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            margin: 0 5px;
            padding: 10px 15px;
            border: 1px solid ${({ theme }) => theme.boxBorderColor};;
            border-radius: 10px;
            background-color: ${({ theme }) => theme.textColor};
            color: ${({ theme }) => theme.boxBgSubColor};
            font-size: 1.3rem;
            font-weight: 700;
            cursor: pointer;
            transition: border .5s;

            .btn_icon {
                margin-right: 7px;
            }

            &:hover {
                border: 1px solid ${({ theme }) => theme.textColor};
            }

            &:active {
                scale: .9;
                transition: scale .2s ease-in-out;
            }
        }
    }
`

export const ToggleEffectOn = styled('div')<{$show:boolean}>`
    position: absolute;
    left: 0;
    margin: 0 6px;
    opacity: ${({$show}) => $show ? 1 : 0};
    transition: opacity 1s;
`

export const ToggleEffectOff = styled('div')<{$show:boolean}>`
    position: absolute;
    right: 0;
    margin: 0 5px;
    opacity: ${({$show}) => $show ? 0 : 1};
    transition: opacity 1s;
`
