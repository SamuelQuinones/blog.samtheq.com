// TODO: LazyMotion with astro - is it possible?

import useOutsideClick from "@hooks/use-outside-click";
import { type ReactNode, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface NavbarProps {
  children?: ReactNode;
  title: string;
}

/** h-8 = 2rem, py-3 is .75 rem on both sides, should total 3.5rem or 56px */
export const NAVBAR_BASE_HEIGHT = 2 + 2 * 0.75;
const navbarVariants = {
  open: { height: "auto" },
  closed: { height: `${NAVBAR_BASE_HEIGHT}rem` },
};

const burgerLineClasses = clsx("relative h-[0.1875rem] w-full rounded-full bg-white");

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

const burgerTop = makeTopBottom(1, 0.625);
const burgerMiddle = {
  open: { opacity: 0 },
  closed: { opacity: 1 },
};
const burgerBottom = makeTopBottom(-1, 0.7);

export default function Navbar({ children, title }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const toggleNavbar = () => setOpen((prev) => !prev);

  const HEADER_REF = useRef<HTMLElement>(null);
  const CHILDREN_REF = useRef<HTMLUListElement>(null);

  const onAnimationComplete = useCallback((def: string) => {
    if (def === "closed") {
      CHILDREN_REF.current?.classList?.add("max-sm:hidden");
    }
  }, []);
  const onAnimationStart = useCallback((def: string) => {
    if (def === "open") {
      CHILDREN_REF?.current?.classList?.remove("max-sm:hidden");
    }
  }, []);

  useOutsideClick(HEADER_REF, () => setOpen(false), "pointerdown");

  return (
    <motion.header
      role="navigation"
      animate={open ? "open" : "closed"}
      initial={false}
      ref={HEADER_REF}
      variants={navbarVariants}
      className="navbar fixed inset-x-0 top-0 w-full overflow-y-hidden bg-gray-950 py-0 shadow-lg sm:overflow-y-visible sm:py-2"
      style={{ zIndex: 9999 }}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      transition={{ type: "tween", duration: 0.2 }}
    >
      {/* min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px] */}
      <nav className="container max-w-full sm:flex sm:justify-between xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <a href="#stq-page-content" data-nav-skip-link="true">
          Skip To Content
        </a>
        <section className="flex items-center justify-between py-3 sm:py-0">
          <img src="/favicon.ico" height="32" width="32" alt="SamTheQ Logo" />
          <div title={title} className="line-clamp-1 max-w-xl px-2">
            {title}
          </div>
          <div className="flex sm:hidden">
            <button
              className="flex size-8 flex-col items-center justify-around rounded-sm transition-shadow focus:outline-none focus:ring focus:ring-opacity-60"
              onClick={toggleNavbar}
              aria-label="Toggle Navbar"
            >
              <motion.span className={burgerLineClasses} variants={burgerTop} />
              <motion.span
                className={burgerLineClasses}
                variants={burgerMiddle}
                transition={{ duration: 0.1 }}
              />
              <motion.span className={burgerLineClasses} variants={burgerBottom} />
            </button>
          </div>
        </section>
        <ul
          ref={CHILDREN_REF}
          className="flex list-none flex-col py-2 max-sm:hidden sm:flex-row sm:p-0"
        >
          {children}
        </ul>
      </nav>
    </motion.header>
  );
}
