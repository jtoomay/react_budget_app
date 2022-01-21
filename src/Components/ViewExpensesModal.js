import { Modal, Button, Stack } from 'react-bootstrap'; 
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../Contexts/BudgetContext"
import { currencyFormatter } from '../utils';


export default function ViewExpensesModal( { budgetId, handleClose } ) {

    // Custom Hooks 
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()  
    const expenses = getBudgetExpenses(budgetId)
    
    // If there is an Uncategorized Budget Id, Then give it a name and id property
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
    // * If there is not an Uncategorized Budget, then get the budgets here  
    : budgets.find(b => b.id === budgetId ) // If this is more than one. The modal will show
    
    return (
        <Modal show={budgetId != null} onHide={handleClose} > {/* If the budgetId is NOT null, show */}
                <Modal.Header closeButton> 
                    <Stack direction="horizontal"gap="2" > 
                        <div> Budget - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button onClick={() => {
                                deleteBudget(budget)
                                handleClose()
                            }} 
                                variant="outline-danger">
                            Delete 
                            </Button>
                        )}
                    </Stack>
                </Modal.Header>
                    <Stack direction="vertical" gap="3"> 
                            {expenses.map(expense => (
                                <Stack direction="horizontal" gap="2" key={expense.id}> 
                                    <div className="me-auto fs-4"> {expense.description} </div>
                                    <div className="fs-5"> {currencyFormatter.format(expense.amount)} </div>
                                    <Button 
                                        size="small" 
                                        variant="outline-danger"
                                        onClick={() => deleteExpense(expense)}    
                                    >&times;</Button> 
                                    {console.log(expense)}
                                </Stack>

                            ))}
                    </Stack> 
        </Modal>
    )
    }
