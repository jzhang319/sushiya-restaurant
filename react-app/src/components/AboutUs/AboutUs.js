import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import restaurantSection from "./images/bg_Restaurant-section-1024x683.jpg";
// import ButtonUsage from "./test";
// import Skeleton from "@mui/material/Skeleton";

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
      <div class="m-28 flex justify-center">
        <iframe
          title="image of restaurant location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.502624603083!2d-73.63762672401968!3d40.728964471391116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c27d4145b10001%3A0xf4d9d38e4a3e756c!2sSushi%20Ya!5e0!3m2!1sen!2sus!4v1708575084944!5m2!1sen!2sus"
          width="1400"
          height="500"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="1/2-screen"
        ></iframe>
      </div>

      {/* <ButtonUsage></ButtonUsage> */}
      {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
      <div className="flex-start flex w-full items-center">
        <div>
          <img src={restaurantSection} alt='restaurant'></img>
        </div>
        <div>
          <h1 className="text-5xl">Hours of Operation</h1>
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

      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="contact-us">
          <h1 className="text-8xl">Contact Us</h1>
        </div>

        <div className="mx-28 w-1/4">
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input
              type="text"
              name="user_name"
              className="h-25 mb-4 w-full cursor-pointer border-2 border-gray-500 bg-white p-4"
              placeholder="Eric"
            />
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              className="h-25 mb-4 w-full cursor-pointer border-2 border-gray-500 bg-white p-4"
              placeholder="eric@sushiyany.com"
            />
            <label>Message</label>
            <textarea
              name="message"
              className="h-25 mb-4 w-full cursor-pointer border-2 border-gray-500 bg-white p-4"
              placeholder="Hello..."
            />

            <input
              type="submit"
              value="Send"
              className="h-25 w-full cursor-pointer border-2 border-black bg-white p-4"
            />
          </form>
        </div>
      </div>

      <div className="bg-white-100 m-10 flex h-28 w-full flex-col items-center justify-center">
        <div>
          {/* <img src="https://youmesushi.com/wp-content/uploads/2016/06/Home-Light2-10-1024x362.jpg"/> */}
        </div>
        <div>
          949 Franklin Avenue,<br></br> Garden City, NY 11530<br></br>
          (516) 873-8818
        </div>
      </div>
    </>
  );
};

export default AboutUs;
