import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        © {new Date().getFullYear()} <span className="font-semibold text-red-600 dark:text-red-400">DocExpress</span>. All rights reserved.
      </p>
    </footer>
  );
}
