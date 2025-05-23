export default function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  rounded = false,
  fullWidth = false,
  className = '',
  ...props 
}) {
  const baseClasses = "font-medium transition-colors focus:outline-none";
  
  const variantClasses = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-white border border-green-600 text-green-600 hover:bg-green-50",
    outline: "bg-transparent border border-current text-green-600 hover:bg-green-50",
    dark: "bg-green-950 hover:bg-opacity-90 text-white",
  };
  
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  const roundedClass = rounded ? "rounded-full" : "rounded-md";
  const widthClass = fullWidth ? "w-full" : "";
  
  const classes = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${roundedClass} 
    ${widthClass} 
    ${className}
  `;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}