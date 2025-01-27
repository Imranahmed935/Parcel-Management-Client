import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
            <p className="text-lg text-gray-700 mb-8">Something went wrong. The page you are looking for doesn't exist.</p>
            <Link to="/" className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition">
                Go Back to Homepage
            </Link>
        </div>
    );
};

export default ErrorPage;
