// components/ui/SectionHeading.jsx
import React from 'react';

export default function SectionHeading({ title, subtitle, className = '' }) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
