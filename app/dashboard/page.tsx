"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Expense } from "@/types";
import ExpenseCard from "@/components/expenseCard";
import ExpenseChart from "@/components/expenseChart";
import { AnimatePresence } from "framer-motion";


export default function Dashboard() {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [inputCategory, setInputCategory] = useState("")
    const [inputCustomCategory, setInputCustomCategory] = useState("")
    const categories = ["Food", "Transport", "Entertainment", "Utilities", "Investment", "Gaming", "Old Car Parts", "Other"]

    // Load expenses from localStorage on component mount
    useEffect(() => {
    const stored = localStorage.getItem("expenses")
    if (stored) {
        setExpenses(JSON.parse(stored))
    }
    }, [])

    // Save expenses to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }, [expenses])


    function addExpense(e: React.FormEvent) {
        e.preventDefault()

        // If category is "other", use the custom category input, otherwise use the selected category
        const finalCategory = inputCategory === "other" ? inputCustomCategory : inputCategory

        const newExpense: Expense = {
            id: expenses.length + 1,
            name: inputName,
            category: finalCategory,
            description: inputDescription,
            value: parseFloat(inputValue),
            date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            })
        }

        setExpenses([...expenses, newExpense])
        setInputName("")
        setInputDescription("")
        setInputValue("")
    }

    // Filters out the expenses with the matching id, and return an array without it.
    function deleteExpense(id: number) {
        setExpenses(expenses.filter((expense) => expense.id !== id))
    }

    return (
        <main className="p-2 flex flex-col flex-1">
            {/* MAIN GRID*/}
            <div className="grid grid-cols-2 gap-2 border rounded-lg p-2 flex-1 h-full">
                {/* LEFT COLUMN*/}
                <div className="flex flex-col">
                    <h2>Overview</h2>
                    <div className="flex flex-col flex-1">
                        <ExpenseChart expenses={expenses} />
                    </div>
                </div>
                
                {/* RIGHT COLUMN*/}
                <div className="flex flex-col bg-gray-100 rounded-lg p-2">

                    {/* ADD EXPENSE*/}
                    <h2>Add Expense</h2>
                    <div className="border rounded-lg p-1 bg-white">
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
                                        <SelectContent className="dark:bg-black bg-white">
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
                                <Button type="submit" className="rounded-lg hover:bg-green-500 hover:border-green-500 cursor-pointer">Add</Button>
                            </div>
                        </form>
                    </div>

                    {/* EXPENSE HISTORY*/}
                    <h2>Expense History</h2>
                    <div className="border rounded-lg px-2 py-4 bg-white">
                        {expenses.length === 0 ? (
                            <p className="text-center">No expenses added yet.</p>
                        ) : <ul>
                            <AnimatePresence>
                                {expenses.map((expense) => (
                                    <ExpenseCard key={expense.id} expense={expense} onDelete={deleteExpense}/>
                                ))}
                            </AnimatePresence>
                        </ul>   }
                        
                        
                    </div>
                </div>
            </div>
        </main>
    );
}