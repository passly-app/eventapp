import type { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@iziui/react/Stack';
import { joinClass } from '@iziui/react/core';

import Logo from '@eventapp/common/components/Logo';

import './Header.scss';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  buttonProfile: React.JSX.Element;
  buttons: React.JSX.Element;
  compact: boolean;
}

export default function Header({ compact, buttons, buttonProfile, ...props }: HeaderProps) {
  const navigate = useNavigate();

  const className = joinClass('ea-header', props.className);

  const goToHome = () => { navigate('/home'); };

  return (
    <div
      className={className}
      {...props}
    >
      <Stack
        style={{
          maxWidth: '72rem',
          margin: 'auto'
        }}
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Stack
          tag="button"
          onClick={goToHome}
          aria-label="Ir para tela inicial"
          style={{
            width: 'fit-content',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Logo width={100} color="primary.main" />
        </Stack>
        {!compact && buttons}
        {buttonProfile}
      </Stack>
    </div>
  );
}