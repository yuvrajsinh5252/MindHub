import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "../components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [authorized, setAuthorized] = useState("./login");

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) setAuthorized("/dashboard");
  }, []);

  return (
    <div className="flex py-40 items-center flex-col gap-16 h-[calc(100vh-4rem)]">
      <motion.div
        initial={{
          opacity: 0,
          translateY: -100,
          type: "spring",
        }}
        animate={{
          type: "spring",
          opacity: 1,
          translateY: 0,
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        <motion.header
          animate={{
            borderBottomWidth: "2px",
            borderBottomColor: [
              "#6395f8",
              "#7e3af2",
              "#6395f8",
            ],
          }}
          transition={{ duration: 2, loop: Infinity, ease: "easeInOut" }}
          className="text-5xl font-semibold p-10 px-10 rounded-full shadow-lg
          bg-gradient-to-r from-[#6395f8] to-[#7e3af2] text-transparent bg-clip-text"
        >MindHub</motion.header>
      </motion.div>
      <div className="text-center flex flex-col gap-9">
        <motion.div
          initial={{
            opacity: 0,
            type: "tween",
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ delay: 0.2 }}
          className="text-3xl max-sm:text-xl font-poppins font-semibold"
        >
          <p className="pb-1">
            The best place to feel like professional,
          </p>
          <p>
            while learning and growing.
          </p>
        </motion.div>
        <div>
          <motion.button
            className={`${buttonVariants({
              variant: "default",
            })}`}
            onClick={() => window.location.assign(authorized)}
          >
            <p className="text-base">Get Started</p>
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </div >
  )
}