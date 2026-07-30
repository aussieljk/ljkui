import { mergeProps, useRender } from '@base-ui/react';
import classNames from 'classnames';
import * as React from 'react';

import { sectionPropDefs } from './section.props';
import { withBreakpoints } from '../../helpers';

import type { GetPropDefTypes } from '../../helpers';

type SectionOwnProps = GetPropDefTypes<typeof sectionPropDefs>;
interface SectionProps extends Omit<React.ComponentProps<'div'>, 'children'>, SectionOwnProps {
  /** Renders the section as a different element or component, e.g. `render={<section />}`. Defaults to `<div>`. */
  render?: useRender.ComponentProps<'div'>['render'];
  children?: React.ReactNode;
}

/**
 * A vertical padding rhythm block for structuring page sections.
 *
 * @example
 * ```tsx
 * <Section size="3" render={<section />}>
 *   <Text>Section content with vertical rhythm.</Text>
 * </Section>
 * ```
 */
const Section = (props: SectionProps) => {
  const { render, children, className, size = sectionPropDefs.size.default, ...sectionProps } = props;

  return useRender({
    render,
    props: mergeProps(
      sectionProps as React.ComponentProps<'div'>,
      {
        className: classNames('fui-Section', className, withBreakpoints(size, 'fui-r-size')),
        children,
      } as React.ComponentProps<'div'>,
    ),
    defaultTagName: 'div',
  });
};
Section.displayName = 'Section';

export { Section };
export type { SectionProps };
