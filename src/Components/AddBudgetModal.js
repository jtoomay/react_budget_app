import { Form, Modal, Button } from 'react-bootstrap'; 
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { useRef } from 'react'
import { useBudgets } from "../Contexts/BudgetContext"


export default function AddBudgetModal( { show, handleClose } ) {
    // Create a reference that references the variables that are stored when the dialog box pops up asking for information 
    const nameRef = useRef() 
    const maxRef = useRef()

    // Custom Hook 
    const { addBudget } = useBudgets()  

    function handleSubmit(e) { 
        e.preventDefault() // Prevent the form from submitting 
        
        // Add Budget function
        addBudget({ 
            name: nameRef.current.value, // This will add a name that is the current value of the input 
            max: parseFloat(maxRef.current.value),  // This will add a max value that the user will input.
        })
        handleClose() // When we submit the form, the modal will close  

    }
    return (
        <Modal show={show} onHide={handleClose} >
            <Form onSubmit={handleSubmit} > 
                <Modal.Header closeButton> 
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <Form.Group className="mb-3" controlId="name"> 
                        <Form.Label> Name </Form.Label>
                        <Form.Control ref={nameRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max"> 
                        <Form.Label> Maximum Spending </Form.Label>
                        <Form.Control ref={maxRef} type="number" required min={0} step={0.01} />
                    </Form.Group>
                    <div className="d-flex justify-content-end"> 
                        <Button variant="primary" type="submit"> Add </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
