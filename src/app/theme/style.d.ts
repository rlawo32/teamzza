import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        reverseBgColor: string;
        textColor: string;
        reverseTextColor: string;
        inputBgColor: string;
        inputTextColor: string;
        buttonBgColor: string;
        buttonTextColor: string;
        boxBgColor: string;
        borderColor: string;
    }
}
