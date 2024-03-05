import React, {useState} from 'react';
import axios from 'axios';

function EmailRegistration() {
    const [email,setEmail] = useState('');;

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('/subscribe',{
                method: 'POST',
                headers:{
                    'Constent-Type': 'application/json'
                },
                body: JSON.stringify({email})
            })
            if (!response.ok){
                throw new Error("Network response was not ok")
            }
            alert('Subscription successful')
        }catch(error){
            alert('An error occurred. Please try again.')
        }
        

    };

    return (
        <form onSubmit = {handleSubmit}>
            <label>
                Email:

                <input
                    type='email'
                    value={email}
                    onChange={e =>setEmail(e.target.value)}
                    required
                />
            </label>
            <button type="submit>Subscribe</button>"></button>
        </form>
    )
}