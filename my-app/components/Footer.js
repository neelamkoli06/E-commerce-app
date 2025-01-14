import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-grey text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MyStore. All rights reserved.
        </p>
        <div className="mt-4">
          <Link href="#">
            <span className="text-white hover:text-yellow-500 mx-2">
              Privacy Policy
            </span>
          </Link>
          |
          <Link href="#">
            <span className="text-white hover:text-yellow-500 mx-2">
              Terms of Service
            </span>
          </Link>
        </div>

        <p className="text-sm mt-4 flex items-center justify-center">
          Made By Neelam Koli <FaHeart className="ml-1 text-red-500" />
        </p>
      </div>
    </footer>
  );
}
