import type { PropsWithChildren } from 'react';

import Box from '@iziui/react/Box';

import './Content.scss';

export default function Content({ children }: PropsWithChildren) {
  return (
    <Box
      fullWidth
      className="ea-content"
      sx={{
        backgroundColor: ({ background }) => background.paper
      }}
      style={{ height: 'calc(100vh - 54px)' }}
    >
      <div style={{
        width: '100%',
        maxWidth: '72rem',
        margin: 'auto'
      }}>
        {children}
      </div>
    </Box>
  );
}