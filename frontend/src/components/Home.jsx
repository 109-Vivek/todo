import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigateTo = useNavigate();

  const handleGetStarted = () => {
    navigateTo("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleGetStarted}
      >
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
