import React, {useState} from 'react';
import axios from 'axios';

function EmailRegistration() {
    const [email,setEmail] = useState('');;

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post{'/subscribe',{email}};
            alert('Subscription successful');
        }catch(error){
            alert('An error occured while subscribing')
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