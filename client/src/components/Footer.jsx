import React from "react";

const Footer = () => {
  return (
    <footer className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
      <p>© {new Date().getFullYear()} PennyPincher Pro. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
