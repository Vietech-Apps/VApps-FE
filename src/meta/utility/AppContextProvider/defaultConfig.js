import {
  Fonts,
  FooterType,
  LayoutDirection,
  LayoutType,
  MenuStyle,
  NavStyle,
  ThemeMode,
  ThemeStyle,
  ThemeStyleRadius,
} from "shared/constants/AppEnums";

export const appThemeFont = {
  family: ["Poppins", "sans-serif"].join(","),
  weight: {
    light: Fonts.LIGHT,
    regular: Fonts.REGULAR,
    medium: Fonts.MEDIUM,
    bold: Fonts.BOLD,
    extraBold: Fonts.EXTRA_BOLD,
  },
  size: {
    base: "14px",
    lg: "16px",
    sm: "12px",
    xs: "10px",
  },
};

export const DarkSidebar = {
  sidebarBgColor: "#313541",
  sidebarTextColor: "#fff",
  sidebarHeaderColor: "#313541",
  sidebarMenuSelectedBgColor: "#F4F7FE",
  sidebarMenuSelectedTextColor: "rgba(0, 0, 0, 0.87)",
  mode: ThemeMode.DARK,
};
export const LightSidebar = {
  sidebarBgColor: "#fff",
  sidebarTextColor: "rgba(0, 0, 0, 0.60)",
  sidebarHeaderColor: "#fff",
  sidebarMenuSelectedBgColor: "#F4F7FE",
  sidebarMenuSelectedTextColor: "rgba(0, 0, 0, 0.87)",
  mode: ThemeMode.LIGHT,
};
export const mySidebarColor = {
  id: 3,
  sidebarBgColor: "#fff",
  sidebarTextColor: "rgba(0, 0, 0, 0.87)",
  sidebarHeaderColor: "#fff",
  sidebarMenuSelectedBgColor: "#F4F7FE",
  sidebarMenuSelectedTextColor: "rgba(0, 0, 0, 0.87)",
  mode: ThemeMode.LIGHT,
};
export const textLight = {
  primary: "rgb(17, 24, 39)",
  secondary: "rgb(107, 114, 128)",
  disabled: "rgb(149, 156, 169)",
  hint: "rgb(174, 175, 184)",
};
export const textDark = {
  primary: "rgb(255,255,255)",
  secondary: "rgb(229, 231, 235)",
  disabled: "rgb(156, 163, 175)",
};

export const backgroundDark = {
  paper: "#2B3137",
  default: "#1F2527",
};

export const backgroundLight = {
  paper: "#FFFFFF",
  default: "#ecedee",
};

const cardRadius = ThemeStyleRadius.STANDARD;
export const defaultTheme = {
  theme: {
    spacing: 4,
    cardRadius: cardRadius,
    cardRadius30: ThemeStyleRadius.MODERN,
    cardShadow: "0 0 5px 5px rgba(0,0,0,0.03)",
    direction: LayoutDirection.LTR, //ltr, rtl
    palette: {
      mode: ThemeMode.LIGHT,
      borderColor: "#0000001f",
      dividerColor: "rgba(0, 0, 0, 0.06)",
      tooltipBg: "rgba(0, 0, 0, 0.75)",
      background: backgroundLight,
      primary: {
        main: "#1b9971",
        contrastText: "#581845",
        textCol: "#16795a",
      },
      shade: {
        main: "#7FFFD4",
        contrastText: "#24eda9",
      },
      secondary: {
        main: "#7C4D30",
      },
      success: {
        main: "#52c41a", //'#11C15B',
        light: "#D9F5E5",
      },
      warning: {
        main: "#FF5252",
        light: "#FFECDC",
      },
      gray: {
        50: "#fafafa",
        100: "#F5F5F5", //#F5F6FA,
        200: "#eeeeee", //#edf2f7',
        300: "#E0E0E0",
        400: "#bdbdbd", //#c5c6cb,
        500: "#9e9e9e", //#A8A8A8',
        600: "#757575", //#666666',
        700: "#616161", //'#4a5568',
        800: "#201e21",
        900: "#212121", //'#1a202c',
        A100: "#d5d5d5",
        A200: "#aaaaaa",
        A400: "#303030",
        A700: "#616161",
      },
      black: "#000",
      white: "#FFFFFF",
      orange: {
        5: "#ffa940",
        6: "#fa8c16",
      },
      cyan: {
        7: "#08979c",
      },
      red: {
        6: "#f5222d",
      },
      green: {
        3: "#b7eb8f",
        5: "#73d13d",
        6: "#52c41a",
        7: "#389e0d",
      },
      blue: {
        5: "#40a9ff",
        7: "#096dd9",
      },
      text: textLight,
    },
    status: {
      danger: "orange",
    },
    divider: "rgba(224, 224, 224, 1)",
    font: appThemeFont,
    sidebar: {
      light: mySidebarColor,
      dark: DarkSidebar,
    },
    breakpoints: {
      xs: 480,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1600,
    },
    sizes: {
      line: {
        base: 1.35,
      },
      borderRadius: {
        base: "4px",
        circle: "50%",
      },
      framed: {
        base: "20px",
      },
    },
  },
};
//changing for theme
const defaultConfig = {
  sidebar: {
    borderColor: "#757575",
    menuStyle: MenuStyle.ROUNDED,
    isSidebarBgImage: false,
    sidebarBgImage: 1,
    colorSet: mySidebarColor,
  },
  locale: {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "us",
  },
  themeStyle: ThemeStyle.STANDARD,
  direction: LayoutDirection.LTR,
  themeMode: ThemeMode.LIGHT,
  footerType: FooterType.FLUID,
  navStyle: NavStyle.HOR_HEADER_FIXED,
  layoutType: LayoutType.FULL_WIDTH,
  footer: false,
  rtlLocale: ["ar"],
};
export default defaultConfig;
