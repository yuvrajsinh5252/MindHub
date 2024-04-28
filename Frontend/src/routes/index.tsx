import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react";
import { LampDemo } from '@/components/ui/lamp';

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
    <div>
      <LampDemo authorized={authorized} />
    </div>
  )
}