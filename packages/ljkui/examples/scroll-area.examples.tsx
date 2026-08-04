import React from 'react';
import { Button, IconButton, Input, ScrollArea, Typography, scrollAreaPropDefs } from 'ljkui';

// Icons for the chat demo
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1.5 1.5L14.5 8L1.5 14.5V9.5L10.5 8L1.5 6.5V1.5Z" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 12L3 7L4 6L8 10L12 6L13 7L8 12Z" />
  </svg>
);

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'padded' } as const;

export const examples = {
  'Type (Visibility Behavior)'() {
    const args = { size: scrollAreaPropDefs.size.default };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center' }}>
        <Typography.Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          The <Typography.Code>type</Typography.Code> prop controls scrollbar visibility, similar to macOS scrollbar
          preferences.
        </Typography.Text>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
          <div>
            <Typography.Text size="2" weight="bold" render={<div />} style={{ marginBottom: 'var(--space-2)' }}>
              type="hover" (default)
            </Typography.Text>
            <Typography.Text size="1" color="gray" render={<div />} style={{ marginBottom: 'var(--space-2)' }}>
              Visible on hover or scroll
            </Typography.Text>
            <ScrollArea
              {...args}
              type="hover"
              scrollbars="vertical"
              style={{ height: 80, width: 200, background: 'var(--gray-alpha-100)' }}
            >
              <div style={{ padding: 'var(--space-2)' }}>
                <Typography.Text size="2">
                  Hover over this area or scroll to see the scrollbar appear. It fades out when you stop interacting.
                </Typography.Text>
              </div>
            </ScrollArea>
          </div>

          <div>
            <Typography.Text size="2" weight="bold" render={<div />} style={{ marginBottom: 'var(--space-2)' }}>
              type="scroll"
            </Typography.Text>
            <Typography.Text size="1" color="gray" render={<div />} style={{ marginBottom: 'var(--space-2)' }}>
              Visible only while scrolling
            </Typography.Text>
            <ScrollArea
              {...args}
              type="scroll"
              scrollbars="vertical"
              style={{ height: 80, width: 200, background: 'var(--gray-alpha-100)' }}
            >
              <div style={{ padding: 'var(--space-2)' }}>
                <Typography.Text size="2">
                  The scrollbar only appears while you are actively scrolling. Try scrolling with your mouse wheel or
                  trackpad.
                </Typography.Text>
              </div>
            </ScrollArea>
          </div>

          <div>
            <Typography.Text size="2" weight="bold" render={<div />} style={{ marginBottom: 'var(--space-2)' }}>
              type="auto"
            </Typography.Text>
            <Typography.Text size="1" color="gray" render={<div />} style={{ marginBottom: 'var(--space-2)' }}>
              Visible when content overflows
            </Typography.Text>
            <ScrollArea
              {...args}
              type="auto"
              scrollbars="vertical"
              style={{ height: 80, width: 200, background: 'var(--gray-alpha-100)' }}
            >
              <div style={{ padding: 'var(--space-2)' }}>
                <Typography.Text size="2">
                  The scrollbar is always visible as long as the content overflows the container. No interaction needed.
                </Typography.Text>
              </div>
            </ScrollArea>
          </div>

          <div>
            <Typography.Text size="2" weight="bold" render={<div />} style={{ marginBottom: 'var(--space-2)' }}>
              type="always"
            </Typography.Text>
            <Typography.Text size="1" color="gray" render={<div />} style={{ marginBottom: 'var(--space-2)' }}>
              Always visible
            </Typography.Text>
            <ScrollArea
              {...args}
              type="always"
              scrollbars="vertical"
              style={{ height: 280, width: 200, background: 'var(--gray-alpha-100)' }}
            >
              <div style={{ padding: 'var(--space-2)' }}>
                <Typography.Text size="2">
                  The scrollbar is always visible, even if the content doesn't overflow.
                </Typography.Text>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  },

  'Fade Edges'() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          The <Typography.Code>fadeEdges</Typography.Code> prop fades the scrollable edges with a gradient mask that
          only appears when there is more content to scroll in that direction.
        </Typography.Text>

        <ScrollArea
          fadeEdges
          type="hover"
          scrollbars="vertical"
          style={{ height: 200, width: 320, background: 'var(--gray-alpha-100)', borderRadius: 'var(--radius-3)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-4)' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <Typography.Text key={i} size="2" trim="both">
                {i + 1}. Vernacular architecture is building done outside any academic tradition, and without
                professional guidance. It serves immediate, local needs and reflects local traditions and cultural
                practices.
              </Typography.Text>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  },

  Size() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <ScrollArea {...args} size="1" type="always" scrollbars="horizontal" style={{ width: 300, height: 12 }}>
          <div style={{ width: 800, height: 1 }} />
        </ScrollArea>

        <ScrollArea {...args} size="2" type="always" scrollbars="horizontal" style={{ width: 350, height: 16 }}>
          <div style={{ width: 900, height: 1 }} />
        </ScrollArea>

        <ScrollArea {...args} size="3" type="always" scrollbars="horizontal" style={{ width: 400, height: 20 }}>
          <div style={{ width: 1000, height: 1 }} />
        </ScrollArea>
      </div>
    );
  },

  Scrollbars() {
    const args = { size: scrollAreaPropDefs.size.default };
    return (
      <div style={{ display: 'grid', maxWidth: 500, gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
        <ScrollArea {...args} type="always" scrollbars="vertical" style={{ height: 150 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              padding: 'var(--space-2)',
              paddingRight: 'var(--space-8)',
            }}
          >
            <Typography.Text size="2" trim="both">
              Three fundamental aspects of typography are legibility, readability, and aesthetics. Although in a
              non-technical sense "legible" and "readable" are often used synonymously, typographically they are
              separate but related concepts.
            </Typography.Text>

            <Typography.Text size="2" trim="both">
              Legibility describes how easily individual characters can be distinguished from one another. It is
              described by Walter Tracy as "the quality of being decipherable and recognisable". For instance, if a "b"
              and an "h", or a "3" and an "8", are difficult to distinguish at small sizes, this is a problem of
              legibility.
            </Typography.Text>
          </div>
        </ScrollArea>

        <ScrollArea {...args} type="always" scrollbars="horizontal" style={{ height: 150 }}>
          <div style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-2)', width: 700 }}>
            <Typography.Text size="2" trim="both">
              Three fundamental aspects of typography are legibility, readability, and aesthetics. Although in a
              non-technical sense "legible" and "readable" are often used synonymously, typographically they are
              separate but related concepts.
            </Typography.Text>

            <Typography.Text size="2" trim="both">
              Legibility describes how easily individual characters can be distinguished from one another. It is
              described by Walter Tracy as "the quality of being decipherable and recognisable". For instance, if a "b"
              and an "h", or a "3" and an "8", are difficult to distinguish at small sizes, this is a problem of
              legibility.
            </Typography.Text>
          </div>
        </ScrollArea>
      </div>
    );
  },

  'Both Scrollbars'() {
    const args = { size: scrollAreaPropDefs.size.default };
    return (
      <ScrollArea {...args} type="always" scrollbars="both" style={{ width: 300, height: 200 }}>
        <div style={{ width: 600, padding: 'var(--space-3)' }}>
          <Typography.Text render={<div />} size="2">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <p>
                This scroll area has both horizontal and vertical scrollbars. The content is wider than the container
                width, so you can scroll horizontally.
              </p>
              <p>
                Vernacular architecture is building done outside any academic tradition, and without professional
                guidance. It is not a particular architectural movement or style, but rather a broad category.
              </p>
              <p>
                This type of architecture usually serves immediate, local needs, is constrained by the materials
                available in its particular region and reflects local traditions and cultural practices.
              </p>
            </div>
          </Typography.Text>
        </div>
      </ScrollArea>
    );
  },

  'Scrollable Element Ref'() {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [messages, setMessages] = React.useState([
      { id: 1, text: 'Hey! How are you doing?', sender: 'other', time: '10:30 AM' },
      { id: 2, text: "I'm doing great, thanks for asking! How about you?", sender: 'me', time: '10:31 AM' },
      { id: 3, text: 'Pretty good! Just working on some new features.', sender: 'other', time: '10:32 AM' },
      { id: 4, text: 'That sounds exciting! What kind of features?', sender: 'me', time: '10:33 AM' },
      {
        id: 5,
        text: "We're adding a new scroll area component with better ref support.",
        sender: 'other',
        time: '10:34 AM',
      },
    ]);
    const [inputValue, setInputValue] = React.useState('');
    const [showScrollButton, setShowScrollButton] = React.useState(false);

    const scrollToBottom = React.useCallback((behavior: ScrollBehavior = 'smooth') => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior,
        });
      }
    }, []);

    const handleScroll = React.useCallback(() => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollButton(!isNearBottom);
      }
    }, []);

    const sendMessage = () => {
      if (!inputValue.trim()) return;

      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'me' as const,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputValue('');

      // Scroll to bottom after sending
      setTimeout(() => scrollToBottom(), 50);

      // Simulate a reply
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: 'Thanks for the message! This is an auto-reply.',
            sender: 'other',
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          },
        ]);
        setTimeout(() => scrollToBottom(), 50);
      }, 1000);
    };

    // Scroll to bottom on mount
    React.useEffect(() => {
      scrollToBottom('instant');
    }, [scrollToBottom]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text render={<div />} style={{ maxWidth: 400, textAlign: 'center' }}>
          Use <Typography.Code>ref</Typography.Code> to programmatically control scroll position. This chat demo shows
          scroll-to-bottom functionality.
        </Typography.Text>

        <div
          style={{
            width: 360,
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid var(--color-stroke)',
            borderRadius: 'var(--radius-3)',
            overflow: 'hidden',
            background: 'var(--color-panel)',
          }}
        >
          {/* Chat header */}
          <div
            style={{
              padding: 'var(--space-3)',
              borderBottom: '1px solid var(--color-stroke)',
              background: 'var(--gray-50)',
            }}
          >
            <Typography.Text weight="medium">Chat Demo</Typography.Text>
          </div>

          {/* Messages area */}
          <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
            <ScrollArea
              ref={scrollRef}
              onScroll={handleScroll}
              style={{ height: '100%' }}
              scrollbars="vertical"
              type="auto"
            >
              <div
                style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      display: 'flex',
                      justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '75%',
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-3)',
                        background: message.sender === 'me' ? 'var(--accent-700)' : 'var(--gray-200)',
                        color: message.sender === 'me' ? 'var(--accent-700-contrast)' : 'inherit',
                      }}
                    >
                      <Typography.Text size="2">{message.text}</Typography.Text>
                      <Typography.Text
                        size="1"
                        style={{
                          display: 'block',
                          marginTop: 'var(--space-1)',
                          opacity: 0.7,
                        }}
                      >
                        {message.time}
                      </Typography.Text>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Scroll to bottom button */}
            {showScrollButton && (
              <IconButton
                size="1"
                variant="solid"
                onClick={() => scrollToBottom()}
                style={{
                  position: 'absolute',
                  bottom: 'var(--space-2)',
                  right: 'var(--space-4)',
                  borderRadius: '50%',
                }}
              >
                <ArrowDownIcon />
              </IconButton>
            )}
          </div>

          {/* Input area */}
          <div
            style={{
              padding: 'var(--space-2)',
              borderTop: '1px solid var(--color-stroke)',
              display: 'flex',
              gap: 'var(--space-2)',
              flexShrink: 0,
            }}
          >
            <Input.Root variant="soft" color="gray" style={{ flex: 1 }} size="3">
              <Input.Control
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
              />
            </Input.Root>
            <IconButton size="3" variant="solid" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="soft" size="1" onClick={() => scrollToBottom()}>
            Scroll to Bottom
          </Button>
          <Button variant="soft" size="1" onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}>
            Scroll to Top
          </Button>
        </div>
      </div>
    );
  },
};
