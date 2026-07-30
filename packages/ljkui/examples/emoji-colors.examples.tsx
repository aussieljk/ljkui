import React from 'react';
import { Avatar, Badge, Button, Card, Typography, emojiColorMap, getColorForEmoji, type ColorScale } from 'ljkui';

/**
 * `getColorForEmoji` is a pre-generated O(1) lookup: every emoji's dominant colour was
 * matched (in LAB space) to the nearest scale in the palette. It returns `undefined`
 * for anything unmapped so the caller picks its own fallback.
 */
const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' };
const column: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' };

const SAMPLE = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🔥', '🌊', '🌱', '🍋', '🍇', '🌸', '⚡️', '🪵', '🌙'];

const Label = ({ children }: { children: React.ReactNode }) => (
  <Typography.Text render={<div />} size="1" color="gray" style={{ marginBottom: 'var(--space-2)' }}>
    {children}
  </Typography.Text>
);

export const examples = {
  'Color for emoji'() {
    return (
      <div style={column}>
        <Typography.Text size="2" color="gray" render={<div />} style={{ maxWidth: 520 }}>
          <Typography.Code size="2">getColorForEmoji(emoji)</Typography.Code> returns a scale name, or{' '}
          <Typography.Code size="2">undefined</Typography.Code> when the emoji is not in the map (
          {Object.keys(emojiColorMap).length} entries).
        </Typography.Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          {SAMPLE.map((emoji) => {
            const color = getColorForEmoji(emoji) ?? 'gray';
            return (
              <div key={emoji} style={{ textAlign: 'center', width: 88 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'var(--space-8)',
                    fontSize: 28,
                    borderRadius: 'var(--radius-4)',
                    backgroundColor: `var(--${color}-200)`,
                    border: `1px solid var(--${color}-600)`,
                  }}
                >
                  {emoji}
                </div>
                <Typography.Text render={<div />} size="1" color="gray" style={{ marginTop: 'var(--space-1)' }}>
                  {color}
                </Typography.Text>
              </div>
            );
          })}
        </div>
      </div>
    );
  },

  'Emoji badges'() {
    return (
      <div style={row}>
        {SAMPLE.map((emoji) => (
          <Badge key={emoji} variant="soft" color={getColorForEmoji(emoji) ?? 'gray'}>
            {emoji} {getColorForEmoji(emoji) ?? 'unmapped'}
          </Badge>
        ))}
      </div>
    );
  },

  'Emoji avatars'() {
    return (
      <div style={row}>
        {['🐳', '🦊', '🐸', '🍒', '🌻', '🫐'].map((emoji) => (
          <Avatar key={emoji} size="4" fallback={emoji} color={getColorForEmoji(emoji) ?? 'gray'} />
        ))}
      </div>
    );
  },

  'Picking a theme from an emoji'() {
    const [emoji, setEmoji] = React.useState('🔥');
    const color: ColorScale | 'gray' = getColorForEmoji(emoji) ?? 'gray';
    return (
      <Card size="2" style={{ width: 380 }}>
        <div style={column}>
          <Label>tap an emoji to recolour the card</Label>
          <div style={row}>
            {SAMPLE.slice(0, 8).map((option) => (
              <Button
                key={option}
                size="1"
                variant={option === emoji ? 'solid' : 'soft'}
                color={getColorForEmoji(option) ?? 'gray'}
                onClick={() => setEmoji(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <div
            style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-4)',
              backgroundColor: `var(--${color}-100)`,
              border: `1px solid var(--${color}-400)`,
            }}
          >
            <Typography.Text size="6">{emoji}</Typography.Text>
            <Typography.Text render={<div />} size="2" color={color}>
              {color}
            </Typography.Text>
          </div>
        </div>
      </Card>
    );
  },

  'Unmapped input'() {
    const unmapped = ['🫥', 'a', ''];
    return (
      <div style={column}>
        <Label>anything not in the map returns undefined — supply your own fallback</Label>
        {unmapped.map((value, index) => (
          <div key={index} style={row}>
            <Typography.Code size="2">getColorForEmoji({JSON.stringify(value)})</Typography.Code>
            <Typography.Text size="2">→ {String(getColorForEmoji(value))}</Typography.Text>
          </div>
        ))}
      </div>
    );
  },
};
