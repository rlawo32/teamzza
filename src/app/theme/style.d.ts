import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        bgSubColor: string;
        textColor: string;
        textSubColor: string;
        inputBgColor: string;
        inputTextColor: string;
        buttonBgColor: string;
        buttonTextColor: string;
        boxBgColor: string;
        boxBgSubColor: string;
        boxTextColor: string;
        boxBorderColor: string;
        borderColor: string;
        borderSubColor: string;
    }
}
