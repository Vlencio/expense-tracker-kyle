"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";

export default function NavBar() {
    const { theme, setTheme } = useTheme()
    const [ mounted, setMounted ] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    function logOut() {
        setCookie("loggedIn", false)
    }

    return (
        <nav className="flex items-center justify-between py-2">
            <h1>EXPEN$IVE</h1>
            <Button onClick={logOut} className="border border-white cursor-pointer hover:bg-white hover:text-black">Log Out</Button>
            <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`cursor-pointer ${theme === "dark" ? "hover:bg-white bg-black" : "hover:bg-black bg-white"}`}>{theme === "dark" ? "☀️" : "🌙"}</Button>
        </nav>
    )

}