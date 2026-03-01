import { useState } from "react"
import { Expense } from "@/types"
import { Button } from "@/components/ui/button"

export default function ExpenseCard({ expense, onDelete }: { expense: Expense, onDelete: (id: number) => void }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <div>
                <p onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">{expense.name} | ${expense.value} {isOpen? "∧" : "∨"}</p>
            </div>

            {isOpen && (
                <div className="border rounded-lg grid gap-2 p-2">
                    <div className="p-2 grid grid-cols-2 gap-2">
                        <p>Category</p>
                        <p>Description</p>
                        <p className="border rounded-lg p-2">{expense.category}</p>
                        <p className="border rounded-lg p-2">{expense.description}</p>
                    </div>
                    <Button className="border rounded-lg justify-center items-center transition-all hover:bg-red-500 hover:border-red-500 cursor-pointer" onClick={() => onDelete(expense.id)}>Delete</Button>
                </div>
            )}
        </div>
    )
}