// components/ui/Card.jsx
import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) {
  const baseClasses = "bg-white rounded-lg shadow-md overflow-hidden";
  const hoverClasses = hover ? "hover:shadow-lg transition-shadow duration-300" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
