import {
  useState,
  cloneElement,
  type CSSProperties,
  type PropsWithChildren,
} from 'react';

import useResize from '@iziui/react/hooks/useResize';
import type { ButtonProps } from '@iziui/react/Button';
import Stack from '@iziui/react/Stack';
import Loading from '@iziui/react/Loading';
import Typography from '@iziui/react/Typography';
import Slide from '@iziui/react/animations/Slide';

import './Page.scss';

export interface BaseProps extends PropsWithChildren {
  title?: string;
  release?: string;
  loading?: boolean;
  subtitle?: string;
  action?: React.JSX.Element | boolean;
  backAction?: React.JSX.Element;
};
export default function BasePage({
  title,
  action,
  release,
  loading,
  subtitle,
  backAction,
  children
}: BaseProps) {
  const [{ orientation, align, fullWidth }, setPreferences] = useState<{
    orientation: CSSProperties['flexDirection']; align: CSSProperties['alignItems'], fullWidth: boolean;
  }>({ align: 'center', orientation: 'row', fullWidth: false });

  useResize({
    onXs: () => setPreferences({ orientation: 'column', align: 'baseline', fullWidth: true }),
    onSm: () => setPreferences({ orientation: 'row', align: 'center', fullWidth: false }),
    onMd: () => setPreferences({ orientation: 'row', align: 'center', fullWidth: false }),
    onLg: () => setPreferences({ orientation: 'row', align: 'center', fullWidth: false }),
    onXl: () => setPreferences({ orientation: 'row', align: 'center', fullWidth: false }),
  }, []);

  const renderAction = (actionButton: React.JSX.Element) => {
    return cloneElement<ButtonProps>(actionButton, {
      disabled: loading,
      ...(fullWidth ? { style: { width: '100%' } } : {})
    });
  };

  return (
    <Stack
      justifyContent="space-between"
      className="ea-page-container"
      style={{ height: '100%', flexWrap: 'nowrap' }}
    >
      <Slide enter direction="top">
        <div>
          {backAction}
          <Stack
            sx={{ mb: 4 }}
            alignItems={align}
            flexDirection={orientation}
            justifyContent="space-between"
          >
            {
              (title || subtitle) && (
                <Stack flexDirection="row" alignItems="center" style={{ width: 'auto' }}>
                  <div>
                    {
                      title && (
                        <Typography variant="h5" color="text.primary">{title}</Typography>
                      )
                    }
                    {
                      subtitle && (
                        <Typography
                          weight="normal"
                          variant="subtitle2"
                          color="text.secondary"
                        >
                          {subtitle}
                        </Typography>
                      )
                    }
                  </div>
                </Stack>
              )
            }

            {action && renderAction(action as React.JSX.Element)}
          </Stack>
          {
            loading ? (
              <Stack justifyContent="center" alignItems="center" className="ea-page__loading-container">
                <Loading size={70} />
              </Stack>
            ) : children
          }
        </div>
      </Slide>

      {
        release && (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ color: ({ text }) => text.secondary }}
          >
            <span>Versão: {release}</span>
          </Stack>
        )
      }
    </Stack>
  );
}