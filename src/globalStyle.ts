import { createGlobalStyle } from "styled-components";

import MuseosansEot300 from "./assets/fonts/museosans/museosans_300-webfont.eot";
import MuseosansSvg300 from "./assets/fonts/museosans/museosans_300-webfont.svg";
import MuseosansTtf300 from "./assets/fonts/museosans/museosans_300-webfont.ttf";
import MuseosansWoff300 from "./assets/fonts/museosans/museosans_300-webfont.woff";
import MuseosansWoff2300 from "./assets/fonts/museosans/museosans_300-webfont.woff2";

import MuseosansEot500 from "./assets/fonts/museosans/museosans_500-webfont.eot";
import MuseosansSvg500 from "./assets/fonts/museosans/museosans_500-webfont.svg";
import MuseosansTtf500 from "./assets/fonts/museosans/museosans_500-webfont.ttf";
import MuseosansWoff500 from "./assets/fonts/museosans/museosans_500-webfont.woff";
import MuseosansWoff2500 from "./assets/fonts/museosans/museosans_500-webfont.woff2";

import MuseosansEot700 from "./assets/fonts/museosans/museosans_700-webfont.eot";
import MuseosansSvg700 from "./assets/fonts/museosans/museosans_700-webfont.svg";
import MuseosansTtf700 from "./assets/fonts/museosans/museosans_700-webfont.ttf";
import MuseosansWoff700 from "./assets/fonts/museosans/museosans_700-webfont.woff";
import MuseosansWoff2700 from "./assets/fonts/museosans/museosans_700-webfont.woff2";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "MuseoSans";
    }

    h1, h2, h3, h4, h5, p {
        margin: 0;
        padding: 0;
    }

    @font-face {
        font-family: "MuseoSans";
        src: url(${MuseosansEot300});
        src: url(${MuseosansEot300}?#iefix) format("embedded-opentype"),
            url(${MuseosansWoff2300}) format("woff2"),
            url(${MuseosansWoff300}) format("woff"),
            url(${MuseosansTtf300}) format("truetype"),
            url(${MuseosansSvg300}#museo_sans300) format("svg");
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: "MuseoSans";
        src: url(${MuseosansEot500});
        src: url(${MuseosansEot500}?#iefix) format("embedded-opentype"),
            url(${MuseosansWoff2500}) format("woff2"),
            url(${MuseosansWoff500}) format("woff"),
            url(${MuseosansTtf500}) format("truetype"),
            url(${MuseosansSvg500}#museo_sans500) format("svg");
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: "MuseoSans";
        src: url(${MuseosansEot700});
        src: url(${MuseosansEot700}?#iefix) format("embedded-opentype"),
            url(${MuseosansWoff2700}) format("woff2"),
            url(${MuseosansWoff700}) format("woff"),
            url(${MuseosansTtf700}) format("truetype"),
            url(${MuseosansSvg700}#museo_sans700) format("svg");
        font-weight: 700;
        font-style: normal;
    }
`;
