import { Form, Modal, Button } from 'react-bootstrap'; 
import { useRef } from 'react'
import { useBudgets } from "../Contexts/BudgetContext"
import { UNCATEGORIZED_BUDGET_ID } from '../Contexts/BudgetContext';


export default function AddExpenseModal( { show, handleClose, defaultBudgetId } ) {
    // Create a reference that references the variables that are stored when the dialog box pops up asking for information 
    const descriptionRef = useRef() 
    const amountRef = useRef()
    const budgetIdRef = useRef()

    // Custom Hook 
    const { addExpense, budgets } = useBudgets()  // We are getting the functions that we made in the BudgetContext.js file 

    function handleSubmit(e) { 
        e.preventDefault() // Prevent the form from submitting 
        
        // Add Budget function
        addExpense({ 
            description: descriptionRef.current.value, // This will add a name that is the current value of the input 
            amount: parseFloat(amountRef.current.value),  // This will add a max value that the user will input.
            budgetId: budgetIdRef.current.value
        })
        handleClose() // When we submit the form, the modal will close  

    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label> Description </Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label> Amount </Form.Label>
                        <Form.Control
                            ref={amountRef}
                            type="number"
                            required
                            min={0}
                            step={0.01}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label> Budget </Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                            <option id={UNCATEGORIZED_BUDGET_ID}> Uncategorized </option>
                            {budgets.map((budget) => (
                                <option key={budget.id} value={budget.id}>
                                    {" "}
                                    {budget.name}{" "}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            {" "}
                            Add{" "}
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
    }
