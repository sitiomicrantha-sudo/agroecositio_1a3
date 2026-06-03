"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className = "", label, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={`inline-flex items-center gap-2 cursor-pointer ${className}`}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className="sr-only peer"
            {...props}
          />
          <div className="w-11 h-6 bg-stone-300 rounded-full peer peer-checked:bg-green-600 peer-focus:ring-2 peer-focus:ring-green-500 transition-colors" />
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform" />
        </div>
        {label && <span className="text-sm font-medium text-stone-700">{label}</span>}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
