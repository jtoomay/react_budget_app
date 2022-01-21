import { useBudgets } from "../Contexts/BudgetContext"
import BudgetCard from "./BudgetCard"

export default function TotalBudgetCard() {
    // This will get our expenses and out budgets 
    const { expenses, budgets } = useBudgets() 
  
    // Get the Total amount 
    const amount = expenses.reduce(
        (total, expense) => total + expense.amount, 
        0
    )
    // Get the Max amount 
    const max = budgets.reduce(
        (total, budget) => total + budget.max, 
        0
    )
    // If there is not a max value, return null
    if(max === 0) return null
  
    // If there is a max value, this will be returned 
    return <BudgetCard 
                    amount={amount} 
                    name="Total"
                    gray 
                    max={max}     
                    hideButtons // This will hide the buttons for the total card 
                />
}
