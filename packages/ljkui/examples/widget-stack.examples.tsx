import WidgetStackOverview from './demos/widget-stack.demo';
import React from 'react';
import { IconButton, Typography, WidgetStack, widgetStackRootPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'padded' } as const;

export const examples = {
  /** The canonical usage — was `demos/widget-stack.demo.tsx` before demos folded into examples. */
  Overview: WidgetStackOverview,

  Orientation() {
    const args = { orientation: widgetStackRootPropDefs.orientation.default };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
        <WidgetStack.Root {...args} orientation="horizontal">
          <WidgetStack.Stack
            style={{
              width: 200,
              height: 200,
            }}
          >
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: 'var(--space-4)',
                  background: 'linear-gradient(var(--blue-700), var(--blue-400))',
                  color: 'var(--blue-700-contrast)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                  }}
                >
                  <Typography.Text weight="bold" size="5">
                    Wrocław
                  </Typography.Text>
                  <Typography.Text weight="light" size="9">
                    24
                  </Typography.Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                  }}
                >
                  <Typography.Text weight="medium" size="3">
                    Sunny
                  </Typography.Text>
                  <Typography.Text weight="medium" size="3">
                    H:73 L:55
                  </Typography.Text>
                </div>
              </div>
            </WidgetStack.Item>
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop)',
                    backgroundSize: 'cover',
                    height: '50%',
                  }}
                ></div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    padding: 'var(--space-4)',
                    height: '50%',
                    background: 'var(--gray-50)',
                  }}
                >
                  <Typography.Text weight="medium" size="4" trim="start">
                    Travis S.
                  </Typography.Text>
                  <Typography.Text weight="medium" size="2" color="gray">
                    4am in Toronto
                  </Typography.Text>
                  <IconButton
                    variant="soft"
                    style={{
                      position: 'absolute',
                      right: 16,
                      bottom: 16,
                      borderRadius: '50%',
                    }}
                    color="blue"
                    size="4"
                  >
                    A
                  </IconButton>
                </div>
              </div>
            </WidgetStack.Item>
          </WidgetStack.Stack>
        </WidgetStack.Root>

        <WidgetStack.Root orientation="vertical">
          <WidgetStack.Stack
            style={{
              width: 200,
              height: 200,
            }}
          >
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: 'var(--space-4)',
                  background: 'linear-gradient(var(--blue-700), var(--blue-400))',
                  color: 'var(--blue-700-contrast)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                  }}
                >
                  <Typography.Text weight="bold" size="5">
                    Wrocław
                  </Typography.Text>
                  <Typography.Text weight="light" size="9">
                    24
                  </Typography.Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                  }}
                >
                  <Typography.Text weight="medium" size="3">
                    Sunny
                  </Typography.Text>
                  <Typography.Text weight="medium" size="3">
                    H:73 L:55
                  </Typography.Text>
                </div>
              </div>
            </WidgetStack.Item>
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop)',
                    backgroundSize: 'cover',
                    height: '50%',
                  }}
                ></div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    padding: 'var(--space-4)',
                    height: '50%',
                    background: 'var(--gray-50)',
                  }}
                >
                  <Typography.Text weight="medium" size="4" trim="start">
                    Travis S.
                  </Typography.Text>
                  <Typography.Text weight="medium" size="2" color="gray">
                    4am in Toronto
                  </Typography.Text>
                  <IconButton
                    variant="soft"
                    style={{
                      position: 'absolute',
                      right: 16,
                      bottom: 16,
                      borderRadius: '50%',
                    }}
                    color="blue"
                    size="4"
                  >
                    A
                  </IconButton>
                </div>
              </div>
            </WidgetStack.Item>
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'var(--grass-9)',
                }}
              >
                <span
                  style={{
                    fontSize: 96,
                    lineHeight: 1,
                  }}
                >
                  🏝️
                </span>
              </div>
            </WidgetStack.Item>
            <WidgetStack.Item style={{ fontSize: 60 }}>🏝️🏴‍☠️⚜️</WidgetStack.Item>
          </WidgetStack.Stack>
        </WidgetStack.Root>
      </div>
    );
  },

  SingleWidget() {
    const args = { orientation: widgetStackRootPropDefs.orientation.default };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <Typography.Text>
          When single widget is inside, the scrolling and animations are blocked automatically.
        </Typography.Text>
        <WidgetStack.Root {...args}>
          <WidgetStack.Stack
            style={{
              width: 400,
              height: 200,
            }}
          >
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: 'var(--space-4)',
                  background: 'linear-gradient(var(--blue-700), var(--blue-400))',
                  color: 'var(--blue-700-contrast)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                  }}
                >
                  <Typography.Text weight="bold" size="5">
                    Wrocław
                  </Typography.Text>
                  <Typography.Text weight="light" size="9">
                    24
                  </Typography.Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                  }}
                >
                  <Typography.Text weight="medium" size="3">
                    Sunny
                  </Typography.Text>
                  <Typography.Text weight="medium" size="3">
                    H:73 L:55
                  </Typography.Text>
                </div>
              </div>
            </WidgetStack.Item>
          </WidgetStack.Stack>
        </WidgetStack.Root>
      </div>
    );
  },

  WithControls() {
    const args = { orientation: widgetStackRootPropDefs.orientation.default };
    return (
      <WidgetStack.Root {...args}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-4)', alignItems: 'center' }}>
          <WidgetStack.Prev render={<IconButton variant="soft" color="gray" style={{ borderRadius: '50%' }} />}>
            {'<'}
          </WidgetStack.Prev>

          <WidgetStack.Stack
            style={{
              width: 400,
              height: 200,
            }}
          >
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: 'var(--space-4)',
                  background: 'linear-gradient(var(--blue-700), var(--blue-400))',
                  color: 'var(--blue-700-contrast)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                  }}
                >
                  <Typography.Text weight="bold" size="5">
                    Wrocław
                  </Typography.Text>
                  <Typography.Text weight="light" size="9">
                    24
                  </Typography.Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                  }}
                >
                  <Typography.Text weight="medium" size="3">
                    Sunny
                  </Typography.Text>
                  <Typography.Text weight="medium" size="3">
                    H:73 L:55
                  </Typography.Text>
                </div>
              </div>
            </WidgetStack.Item>
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop)',
                    backgroundSize: 'cover',
                    height: '50%',
                  }}
                ></div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    padding: 'var(--space-4)',
                    height: '50%',
                    background: 'var(--gray-50)',
                  }}
                >
                  <Typography.Text weight="medium" size="4" trim="start">
                    Travis S.
                  </Typography.Text>
                  <Typography.Text weight="medium" size="2" color="gray">
                    4am in Toronto
                  </Typography.Text>
                  <IconButton
                    variant="soft"
                    style={{
                      position: 'absolute',
                      right: 16,
                      bottom: 16,
                      borderRadius: '50%',
                    }}
                    color="blue"
                    size="4"
                  >
                    A
                  </IconButton>
                </div>
              </div>
            </WidgetStack.Item>
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'var(--grass-9)',
                }}
              >
                <span
                  style={{
                    fontSize: 96,
                    lineHeight: 1,
                  }}
                >
                  🏝️
                </span>
              </div>
            </WidgetStack.Item>
            <WidgetStack.Item style={{ fontSize: 60 }}>🏝️🏴‍☠️⚜️</WidgetStack.Item>
          </WidgetStack.Stack>
          <WidgetStack.Next render={<IconButton variant="soft" color="gray" style={{ borderRadius: '50%' }} />}>
            {'>'}
          </WidgetStack.Next>
        </div>
      </WidgetStack.Root>
    );
  },

  AutoPlay() {
    const args = { orientation: widgetStackRootPropDefs.orientation.default };
    return (
      <WidgetStack.Root {...args} autoPlay={4000}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-4)', alignItems: 'center' }}>
          <WidgetStack.Prev render={<IconButton variant="soft" color="gray" style={{ borderRadius: '50%' }} />}>
            {'<'}
          </WidgetStack.Prev>

          <WidgetStack.Stack
            style={{
              width: 400,
              height: 200,
            }}
          >
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: 'var(--space-4)',
                  background: 'linear-gradient(var(--blue-700), var(--blue-400))',
                  color: 'var(--blue-700-contrast)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                  }}
                >
                  <Typography.Text weight="bold" size="5">
                    Wrocław
                  </Typography.Text>
                  <Typography.Text weight="light" size="9">
                    24
                  </Typography.Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                  }}
                >
                  <Typography.Text weight="medium" size="3">
                    Sunny
                  </Typography.Text>
                  <Typography.Text weight="medium" size="3">
                    H:73 L:55
                  </Typography.Text>
                </div>
              </div>
            </WidgetStack.Item>
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: 'var(--space-1)',
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop)',
                    backgroundSize: 'cover',
                    height: '50%',
                  }}
                ></div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    padding: 'var(--space-4)',
                    height: '50%',
                    background: 'var(--gray-50)',
                  }}
                >
                  <Typography.Text weight="medium" size="4" trim="start">
                    Travis S.
                  </Typography.Text>
                  <Typography.Text weight="medium" size="2" color="gray">
                    4am in Toronto
                  </Typography.Text>
                  <IconButton
                    variant="soft"
                    style={{
                      position: 'absolute',
                      right: 16,
                      bottom: 16,
                      borderRadius: '50%',
                    }}
                    color="blue"
                    size="4"
                  >
                    A
                  </IconButton>
                </div>
              </div>
            </WidgetStack.Item>
            <WidgetStack.Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'var(--grass-9)',
                }}
              >
                <span
                  style={{
                    fontSize: 96,
                    lineHeight: 1,
                  }}
                >
                  🏝️
                </span>
              </div>
            </WidgetStack.Item>
            <WidgetStack.Item style={{ fontSize: 60 }}>🏝️🏴‍☠️⚜️</WidgetStack.Item>
          </WidgetStack.Stack>
          <WidgetStack.Next render={<IconButton variant="soft" color="gray" style={{ borderRadius: '50%' }} />}>
            {'>'}
          </WidgetStack.Next>
        </div>
      </WidgetStack.Root>
    );
  },
};
