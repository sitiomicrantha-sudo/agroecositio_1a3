"use client";

import Toggle from "@/components/ui/Toggle";

interface FilterToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export default function FilterToggle({
  checked,
  onChange,
  label,
}: FilterToggleProps) {
  return (
    <Toggle
      id="filter-archived"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      label={label}
    />
  );
}
