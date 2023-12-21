// export const RoutePermittedRole = {
//   user: "user",
//   admin: "admin",
//   adminPannel: "adminPannel",
//   Contact: "Contact",
//   eventManagement: "eventManagement",
//   products: "products",
//   sales: "sales",
//   gatein: "gatein",
//   gateout: "gateout",
//   enquiry: "enquiry",
//   quotation: "quotation",
//   estimation: "estimation",
//   saleOrder: "saleOrder",
//   estTemplete: "estTemplete",
//   analytics: "analytics",
//   taskManager: "taskManager",
//   employee: "employee",
//   department: "department",
//   designation: "designation",
//   permissions: "permissions",
//   meetingVenue: "meetingVenue",
//   Warehouse: "Warehouse",
//   BinLocation: "BinLocation",
//   warehouseSetting: "WH-Setting",
//   accounts: "accounts",
// };

export const myModules = [
  { label: "Admin Panel", value: "adminPanel" },
  {
    label: "Contact",
    value: "Contact",
    extraOptions: [{ value: "Multiple", label: "Multiple" }],
  },
  { label: "Event Management", value: "eventManagement" },
  { label: "Invoicing", value: "Invoicing" },
  { label: "Products", value: "products" },
  { label: "Sales", value: "sales" },
  { label: "Gate In", value: "gatein" },
  { label: "Gate Out", value: "gateout" },
  { label: "Enquiry", value: "enquiry" },
  { label: "Quotation", value: "quotation" },
  { label: "Estimation", value: "estimation" },
  { label: "Sale Order", value: "saleOrder" },
  { label: "Estimation Template", value: "estTemplete" },
  { label: "Analytics", value: "analytics" },
  { label: "Task Manager", value: "taskManager" },
  { label: "Employee", value: "employee" },
  { label: "Department", value: "department" },
  { label: "Designation", value: "designation" },
  { label: "Permissions", value: "permissions" },
  { label: "Meeting Venue", value: "meetingVenue" },
];

export const RoutePermittedRole = {
  ...Object.fromEntries(myModules.map(({ value }) => [value, value])),
  user: "user",
  admin: "admin",
};

export const ThemeStyle = {
  MODERN: "modern",
  STANDARD: "standard",
};
export const ThemeStyleRadius = {
  MODERN: "30px",
  STANDARD: "16px",
};
export const ThemeMode = {
  LIGHT: "light",
  SEMI_DARK: "semi-dark",
  DARK: "dark",
};
export const LayoutType = {
  FULL_WIDTH: "full-width",
  BOXED: "boxed",
  FRAMED: "framed",
};

export const MenuStyle = {
  DEFAULT: "default",
  STANDARD: "standard",
  ROUNDED: "rounded",
  ROUNDED_REVERSE: "rounded-reverse",
  CURVED_MENU: "curved-menu",
};

export const NavStyle = {
  DEFAULT: "default",
  MINI: "mini",
  MINI_SIDEBAR_TOGGLE: "mini-sidebar-toggle",
  STANDARD: "standard",
  HEADER_USER: "user-header",
  HEADER_USER_MINI: "user-mini-header",
  DRAWER: "drawer",
  BIT_BUCKET: "bit-bucket",
  H_DEFAULT: "h-default",
  HOR_HEADER_FIXED: "hor-header-fixed",
  HOR_DARK_LAYOUT: "hor-dark-layout",
};
export const FooterType = {
  FIXED: "fixed",
  FLUID: "fluid",
};
export const LayoutDirection = {
  RTL: "rtl",
  LTR: "ltr",
};
export const HeaderType = {
  DARK: "dark",
  LIGHT: "light",
};
export const RouteTransition = {
  NONE: "none",
  FADE: "fade",
  SLIDE_LEFT: "slideLeft",
  SLIDE_RIGHT: "slideRight",
  SLIDE_UP: "slideUp",
  SLIDE_DOWN: "slideDown",
};

export const Fonts = {
  LIGHT: "300",
  REGULAR: "400",
  MEDIUM: "500",
  BOLD: "600",
  EXTRA_BOLD: "600",
};

export const AuthType = {
  FIREBASE: "firebase",
  AWS_COGNITO: "aws_cognito",
  AUTH0: "auth0",
  JWT_AUTH: "jwt_auth",
};

export const AppAnimates = {
  SLIDEUPIN: "transition.slideUpIn",
  SLIDEUPOUT: "transition.slideUpOut",
  SLIDEDOWNIN: "transition.slideDownIn",
  SLIDEDOWNOUT: "transition.slideDownOut",
  SLIDELEFTIN: "transition.slideLeftIn",
  SLIDELEFTOUT: "transition.slideLeftOut",
  SLIDERIGHTIN: "transition.slideRightIn",
  SLIDERIGHTOUT: "transition.slideRightOut",
  FADEIN: "transition.fadeIn",
  FADEOUT: "transition.fadeOut",
};

