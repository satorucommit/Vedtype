
import React from 'react';
import { Type } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8  border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Type className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">VedTyper</h1>
        </div>
        {/* Placeholder for future nav items or theme toggle */}
      </div>
    </header>
  );
};

export default Header;

