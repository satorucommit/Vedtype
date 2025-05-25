
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 mt-auto border-t border-border">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} VED. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

