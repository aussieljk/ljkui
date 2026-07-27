import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Blocks, LayoutGrid, Menu, MessageSquare, Search, TextCursorInput } from 'lucide-react';
import { demos } from '@/demos/registry';
import { componentLabel } from '@/lib/component-label';

const categoryDefinitions = [
  {
    name: 'Forms & input',
    description: 'Collect, validate and submit user input.',
    icon: TextCursorInput,
    names: [
      'autocomplete',
      'button',
      'button-group',
      'calendar',
      'checkbox',
      'combobox',
      'credit-card',
      'date-field',
      'date-picker',
      'date-range-picker',
      'field',
      'fieldset',
      'filter-chip',
      'form',
      'input',
      'input-group',
      'input-otp',
      'number-field',
      'radio-button-group',
      'radio-group',
      'select',
      'slider',
      'switch',
      'textarea',
      'toggle',
      'toggle-group',
    ],
  },
  {
    name: 'Navigation',
    description: 'Help people move through an application.',
    icon: Menu,
    names: [
      'breadcrumb',
      'command',
      'context-menu',
      'dropdown-menu',
      'menubar',
      'navigation-menu',
      'pagination',
      'sidebar',
      'tabs',
      'tabs-nav',
      'toggle-group-nav',
    ],
  },
  {
    name: 'Feedback & overlays',
    description: 'Confirm actions and focus attention.',
    icon: MessageSquare,
    names: [
      'accordion',
      'alert',
      'alert-dialog',
      'circular-progress',
      'dialog',
      'drawer',
      'empty',
      'hover-card',
      'lightbox',
      'popover',
      'progress',
      'sheet',
      'skeleton',
      'sonner',
      'spinner',
      'tooltip',
    ],
  },
  {
    name: 'Layout',
    description: 'Compose responsive page and interface structure.',
    icon: LayoutGrid,
    names: [
      'aspect-ratio',
      'grid',
      'h-stack',
      'inset',
      'overlay',
      'resizable',
      'scroll-area',
      'spacer',
      'v-stack',
      'widget-stack',
      'z-stack',
    ],
  },
  {
    name: 'Data & content',
    description: 'Present identity, status and structured information.',
    icon: Blocks,
    names: [
      'avatar',
      'avatar-group',
      'avatar-stack',
      'badge',
      'blockquote',
      'card',
      'carousel',
      'chart',
      'code',
      'data-table',
      'heading',
      'icon-button',
      'item',
      'kbd',
      'link',
      'quote',
      'separator',
      'table',
      'text',
    ],
  },
] as const;

export function ComponentCatalog() {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const available = React.useMemo(() => new Set(Object.keys(demos)), []);
  const normalizedQuery = query.trim().toLowerCase();

  const categories = categoryDefinitions
    .map((group) => ({
      ...group,
      names: group.names.filter(
        (name) =>
          available.has(name) &&
          (category === 'All' || category === group.name) &&
          (!normalizedQuery ||
            name.includes(normalizedQuery) ||
            componentLabel(name).toLowerCase().includes(normalizedQuery)),
      ),
    }))
    .filter((group) => group.names.length > 0);

  const categorized = new Set<string>(categoryDefinitions.flatMap((group) => [...group.names]));
  const other = Object.keys(demos)
    .filter(
      (name) =>
        !categorized.has(name) &&
        (category === 'All' || category === 'More') &&
        (!normalizedQuery ||
          name.includes(normalizedQuery) ||
          componentLabel(name).toLowerCase().includes(normalizedQuery)),
    )
    .sort();

  return (
    <div className="not-prose docs-catalog">
      <div className="docs-catalog-search">
        <Search size={17} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a component…"
          aria-label="Filter components"
        />
        <kbd>⌘ K</kbd>
      </div>

      <div className="docs-category-chips" aria-label="Component categories">
        {['All', ...categoryDefinitions.map((group) => group.name), 'More'].map((name) => (
          <button type="button" key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>
            {name}
          </button>
        ))}
      </div>

      <div className="docs-catalog-groups">
        {categories.map((group) => (
          <section key={group.name}>
            <div className="docs-catalog-group-heading">
              <group.icon size={20} />
              <div>
                <h2>{group.name}</h2>
                <p>{group.description}</p>
              </div>
            </div>
            <div className="docs-component-links">
              {group.names.map((name) => (
                <Link key={name} to="/docs/$" params={{ _splat: `components/${name}` }}>
                  <span>{componentLabel(name)}</span>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </section>
        ))}
        {other.length > 0 ? (
          <section>
            <div className="docs-catalog-group-heading">
              <Blocks size={20} />
              <div>
                <h2>More components</h2>
                <p>Specialized building blocks and utilities.</p>
              </div>
            </div>
            <div className="docs-component-links">
              {other.map((name) => (
                <Link key={name} to="/docs/$" params={{ _splat: `components/${name}` }}>
                  <span>{componentLabel(name)}</span>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {categories.length === 0 && other.length === 0 ? (
        <p className="docs-empty-results">
          No components match “{query}”. Try the global search for guides and examples.
        </p>
      ) : null}
    </div>
  );
}
