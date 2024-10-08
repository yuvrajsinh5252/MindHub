import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./moving-border";

export function TextAnimation() {
  const firstLineChars = "The best place to feel like professional,";
  const secondLineChars = "while learning and growing.";

  return (
    <div className="text-2xl pt-10 max-sm:text-xl font-semibold">
      <p className="pb-1">
        {
          firstLineChars.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                translateY: -10,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              transition={{ delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))
        }
      </p>
      <p>
        {
          secondLineChars.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                translateY: -10,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              transition={{ delay: index * 0.05 + 2 }}
            >
              {char}
            </motion.span>
          ))
        }
      </p>
    </div >
  )
}

export function LampDemo({ authorized }: { authorized: string }) {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-100 to-slate-800 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        MindHub
        <TextAnimation />
      </motion.h1>
      <Button
        borderRadius="1.75rem"
        className="bg-white text-lg dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        onClick={() => window.location.assign(authorized)}
      >
        Get Started
      </Button>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex h-screen flex-col items-center justify-center overflow-hidden bg-whtie dark:bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]
          dark:bg-gradient-conic dark:from-cyan-500  dark:via-transparent dark:to-transparent
          bg-gradient-conic from-cyan-500 via-transparent to-transparent
          text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 dark:bg-slate-950 bg-white h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 dark:bg-slate-950 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem]
          dark:bg-gradient-conic dark:from-transparent dark:via-transparent dark:to-cyan-500
          bg-gradient-conic from-transparent via-transparent to-cyan-500
          text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 dark:bg-slate-950 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 dark:bg-slate-950 h-40 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-white dark:bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-500 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-600"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-white dark:bg-slate-950"></div>
      </div>

      <div className="relative z-50 flex gap-10 -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
