import { cloneElement, LiHTMLAttributes } from 'react';

import type { IconProps } from '@iziui/react/Icon';
import { joinClass } from '@iziui/react/core';
import Ripple from '@iziui/react/Ripple';

import { getPath } from '@eventapp/toolkit/url';

import './Sidebar.scss';

export interface SidebarButtonProps extends LiHTMLAttributes<HTMLElement> {
  icon: React.JSX.Element;
  tag?: React.JSX.Element;
  path?: string;
  label?: string;
}
export default function SidebarButton({ label, icon, tag, ...props }: SidebarButtonProps) {
  const url = getPath();

  const isActive = url === props.path;

  const className = joinClass(
    'ea-sidebar__button',
    isActive && 'ea-sidebar__button--active',
  );

  const renderIcon = () => {
    return cloneElement<IconProps>(icon, {
      className: joinClass(
        icon.props.className,
        'ea-sidebar__button__icon'
      )
    });
  };

  return (
    <li tabIndex={0} className={className} {...props}>
      {renderIcon()}
      {label && <span className="ea-sidebar__button__label">{label}</span>}
      {tag}
      <Ripple />
    </li>
  );
}