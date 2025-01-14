import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">Sorry, the page you're looking for does not exist.</p>
      <Link href="/" passHref>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Go Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Custom404;
