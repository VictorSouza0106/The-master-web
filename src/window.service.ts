const BREAKING_POINTS = {
  mobile: 780,
  smallScreen: 1400,
  mediumScreen: 1900,
};

export type WindowSize = "mobile" | "small" | "medium" | "large";

export interface IResponsiveAttr {
  mobile: any;
  small: any;
  medium: any;
  large: any;
}

export function getCurrentSize(): WindowSize {
  const windowSize = window.innerWidth;
  const { mobile, smallScreen, mediumScreen } = BREAKING_POINTS;

  if (windowSize <= mobile) return "mobile";
  else if (windowSize <= smallScreen) return "small";
  else if (windowSize <= mediumScreen) return "medium";
  else return "large";
}

export function getResponsiveAttr(responsiveObj: IResponsiveAttr) {
  return responsiveObj[getCurrentSize()];
}
