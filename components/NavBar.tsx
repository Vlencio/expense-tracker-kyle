"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function NavBar() {
    const { theme, setTheme } = useTheme()
    const [ mounted, setMounted ] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <nav className="flex items-center justify-between py-2">
            <h1>EXPEN$IVE</h1>
            <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`cursor-pointer ${theme === "dark" ? "hover:bg-white bg-black" : "hover:bg-black bg-white"}`}>{theme === "dark" ? "☀️" : "🌙"}</Button>
        </nav>
    )

}