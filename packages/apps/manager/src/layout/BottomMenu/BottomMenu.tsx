import type { HTMLAttributes } from 'react';

import { joinClass } from '@iziui/react/core';

import './BottomMenu.scss';

interface BottomMenuProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
}

export default function BottomMenu({ show, children, ...props }: BottomMenuProps) {
  const classes = joinClass(
    'ea-bottom-menu',
    show && 'ea-bottom-menu--show',
    props.className
  );

  return (
    <div {...props} className={classes} aria-hidden={!show}>
      {children}
    </div>
  );
}