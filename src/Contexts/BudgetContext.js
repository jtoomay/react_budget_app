import React, { useContext } from 'react' 
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from '../Hooks/useLocalStorage'

// Store the budgets
const BudgetsContext = React.createContext() 
// Store the Uncategorized Budget ID
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"


export function useBudgets() { 
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({children}) => { 
    // Save the state to local storage
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
    
    function getBudgetExpenses(budgetId) { 
        // This will return only expenses that have the budgetId of the budget Id that we pass in 
        // If we passed in "entertainment" into the budgetId. It would only show expenses that have "entertainment" as the budgetId
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense( { description, amount, budgetId } ) { 
        setExpenses(prevExpenses => { 
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId}]
        })
    }

    function addBudget( {name, max} ) { 
        setBudgets(prevBudgets => { 
            // If the previous budget has is same name as another budget in the list, return the previous budgets 
            if(prevBudgets.find(budget => budget.name === name)) { 
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max}]
        })

    }

    // This will delete the budget that matches the id of the budget that was clicked on
    function deleteBudget({ id }) { 
        // Get the previous expense 
        setExpenses(prevExpenses => { 
            return prevExpenses.map(expense => { 
                // Check to see if the budget still exists. if it does, leave it alone
                if(expense.budgetId !== id) return expense
                // If not... Take the whole expense, keep everything the same and give the budgetId a value of "Undefined"
                return { ...expense , budgetId : UNCATEGORIZED_BUDGET_ID}
            })
        })
        setBudgets(prevBudgets => { 
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
   
    // This will delete the budget that matches the id of the budget that was clicked on
    function deleteExpense( { id } ) { 
        setExpenses(prevExpenses => { 
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return <BudgetsContext.Provider value={{
        // This will be available to anything wrapped in this context. We wrapped the whole document in this context. So that means that this whole document will have access to these values
        budgets, 
        expenses, 
        getBudgetExpenses, 
        addExpense, 
        addBudget, 
        deleteBudget, 
        deleteExpense

    }}> {children} </BudgetsContext.Provider>
}