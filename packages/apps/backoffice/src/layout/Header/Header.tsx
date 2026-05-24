import type { HTMLAttributes } from 'react';

import Stack from '@iziui/react/Stack';
import { joinClass } from '@iziui/react/core';

import Logo from '@eventapp/common/components/Logo';

import './Header.scss';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  actions?: React.JSX.Element;
  buttonProfile?: React.JSX.Element;
}

export default function Header({
  actions,
  buttonProfile,
  ...props
}: HeaderProps) {
  const className = joinClass('ea-header', props.className);

  return (
    <div {...props} className={className}>
      <div className="ea-header__logo">
        <button aria-label="Ir para tela inicial">
          <Logo color="primary.main" />
        </button>
      </div>

      {
        (
          actions || buttonProfile) && (
          <Stack flexDirection="row" justifyContent="flex-end" alignItems="center">
            {actions}
            {buttonProfile}
          </Stack>
        )
      }
    </div>
  );
}