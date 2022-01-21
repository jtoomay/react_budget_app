// This will save the budgets on local storage 

import { useState, useEffect } from "react" 
 
// The function will take in a key along with a default value 
export default function useLocalStorage(key, defaultValue) { 
    // use useState to get the starting value from local storage 
    const [value, setValue] = useState(() => { 
        const jsonValue = localStorage.getItem(key) // Get the item
        if (jsonValue != null) return JSON.parse(jsonValue) // If there is a value, return the JSON 

        // If the typeOf value is a function. The reason we check this is because in useState. You can pass a function and a value. So we must check for both
        if (typeof defaultValue === "function") { 
            return defaultValue() // Return defaultValue() while calling it 
        } else { 
            return defaultValue // Return the default value 
        }
    })

    // Use Effect will update the values when they change
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)) // Update the local Storage 
    }, [key, value])

    return [value, setValue]
}

