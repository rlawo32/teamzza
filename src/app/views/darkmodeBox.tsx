'use client'

import styled from "styled-components";

import useShuffleBaseStore from "../stores/useShuffleBaseStore";

const DarkmodeBoxStyle = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 20px;
    right: 30px;
    width: 30px;
    height: 30px;
    border: ${({ theme }) => theme.borderColor};
    border-radius: 7px;
    background-color: ${({ theme }) => theme.buttonBgColor};
    z-index: 100;
    cursor: pointer;

    label[for=switch-to-dark]{
        height: 3rem;
        width: 3rem;
        background-color: hsla(0, 0%, 80%, 1);
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
        border-radius: 20%;
    }

    label[for=switch-to-dark]:hover {
        background-color: hsla(0, 0%, 30%, 1);

        svg {
            fill: #ffffff;
            stroke: #ffffff;
        }
    }

    label[for=switch-to-dark] svg {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 1.6rem;
        height: 1.6rem;
    }
`

const DarkmodeBox = () => {

    const { themeMode, setThemeMode } = useShuffleBaseStore();

    return (
        <DarkmodeBoxStyle>
            <input id="switch-to-dark" type="checkbox" onChange={(e) => setThemeMode(!themeMode)} checked={themeMode} />
            <label htmlFor="switch-to-dark">
                {
                    themeMode ? 
                        <svg width="32" height="32" viewBox="0 0 32 32">
                            <g transform="scale(0.03125 0.03125)">
                                <path d="M788.256 709.888c-262.016 0-474.24-212.384-474.24-474.24 0-86.24 24.736-166.016 64.992-235.616-218.368 
                                62.976-379.008 261.984-379.008 500.608 0 288.992 234.24 523.36 523.264 523.36 238.624 0 437.76-160.736 
                                500.736-379.008-69.76 40.128-149.504 64.896-235.744 64.896z"/>
                            </g>
                        </svg>
                        :
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="#000" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/>
                            <line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                }
            </label>
        </DarkmodeBoxStyle>
    )
}

export default DarkmodeBox;
