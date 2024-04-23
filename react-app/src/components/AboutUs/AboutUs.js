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
      <div class="mb-28 flex justify-center">
        <Stack direction="column">
        <h1 className="text-5xl sm:text-8xl my-4 flex justify-center">Location</h1>
          <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.502624603083!2d-73.63762672401968!3d40.728964471391116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c27d4145b10001%3A0xf4d9d38e4a3e756c!2sSushi%20Ya!5e0!3m2!1sen!2sus!4v1708575084944!5m2!1sen!2sus"
          width="1400"
          height="500"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="map"
        ></iframe>

      </Stack>
      </div>

      <img src="restaurant.jpeg" alt="restaurant" className="w-full my-14 md:my-0 md:w-0"></img>

      <div className="flex md:flex-start w-full items-center">
        <div>
          <img src="restaurant.jpeg" alt="restaurant" className="w-0 md:w-full"></img>
        </div>
        <div className="ml-14 md:ml-28 mb-28 md:m-0">
          <h1 className="text-5xl">Hours of Operation</h1>
          {/* <Skeleton variant="rectangular" width={395} height={60} /> */}
          <br></br>
          <h1 className="text-2xl">Dining In</h1>
          <p>Monday - Friday: 11 AM - 10 PM</p>
          <p>Sunday & Saturday: 1 PM - 10 PM</p>

          <br></br>
          <h1 className="text-2xl">Take Out & Delivery</h1>
          <p>Monday - Friday: 11:30 AM - 9:30 PM</p>
          <p>Sunday & Saturday: 1:30 PM - 9:30 PM</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:h-screen md:w-full md:items-center md:justify-center bg-gray-100">
        <div className="my-8 md:mt-0 ml-14">
          <h1 className="text-5xl md:text-8xl">Contact Us</h1>
        </div>
        <div className="mx-14 md:mx-28 w-full md:w-1/4 mb-14">
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label><br/>
            <input
              type="text"
              name="user_name"
              className="h-25 mb-4 w-80 md:w-full cursor-pointer border border-2 border-gray-500 bg-white p-4"
              placeholder="Eric"
            /><br/>
            <label>Email</label><br/>
            <input
              type="email"
              name="user_email"
              className="h-25 mb-4 w-80 md:w-full cursor-pointer border border-2 border-gray-500 bg-white p-4"
              placeholder="eric@sushiyany.com"
            /><br/>
            <label>Message</label><br/>
            <textarea
              name="message"
              className="h-25 mb-4 w-80 md:w-full cursor-pointer border border-2 border-gray-500 bg-white p-4"
              placeholder="Hello..."
            /><br/>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className="w-80 md:w-full cursor-pointer border border-2 border-black bg-white p-4 hover:border-gray-500 hover:text-gray-500"
            >
              Send
            </Button>
          </form>
        </div>
      </div>

      <div className="bg-white-100 m-2 md:m-10 flex flex-row h-28 w-full items-center justify-center">
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
