import { css } from "styled-components";

enum BreakPoints {
  XS = 575.98,
  SM = 767.98,
  MD = 991.98,
  LG = 1199.98,
  XL = 1200,
}

export enum BreakPointLabels {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

interface IBreakpoint {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export function breakpoints(cssProp = "padding", values: IBreakpoint[] = []) {
  const cssProps =
    (Array.isArray(values) &&
      values?.length > 0 &&
      values.reduce((mediaQueries, value) => {
        const breakPointName = Object.keys(value)[0].toUpperCase();
        const screenBreakpoint = BreakPoints[breakPointName];
        const cssPropBreakpoint = Object.values(value)[0] || "";

        const result = `${mediaQueries}
          @media screen and (${
            breakPointName === "XL" ? "min-width" : "max-width"
          }: ${screenBreakpoint}px) {
            ${cssProp}: ${cssPropBreakpoint};
          }
        `;
        return result;
      }, "")) ||
    "";

  return css([cssProps] as any);
}
