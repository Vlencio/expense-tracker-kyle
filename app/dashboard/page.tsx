"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Expense } from "@/types";
import ExpenseCard from "@/components/expenseCard";
import ExpenseChart from "@/components/expenseChart";

/// ADD THEME CHANGER LATER

export default function Dashboard() {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [inputCategory, setInputCategory] = useState("")
    const [inputCustomCategory, setInputCustomCategory] = useState("")
    const categories = ["Food", "Transport", "Entertainment", "Utilities", "Investment", "Gaming", "Old Car Parts", "Other"]

    useEffect(() => {
    const stored = localStorage.getItem("expenses")
    if (stored) {
        setExpenses(JSON.parse(stored))
    }
    }, [])

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }, [expenses])


    function addExpense(e: React.FormEvent) {
        e.preventDefault()

        const finalCategory = inputCategory === "other" ? inputCustomCategory : inputCategory

        const newExpense: Expense = {
            id: expenses.length + 1,
            name: inputName,
            category: finalCategory,
            description: inputDescription,
            value: parseFloat(inputValue),
        }

        setExpenses([...expenses, newExpense])
        setInputName("")
        setInputDescription("")
        setInputValue("")
    }

    function deleteExpense(id: number) {
        setExpenses(expenses.filter((expense) => expense.id !== id))
    }

    return (
        <main className="min-h-screen p-2">
            <h1>EXPEN$IVE</h1>
            
            {/* MAIN GRID*/}
            <div className="grid grid-cols-2 gap-8 border rounded-lg gap-2 p-2">
                {/* LEFT COLUMN*/}
                <div>
                    <h2>Overview</h2>
                    <div>
                        <ExpenseChart expenses={expenses} />
                    </div>
                </div>
                
                {/* RIGHT COLUMN*/}
                <div>

                    {/* ADD EXPENSE*/}
                    <h2>Add Expense</h2>
                    <div className="border rounded-lg p-1">
                        <form className="grid grid-cols-1 gap-2 py-1" onSubmit={addExpense}>
                            {/* INPUTS */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid grid-cols-1 gap-2">
                                    <Input placeholder="Name" value={inputName} onChange={(e) => setInputName(e.target.value)} required/>
                                    <Input placeholder="Value" value={inputValue} onChange={(e) => setInputValue(e.target.value)} required/>
                                    <Select onValueChange={(val) => setInputCategory(val)}>
                                        <SelectTrigger className="border rounded-lg cursor-pointer">
                                            <SelectValue placeholder="Select Category" className="cursor-pointer"/>
                                        </SelectTrigger>
                                        <SelectContent className="bg-black">
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category.toLowerCase()} className="cursor-pointer hover:border">{category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {inputCategory === "other" && (
                                        <Input placeholder="Custom Category" value={inputCustomCategory} onChange={(e) => setInputCustomCategory(e.target.value)} />
                                    )}
                                </div>
                                <div>
                                    <Input placeholder="Description" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)}></Input>
                                </div>
                            </div>

                            { /* SUBMIT BUTTON */}
                            <div>
                                <Button type="submit" className="border rounded-lg hover:bg-green-500 hover:border-green-500 cursor-pointer">Add</Button>
                            </div>
                        </form>
                    </div>

                    {/* EXPENSE HISTORY*/}
                    <h2>Expense History</h2>
                    <div className="border rounded-lg px-2 py-4">
                        {expenses.length === 0 ? (
                            <p className="text-center">No expenses added yet.</p>
                        ) : <ul>
                            {expenses.map((expense) => (
                                <ExpenseCard key={expense.id} expense={expense} onDelete={deleteExpense}/>
                            ))}
                        </ul>   }
                        
                        
                    </div>
                </div>
            </div>
        </main>
    );
}