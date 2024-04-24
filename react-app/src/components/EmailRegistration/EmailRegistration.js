import React, { useState } from "react";
import Button from "@mui/material/Button";
import image3 from "./front-page-3.jpg";

function EmailRegistration() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // New state variable

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    setMessage("");
    try {
      const response = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setEmail("");
      setMessage("Thank you");
      setIsRegistered(true); // Set isRegistered to true upon successful registration
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundImage: `url(${image3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex h-screen w-full items-center justify-center bg-contain"
    >
      <div className="flex flex-col bg-transparent p-8 ">
        <div className="mb-6 flex flex-row justify-center">
          {isRegistered ? (
            <p className="mt-3 text-center text-blue-500">{message}</p>
          ) : (
            <div className="mt-50 flex items-center space-x-2 sm:space-x-4">
              <input
                className="h-15 w-50 cursor-pointer rounded border-2 border-gray-500 bg-white p-4 font-abel sm:w-80"
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="h-15 cursor-pointer border-black bg-white font-abel hover:border-gray-500 hover:text-gray-500"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          )}
        </div>
        {isLoading && (
          <div className="mt-3 text-center text-blue-500">Loading...</div>
        )}
        {!isRegistered && message && (
          <p className="mt-3 text-center text-blue-500">{message}</p>
        )}
      </div>
    </form>
  );
}

export default EmailRegistration;
