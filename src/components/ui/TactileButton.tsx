import { ReactNode } from "react";

interface TactileButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function TactileButton({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  disabled = false,
  type = "submit"
}: TactileButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-75 outline-none focus:outline-none select-none";
  
  // Notice we use shadow instead of border to prevent the DOM element from shrinking on click
  const variants = {
    primary: disabled
      ? "bg-slate-200 text-slate-400 shadow-[0_4px_0_#cbd5e1] cursor-not-allowed pointer-events-none opacity-60"
      : "bg-[#0052ff] text-white shadow-[0_4px_0_#0041cc] hover:bg-[#1a66ff] active:shadow-[0_0px_0_#0041cc] active:translate-y-[4px] cursor-pointer",
    secondary: disabled
      ? "bg-slate-50 text-slate-300 shadow-[0_4px_0_#e2e8f0] border border-slate-200 cursor-not-allowed pointer-events-none opacity-60"
      : "bg-white text-slate-700 shadow-[0_4px_0_#cbd5e1] border border-slate-250 hover:bg-slate-50 active:shadow-[0_0px_0_#cbd5e1] active:translate-y-[4px] cursor-pointer",
  };

  return (
    <button 
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
