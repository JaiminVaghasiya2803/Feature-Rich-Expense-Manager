import React from 'react';

export const createUseStyles = <TContext, TStyles>(
  getStyles: (context: TContext) => TStyles
): ((context: TContext) => TStyles) => {
  return context => {
    // Create a stable dependency array from context values
    const dependencies = React.useMemo(() => {
      if (context && typeof context === 'object') {
        return Object.values(context);
      }
      return [context];
    }, [context]);

    return React.useMemo(() => getStyles(context), dependencies);
  };
};
