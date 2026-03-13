import React from 'react';

export const createUseStyles = <TContext, TStyles>(
  getStyles: (context: TContext) => TStyles,
): ((context: TContext) => TStyles) => {
  return context => {
    // relies on getStyles function you pass it to select the styles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.useMemo(() => getStyles(context), Object.values(context as any));
  };
};