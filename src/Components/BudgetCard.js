import {Card, ProgressBar, Stack, Button} from "react-bootstrap"; 
import { currencyFormatter } from "../utils"; // Currency Formatter 
 
export default function BudgetCard({
    name, 
    amount, 
    max, 
    gray, 
    onAddExpenseClick, 
    hideButtons,
    onViewExpenseClick, 
    }) {

    // Create an empty array
    const classNames = [ ] 

    // If the amount is larger than the max value, then change the color to red and the opacity to 10
    if(amount > max) { 
        classNames.push("bg-danger", "bg-opacity-10")
    }
    // If the amount is grey, then use light grey 
    else if (gray) { 
        classNames.push("bg-light")
    }
    
    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex  align-items-baseline fw-normal mb-3">
                    <div className="me-2 "> {name} </div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}
    
                        {/* If there is no max value (There wont be one in expenses) dont show the max value since it will be NaN */}
                        {max && (
                            <span className="text-muted fs-6 ms-1">
                                /{/* Currency Formatter */}
                                {currencyFormatter.format(max)}
                            </span>
                        )}
                    </div>
                </Card.Title>
                {/* If there is no max value (There wont be in an expense) dont show the progress bar */}
                {max && (
                    <ProgressBar
                        className="rounded-pill"
                        variant={getProgressBarVariant(amount, max)}
                        min={0}
                        max={max}
                        now={amount}
                    />
                )}
                {!hideButtons && (
                    <Stack direction="horizontal" gap="2" className="mt-4">
                        <Button
                            variant="outline-primary"
                            className="ms-auto"
                            onClick={onAddExpenseClick}
                        >
                            Add Expense
                        </Button>
                        <Button variant="outline-secondary" onClick={onViewExpenseClick}>
                            View Expenses
                        </Button>
                    </Stack>
                )}
            </Card.Body>
        </Card>
    );
}


// This function will change the colors based on the severity of the debt 
function getProgressBarVariant(amount, max) { 
    const ratio = amount / max // Get the ratio of the values passed in
    if (ratio < .5) return "primary" // If its under 50%, then its all good, keep the primary color
    if (ratio < .75) return "warning" // If its over 75%, we might want to start getting a lil worried
    return "danger" // Anything else... We Fucked... 
}
