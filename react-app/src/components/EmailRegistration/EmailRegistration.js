import React, { useState } from 'react';
import image3 from './front-page-3.jpg'

function EmailRegistration() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [message, setMessage] = useState('')
    const [isRegistered, setIsRegistered] = useState(false); // New state variable

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true);
        setMessage('')
        try {
            const response = await fetch('/api/email/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            setEmail('');
            setMessage('Thank you')
            setIsRegistered(true); // Set isRegistered to true upon successful registration
        } catch (error) {
            setMessage('An error occurred. Please try again.')
        } finally {
            setIsloading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundImage: `url(${image3})`, backgroundSize: 'cover' }} className="w-full h-screen flex items-center justify-center bg-contain">
            <div className="flex flex-col max-w-md mx-auto bg-transparent p-8 rounded shadow-lg">
                <div className="flex flex-row justify-center mb-6">
                    {isRegistered ? (
                        <p className="text-center mt-3 text-blue-500">{message}</p>
                    ) : (
                        <>
                            <input
                                className="border py-2 px-3 text-grey-darkest mr-4"
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button className="bg-white hover:bg-gray-200 text-black uppercase text-lg p-4 rounded" type="submit" disabled={isLoading}>
                                {isLoading ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </>
                    )}
                </div>
                {isLoading && <div className="text-center mt-3 text-blue-500">Loading...</div>}
                {!isRegistered && message && <p className="text-center mt-3 text-blue-500">{message}</p>}
            </div>
        </form>
    )
}

export default EmailRegistration