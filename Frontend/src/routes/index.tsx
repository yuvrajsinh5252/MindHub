import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "../components/ui/button";
import { useEffect, useState } from "react";

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [authorized, setAuthorized] = useState("./login");

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) setAuthorized("./dashboard");
  }, []);

  return (
    <div className="flex py-40 items-center flex-col gap-16 h-[calc(100vh-4rem)]">
      <div>
        <header className="text-lg bg-gray-600 p-1 px-5 rounded-full text-white shadow-xl">MindHub</header>
      </div>
      <div className="text-center flex flex-col gap-9">
        <div className="text-3xl max-sm:text-xl font-poppins font-semibold">
          <p className="pb-1">
            The best place to feel like professional,
          </p>
          <p>
            while learning and growing.
          </p>
        </div>
        <div>
          <Button
            className={buttonVariants({
              variant: "default",
            })}
            onClick={() => window.location.assign(authorized)}
          >
            <p className="text-base">Get Started</p>
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}