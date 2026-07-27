'use client';

import * as React from 'react';
import { parseDate } from '@internationalized/date';
import { Check, ChevronRight, FolderPlus, Search, Star, X } from 'lucide-react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Calendar,
  Card,
  Checkbox,
  IconButton,
  IconProvider,
  Icons,
  Input,
  Select,
  Slider,
  Switch,
  Typography,
} from 'ljkui';
import { lucideAdapter } from 'ljkui/icons/lucide';

export function HeroPlayground() {
  const [comment, setComment] = React.useState('');
  const [commented, setCommented] = React.useState(false);
  const [projectCreated, setProjectCreated] = React.useState(false);
  const [rating, setRating] = React.useState(4);
  const [saved, setSaved] = React.useState(true);
  const [noticeOpen, setNoticeOpen] = React.useState(true);

  return (
    <IconProvider library={lucideAdapter}>
      <section className="docs-live-hero" aria-label="Interactive ljkui component playground">
        <div className="docs-live-hero-heading">
          <div>
            <span className="docs-live-indicator">
              <span />
              Live components
            </span>
            <p>Try the controls. Every surface below is rendered with ljkui.</p>
          </div>
          <Badge color="success" variant="soft">
            Interactive
          </Badge>
        </div>

        <div className="docs-live-grid">
          <Card className="docs-live-card docs-comment-card" size="2" variant="surface">
            <div className="flex items-start gap-3">
              <Avatar size="3" fallback="LK" color="indigo" />
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <Input.Root size="3">
                  <Input.Control
                    value={comment}
                    onChange={(event) => {
                      setComment(event.target.value);
                      setCommented(false);
                    }}
                    placeholder="Write a comment…"
                  />
                </Input.Root>
                <div className="flex items-center justify-between gap-3">
                  <Typography.Text render={<label />} size="2" className="flex items-center gap-2">
                    <Checkbox defaultChecked />
                    Send to group
                  </Typography.Text>
                  <Button
                    size="2"
                    disabled={!comment.trim()}
                    onClick={() => {
                      setCommented(true);
                      setComment('');
                    }}
                  >
                    {commented ? <Check size={14} /> : <Icons.Message />}
                    {commented ? 'Sent' : 'Comment'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="docs-live-center-column">
            {noticeOpen ? (
              <Alert.Root color="info" className="docs-live-alert">
                <Alert.Icon>
                  <Icons.Info />
                </Alert.Icon>
                <Alert.Title>Everything here works</Alert.Title>
                <Alert.Description>Change the controls or customize the theme above.</Alert.Description>
                <Alert.Actions>
                  <Alert.Action onClick={() => setNoticeOpen(false)}>Got it</Alert.Action>
                </Alert.Actions>
              </Alert.Root>
            ) : (
              <button type="button" className="docs-notice-reset" onClick={() => setNoticeOpen(true)}>
                Restore notice
              </button>
            )}

            <div className="docs-profile-row">
              <Card size="1" variant="surface" className="flex flex-1 items-center gap-3">
                <Avatar size="3" fallback="TG" color="orange" />
                <div>
                  <Typography.Text render={<div />} size="2" weight="bold">
                    Teodros Girmay
                  </Typography.Text>
                  <Typography.Text render={<div />} size="2" color="gray">
                    Engineering
                  </Typography.Text>
                </div>
              </Card>
              <Card size="1" variant="surface" className="flex items-center gap-2">
                <IconButton size="2" variant="ghost" aria-label="Previous item">
                  <ChevronRight className="rotate-180" size={18} />
                </IconButton>
                <Typography.Text weight="bold">Placeholder</Typography.Text>
                <IconButton size="2" variant="ghost" aria-label="Close item">
                  <X size={18} />
                </IconButton>
              </Card>
            </div>
          </div>

          <Card className="docs-live-card docs-project-card" size="3" variant="surface">
            {projectCreated ? (
              <>
                <div className="docs-project-icon">
                  <Check size={26} />
                </div>
                <Typography.Heading size="4">Project created</Typography.Heading>
                <Typography.Text color="gray">Your new workspace is ready.</Typography.Text>
                <Button variant="soft" onClick={() => setProjectCreated(false)}>
                  Start over
                </Button>
              </>
            ) : (
              <>
                <div className="docs-project-icon">
                  <FolderPlus size={26} />
                </div>
                <Typography.Heading size="4">No Projects Yet</Typography.Heading>
                <Typography.Text color="gray">Create your first project to get started.</Typography.Text>
                <Button onClick={() => setProjectCreated(true)}>Create project</Button>
              </>
            )}
          </Card>

          <div className="docs-live-search">
            <Input.Root size="3">
              <Input.Slot>
                <Search size={16} />
              </Input.Slot>
              <Input.Control placeholder="Search…" />
            </Input.Root>
          </div>

          <div className="docs-live-rating" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((value) => (
              <button type="button" key={value} aria-label={`Rate ${value} stars`} onClick={() => setRating(value)}>
                <Star className={value <= rating ? 'is-active' : ''} size={34} />
              </button>
            ))}
          </div>

          <Card className="docs-controls-card" size="2" variant="surface">
            <div className="docs-controls-row">
              <Switch checked={saved} onCheckedChange={setSaved} />
              <Typography.Text size="2">{saved ? 'Auto-save on' : 'Auto-save off'}</Typography.Text>
              <Checkbox defaultChecked aria-label="Selected option" />
              <Checkbox aria-label="Unselected option" />
            </div>
            <Slider defaultValue={[64]} aria-label="Completion" />
            <div className="docs-controls-row">
              <Select.Root defaultValue="price">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="price">Sort by: Price</Select.Item>
                  <Select.Item value="newest">Sort by: Newest</Select.Item>
                  <Select.Item value="rating">Sort by: Rating</Select.Item>
                </Select.Content>
              </Select.Root>
              <Button variant="soft" onClick={() => setSaved((value) => !value)}>
                <Icons.Plus />
                Add
              </Button>
            </div>
          </Card>

          <Card className="docs-live-actions" size="1" variant="surface">
            <Typography.Text size="1" color="gray" weight="bold">
              ACTIONS
            </Typography.Text>
            {['Edit', 'Duplicate', 'Archive', 'Move to project…'].map((action) => (
              <button type="button" key={action} onClick={() => setCommented(true)}>
                {action}
                <ChevronRight size={14} />
              </button>
            ))}
            <button type="button" className="is-danger" onClick={() => setProjectCreated(false)}>
              Delete
              <X size={14} />
            </button>
          </Card>

          <div className="docs-calendar-card">
            <Calendar.Root aria-label="Choose a date" defaultValue={parseDate('2024-02-10')} />
          </div>
        </div>
      </section>
    </IconProvider>
  );
}
