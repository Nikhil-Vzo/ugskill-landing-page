import { ReactNode } from "react";

interface TactileButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export function TactileButton({ children, onClick, className = "", variant = "primary" }: TactileButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-75 outline-none focus:outline-none cursor-pointer select-none";
  
  // Notice we use shadow instead of border to prevent the DOM element from shrinking on click
  const variants = {
    primary: "bg-[#58CC02] text-white shadow-[0_4px_0_#46A302] hover:bg-[#61E002] active:shadow-[0_0px_0_#46A302] active:translate-y-[4px]",
    secondary: "bg-white text-slate-700 shadow-[0_4px_0_#cbd5e1] border border-slate-250 hover:bg-slate-50 active:shadow-[0_0px_0_#cbd5e1] active:translate-y-[4px]",
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
