import React from 'react';

const FAQItem = ({ question, answer, bgColor, borderColor, hoverBgColor }) => (
  <div className="p-4">
    <details
      className={`transition duration-500 ${bgColor} ${hoverBgColor} cursor-pointer p-8 border-solid border-l-8 ${borderColor} rounded-md group`}
    >
      <summary className="flex items-center justify-between focus:outline-none min-w-[30rem]">
        <header className="flex justify-center items-center">
          <svg
            className="w-10 h-10 transition-transform duration-500 group-open:rotate-45"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.6066 22H11.3934"
              stroke="#202842"
              strokeWidth="1.875"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 11.3934V32.6066"
              stroke="#202842"
              strokeWidth="1.875"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="leading-5 flex self-center text-black text-xl group-open:font-bold">
            {question}
          </h1>
        </header>
      </summary>
      <div className="content ml-10 text-lg animate-sweep">
        {typeof answer === 'string' ? <p className="my-4">{answer}</p> : answer}
      </div>
    </details>
  </div>
);

const Faqs = () => (
  <div className="bg-black min-h-screen py-28 px-36 overflow-hidden">
    <h3 className="px-4 py-8 text-white text-2xl uppercase font-bold text-center">
      Frequently Asked Questions
    </h3>
    <div>
      <FAQItem
        question="What is CodeSync?"
        answer={
          <p>
            CodeSync is a snippet management tool and real-time collaborative
            coding platform. It offers syntax highlighting, real-time
            collaboration, and snippet exporting to enhance your coding
            workflow.
          </p>
        }
        bgColor="bg-indigo-200"
        hoverBgColor="hover:bg-indigo-400"
        borderColor="border-indigo-400"
      />
      <FAQItem
        question="How do I manage code snippets in CodeSync?"
        answer={
          <ul className="list-disc pl-5">
            <li>
              <strong>Create:</strong> Click 'Create New' in the Snippets
              section of your Dashboard.
            </li>
            <li>
              <strong>Save:</strong> Click 'Save' after writing your code.
            </li>
            <li>
              <strong>Edit:</strong> Access saved snippets from your Dashboard
              to review or update.
            </li>
          </ul>
        }
        bgColor="bg-yellow-200"
        hoverBgColor="hover:bg-yellow-400"
        borderColor="border-yellow-400"
      />
      <FAQItem
        question="What are CodeSync's key features?"
        answer={
          <ul className="list-disc pl-5">
            <li>
              <strong>Syntax Highlighting:</strong> Supports multiple
              programming languages.
            </li>
            <li>
              <strong>Exporting:</strong> Download snippets in various formats.
            </li>
            <li>
              <strong>Storage:</strong> Create and save unlimited snippets
              (storage limits apply based on plan).
            </li>
          </ul>
        }
        bgColor="bg-pink-200"
        hoverBgColor="hover:bg-pink-400"
        borderColor="border-pink-400"
      />
      <FAQItem
        question="How do I start collaborating?"
        answer="Navigate to 'Create New' under Collaborations in your Dashboard. Share the generated link with your collaborators to begin the session."
        bgColor="bg-green-200"
        hoverBgColor="hover:bg-green-400"
        borderColor="border-green-400"
      />
    </div>
  </div>
);

export default Faqs;
