'use client'
import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

const Page = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [isSent, setIsSent] = useState(false)

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current)
      emailjs
        .sendForm(
          'service_njzhpkh', // service id
          'template_afov05t', // template id
          form.current,
          '6tFOcvQTw7pGVjxTA' // user ID
        )
        .then(
          (result) => {
            console.log(result.text);
            setIsSent(true);
            if (form.current) {
              form.current.reset();
            }
          },
          (err) => {
            console.log(err.text);
            alert('error on sending message');
          }
        )
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isSent) {
      timeoutId = setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSent]);


  return (
    <section
      id="contact"
      className="flex flex-col pt-36 pb-20 mobile:text-center mobile:px-4 tablet:px-16 desktop:px-44"
      aria-labelledby="contact"
    >
      <div
        className="flex flex-col text-black"
      >
        <h1 id="contact" className="text-4xl font-semibold capitalize mb-5">
          Get in touch
        </h1>
        <form ref={form} onSubmit={sendEmail} className="flex flex-col text-start">
          <label htmlFor="name" className="mb-2" aria-label="Enter your name">
            Enter your name
          </label>
          <input
            className="flex p-2 border-black border-solid border rounded-md mb-4 outline-orange-500 "
            type="text"
            name="name"
            placeholder="Please enter a name"
            required
          />
          <label htmlFor="email" className="mb-2" aria-label="Enter your email">
            Enter your email
          </label>
          <input
            className="flex p-2 border-black border-solid border rounded-md mb-4 outline-orange-500 required"
            type="email"
            name="email"
            placeholder="Please enter your email"
            required
          />
          <label
            htmlFor="message"
            className="mb-2"
            aria-label="Enter your message"
          >
            Enter your message
          </label>
          <textarea
            rows={7}
            name="message"
            placeholder="Please enter your message"
            className="flex p-2 border-black border-solid border rounded-md mb-6 outline-orange-500 required"
            required
          />
          <button
            type="submit"
            className="flex px-4 py-2 place-content-center place-self-center w-full tablet:w-80 font-medium bg-black text-white hover:bg-orange-500 hover:text-white rounded-md mb-4 min-width:300px"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  )
}

export default Page
