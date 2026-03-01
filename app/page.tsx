"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldDescription, FieldSet } from "@/components/ui/field";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function Home() {
  const email = "kyle@unicornmachine.com"
  const password = "notKyle"
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const router = useRouter()
  
  function Login(e: React.FormEvent) {
    e.preventDefault()
    
    if (emailInput === email && passwordInput === password) {
      setCookie("isLoggedIn", true)
      router.push("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }
  
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm px-6 py-4 border border-gray-300 rounded-lg">
        <form onSubmit={Login} className="flex flex-col gap-2">
          <FieldSet className="w-full max-w-xs flex flex-col gap-5">
            <Field className="flex flex-col gap-1">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input type="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}></Input>
              <FieldDescription className="text-gray-400">kyle@unicornmachine.com</FieldDescription>
            </Field>
            <Field className="flex flex-col gap-1">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input type="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}></Input>
              <FieldDescription className="text-gray-400">notKyle</FieldDescription>
            </Field>
          </FieldSet>
          <Button type="submit" className="border border-white cursor-pointer hover:bg-white hover:text-black">Login</Button>
        </form>
      </div>
    </main>
  );
}