export const AppAnimateGroups = {
  SLIDEUPIN: {
    hidden: {
      y: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeIn",
        delay: 0,
        when: "beforeChildren",
        duration: 0.2,
        staggerChildren: 0.05,
      },
    },
  },
  SLIDEUPOUT: {
    hidden: {
      y: 0,
    },
    visible: {
      opacity: 0,
      y: "100vh",
      transition: {
        ease: "easeOut",
        delay: 0,
        when: "beforeChildren",
        duration: 0.4,
        staggerChildren: 0.15,
      },
    },
  },
  SLIDEDOWNIN: {
    hidden: {
      opacity: 0,
      y: "-100vh",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeIn",
        delay: 0,
        when: "beforeChildren",
        duration: 0.4,
        staggerChildren: 0.15,
      },
    },
  },
  SLIDEDOWNOUT: {
    hidden: {
      y: 0,
    },
    visible: {
      opacity: 0,
      y: "-100vh",
      transition: {
        ease: "easeOut",
        delay: 0,
        when: "beforeChildren",
        duration: 0.4,
        staggerChildren: 0.15,
      },
    },
  },
  SLIDELEFTIN: {
    hidden: {
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeIn",
        delay: 0,
        when: "beforeChildren",
        duration: 0.4,
        staggerChildren: 0.15,
      },
    },
  },
  SLIDELEFTOUT: {
    hidden: {
      x: 0,
    },
    visible: {
      opacity: 0,
      x: "100vw",
      transition: {
        ease: "easeOut",
        delay: 0,
        when: "beforeChildren",
        duration: 0.4,
        staggerChildren: 0.15,
      },
    },
  },
  SLIDERIGHTIN: {
    hidden: {
      x: "-100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeIn",
        delay: 0,
        when: "beforeChildren",
        duration: 0.4,
        staggerChildren: 0.15,
      },
    },
  },
  SLIDERIGHTOUT: {
    hidden: {
      x: 0,
    },
    visible: {
      opacity: 0,
      x: "-100vw",
      transition: {
        ease: "easeOut",
        delay: 0,
        when: "beforeChildren",
        duration: 0.4,
        staggerChildren: 0.15,
      },
    },
  },
  FADEIN: {
    hidden: {
      opacity: 0,
      scale: 1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: "easeIn",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  },
  FADEOUT: {
    hidden: {
      opacity: 1,
      scale: 1,
    },
    visible: {
      opacity: 0,
      scale: 1,
      transition: {
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  },
  NOANIMATION: {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
    },
  },
};

export const AppMotionAnimate = {
  SLIDEUPIN: {
    variants: {
      hidden: {
        y: 100,
        opacity: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
      },
    },
    transition: {
      ease: "easeIn",
      when: "beforeChildren",
    },
  },
  SLIDEUPOUT: {
    variants: {
      hidden: {
        y: 0,
        opacity: 1,
      },
      visible: {
        opacity: 0,
        y: "-100vh",
      },
    },
    transition: {
      ease: "easeOut",
      when: "beforeChildren",
    },
  },
  SLIDEDOWNIN: {
    variants: {
      hidden: {
        y: -100,
        opacity: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
      },
    },
    transition: {
      ease: "easeIn",
      when: "beforeChildren",
    },
  },
  SLIDEDOWNOUT: {
    variants: {
      hidden: {
        y: 0,
        opacity: 1,
      },
      visible: {
        opacity: 0,
        y: "100vh",
      },
    },
    transition: {
      ease: "easeOut",
      when: "beforeChildren",
    },
  },
  SLIDELEFTIN: {
    variants: {
      hidden: {
        x: 100,
        opacity: 0,
      },
      visible: {
        opacity: 1,
        x: 0,
      },
    },
    transition: {
      ease: "easeIn",
      when: "beforeChildren",
    },
  },
  SLIDELEFTOUT: {
    variants: {
      hidden: {
        x: 0,
        opacity: 1,
      },
      visible: {
        opacity: 0,
        x: "-100vw",
      },
    },
    transition: {
      ease: "easeOut",
      when: "beforeChildren",
    },
  },
  SLIDERIGHTIN: {
    variants: {
      hidden: {
        x: -100,
        opacity: 0,
      },
      visible: {
        opacity: 1,
        x: 0,
      },
    },
    transition: {
      ease: "easeIn",
      when: "beforeChildren",
    },
  },
  SLIDERIGHTOUT: {
    variants: {
      hidden: {
        x: 0,
        opacity: 1,
      },
      visible: {
        opacity: 0,
        x: "-100vw",
      },
    },
    transition: {
      ease: "easeOut",
      when: "beforeChildren",
    },
  },
  FADEIN: {
    variants: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
    },
    transition: {
      duration: 0.1,
      ease: "easeIn",
      when: "beforeChildren",
    },
  },
  FADEOUT: {
    variants: {
      hidden: {
        opacity: 1,
      },
      visible: {
        opacity: 0,
      },
    },
    transition: {
      duration: 0.1,
      ease: "easeOut",
      when: "beforeChildren",
    },
  },
};
