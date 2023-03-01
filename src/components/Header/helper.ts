import clsx from "clsx";

/** h-8 = 2rem, py-3 is .75 rem on both sides, should total 3.5rem or 56px */
export const NAVBAR_BASE_HEIGHT = 2 + 2 * 0.75;
export const navbarVariants = {
  open: { height: "auto" },
  closed: { height: `${NAVBAR_BASE_HEIGHT}rem` },
};

export const burgerLineClasses = clsx(
  "h-[0.1875rem]",
  "rounded-full",
  "w-full",
  "relative",
  "bg-white"
);

const makeTopBottom = (mult: 1 | -1, moveY: number) => {
  return {
    open: {
      y: `${mult * moveY}rem`,
      rotate: `${mult * 45}deg`,
    },
    closed: {
      y: "0rem",
      rotate: "0deg",
    },
  };
};
export const burgerTop = makeTopBottom(1, 0.625);
export const burgerMiddle = {
  open: {
    opacity: 0,
  },
  closed: {
    opacity: 1,
  },
};
export const burgerBottom = makeTopBottom(-1, 0.7);
