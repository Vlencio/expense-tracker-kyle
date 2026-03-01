"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const email = "kyle@unicornmachine.com"
  const password = "notKyle"
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const router = useRouter()
  
  function Login(e: React.FormEvent) {
    e.preventDefault()
    
    if (emailInput === email && passwordInput === password) {
      router.push("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }
  
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-8 border border-gray-300 rounded-lg">
        <form onSubmit={Login} className="flex flex-col gap-2">
          <label>Email</label>
          <Input type="email" placeholder="kyle@unicornmachine.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}></Input>
          <label>Password</label>
          <Input type="password" placeholder="notKyle" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}></Input>
          <Button type="submit" className="border border-white cursor-pointer hover:bg-white hover:text-black">Login</Button>
        </form>
      </div>
    </main>
  );
}
