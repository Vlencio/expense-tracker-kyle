"use client"

import { PieChart, Pie, Cell, Tooltip } from "recharts"
import { Expense } from "@/types";

export default function ExpenseChart({ expenses }: { expenses: Expense[] }) {
    const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"]

    // Transforms the flat expenses array into grouped data by category 
    const chartData = expenses.reduce((acc, expense) => {
        const existing = acc.find((item) => item.category === expense.category)
        if (existing) {
            existing.value += expense.value
        } else {
            acc.push({ category: expense.category, value: expense.value})
        }
        return acc
    }, [] as { category: string, value: number}[])

    // sums total expenses for the total display
    const total = expenses.reduce((acc, expense) => acc + expense.value, 0)

    return (
        <div className="flex flex- flex-1 items-center justify-center">
            <PieChart width={300} height={300}>
                <Pie data={chartData} dataKey="value" nameKey="category" innerRadius={80} outerRadius={120}>
                    {chartData.map((entry, index) => (
                        <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
            </PieChart>
            <p>Total: ${total.toFixed(2)}</p>
        </div>
    )
}

