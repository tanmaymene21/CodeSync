const LanguageDropdown = () => {
  return (
    <div className="relative">
      <select className="block appearance-none w-full bg-gray-800 border border-gray-600 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-900 focus:border-gray-700">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4c-.4.4-1 .4-1.4 0l-4-4A1 1 0 0 1 6 7l4 4c.2.2.5.3.7.3z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageDropdown;
