import type { HTMLAttributes } from 'react';

import { joinClass } from '@iziui/react/core';
import Ripple from '@iziui/react/Ripple';

interface BottomMenuButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  active: boolean;
  icon: React.JSX.Element;
}

export default function BottomMenuButton({ label, icon, active, ...props }: BottomMenuButtonProps) {
  const classes = joinClass(
    'ea-bottom-menu__button',
    active && 'ea-bottom-menu__button--active',
    props.className
  );

  return (
    <button {...props} className={classes}>
      {icon}
      {label}
      <Ripple />
    </button>
  );
}