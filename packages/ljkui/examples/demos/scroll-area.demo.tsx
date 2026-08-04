import React from 'react';
import { ScrollArea, Typography } from 'ljkui';

export default function ScrollAreaDemo() {
  return (
    <ScrollArea type="hover" scrollbars="vertical" className="h-40 max-w-120">
      <div className="flex flex-col gap-3 pr-4">
        <Typography.Heading size="4" trim="start">
          Principles of the typographic craft
        </Typography.Heading>
        <Typography.Text render={<p />}>
          Three fundamental aspects of typography are legibility, readability, and aesthetics. Although in a
          non-technical sense "legible" and "readable" are often used synonymously, typographically they are separate
          but related concepts.
        </Typography.Text>
        <Typography.Text render={<p />}>
          Legibility describes how easily individual characters can be distinguished from one another. It is described
          by Walter Tracy as "the quality of being decipherable and recognisable".
        </Typography.Text>
        <Typography.Text render={<p />}>
          Typographers are concerned with legibility insofar as it is their job to select the correct font to use. Using
          only uppercase letters (all-caps) reduces legibility.
        </Typography.Text>
      </div>
    </ScrollArea>
  );
}
