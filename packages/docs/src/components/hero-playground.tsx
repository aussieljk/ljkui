'use client';

import * as React from 'react';
import { parseDate } from '@internationalized/date';
import { Check, ChevronRight, CircleCheck, FolderPlus, Link as LinkIcon, Minus, Search, Star, X } from 'lucide-react';
import {
  Alert,
  Avatar,
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
  Textarea,
  Typography,
} from 'ljkui';
import { lucideAdapter } from 'ljkui/icons/lucide';

const actions = ['Edit', 'Duplicate', 'Archive', 'More', 'Ascending', 'Descending', 'Show hidden files'];

export function HeroPlayground() {
  const [comment, setComment] = React.useState('');
  const [commented, setCommented] = React.useState(false);
  const [projectCreated, setProjectCreated] = React.useState(false);
  const [rating, setRating] = React.useState(4);
  const [enabled, setEnabled] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<'for-you' | 'following'>('for-you');
  const [query, setQuery] = React.useState('Madagascar');

  return (
    <IconProvider library={lucideAdapter}>
      <section className="docs-live-hero" aria-label="Interactive ljkui component playground">
        <div className="docs-live-grid">
          <Card className="docs-collage-comment" size="2" variant="surface">
            <Avatar size="3" fallback="LK" color="indigo" />
            <div className="docs-comment-content">
              <Textarea
                rows={3}
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                  setCommented(false);
                }}
                placeholder="Write a comment…"
              />
              <div className="docs-comment-actions">
                <Typography.Text render={<label />} size="2" className="flex items-center gap-2">
                  <Checkbox />
                  Send to group
                </Typography.Text>
                <Button
                  disabled={!comment.trim()}
                  onClick={() => {
                    setCommented(true);
                    setComment('');
                  }}
                >
                  {commented ? <Check size={15} /> : <Icons.Message />}
                  {commented ? 'Sent' : 'Comment'}
                </Button>
              </div>
            </div>
          </Card>

          <div className="docs-collage-center-top">
            <Alert.Root color="info" className="docs-collage-alert">
              <Alert.Icon>
                <Icons.Info />
              </Alert.Icon>
              <Alert.Title>Attention!</Alert.Title>
              <Alert.Description>You’ve made changes to settings.</Alert.Description>
              <Alert.Actions>
                <IconButton variant="ghost" aria-label="View changes">
                  <ChevronRight size={17} />
                </IconButton>
              </Alert.Actions>
            </Alert.Root>
            <div className="docs-profile-row">
              <Card size="1" variant="surface" className="docs-profile-card">
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
              <Card size="1" variant="surface" className="docs-placeholder-card">
                <IconButton size="2" variant="ghost" aria-label="Previous">
                  <ChevronRight className="rotate-180" size={19} />
                </IconButton>
                <Typography.Text weight="bold">Placeholder</Typography.Text>
                <IconButton size="2" variant="ghost" aria-label="Close">
                  <X size={19} />
                </IconButton>
              </Card>
            </div>
          </div>

          <Card className="docs-collage-project" size="3" variant="surface">
            <div className="docs-project-icon">{projectCreated ? <Check size={25} /> : <FolderPlus size={25} />}</div>
            <Typography.Heading size="4">{projectCreated ? 'Project created' : 'No Projects Yet'}</Typography.Heading>
            <Typography.Text color="gray">
              {projectCreated ? 'Your new workspace is ready.' : 'You haven’t created any projects yet.'}
            </Typography.Text>
            <div className="docs-project-actions">
              <Button onClick={() => setProjectCreated((value) => !value)}>
                {projectCreated ? 'Start Over' : 'Create Project'}
              </Button>
              {!projectCreated && <Button variant="surface">Import Project</Button>}
            </div>
          </Card>

          <div className="docs-collage-search">
            <Input.Root size="3">
              <Input.Control placeholder="Search…" />
              <Input.Slot>
                <Search size={21} />
              </Input.Slot>
            </Input.Root>
          </div>

          <div className="docs-live-rating" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((value) => (
              <button type="button" key={value} aria-label={`Rate ${value} stars`} onClick={() => setRating(value)}>
                <Star className={value <= rating ? 'is-active' : ''} size={32} />
              </button>
            ))}
          </div>

          <div className="docs-number-group" aria-label="Verification code">
            {[4, 2, 6, 1, '', ''].map((value, index) => (
              <button type="button" key={index} aria-label={`Digit ${index + 1}`}>
                {value}
              </button>
            ))}
          </div>

          <Card className="docs-live-actions" size="1" variant="surface">
            <Typography.Text size="1" color="gray" weight="bold">
              Actions
            </Typography.Text>
            {actions.map((action, index) => (
              <button
                type="button"
                key={action}
                className={action === 'More' ? 'is-selected' : ''}
                onClick={() => setCommented(true)}
              >
                <span>
                  {index > 3 && <Check size={12} />}
                  {action}
                </span>
                <kbd>{index < 3 ? `⌘ ${['E', 'D', 'N'][index]}` : index === 3 ? '›' : ''}</kbd>
              </button>
            ))}
            <button type="button" className="is-danger" onClick={() => setProjectCreated(false)}>
              <span>Delete</span>
              <kbd>⌘ ⌫</kbd>
            </button>
          </Card>

          <div className="docs-breadcrumb">
            <button type="button">Home</button>
            <ChevronRight size={13} />
            <button type="button">Product</button>
            <ChevronRight size={13} />
            <strong>Current page</strong>
          </div>

          <div className="docs-collage-slider">
            <Slider defaultValue={[74]} aria-label="Completion" />
          </div>

          <div className="docs-collage-controls">
            <Button variant="surface">
              <Icons.Plus /> Add
            </Button>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
            <span className="docs-status-badge">
              <Check size={17} />
            </span>
            <span className="docs-spinner" aria-label="Loading" />
            <span className="docs-progress-ring" />
            <Checkbox defaultChecked aria-label="Selected" />
            <span className="docs-minus-state">
              <Minus size={18} />
            </span>
            <span className="docs-radio-state" />
          </div>

          <div className="docs-select-tabs">
            <Select.Root defaultValue="price">
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="price">Sort by: Price</Select.Item>
                <Select.Item value="newest">Sort by: Newest</Select.Item>
                <Select.Item value="rating">Sort by: Rating</Select.Item>
              </Select.Content>
            </Select.Root>
            <div className="docs-tabs-control">
              <button
                type="button"
                className={activeTab === 'for-you' ? 'is-active' : ''}
                onClick={() => setActiveTab('for-you')}
              >
                For You
              </button>
              <button
                type="button"
                className={activeTab === 'following' ? 'is-active' : ''}
                onClick={() => setActiveTab('following')}
              >
                Following
              </button>
            </div>
          </div>

          <Card className="docs-share-card" size="1" variant="surface">
            <div className="docs-share-art" />
            <div className="docs-share-content">
              <Typography.Text weight="bold">Share this image</Typography.Text>
              <Typography.Text size="2" color="gray">
                Minimal 3D rendering wallpaper
              </Typography.Text>
              <Button variant="soft">
                <LinkIcon size={15} /> Copy link
              </Button>
            </div>
          </Card>

          <Card className="docs-toast-card" size="1" variant="surface">
            <CircleCheck size={18} />
            <Typography.Text weight="medium">Permissions saved!</Typography.Text>
            <IconButton size="1" variant="ghost" aria-label="Dismiss">
              <X size={14} />
            </IconButton>
          </Card>

          <div className="docs-bottom-search">
            <Input.Root size="3">
              <Input.Slot>
                <Search size={18} />
              </Input.Slot>
              <Input.Control value={query} onChange={(event) => setQuery(event.target.value)} />
              {query && (
                <Input.Slot>
                  <button type="button" onClick={() => setQuery('')}>
                    <X size={13} />
                  </button>
                </Input.Slot>
              )}
            </Input.Root>
          </div>

          <Card className="docs-calendar-card" size="1" variant="surface">
            <Calendar.Root aria-label="Choose a date" defaultValue={parseDate('2024-02-10')} />
          </Card>
        </div>
      </section>
    </IconProvider>
  );
}
