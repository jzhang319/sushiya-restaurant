import React, { useState } from 'react';


function EmailRegistration() {
    const [email, setEmail] = useState('');
    const [isloading, setIsloading] = useState(false);
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true);
        setMessage('')
        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Constent-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            setEmail('');
            setMessage('Subscription successful')
            alert('Subscription successful')
        } catch (error) {
            setMessage('An error occurred. Please try again.')
        } finally {
            setIsloading(false)
        }


    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:

                <input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </label>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Subscribing...' : 'Subscribe'}

            </button>
            {isLoading && <div>Loading...</div>}
            {message && <p>{message}</p>}
        </form>
    )
}

export default EmailRegistration