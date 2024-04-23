import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./AboutUs.css";

export const AboutUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_y40zdu8", "template_p23f8pf", form.current, {
        publicKey: "_PD7FYTxXX55JePH2",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  };

  return (
    <>
      <div class="mb-28 flex w-full justify-center px-4 sm:px-0">
        <Stack
          direction="row"
          className="mt-10 w-full items-center justify-start sm:mt-28"
        >
          <div className="m-4">
            <h1 className="flex items-center text-center font-abel text-2xl font-extrabold text-gray-500 sm:text-6xl">
              Location
            </h1>
          </div>
          <div className="relative h-64 w-full sm:h-128">
            <iframe
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.502624603083!2d-73.63762672401968!3d40.728964471391116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c27d4145b10001%3A0xf4d9d38e4a3e756c!2sSushi%20Ya!5e0!3m2!1sen!2sus!4v1708575084944!5m2!1sen!2sus"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="map absolute left-0 top-0 h-full w-full"
              style={{ boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)" }}
              // style={{ border: "5px solid red" }}
            />
          </div>
        </Stack>
      </div>

      <div className="flex w-full items-center md:justify-between">
        <div className="h-196 hidden w-full flex-grow md:w-1/2 lg:block">
          <img
            src="restaurant.jpeg"
            alt="restaurant"
            className="h-full w-full object-cover"
            style={{ boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)" }}
          ></img>
        </div>
        <div className="flex h-full justify-end">
          <div className="m-10 text-gray-500">
            <h1
              className="font-abel text-5xl text-gray-500"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Hours of Operation
            </h1>
            <br></br>
            <h1 className="font-abel text-2xl font-bold text-gray-500">
              Dining In
            </h1>
            <p className="font-abel">Monday - Friday: 11 AM - 10 PM</p>
            <p className="font-abel">Sunday & Saturday: 1 PM - 10 PM</p>
            <br></br>
            <h1 className="font-abel text-2xl font-bold text-gray-500">
              Take Out & Delivery
            </h1>
            <p className="font-abel">Monday - Friday: 11:30 AM - 9:30 PM</p>
            <p className="mb-10 font-abel lg:mb-0">
              Sunday & Saturday: 1:30 PM - 9:30 PM
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-100 md:h-screen md:w-full md:flex-row md:items-center md:justify-center">
        <div className="my-8 ml-14 md:mt-0">
          <h1 className="text-5xl md:text-8xl">Contact Us</h1>
        </div>
        <div className="mx-14 mb-14 w-full md:mx-28 md:w-1/4">
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <br />
            <input
              type="text"
              name="user_name"
              className="h-25 mb-4 w-80 cursor-pointer border-2 border-gray-500 bg-white p-4 md:w-full"
              placeholder="Eric"
            />
            <br />
            <label>Email</label>
            <br />
            <input
              type="email"
              name="user_email"
              className="h-25 mb-4 w-80 cursor-pointer border border-2 border-gray-500 bg-white p-4 md:w-full"
              placeholder="eric@sushiyany.com"
            />
            <br />
            <label>Message</label>
            <br />
            <textarea
              name="message"
              className="h-25 mb-4 w-80 cursor-pointer border border-2 border-gray-500 bg-white p-4 md:w-full"
              placeholder="Hello..."
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className="w-80 cursor-pointer border border-2 border-black bg-white p-4 hover:border-gray-500 hover:text-gray-500 md:w-full"
            >
              Send
            </Button>
          </form>
        </div>
      </div>

      <div className="bg-white-100 m-2 flex h-28 w-full flex-row items-center justify-center md:m-10">
        <img src="footer.png" alt="restaurant" className="h-14 md:h-28"></img>
        <div className="mx-10">
          949 Franklin Avenue,<br></br> Garden City, NY 11530<br></br>
          (516) 873-8818
        </div>
      </div>
    </>
  );
};

export default AboutUs;
