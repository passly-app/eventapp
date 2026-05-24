import type { HTMLAttributes } from 'react';

import { joinClass } from '@iziui/react/core';
import Box from '@iziui/react/Box';

import './Content.scss';

interface ContentProps extends HTMLAttributes<HTMLElement> { children: React.ReactNode; fullwidth?: boolean; }
export default function Content({ fullwidth, children, ...props }: ContentProps) {
  return (
    <Box
      className={joinClass(fullwidth ? 'ea-content-fullwidth' : 'ea-content')}
      sx={{ backgroundColor: ({ background }) => background.paper }}
      {...props}
    >
      {children}
    </Box>
  );
}