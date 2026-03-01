"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { use, useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const { theme, setTheme } = useTheme()
    const [ mounted, setMounted ] = useState(false)
    const router = useRouter()


    // Used to prevent hydration mismatch, since theme is only available on the client side
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    function logOut() {
        setCookie("isLoggedIn", false)
        router.push("/")
    }

    return (
        <nav className="flex items-center justify-between py-2">
            <Image src="/expensive_logo.png" alt="Logo" width={100} height={100} />
            <Button onClick={logOut} className="border border-white cursor-pointer hover:bg-white hover:text-black">Log Out</Button>
            <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`cursor-pointer ${theme === "dark" ? "hover:bg-white bg-black" : "hover:bg-black bg-white"}`}>{theme === "dark" ? "☀️" : "🌙"}</Button>
        </nav>
    )

}