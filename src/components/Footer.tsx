
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 mt-auto border-t border-primary/20 bg-background">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} VedTyper. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/60 mt-2">
          Improve your typing speed and accuracy
        </p>
      </div>
    </footer>
  );
};

export default Footer;

