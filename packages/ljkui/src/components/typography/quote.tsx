import classNames from 'classnames';
import * as React from 'react';

interface QuoteProps extends React.ComponentProps<'q'> {}

/**
 * A short inline quotation, rendered with the semantic `<q>` element.
 *
 * @example
 * ```tsx
 * <Quote>The only way out is through.</Quote>
 * ```
 */
const Quote = (props: QuoteProps) => <q {...props} className={classNames('fui-Quote', props.className)} />;
Quote.displayName = 'Quote';

export { Quote };
export type { QuoteProps };
