import React from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Typography,
  emojiColorMap,
  getColorForEmoji,
  type ColorScale,
} from 'ljkui';

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

  'All Emojis'() {
    const entries = Object.entries(emojiColorMap) as Array<[string, ColorScale]>;
    const byScale = new Map<ColorScale, string[]>();
    for (const [emoji, color] of entries) {
      const bucket = byScale.get(color);
      if (bucket) bucket.push(emoji);
      else byScale.set(color, [emoji]);
    }
    const groups = [...byScale.entries()].sort((a, b) => b[1].length - a[1].length);

    return (
      <div style={column}>
        <Typography.Text size="2" color="gray" render={<div />} style={{ maxWidth: 620 }}>
          The whole map — all {entries.length} entries — grouped by the scale each emoji resolves to. Every emoji is a
          plain tinted <Typography.Code size="2">span</Typography.Code>, not an{' '}
          <Typography.Code size="2">Avatar</Typography.Code> or <Typography.Code size="2">Badge</Typography.Code>:{' '}
          {entries.length} component trees would take seconds to mount and tells you nothing extra.
        </Typography.Text>
        {groups.map(([color, emojis]) => (
          <div key={color}>
            <Label>
              {color} — {emojis.length}
            </Label>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-1)',
                padding: 'var(--space-2)',
                borderRadius: 'var(--radius-3)',
                backgroundColor: `var(--${color}-100)`,
                border: `1px solid var(--${color}-400)`,
              }}
            >
              {emojis.map((emoji) => (
                <span key={emoji} title={`${emoji} → ${color}`} style={{ fontSize: 18, lineHeight: 1.4 }}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },

  Interactive() {
    const [value, setValue] = React.useState('🍑');
    const emoji = value.trim();
    const color = getColorForEmoji(emoji);
    const resolved: ColorScale | 'gray' = color ?? 'gray';

    return (
      <Card size="3" style={{ width: 420 }}>
        <div style={column}>
          <Label>type or paste an emoji</Label>
          <Input.Root size="3">
            <Input.Control
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="🍑"
              aria-label="Emoji"
            />
          </Input.Root>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-4)',
              backgroundColor: `var(--${resolved}-100)`,
              border: `1px solid var(--${resolved}-400)`,
            }}
          >
            <span style={{ fontSize: 40, lineHeight: 1 }}>{emoji || '␀'}</span>
            <div>
              <div>
                <Typography.Code size="2">getColorForEmoji({JSON.stringify(emoji)})</Typography.Code>
              </div>
              <Typography.Text render={<div />} size="3" weight="medium" color={resolved}>
                {color ?? 'undefined'}
              </Typography.Text>
            </div>
          </div>

          <div style={row}>
            <Badge variant="solid" color={resolved}>
              solid
            </Badge>
            <Badge variant="soft" color={resolved}>
              soft
            </Badge>
            <Badge variant="surface" color={resolved}>
              surface
            </Badge>
            <Avatar size="3" fallback={emoji || '?'} color={resolved} />
            <Button size="2" variant="solid" color={resolved}>
              Button
            </Button>
          </div>

          {!color && (
            <Typography.Text size="1" color="gray">
              Not in the map — everything above falls back to <Typography.Code size="1">gray</Typography.Code>. Try 🔥,
              🌊 or 🍇.
            </Typography.Text>
          )}
        </div>
      </Card>
    );
  },
};
