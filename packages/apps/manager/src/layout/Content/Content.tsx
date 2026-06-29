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
    >
      <div style={{
        width: '100%',
        height: '100%',
        maxWidth: '72rem',
        margin: 'auto'
      }}>
        {children}
      </div>
    </Box>
  );
}