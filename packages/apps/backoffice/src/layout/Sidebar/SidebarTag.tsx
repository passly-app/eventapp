import { joinClass } from '@iziui/react/core';

interface SidebarTaProps {
  label: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
}

export default function SidebarTag({ label, color = 'primary' }: SidebarTaProps) {
  const className = joinClass(
    'ea-sidebar__button__tag',
    `ea-sidebar__button__tag--${color}`
  );

  return (
    <div className={className}>
      {label}
    </div>
  );
}