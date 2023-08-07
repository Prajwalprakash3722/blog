import { FormEvent, useState } from "react";

function AskEmail() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1
          className="text-center text-2xl font-medium mb-8 text-gray-400
        "
        >
          In case you care for updates by email.
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row justify-center items-center md:items-start"
        >
          <input
            type="email"
            placeholder="Your email"
            className="w-full md:w-64 h-12 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-4 md:mb-0 md:mr-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full md:w-auto h-12 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Notify me
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          I mostly write some notes to self: I can’t imagine that you’d be
          interested, but if, for some reason, you are, you are welcome. (Most
          of my notes are handwritten, but I’m trying to write more on obsidian)
        </p>
        <p className="text-center text-gray-500 mt-2">
          (Obviously, I won’t share your email with anyone.)
        </p>
      </div>
    </div>
  );
}

export default AskEmail;
