import type { HTMLAttributes } from 'react';

export default function override<P extends HTMLAttributes<any>>(
  Component: React.ComponentType<P>,
  defaultProps: Partial<P>
) {
  return function WrappedComponent(props: P) {
    return (
      <Component
        {...defaultProps}
        {...props}
        style={{ ...defaultProps.style, ...props.style }}
      />
    );
  };
}
