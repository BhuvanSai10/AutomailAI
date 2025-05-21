import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-6 py-16 flex-grow flex flex-col items-center justify-center">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Revolutionize Your Emails with AutoMailAI
          </h1>
          <p className="text-lg text-gray-300">
            Generate compelling and personalized emails effortlessly. AutoMailAI uses advanced AI to create emails tailored to your needs.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-md hover:from-blue-600 hover:to-purple-600 shadow-lg text-lg cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </main>

      <footer className="bg-gray-900/50 backdrop-blur-md py-6 px-6 border-t border-gray-700">
        <div className="container mx-auto text-center text-gray-400">
          &copy; {new Date().getFullYear()} AutoMailAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;