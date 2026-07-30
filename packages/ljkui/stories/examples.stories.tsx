import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Theme, Typography } from 'ljkui';
import { examples as AccordionExamples } from '../examples/accordion.examples';
import { examples as AlertDialogExamples } from '../examples/alert-dialog.examples';
import { examples as AlertExamples } from '../examples/alert.examples';
import { examples as AspectRatioExamples } from '../examples/aspect-ratio.examples';
import { examples as AutocompleteExamples } from '../examples/autocomplete.examples';
import { examples as AvatarGroupExamples } from '../examples/avatar-group.examples';
import { examples as AvatarStackExamples } from '../examples/avatar-stack.examples';
import { examples as AvatarExamples } from '../examples/avatar.examples';
import { examples as BadgeExamples } from '../examples/badge.examples';
import { examples as BlockquoteExamples } from '../examples/blockquote.examples';
import { examples as BreadcrumbExamples } from '../examples/breadcrumb.examples';
import { examples as ButtonGroupExamples } from '../examples/button-group.examples';
import { examples as ButtonExamples } from '../examples/button.examples';
import { examples as CalendarExamples } from '../examples/calendar.examples';
import { examples as CardExamples } from '../examples/card.examples';
import { examples as CarouselExamples } from '../examples/carousel.examples';
import { examples as ChartExamples } from '../examples/chart.examples';
import { examples as CheckboxExamples } from '../examples/checkbox.examples';
import { examples as CircularProgressExamples } from '../examples/circular-progress.examples';
import { examples as CodeExamples } from '../examples/code.examples';
import { examples as CollapsibleExamples } from '../examples/collapsible.examples';
import { examples as ComboboxExamples } from '../examples/combobox.examples';
import { examples as CommandExamples } from '../examples/command.examples';
import { examples as ContextMenuExamples } from '../examples/context-menu.examples';
import { examples as CreditCardExamples } from '../examples/credit-card.examples';
import { examples as DataTableExamples } from '../examples/data-table.examples';
import { examples as DateFieldExamples } from '../examples/date-field.examples';
import { examples as DatePickerExamples } from '../examples/date-picker.examples';
import { examples as DateRangePickerExamples } from '../examples/date-range-picker.examples';
import { examples as DialogExamples } from '../examples/dialog.examples';
import { examples as DrawerExamples } from '../examples/drawer.examples';
import { examples as DropdownMenuExamples } from '../examples/dropdown-menu.examples';
import { examples as EmExamples } from '../examples/em.examples';
import { examples as EmptyExamples } from '../examples/empty.examples';
import { examples as FieldExamples } from '../examples/field.examples';
import { examples as FieldsetExamples } from '../examples/fieldset.examples';
import { examples as FilterChipExamples } from '../examples/filter-chip.examples';
import { examples as FormExamples } from '../examples/form.examples';
import { examples as GridExamples } from '../examples/grid.examples';
import { examples as HStackExamples } from '../examples/h-stack.examples';
import { examples as HeadingExamples } from '../examples/heading.examples';
import { examples as HoverCardExamples } from '../examples/hover-card.examples';
import { examples as IconButtonExamples } from '../examples/icon-button.examples';
import { examples as InputGroupExamples } from '../examples/input-group.examples';
import { examples as InputOtpExamples } from '../examples/input-otp.examples';
import { examples as InputExamples } from '../examples/input.examples';
import { examples as InsetExamples } from '../examples/inset.examples';
import { examples as ItemExamples } from '../examples/item.examples';
import { examples as KbdExamples } from '../examples/kbd.examples';
import { examples as LightboxExamples } from '../examples/lightbox.examples';
import { examples as LinkExamples } from '../examples/link.examples';
import { examples as MenubarExamples } from '../examples/menubar.examples';
import { examples as NavigationMenuExamples } from '../examples/navigation-menu.examples';
import { examples as NumberFieldExamples } from '../examples/number-field.examples';
import { examples as OscarExamples } from '../examples/oscar.examples';
import { examples as OverlayExamples } from '../examples/overlay.examples';
import { examples as PaginationExamples } from '../examples/pagination.examples';
import { examples as PopoverExamples } from '../examples/popover.examples';
import { examples as PortalExamples } from '../examples/portal.examples';
import { examples as ProgressExamples } from '../examples/progress.examples';
import { examples as QuoteExamples } from '../examples/quote.examples';
import { examples as RadioButtonGroupExamples } from '../examples/radio-button-group.examples';
import { examples as RadioGroupExamples } from '../examples/radio-group.examples';
import { examples as RangeCalendarExamples } from '../examples/range-calendar.examples';
import { examples as ResizableExamples } from '../examples/resizable.examples';
import { examples as ScrollAreaExamples } from '../examples/scroll-area.examples';
import { examples as SelectExamples } from '../examples/select.examples';
import { examples as SeparatorExamples } from '../examples/separator.examples';
import { examples as SheetExamples } from '../examples/sheet.examples';
import { examples as ShineExamples } from '../examples/shine.examples';
import { examples as SidebarExamples } from '../examples/sidebar.examples';
import { examples as SkeletonExamples } from '../examples/skeleton.examples';
import { examples as SliderExamples } from '../examples/slider.examples';
import { examples as SonnerExamples } from '../examples/sonner.examples';
import { examples as SpacerExamples } from '../examples/spacer.examples';
import { examples as SpinnerExamples } from '../examples/spinner.examples';
import { examples as StrongExamples } from '../examples/strong.examples';
import { examples as SwitchExamples } from '../examples/switch.examples';
import { examples as TableExamples } from '../examples/table.examples';
import { examples as TabsNavExamples } from '../examples/tabs-nav.examples';
import { examples as TabsExamples } from '../examples/tabs.examples';
import { examples as TextExamples } from '../examples/text.examples';
import { examples as TextareaExamples } from '../examples/textarea.examples';
import { examples as ToggleGroupNavExamples } from '../examples/toggle-group-nav.examples';
import { examples as ToggleGroupRadioGroupExamples } from '../examples/toggle-group-radio-group.examples';
import { examples as ToggleGroupExamples } from '../examples/toggle-group.examples';
import { examples as ToggleExamples } from '../examples/toggle.examples';
import { examples as TooltipExamples } from '../examples/tooltip.examples';
import { examples as VStackExamples } from '../examples/v-stack.examples';
import { examples as VisuallyHiddenExamples } from '../examples/visually-hidden.examples';
import { examples as WidgetStackExamples } from '../examples/widget-stack.examples';
import { examples as ZStackExamples } from '../examples/z-stack.examples';

type ExampleValue = React.ReactNode | (() => React.ReactNode);
type ExampleMap = Record<string, ExampleValue>;

const renderExample = (example: ExampleValue) => (typeof example === 'function' ? example() : example);

const groups: Array<{ title: string; examples: ExampleMap }> = [
  { title: 'Accordion', examples: AccordionExamples },
  { title: 'Alert Dialog', examples: AlertDialogExamples },
  { title: 'Alert', examples: AlertExamples },
  { title: 'Aspect Ratio', examples: AspectRatioExamples },
  { title: 'Autocomplete', examples: AutocompleteExamples },
  { title: 'Avatar Group', examples: AvatarGroupExamples },
  { title: 'Avatar Stack', examples: AvatarStackExamples },
  { title: 'Avatar', examples: AvatarExamples },
  { title: 'Badge', examples: BadgeExamples },
  { title: 'Blockquote', examples: BlockquoteExamples },
  { title: 'Breadcrumb', examples: BreadcrumbExamples },
  { title: 'Button Group', examples: ButtonGroupExamples },
  { title: 'Button', examples: ButtonExamples },
  { title: 'Calendar', examples: CalendarExamples },
  { title: 'Card', examples: CardExamples },
  { title: 'Carousel', examples: CarouselExamples },
  { title: 'Chart', examples: ChartExamples },
  { title: 'Checkbox', examples: CheckboxExamples },
  { title: 'Circular Progress', examples: CircularProgressExamples },
  { title: 'Code', examples: CodeExamples },
  { title: 'Collapsible', examples: CollapsibleExamples },
  { title: 'Combobox', examples: ComboboxExamples },
  { title: 'Command', examples: CommandExamples },
  { title: 'Context Menu', examples: ContextMenuExamples },
  { title: 'Credit Card', examples: CreditCardExamples },
  { title: 'Data Table', examples: DataTableExamples },
  { title: 'Date Field', examples: DateFieldExamples },
  { title: 'Date Picker', examples: DatePickerExamples },
  { title: 'Date Range Picker', examples: DateRangePickerExamples },
  { title: 'Dialog', examples: DialogExamples },
  { title: 'Drawer', examples: DrawerExamples },
  { title: 'Dropdown Menu', examples: DropdownMenuExamples },
  { title: 'Em', examples: EmExamples },
  { title: 'Empty', examples: EmptyExamples },
  { title: 'Field', examples: FieldExamples },
  { title: 'Fieldset', examples: FieldsetExamples },
  { title: 'Filter Chip', examples: FilterChipExamples },
  { title: 'Form', examples: FormExamples },
  { title: 'Grid', examples: GridExamples },
  { title: 'H Stack', examples: HStackExamples },
  { title: 'Heading', examples: HeadingExamples },
  { title: 'Hover Card', examples: HoverCardExamples },
  { title: 'Icon Button', examples: IconButtonExamples },
  { title: 'Input Group', examples: InputGroupExamples },
  { title: 'Input OTP', examples: InputOtpExamples },
  { title: 'Input', examples: InputExamples },
  { title: 'Inset', examples: InsetExamples },
  { title: 'Item', examples: ItemExamples },
  { title: 'Kbd', examples: KbdExamples },
  { title: 'Lightbox', examples: LightboxExamples },
  { title: 'Link', examples: LinkExamples },
  { title: 'Menubar', examples: MenubarExamples },
  { title: 'Navigation Menu', examples: NavigationMenuExamples },
  { title: 'Number Field', examples: NumberFieldExamples },
  { title: 'Oscar', examples: OscarExamples },
  { title: 'Overlay', examples: OverlayExamples },
  { title: 'Pagination', examples: PaginationExamples },
  { title: 'Popover', examples: PopoverExamples },
  { title: 'Portal', examples: PortalExamples },
  { title: 'Progress', examples: ProgressExamples },
  { title: 'Quote', examples: QuoteExamples },
  { title: 'Radio Button Group', examples: RadioButtonGroupExamples },
  { title: 'Radio Group', examples: RadioGroupExamples },
  { title: 'Range Calendar', examples: RangeCalendarExamples },
  { title: 'Resizable', examples: ResizableExamples },
  { title: 'Scroll Area', examples: ScrollAreaExamples },
  { title: 'Select', examples: SelectExamples },
  { title: 'Separator', examples: SeparatorExamples },
  { title: 'Sheet', examples: SheetExamples },
  { title: 'Shine', examples: ShineExamples },
  { title: 'Sidebar', examples: SidebarExamples },
  { title: 'Skeleton', examples: SkeletonExamples },
  { title: 'Slider', examples: SliderExamples },
  { title: 'Sonner', examples: SonnerExamples },
  { title: 'Spacer', examples: SpacerExamples },
  { title: 'Spinner', examples: SpinnerExamples },
  { title: 'Strong', examples: StrongExamples },
  { title: 'Switch', examples: SwitchExamples },
  { title: 'Table', examples: TableExamples },
  { title: 'Tabs Nav', examples: TabsNavExamples },
  { title: 'Tabs', examples: TabsExamples },
  { title: 'Text', examples: TextExamples },
  { title: 'Textarea', examples: TextareaExamples },
  { title: 'Toggle Group Nav', examples: ToggleGroupNavExamples },
  { title: 'Toggle Group Radio Group', examples: ToggleGroupRadioGroupExamples },
  { title: 'Toggle Group', examples: ToggleGroupExamples },
  { title: 'Toggle', examples: ToggleExamples },
  { title: 'Tooltip', examples: TooltipExamples },
  { title: 'V Stack', examples: VStackExamples },
  { title: 'Visually Hidden', examples: VisuallyHiddenExamples },
  { title: 'Widget Stack', examples: WidgetStackExamples },
  { title: 'Z Stack', examples: ZStackExamples },
];

const StoryFrame = ({ title, name, render }: { title: string; name: string; render: () => React.ReactNode }) => (
  <Theme accentColor="indigo" grayColor="slate" radius="medium" scaling="100%" hasBackground>
    <main className="ljkui-story-frame">
      <header className="ljkui-story-header">
        <Typography.Text size="2" color="gray">
          {title}
        </Typography.Text>
        <Typography.Heading as="h1" size="6">
          {name}
        </Typography.Heading>
      </header>
      <section className="ljkui-story-canvas">{render()}</section>
    </main>
  </Theme>
);

const meta = {
  title: 'Examples/All ljkui Components',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Gallery: Story = {
  name: 'Gallery',
  render: () => (
    <Theme accentColor="indigo" grayColor="slate" radius="medium" scaling="100%" hasBackground>
      <main className="ljkui-gallery">
        <header className="ljkui-gallery-hero">
          <Typography.Text size="2" color="gray">
            ljkui Storybook
          </Typography.Text>
          <Typography.Heading as="h1" size="8">
            Component examples
          </Typography.Heading>
          <Typography.Text size="4" color="gray">
            A complete, generated gallery of the forked Whop examples updated to render through the ljkui package,
            naming, theme tokens, and current component exports.
          </Typography.Text>
        </header>
        <div className="ljkui-gallery-grid">
          {groups.map((group) => (
            <section className="ljkui-gallery-group" key={group.title}>
              <Typography.Heading as="h2" size="5">
                {group.title}
              </Typography.Heading>
              <div className="ljkui-gallery-examples">
                {Object.entries(group.examples).map(([name, render]) => (
                  <article className="ljkui-gallery-card" key={name}>
                    <Typography.Text size="2" weight="medium">
                      {name}
                    </Typography.Text>
                    <div className="ljkui-gallery-card-canvas">{renderExample(render)}</div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </Theme>
  ),
};

export const AccordionSingle: Story = {
  name: 'Accordion / Single',
  render: () => (
    <StoryFrame title="Accordion" name={'Single'} render={() => renderExample(AccordionExamples['Single'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion example from packages/ljkui/examples/accordion.examples.tsx.',
      },
    },
  },
};

export const AccordionMultiple: Story = {
  name: 'Accordion / Multiple',
  render: () => (
    <StoryFrame title="Accordion" name={'Multiple'} render={() => renderExample(AccordionExamples['Multiple'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion example from packages/ljkui/examples/accordion.examples.tsx.',
      },
    },
  },
};

export const AccordionHiddenUntilFound: Story = {
  name: 'Accordion / Hidden Until Found',
  render: () => (
    <StoryFrame
      title="Accordion"
      name={'Hidden Until Found'}
      render={() => renderExample(AccordionExamples['Hidden Until Found'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion example from packages/ljkui/examples/accordion.examples.tsx.',
      },
    },
  },
};

export const AlertDialogDefault: Story = {
  name: 'Alert Dialog / Default',
  render: () => (
    <StoryFrame title="Alert Dialog" name={'Default'} render={() => renderExample(AlertDialogExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDialogSizes: Story = {
  name: 'Alert Dialog / Sizes',
  render: () => (
    <StoryFrame title="Alert Dialog" name={'Sizes'} render={() => renderExample(AlertDialogExamples['Sizes'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDialogWithInsetContent: Story = {
  name: 'Alert Dialog / With inset content',
  render: () => (
    <StoryFrame
      title="Alert Dialog"
      name={'With inset content'}
      render={() => renderExample(AlertDialogExamples['With inset content'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDialogUsingCloseComponent: Story = {
  name: 'Alert Dialog / Using Close Component',
  render: () => (
    <StoryFrame
      title="Alert Dialog"
      name={'Using Close Component'}
      render={() => renderExample(AlertDialogExamples['Using Close Component'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDialogDetachedTriggers: Story = {
  name: 'Alert Dialog / Detached Triggers',
  render: () => (
    <StoryFrame
      title="Alert Dialog"
      name={'Detached Triggers'}
      render={() => renderExample(AlertDialogExamples['Detached Triggers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDialogMultipleTriggersWithPayload: Story = {
  name: 'Alert Dialog / Multiple Triggers with Payload',
  render: () => (
    <StoryFrame
      title="Alert Dialog"
      name={'Multiple Triggers with Payload'}
      render={() => renderExample(AlertDialogExamples['Multiple Triggers with Payload'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDialogControlledMode: Story = {
  name: 'Alert Dialog / Controlled Mode',
  render: () => (
    <StoryFrame
      title="Alert Dialog"
      name={'Controlled Mode'}
      render={() => renderExample(AlertDialogExamples['Controlled Mode'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDialogActionsRef: Story = {
  name: 'Alert Dialog / Actions Ref',
  render: () => (
    <StoryFrame
      title="Alert Dialog"
      name={'Actions Ref'}
      render={() => renderExample(AlertDialogExamples['Actions Ref'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDialogInitialFocus: Story = {
  name: 'Alert Dialog / Initial Focus',
  render: () => (
    <StoryFrame
      title="Alert Dialog"
      name={'Initial Focus'}
      render={() => renderExample(AlertDialogExamples['Initial Focus'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDialogFinalFocus: Story = {
  name: 'Alert Dialog / Final Focus',
  render: () => (
    <StoryFrame
      title="Alert Dialog"
      name={'Final Focus'}
      render={() => renderExample(AlertDialogExamples['Final Focus'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDialogOpenChangeComplete: Story = {
  name: 'Alert Dialog / Open Change Complete',
  render: () => (
    <StoryFrame
      title="Alert Dialog"
      name={'Open Change Complete'}
      render={() => renderExample(AlertDialogExamples['Open Change Complete'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert Dialog example from packages/ljkui/examples/alert-dialog.examples.tsx.',
      },
    },
  },
};

export const AlertDefault: Story = {
  name: 'Alert / Default',
  render: () => <StoryFrame title="Alert" name={'Default'} render={() => renderExample(AlertExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Alert example from packages/ljkui/examples/alert.examples.tsx.',
      },
    },
  },
};

export const AlertColor: Story = {
  name: 'Alert / Color',
  render: () => <StoryFrame title="Alert" name={'Color'} render={() => renderExample(AlertExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Alert example from packages/ljkui/examples/alert.examples.tsx.',
      },
    },
  },
};

export const AlertSemanticColor: Story = {
  name: 'Alert / Semantic color',
  render: () => (
    <StoryFrame title="Alert" name={'Semantic color'} render={() => renderExample(AlertExamples['Semantic color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert example from packages/ljkui/examples/alert.examples.tsx.',
      },
    },
  },
};

export const AlertActionRenderProp: Story = {
  name: 'Alert / Action render prop',
  render: () => (
    <StoryFrame
      title="Alert"
      name={'Action render prop'}
      render={() => renderExample(AlertExamples['Action render prop'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert example from packages/ljkui/examples/alert.examples.tsx.',
      },
    },
  },
};

export const AlertActionLoading: Story = {
  name: 'Alert / Action loading',
  render: () => (
    <StoryFrame title="Alert" name={'Action loading'} render={() => renderExample(AlertExamples['Action loading'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert example from packages/ljkui/examples/alert.examples.tsx.',
      },
    },
  },
};

export const AlertActionDisabled: Story = {
  name: 'Alert / Action disabled',
  render: () => (
    <StoryFrame title="Alert" name={'Action disabled'} render={() => renderExample(AlertExamples['Action disabled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert example from packages/ljkui/examples/alert.examples.tsx.',
      },
    },
  },
};

export const AlertAsAlert: Story = {
  name: 'Alert / As Alert',
  render: () => <StoryFrame title="Alert" name={'As Alert'} render={() => renderExample(AlertExamples['As Alert'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Alert example from packages/ljkui/examples/alert.examples.tsx.',
      },
    },
  },
};

export const AspectRatioDefault: Story = {
  name: 'Aspect Ratio / Default',
  render: () => (
    <StoryFrame title="Aspect Ratio" name={'Default'} render={() => renderExample(AspectRatioExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Aspect Ratio example from packages/ljkui/examples/aspect-ratio.examples.tsx.',
      },
    },
  },
};

export const AspectRatioSquare: Story = {
  name: 'Aspect Ratio / Square',
  render: () => (
    <StoryFrame title="Aspect Ratio" name={'Square'} render={() => renderExample(AspectRatioExamples['Square'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Aspect Ratio example from packages/ljkui/examples/aspect-ratio.examples.tsx.',
      },
    },
  },
};

export const AspectRatioPortrait: Story = {
  name: 'Aspect Ratio / Portrait',
  render: () => (
    <StoryFrame title="Aspect Ratio" name={'Portrait'} render={() => renderExample(AspectRatioExamples['Portrait'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Aspect Ratio example from packages/ljkui/examples/aspect-ratio.examples.tsx.',
      },
    },
  },
};

export const AutocompleteId: Story = {
  name: 'Autocomplete / id',
  render: () => (
    <StoryFrame title="Autocomplete" name={'id'} render={() => renderExample(AutocompleteExamples['id'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteValue: Story = {
  name: 'Autocomplete / value',
  render: () => (
    <StoryFrame title="Autocomplete" name={'value'} render={() => renderExample(AutocompleteExamples['value'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteLabel: Story = {
  name: 'Autocomplete / label',
  render: () => (
    <StoryFrame title="Autocomplete" name={'label'} render={() => renderExample(AutocompleteExamples['label'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteItems: Story = {
  name: 'Autocomplete / items',
  render: () => (
    <StoryFrame title="Autocomplete" name={'items'} render={() => renderExample(AutocompleteExamples['items'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteEmoji: Story = {
  name: 'Autocomplete / emoji',
  render: () => (
    <StoryFrame title="Autocomplete" name={'emoji'} render={() => renderExample(AutocompleteExamples['emoji'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteValue2: Story = {
  name: 'Autocomplete / value',
  render: () => (
    <StoryFrame title="Autocomplete" name={'value'} render={() => renderExample(AutocompleteExamples['value'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteName: Story = {
  name: 'Autocomplete / name',
  render: () => (
    <StoryFrame title="Autocomplete" name={'name'} render={() => renderExample(AutocompleteExamples['name'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteValue3: Story = {
  name: 'Autocomplete / value',
  render: () => (
    <StoryFrame title="Autocomplete" name={'value'} render={() => renderExample(AutocompleteExamples['value'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteLabel2: Story = {
  name: 'Autocomplete / label',
  render: () => (
    <StoryFrame title="Autocomplete" name={'label'} render={() => renderExample(AutocompleteExamples['label'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteItems2: Story = {
  name: 'Autocomplete / items',
  render: () => (
    <StoryFrame title="Autocomplete" name={'items'} render={() => renderExample(AutocompleteExamples['items'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteValue4: Story = {
  name: 'Autocomplete / value',
  render: () => (
    <StoryFrame title="Autocomplete" name={'value'} render={() => renderExample(AutocompleteExamples['value'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteLabel3: Story = {
  name: 'Autocomplete / label',
  render: () => (
    <StoryFrame title="Autocomplete" name={'label'} render={() => renderExample(AutocompleteExamples['label'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteItems3: Story = {
  name: 'Autocomplete / items',
  render: () => (
    <StoryFrame title="Autocomplete" name={'items'} render={() => renderExample(AutocompleteExamples['items'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteFor: Story = {
  name: 'Autocomplete / for',
  render: () => (
    <StoryFrame title="Autocomplete" name={'for'} render={() => renderExample(AutocompleteExamples['for'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteId2: Story = {
  name: 'Autocomplete / id',
  render: () => (
    <StoryFrame title="Autocomplete" name={'id'} render={() => renderExample(AutocompleteExamples['id'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteLabel4: Story = {
  name: 'Autocomplete / label',
  render: () => (
    <StoryFrame title="Autocomplete" name={'label'} render={() => renderExample(AutocompleteExamples['label'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteIcon: Story = {
  name: 'Autocomplete / icon',
  render: () => (
    <StoryFrame title="Autocomplete" name={'icon'} render={() => renderExample(AutocompleteExamples['icon'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteAction: Story = {
  name: 'Autocomplete / action',
  render: () => (
    <StoryFrame title="Autocomplete" name={'action'} render={() => renderExample(AutocompleteExamples['action'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteLabel5: Story = {
  name: 'Autocomplete / label',
  render: () => (
    <StoryFrame title="Autocomplete" name={'label'} render={() => renderExample(AutocompleteExamples['label'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteItems4: Story = {
  name: 'Autocomplete / items',
  render: () => (
    <StoryFrame title="Autocomplete" name={'items'} render={() => renderExample(AutocompleteExamples['items'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteId3: Story = {
  name: 'Autocomplete / id',
  render: () => (
    <StoryFrame title="Autocomplete" name={'id'} render={() => renderExample(AutocompleteExamples['id'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteTitle: Story = {
  name: 'Autocomplete / title',
  render: () => (
    <StoryFrame title="Autocomplete" name={'title'} render={() => renderExample(AutocompleteExamples['title'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteYear: Story = {
  name: 'Autocomplete / year',
  render: () => (
    <StoryFrame title="Autocomplete" name={'year'} render={() => renderExample(AutocompleteExamples['year'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteIf: Story = {
  name: 'Autocomplete / if',
  render: () => (
    <StoryFrame title="Autocomplete" name={'if'} render={() => renderExample(AutocompleteExamples['if'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteIf2: Story = {
  name: 'Autocomplete / if',
  render: () => (
    <StoryFrame title="Autocomplete" name={'if'} render={() => renderExample(AutocompleteExamples['if'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteIf3: Story = {
  name: 'Autocomplete / if',
  render: () => (
    <StoryFrame title="Autocomplete" name={'if'} render={() => renderExample(AutocompleteExamples['if'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteFor2: Story = {
  name: 'Autocomplete / for',
  render: () => (
    <StoryFrame title="Autocomplete" name={'for'} render={() => renderExample(AutocompleteExamples['for'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteIf4: Story = {
  name: 'Autocomplete / if',
  render: () => (
    <StoryFrame title="Autocomplete" name={'if'} render={() => renderExample(AutocompleteExamples['if'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteDefault: Story = {
  name: 'Autocomplete / Default',
  render: () => (
    <StoryFrame title="Autocomplete" name={'Default'} render={() => renderExample(AutocompleteExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteSizes: Story = {
  name: 'Autocomplete / Sizes',
  render: () => (
    <StoryFrame title="Autocomplete" name={'Sizes'} render={() => renderExample(AutocompleteExamples['Sizes'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteWithSlot: Story = {
  name: 'Autocomplete / With Slot',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'With Slot'}
      render={() => renderExample(AutocompleteExamples['With Slot'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteGrouped: Story = {
  name: 'Autocomplete / Grouped',
  render: () => (
    <StoryFrame title="Autocomplete" name={'Grouped'} render={() => renderExample(AutocompleteExamples['Grouped'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteEmptyState: Story = {
  name: 'Autocomplete / Empty State',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Empty State'}
      render={() => renderExample(AutocompleteExamples['Empty State'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteWithClearButton: Story = {
  name: 'Autocomplete / With Clear Button',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'With Clear Button'}
      render={() => renderExample(AutocompleteExamples['With Clear Button'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteControlled: Story = {
  name: 'Autocomplete / Controlled',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Controlled'}
      render={() => renderExample(AutocompleteExamples['Controlled'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteColoredItems: Story = {
  name: 'Autocomplete / Colored Items',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Colored Items'}
      render={() => renderExample(AutocompleteExamples['Colored Items'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteManyItems: Story = {
  name: 'Autocomplete / Many Items',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Many Items'}
      render={() => renderExample(AutocompleteExamples['Many Items'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteGridLayout: Story = {
  name: 'Autocomplete / Grid Layout',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Grid Layout'}
      render={() => renderExample(AutocompleteExamples['Grid Layout'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteCommandPicker: Story = {
  name: 'Autocomplete / Command Picker',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Command Picker'}
      render={() => renderExample(AutocompleteExamples['Command Picker'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteAsyncSearch: Story = {
  name: 'Autocomplete / Async Search',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Async Search'}
      render={() => renderExample(AutocompleteExamples['Async Search'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteInlineAutocomplete: Story = {
  name: 'Autocomplete / Inline Autocomplete',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Inline Autocomplete'}
      render={() => renderExample(AutocompleteExamples['Inline Autocomplete'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteFuzzyMatching: Story = {
  name: 'Autocomplete / Fuzzy Matching',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Fuzzy Matching'}
      render={() => renderExample(AutocompleteExamples['Fuzzy Matching'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteLimitResults: Story = {
  name: 'Autocomplete / Limit Results',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Limit Results'}
      render={() => renderExample(AutocompleteExamples['Limit Results'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteHighlight: Story = {
  name: 'Autocomplete / Highlight',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Highlight'}
      render={() => renderExample(AutocompleteExamples['Highlight'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteOnItemHighlighted: Story = {
  name: 'Autocomplete / onItemHighlighted',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'onItemHighlighted'}
      render={() => renderExample(AutocompleteExamples['onItemHighlighted'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteCustomFilter: Story = {
  name: 'Autocomplete / Custom Filter',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Custom Filter'}
      render={() => renderExample(AutocompleteExamples['Custom Filter'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteModal: Story = {
  name: 'Autocomplete / Modal',
  render: () => (
    <StoryFrame title="Autocomplete" name={'Modal'} render={() => renderExample(AutocompleteExamples['Modal'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteOpenOnInputClick: Story = {
  name: 'Autocomplete / openOnInputClick',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'openOnInputClick'}
      render={() => renderExample(AutocompleteExamples['openOnInputClick'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteSubmitOnItemClick: Story = {
  name: 'Autocomplete / submitOnItemClick',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'submitOnItemClick'}
      render={() => renderExample(AutocompleteExamples['submitOnItemClick'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteDisabled: Story = {
  name: 'Autocomplete / disabled',
  render: () => (
    <StoryFrame title="Autocomplete" name={'disabled'} render={() => renderExample(AutocompleteExamples['disabled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteInputRef: Story = {
  name: 'Autocomplete / inputRef',
  render: () => (
    <StoryFrame title="Autocomplete" name={'inputRef'} render={() => renderExample(AutocompleteExamples['inputRef'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteActionsRef: Story = {
  name: 'Autocomplete / actionsRef',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'actionsRef'}
      render={() => renderExample(AutocompleteExamples['actionsRef'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteLoopFocus: Story = {
  name: 'Autocomplete / Loop Focus',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Loop Focus'}
      render={() => renderExample(AutocompleteExamples['Loop Focus'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AutocompleteFormWithCustomID: Story = {
  name: 'Autocomplete / Form with Custom ID',
  render: () => (
    <StoryFrame
      title="Autocomplete"
      name={'Form with Custom ID'}
      render={() => renderExample(AutocompleteExamples['Form with Custom ID'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete example from packages/ljkui/examples/autocomplete.examples.tsx.',
      },
    },
  },
};

export const AvatarGroupName: Story = {
  name: 'Avatar Group / name',
  render: () => (
    <StoryFrame title="Avatar Group" name={'name'} render={() => renderExample(AvatarGroupExamples['name'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Group example from packages/ljkui/examples/avatar-group.examples.tsx.',
      },
    },
  },
};

export const AvatarGroupColor: Story = {
  name: 'Avatar Group / color',
  render: () => (
    <StoryFrame title="Avatar Group" name={'color'} render={() => renderExample(AvatarGroupExamples['color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Group example from packages/ljkui/examples/avatar-group.examples.tsx.',
      },
    },
  },
};

export const AvatarGroupSrc: Story = {
  name: 'Avatar Group / src',
  render: () => (
    <StoryFrame title="Avatar Group" name={'src'} render={() => renderExample(AvatarGroupExamples['src'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Group example from packages/ljkui/examples/avatar-group.examples.tsx.',
      },
    },
  },
};

export const AvatarGroupDefault: Story = {
  name: 'Avatar Group / Default',
  render: () => (
    <StoryFrame title="Avatar Group" name={'Default'} render={() => renderExample(AvatarGroupExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Group example from packages/ljkui/examples/avatar-group.examples.tsx.',
      },
    },
  },
};

export const AvatarGroupSize: Story = {
  name: 'Avatar Group / Size',
  render: () => (
    <StoryFrame title="Avatar Group" name={'Size'} render={() => renderExample(AvatarGroupExamples['Size'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Group example from packages/ljkui/examples/avatar-group.examples.tsx.',
      },
    },
  },
};

export const AvatarGroupColor2: Story = {
  name: 'Avatar Group / Color',
  render: () => (
    <StoryFrame title="Avatar Group" name={'Color'} render={() => renderExample(AvatarGroupExamples['Color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Group example from packages/ljkui/examples/avatar-group.examples.tsx.',
      },
    },
  },
};

export const AvatarStackName: Story = {
  name: 'Avatar Stack / name',
  render: () => (
    <StoryFrame title="Avatar Stack" name={'name'} render={() => renderExample(AvatarStackExamples['name'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Stack example from packages/ljkui/examples/avatar-stack.examples.tsx.',
      },
    },
  },
};

export const AvatarStackColor: Story = {
  name: 'Avatar Stack / color',
  render: () => (
    <StoryFrame title="Avatar Stack" name={'color'} render={() => renderExample(AvatarStackExamples['color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Stack example from packages/ljkui/examples/avatar-stack.examples.tsx.',
      },
    },
  },
};

export const AvatarStackSrc: Story = {
  name: 'Avatar Stack / src',
  render: () => (
    <StoryFrame title="Avatar Stack" name={'src'} render={() => renderExample(AvatarStackExamples['src'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Stack example from packages/ljkui/examples/avatar-stack.examples.tsx.',
      },
    },
  },
};

export const AvatarStackDefault: Story = {
  name: 'Avatar Stack / Default',
  render: () => (
    <StoryFrame title="Avatar Stack" name={'Default'} render={() => renderExample(AvatarStackExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Stack example from packages/ljkui/examples/avatar-stack.examples.tsx.',
      },
    },
  },
};

export const AvatarStackSize: Story = {
  name: 'Avatar Stack / Size',
  render: () => (
    <StoryFrame title="Avatar Stack" name={'Size'} render={() => renderExample(AvatarStackExamples['Size'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar Stack example from packages/ljkui/examples/avatar-stack.examples.tsx.',
      },
    },
  },
};

export const AvatarShape: Story = {
  name: 'Avatar / Shape',
  render: () => <StoryFrame title="Avatar" name={'Shape'} render={() => renderExample(AvatarExamples['Shape'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Avatar example from packages/ljkui/examples/avatar.examples.tsx.',
      },
    },
  },
};

export const AvatarSize: Story = {
  name: 'Avatar / Size',
  render: () => <StoryFrame title="Avatar" name={'Size'} render={() => renderExample(AvatarExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Avatar example from packages/ljkui/examples/avatar.examples.tsx.',
      },
    },
  },
};

export const AvatarColor: Story = {
  name: 'Avatar / Color',
  render: () => <StoryFrame title="Avatar" name={'Color'} render={() => renderExample(AvatarExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Avatar example from packages/ljkui/examples/avatar.examples.tsx.',
      },
    },
  },
};

export const AvatarHighContrast: Story = {
  name: 'Avatar / HighContrast',
  render: () => (
    <StoryFrame title="Avatar" name={'HighContrast'} render={() => renderExample(AvatarExamples['HighContrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar example from packages/ljkui/examples/avatar.examples.tsx.',
      },
    },
  },
};

export const AvatarFallback: Story = {
  name: 'Avatar / Fallback',
  render: () => (
    <StoryFrame title="Avatar" name={'Fallback'} render={() => renderExample(AvatarExamples['Fallback'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar example from packages/ljkui/examples/avatar.examples.tsx.',
      },
    },
  },
};

export const BadgeSize: Story = {
  name: 'Badge / Size',
  render: () => <StoryFrame title="Badge" name={'Size'} render={() => renderExample(BadgeExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Badge example from packages/ljkui/examples/badge.examples.tsx.',
      },
    },
  },
};

export const BadgeVariant: Story = {
  name: 'Badge / Variant',
  render: () => <StoryFrame title="Badge" name={'Variant'} render={() => renderExample(BadgeExamples['Variant'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Badge example from packages/ljkui/examples/badge.examples.tsx.',
      },
    },
  },
};

export const BadgeColor: Story = {
  name: 'Badge / Color',
  render: () => <StoryFrame title="Badge" name={'Color'} render={() => renderExample(BadgeExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Badge example from packages/ljkui/examples/badge.examples.tsx.',
      },
    },
  },
};

export const BadgeSemanticColor: Story = {
  name: 'Badge / Semantic color',
  render: () => (
    <StoryFrame title="Badge" name={'Semantic color'} render={() => renderExample(BadgeExamples['Semantic color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge example from packages/ljkui/examples/badge.examples.tsx.',
      },
    },
  },
};

export const BadgeHighContrast: Story = {
  name: 'Badge / High Contrast',
  render: () => (
    <StoryFrame title="Badge" name={'High Contrast'} render={() => renderExample(BadgeExamples['High Contrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge example from packages/ljkui/examples/badge.examples.tsx.',
      },
    },
  },
};

export const BlockquoteExample: Story = {
  name: 'Blockquote / Example',
  render: () => (
    <StoryFrame title="Blockquote" name={'Example'} render={() => renderExample(BlockquoteExamples['Example'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Blockquote example from packages/ljkui/examples/blockquote.examples.tsx.',
      },
    },
  },
};

export const BreadcrumbWithLinks: Story = {
  name: 'Breadcrumb / With links',
  render: () => (
    <StoryFrame title="Breadcrumb" name={'With links'} render={() => renderExample(BreadcrumbExamples['With links'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb example from packages/ljkui/examples/breadcrumb.examples.tsx.',
      },
    },
  },
};

export const BreadcrumbWithOnClick: Story = {
  name: 'Breadcrumb / With onClick',
  render: () => (
    <StoryFrame
      title="Breadcrumb"
      name={'With onClick'}
      render={() => renderExample(BreadcrumbExamples['With onClick'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb example from packages/ljkui/examples/breadcrumb.examples.tsx.',
      },
    },
  },
};

export const BreadcrumbTruncated: Story = {
  name: 'Breadcrumb / Truncated',
  render: () => (
    <StoryFrame title="Breadcrumb" name={'Truncated'} render={() => renderExample(BreadcrumbExamples['Truncated'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb example from packages/ljkui/examples/breadcrumb.examples.tsx.',
      },
    },
  },
};

export const ButtonGroupDefault: Story = {
  name: 'Button Group / Default',
  render: () => (
    <StoryFrame title="Button Group" name={'Default'} render={() => renderExample(ButtonGroupExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button Group example from packages/ljkui/examples/button-group.examples.tsx.',
      },
    },
  },
};

export const ButtonGroupWithTextSegment: Story = {
  name: 'Button Group / With text segment',
  render: () => (
    <StoryFrame
      title="Button Group"
      name={'With text segment'}
      render={() => renderExample(ButtonGroupExamples['With text segment'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button Group example from packages/ljkui/examples/button-group.examples.tsx.',
      },
    },
  },
};

export const ButtonGroupWithSeparator: Story = {
  name: 'Button Group / With separator',
  render: () => (
    <StoryFrame
      title="Button Group"
      name={'With separator'}
      render={() => renderExample(ButtonGroupExamples['With separator'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button Group example from packages/ljkui/examples/button-group.examples.tsx.',
      },
    },
  },
};

export const ButtonGroupVertical: Story = {
  name: 'Button Group / Vertical',
  render: () => (
    <StoryFrame title="Button Group" name={'Vertical'} render={() => renderExample(ButtonGroupExamples['Vertical'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button Group example from packages/ljkui/examples/button-group.examples.tsx.',
      },
    },
  },
};

export const ButtonGroupSizes: Story = {
  name: 'Button Group / Sizes',
  render: () => (
    <StoryFrame title="Button Group" name={'Sizes'} render={() => renderExample(ButtonGroupExamples['Sizes'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button Group example from packages/ljkui/examples/button-group.examples.tsx.',
      },
    },
  },
};

export const ButtonSize: Story = {
  name: 'Button / Size',
  render: () => <StoryFrame title="Button" name={'Size'} render={() => renderExample(ButtonExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Button example from packages/ljkui/examples/button.examples.tsx.',
      },
    },
  },
};

export const ButtonVariant: Story = {
  name: 'Button / Variant',
  render: () => <StoryFrame title="Button" name={'Variant'} render={() => renderExample(ButtonExamples['Variant'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Button example from packages/ljkui/examples/button.examples.tsx.',
      },
    },
  },
};

export const ButtonColor: Story = {
  name: 'Button / Color',
  render: () => <StoryFrame title="Button" name={'Color'} render={() => renderExample(ButtonExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Button example from packages/ljkui/examples/button.examples.tsx.',
      },
    },
  },
};

export const ButtonSemanticColor: Story = {
  name: 'Button / Semantic color',
  render: () => (
    <StoryFrame title="Button" name={'Semantic color'} render={() => renderExample(ButtonExamples['Semantic color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button example from packages/ljkui/examples/button.examples.tsx.',
      },
    },
  },
};

export const ButtonHighContrast: Story = {
  name: 'Button / High Contrast',
  render: () => (
    <StoryFrame title="Button" name={'High Contrast'} render={() => renderExample(ButtonExamples['High Contrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button example from packages/ljkui/examples/button.examples.tsx.',
      },
    },
  },
};

export const ButtonWithIcons: Story = {
  name: 'Button / With Icons',
  render: () => (
    <StoryFrame title="Button" name={'With Icons'} render={() => renderExample(ButtonExamples['With Icons'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button example from packages/ljkui/examples/button.examples.tsx.',
      },
    },
  },
};

export const ButtonLoading: Story = {
  name: 'Button / Loading',
  render: () => <StoryFrame title="Button" name={'Loading'} render={() => renderExample(ButtonExamples['Loading'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Button example from packages/ljkui/examples/button.examples.tsx.',
      },
    },
  },
};

export const ButtonRenderAsDifferentElement: Story = {
  name: 'Button / Render as Different Element',
  render: () => (
    <StoryFrame
      title="Button"
      name={'Render as Different Element'}
      render={() => renderExample(ButtonExamples['Render as Different Element'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button example from packages/ljkui/examples/button.examples.tsx.',
      },
    },
  },
};

export const CalendarDefault: Story = {
  name: 'Calendar / Default',
  render: () => (
    <StoryFrame title="Calendar" name={'Default'} render={() => renderExample(CalendarExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Calendar example from packages/ljkui/examples/calendar.examples.tsx.',
      },
    },
  },
};

export const CalendarDisabled: Story = {
  name: 'Calendar / Disabled',
  render: () => (
    <StoryFrame title="Calendar" name={'Disabled'} render={() => renderExample(CalendarExamples['Disabled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Calendar example from packages/ljkui/examples/calendar.examples.tsx.',
      },
    },
  },
};

export const CalendarUnavailableDates: Story = {
  name: 'Calendar / Unavailable Dates',
  render: () => (
    <StoryFrame
      title="Calendar"
      name={'Unavailable Dates'}
      render={() => renderExample(CalendarExamples['Unavailable Dates'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Calendar example from packages/ljkui/examples/calendar.examples.tsx.',
      },
    },
  },
};

export const CardSize: Story = {
  name: 'Card / Size',
  render: () => <StoryFrame title="Card" name={'Size'} render={() => renderExample(CardExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Card example from packages/ljkui/examples/card.examples.tsx.',
      },
    },
  },
};

export const CardVariant: Story = {
  name: 'Card / Variant',
  render: () => <StoryFrame title="Card" name={'Variant'} render={() => renderExample(CardExamples['Variant'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Card example from packages/ljkui/examples/card.examples.tsx.',
      },
    },
  },
};

export const CardInsetContent: Story = {
  name: 'Card / Inset Content',
  render: () => (
    <StoryFrame title="Card" name={'Inset Content'} render={() => renderExample(CardExamples['Inset Content'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card example from packages/ljkui/examples/card.examples.tsx.',
      },
    },
  },
};

export const CardAsAnotherElement: Story = {
  name: 'Card / As another element',
  render: () => (
    <StoryFrame
      title="Card"
      name={'As another element'}
      render={() => renderExample(CardExamples['As another element'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card example from packages/ljkui/examples/card.examples.tsx.',
      },
    },
  },
};

export const CarouselReturn: Story = {
  name: 'Carousel / return',
  render: () => (
    <StoryFrame title="Carousel" name={'return'} render={() => renderExample(CarouselExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselReturn2: Story = {
  name: 'Carousel / return',
  render: () => (
    <StoryFrame title="Carousel" name={'return'} render={() => renderExample(CarouselExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselReturn3: Story = {
  name: 'Carousel / return',
  render: () => (
    <StoryFrame title="Carousel" name={'return'} render={() => renderExample(CarouselExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselReturn4: Story = {
  name: 'Carousel / return',
  render: () => (
    <StoryFrame title="Carousel" name={'return'} render={() => renderExample(CarouselExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselReturn5: Story = {
  name: 'Carousel / return',
  render: () => (
    <StoryFrame title="Carousel" name={'return'} render={() => renderExample(CarouselExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselReturn6: Story = {
  name: 'Carousel / return',
  render: () => (
    <StoryFrame title="Carousel" name={'return'} render={() => renderExample(CarouselExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselReturn7: Story = {
  name: 'Carousel / return',
  render: () => (
    <StoryFrame title="Carousel" name={'return'} render={() => renderExample(CarouselExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselDefault: Story = {
  name: 'Carousel / Default',
  render: () => (
    <StoryFrame title="Carousel" name={'Default'} render={() => renderExample(CarouselExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselDynamicItems: Story = {
  name: 'Carousel / DynamicItems',
  render: () => (
    <StoryFrame title="Carousel" name={'DynamicItems'} render={() => renderExample(CarouselExamples['DynamicItems'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselWithoutScrollSnap: Story = {
  name: 'Carousel / WithoutScrollSnap',
  render: () => (
    <StoryFrame
      title="Carousel"
      name={'WithoutScrollSnap'}
      render={() => renderExample(CarouselExamples['WithoutScrollSnap'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselImperativeScrollTo: Story = {
  name: 'Carousel / ImperativeScrollTo',
  render: () => (
    <StoryFrame
      title="Carousel"
      name={'ImperativeScrollTo'}
      render={() => renderExample(CarouselExamples['ImperativeScrollTo'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselVertical: Story = {
  name: 'Carousel / Vertical',
  render: () => (
    <StoryFrame title="Carousel" name={'Vertical'} render={() => renderExample(CarouselExamples['Vertical'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselDefaultValue: Story = {
  name: 'Carousel / DefaultValue',
  render: () => (
    <StoryFrame title="Carousel" name={'DefaultValue'} render={() => renderExample(CarouselExamples['DefaultValue'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselStepByItem: Story = {
  name: 'Carousel / StepByItem',
  render: () => (
    <StoryFrame title="Carousel" name={'StepByItem'} render={() => renderExample(CarouselExamples['StepByItem'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselStepByItemNoSnap: Story = {
  name: 'Carousel / StepByItemNoSnap',
  render: () => (
    <StoryFrame
      title="Carousel"
      name={'StepByItemNoSnap'}
      render={() => renderExample(CarouselExamples['StepByItemNoSnap'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselProductGallery: Story = {
  name: 'Carousel / ProductGallery',
  render: () => (
    <StoryFrame
      title="Carousel"
      name={'ProductGallery'}
      render={() => renderExample(CarouselExamples['ProductGallery'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselLoop: Story = {
  name: 'Carousel / Loop',
  render: () => <StoryFrame title="Carousel" name={'Loop'} render={() => renderExample(CarouselExamples['Loop'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselLoopStepByItem: Story = {
  name: 'Carousel / LoopStepByItem',
  render: () => (
    <StoryFrame
      title="Carousel"
      name={'LoopStepByItem'}
      render={() => renderExample(CarouselExamples['LoopStepByItem'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselResizableViewport: Story = {
  name: 'Carousel / ResizableViewport',
  render: () => (
    <StoryFrame
      title="Carousel"
      name={'ResizableViewport'}
      render={() => renderExample(CarouselExamples['ResizableViewport'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselSnapToCenter: Story = {
  name: 'Carousel / SnapToCenter',
  render: () => (
    <StoryFrame title="Carousel" name={'SnapToCenter'} render={() => renderExample(CarouselExamples['SnapToCenter'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselControlledValue: Story = {
  name: 'Carousel / Controlled (value)',
  render: () => (
    <StoryFrame
      title="Carousel"
      name={'Controlled (value)'}
      render={() => renderExample(CarouselExamples['Controlled (value)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselScrollBehavior: Story = {
  name: 'Carousel / ScrollBehavior',
  render: () => (
    <StoryFrame
      title="Carousel"
      name={'ScrollBehavior'}
      render={() => renderExample(CarouselExamples['ScrollBehavior'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const CarouselTestimonials: Story = {
  name: 'Carousel / Testimonials',
  render: () => (
    <StoryFrame title="Carousel" name={'Testimonials'} render={() => renderExample(CarouselExamples['Testimonials'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel example from packages/ljkui/examples/carousel.examples.tsx.',
      },
    },
  },
};

export const ChartDefault: Story = {
  name: 'Chart / Default',
  render: () => <StoryFrame title="Chart" name={'Default'} render={() => renderExample(ChartExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Chart example from packages/ljkui/examples/chart.examples.tsx.',
      },
    },
  },
};

export const ChartCustomLabel: Story = {
  name: 'Chart / Custom label',
  render: () => (
    <StoryFrame title="Chart" name={'Custom label'} render={() => renderExample(ChartExamples['Custom label'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chart example from packages/ljkui/examples/chart.examples.tsx.',
      },
    },
  },
};

export const ChartAnimated: Story = {
  name: 'Chart / Animated',
  render: () => <StoryFrame title="Chart" name={'Animated'} render={() => renderExample(ChartExamples['Animated'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Chart example from packages/ljkui/examples/chart.examples.tsx.',
      },
    },
  },
};

export const CheckboxDefault: Story = {
  name: 'Checkbox / Default',
  render: () => (
    <StoryFrame title="Checkbox" name={'Default'} render={() => renderExample(CheckboxExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox example from packages/ljkui/examples/checkbox.examples.tsx.',
      },
    },
  },
};

export const CheckboxComposed: Story = {
  name: 'Checkbox / Composed',
  render: () => (
    <StoryFrame title="Checkbox" name={'Composed'} render={() => renderExample(CheckboxExamples['Composed'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox example from packages/ljkui/examples/checkbox.examples.tsx.',
      },
    },
  },
};

export const CheckboxSize: Story = {
  name: 'Checkbox / Size',
  render: () => <StoryFrame title="Checkbox" name={'Size'} render={() => renderExample(CheckboxExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Checkbox example from packages/ljkui/examples/checkbox.examples.tsx.',
      },
    },
  },
};

export const CheckboxColor: Story = {
  name: 'Checkbox / Color',
  render: () => <StoryFrame title="Checkbox" name={'Color'} render={() => renderExample(CheckboxExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Checkbox example from packages/ljkui/examples/checkbox.examples.tsx.',
      },
    },
  },
};

export const CheckboxHighContrast: Story = {
  name: 'Checkbox / High Contrast',
  render: () => (
    <StoryFrame
      title="Checkbox"
      name={'High Contrast'}
      render={() => renderExample(CheckboxExamples['High Contrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox example from packages/ljkui/examples/checkbox.examples.tsx.',
      },
    },
  },
};

export const CheckboxAlignmentWithText: Story = {
  name: 'Checkbox / Alignment with text',
  render: () => (
    <StoryFrame
      title="Checkbox"
      name={'Alignment with text'}
      render={() => renderExample(CheckboxExamples['Alignment with text'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox example from packages/ljkui/examples/checkbox.examples.tsx.',
      },
    },
  },
};

export const CheckboxFormWithValueUncheckedValue: Story = {
  name: 'Checkbox / Form with value & uncheckedValue',
  render: () => (
    <StoryFrame
      title="Checkbox"
      name={'Form with value & uncheckedValue'}
      render={() => renderExample(CheckboxExamples['Form with value & uncheckedValue'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox example from packages/ljkui/examples/checkbox.examples.tsx.',
      },
    },
  },
};

export const CheckboxReadOnly: Story = {
  name: 'Checkbox / Read Only',
  render: () => (
    <StoryFrame title="Checkbox" name={'Read Only'} render={() => renderExample(CheckboxExamples['Read Only'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox example from packages/ljkui/examples/checkbox.examples.tsx.',
      },
    },
  },
};

export const CheckboxInputRef: Story = {
  name: 'Checkbox / Input Ref',
  render: () => (
    <StoryFrame title="Checkbox" name={'Input Ref'} render={() => renderExample(CheckboxExamples['Input Ref'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox example from packages/ljkui/examples/checkbox.examples.tsx.',
      },
    },
  },
};

export const CircularProgressSize: Story = {
  name: 'Circular Progress / Size',
  render: () => (
    <StoryFrame
      title="Circular Progress"
      name={'Size'}
      render={() => renderExample(CircularProgressExamples['Size'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular Progress example from packages/ljkui/examples/circular-progress.examples.tsx.',
      },
    },
  },
};

export const CircularProgressColor: Story = {
  name: 'Circular Progress / Color',
  render: () => (
    <StoryFrame
      title="Circular Progress"
      name={'Color'}
      render={() => renderExample(CircularProgressExamples['Color'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular Progress example from packages/ljkui/examples/circular-progress.examples.tsx.',
      },
    },
  },
};

export const CircularProgressHighContrast: Story = {
  name: 'Circular Progress / High Contrast',
  render: () => (
    <StoryFrame
      title="Circular Progress"
      name={'High Contrast'}
      render={() => renderExample(CircularProgressExamples['High Contrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular Progress example from packages/ljkui/examples/circular-progress.examples.tsx.',
      },
    },
  },
};

export const CodeVariant: Story = {
  name: 'Code / Variant',
  render: () => <StoryFrame title="Code" name={'Variant'} render={() => renderExample(CodeExamples['Variant'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Code example from packages/ljkui/examples/code.examples.tsx.',
      },
    },
  },
};

export const CodeSize: Story = {
  name: 'Code / Size',
  render: () => <StoryFrame title="Code" name={'Size'} render={() => renderExample(CodeExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Code example from packages/ljkui/examples/code.examples.tsx.',
      },
    },
  },
};

export const CodeColor: Story = {
  name: 'Code / Color',
  render: () => <StoryFrame title="Code" name={'Color'} render={() => renderExample(CodeExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Code example from packages/ljkui/examples/code.examples.tsx.',
      },
    },
  },
};

export const CodeHighContrast: Story = {
  name: 'Code / High Contrast',
  render: () => (
    <StoryFrame title="Code" name={'High Contrast'} render={() => renderExample(CodeExamples['High Contrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Code example from packages/ljkui/examples/code.examples.tsx.',
      },
    },
  },
};

export const CollapsibleDefault: Story = {
  name: 'Collapsible / Default',
  render: () => (
    <StoryFrame title="Collapsible" name={'Default'} render={() => renderExample(CollapsibleExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collapsible example from packages/ljkui/examples/collapsible.examples.tsx.',
      },
    },
  },
};

export const CollapsibleOpenByDefault: Story = {
  name: 'Collapsible / Open by default',
  render: () => (
    <StoryFrame
      title="Collapsible"
      name={'Open by default'}
      render={() => renderExample(CollapsibleExamples['Open by default'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collapsible example from packages/ljkui/examples/collapsible.examples.tsx.',
      },
    },
  },
};

export const CollapsibleDisabled: Story = {
  name: 'Collapsible / Disabled',
  render: () => (
    <StoryFrame title="Collapsible" name={'Disabled'} render={() => renderExample(CollapsibleExamples['Disabled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collapsible example from packages/ljkui/examples/collapsible.examples.tsx.',
      },
    },
  },
};

export const ComboboxLabel: Story = {
  name: 'Combobox / label',
  render: () => <StoryFrame title="Combobox" name={'label'} render={() => renderExample(ComboboxExamples['label'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxItems: Story = {
  name: 'Combobox / items',
  render: () => <StoryFrame title="Combobox" name={'items'} render={() => renderExample(ComboboxExamples['items'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxLabel2: Story = {
  name: 'Combobox / label',
  render: () => <StoryFrame title="Combobox" name={'label'} render={() => renderExample(ComboboxExamples['label'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxValue: Story = {
  name: 'Combobox / value',
  render: () => <StoryFrame title="Combobox" name={'value'} render={() => renderExample(ComboboxExamples['value'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxReturn: Story = {
  name: 'Combobox / return',
  render: () => (
    <StoryFrame title="Combobox" name={'return'} render={() => renderExample(ComboboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxLogin: Story = {
  name: 'Combobox / login',
  render: () => <StoryFrame title="Combobox" name={'login'} render={() => renderExample(ComboboxExamples['login'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxName: Story = {
  name: 'Combobox / name',
  render: () => <StoryFrame title="Combobox" name={'name'} render={() => renderExample(ComboboxExamples['name'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxAvatar: Story = {
  name: 'Combobox / avatar',
  render: () => (
    <StoryFrame title="Combobox" name={'avatar'} render={() => renderExample(ComboboxExamples['avatar'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxId: Story = {
  name: 'Combobox / id',
  render: () => <StoryFrame title="Combobox" name={'id'} render={() => renderExample(ComboboxExamples['id'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxValue2: Story = {
  name: 'Combobox / value',
  render: () => <StoryFrame title="Combobox" name={'value'} render={() => renderExample(ComboboxExamples['value'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxDefault: Story = {
  name: 'Combobox / Default',
  render: () => (
    <StoryFrame title="Combobox" name={'Default'} render={() => renderExample(ComboboxExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxMultiple: Story = {
  name: 'Combobox / Multiple',
  render: () => (
    <StoryFrame title="Combobox" name={'Multiple'} render={() => renderExample(ComboboxExamples['Multiple'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxGrouped: Story = {
  name: 'Combobox / Grouped',
  render: () => (
    <StoryFrame title="Combobox" name={'Grouped'} render={() => renderExample(ComboboxExamples['Grouped'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxCustomItems: Story = {
  name: 'Combobox / CustomItems',
  render: () => (
    <StoryFrame title="Combobox" name={'CustomItems'} render={() => renderExample(ComboboxExamples['CustomItems'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxClearButton: Story = {
  name: 'Combobox / ClearButton',
  render: () => (
    <StoryFrame title="Combobox" name={'ClearButton'} render={() => renderExample(ComboboxExamples['ClearButton'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxInputInsidePopup: Story = {
  name: 'Combobox / InputInsidePopup',
  render: () => (
    <StoryFrame
      title="Combobox"
      name={'InputInsidePopup'}
      render={() => renderExample(ComboboxExamples['InputInsidePopup'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxDisabledReadOnly: Story = {
  name: 'Combobox / Disabled & Read Only',
  render: () => (
    <StoryFrame
      title="Combobox"
      name={'Disabled & Read Only'}
      render={() => renderExample(ComboboxExamples['Disabled & Read Only'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxAutoHighlight: Story = {
  name: 'Combobox / Auto Highlight',
  render: () => (
    <StoryFrame
      title="Combobox"
      name={'Auto Highlight'}
      render={() => renderExample(ComboboxExamples['Auto Highlight'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxFormValidation: Story = {
  name: 'Combobox / Form Validation',
  render: () => (
    <StoryFrame
      title="Combobox"
      name={'Form Validation'}
      render={() => renderExample(ComboboxExamples['Form Validation'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxManyItems: Story = {
  name: 'Combobox / Many Items',
  render: () => (
    <StoryFrame title="Combobox" name={'Many Items'} render={() => renderExample(ComboboxExamples['Many Items'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxEmpty: Story = {
  name: 'Combobox / Empty',
  render: () => <StoryFrame title="Combobox" name={'Empty'} render={() => renderExample(ComboboxExamples['Empty'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxTriggerOnly: Story = {
  name: 'Combobox / TriggerOnly',
  render: () => (
    <StoryFrame title="Combobox" name={'TriggerOnly'} render={() => renderExample(ComboboxExamples['TriggerOnly'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxAsyncSearchSingle: Story = {
  name: 'Combobox / Async Search (Single)',
  render: () => (
    <StoryFrame
      title="Combobox"
      name={'Async Search (Single)'}
      render={() => renderExample(ComboboxExamples['Async Search (Single)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxAsyncSearchMultiple: Story = {
  name: 'Combobox / Async Search (Multiple)',
  render: () => (
    <StoryFrame
      title="Combobox"
      name={'Async Search (Multiple)'}
      render={() => renderExample(ComboboxExamples['Async Search (Multiple)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxLoopFocus: Story = {
  name: 'Combobox / Loop Focus',
  render: () => (
    <StoryFrame title="Combobox" name={'Loop Focus'} render={() => renderExample(ComboboxExamples['Loop Focus'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const ComboboxCreatable: Story = {
  name: 'Combobox / Creatable',
  render: () => (
    <StoryFrame title="Combobox" name={'Creatable'} render={() => renderExample(ComboboxExamples['Creatable'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combobox example from packages/ljkui/examples/combobox.examples.tsx.',
      },
    },
  },
};

export const CommandActions: Story = {
  name: 'Command / Actions',
  render: () => (
    <StoryFrame title="Command" name={'Actions'} render={() => renderExample(CommandExamples['Actions'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Command example from packages/ljkui/examples/command.examples.tsx.',
      },
    },
  },
};

export const CommandNavigation: Story = {
  name: 'Command / Navigation',
  render: () => (
    <StoryFrame title="Command" name={'Navigation'} render={() => renderExample(CommandExamples['Navigation'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Command example from packages/ljkui/examples/command.examples.tsx.',
      },
    },
  },
};

export const CommandReturn: Story = {
  name: 'Command / return',
  render: () => <StoryFrame title="Command" name={'return'} render={() => renderExample(CommandExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Command example from packages/ljkui/examples/command.examples.tsx.',
      },
    },
  },
};

export const CommandReturn2: Story = {
  name: 'Command / return',
  render: () => <StoryFrame title="Command" name={'return'} render={() => renderExample(CommandExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Command example from packages/ljkui/examples/command.examples.tsx.',
      },
    },
  },
};

export const CommandDefault: Story = {
  name: 'Command / Default',
  render: () => (
    <StoryFrame title="Command" name={'Default'} render={() => renderExample(CommandExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Command example from packages/ljkui/examples/command.examples.tsx.',
      },
    },
  },
};

export const CommandWithSelection: Story = {
  name: 'Command / With selection',
  render: () => (
    <StoryFrame
      title="Command"
      name={'With selection'}
      render={() => renderExample(CommandExamples['With selection'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Command example from packages/ljkui/examples/command.examples.tsx.',
      },
    },
  },
};

export const CommandInADialog: Story = {
  name: 'Command / In a dialog',
  render: () => (
    <StoryFrame title="Command" name={'In a dialog'} render={() => renderExample(CommandExamples['In a dialog'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Command example from packages/ljkui/examples/command.examples.tsx.',
      },
    },
  },
};

export const ContextMenuDefault: Story = {
  name: 'Context Menu / Default',
  render: () => (
    <StoryFrame title="Context Menu" name={'Default'} render={() => renderExample(ContextMenuExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context Menu example from packages/ljkui/examples/context-menu.examples.tsx.',
      },
    },
  },
};

export const ContextMenuCheckboxAndRadioItems: Story = {
  name: 'Context Menu / Checkbox and Radio Items',
  render: () => (
    <StoryFrame
      title="Context Menu"
      name={'Checkbox and Radio Items'}
      render={() => renderExample(ContextMenuExamples['Checkbox and Radio Items'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context Menu example from packages/ljkui/examples/context-menu.examples.tsx.',
      },
    },
  },
};

export const ContextMenuNestedMenu: Story = {
  name: 'Context Menu / Nested Menu',
  render: () => (
    <StoryFrame
      title="Context Menu"
      name={'Nested Menu'}
      render={() => renderExample(ContextMenuExamples['Nested Menu'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context Menu example from packages/ljkui/examples/context-menu.examples.tsx.',
      },
    },
  },
};

export const ContextMenuItemAsLink: Story = {
  name: 'Context Menu / Item as Link',
  render: () => (
    <StoryFrame
      title="Context Menu"
      name={'Item as Link'}
      render={() => renderExample(ContextMenuExamples['Item as Link'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context Menu example from packages/ljkui/examples/context-menu.examples.tsx.',
      },
    },
  },
};

export const ContextMenuDialogFromContextMenu: Story = {
  name: 'Context Menu / Dialog from Context Menu',
  render: () => (
    <StoryFrame
      title="Context Menu"
      name={'Dialog from Context Menu'}
      render={() => renderExample(ContextMenuExamples['Dialog from Context Menu'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context Menu example from packages/ljkui/examples/context-menu.examples.tsx.',
      },
    },
  },
};

export const ContextMenuSideAndAlign: Story = {
  name: 'Context Menu / Side and Align',
  render: () => (
    <StoryFrame
      title="Context Menu"
      name={'Side and Align'}
      render={() => renderExample(ContextMenuExamples['Side and Align'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context Menu example from packages/ljkui/examples/context-menu.examples.tsx.',
      },
    },
  },
};

export const ContextMenuSideOffsetAndAlignOffset: Story = {
  name: 'Context Menu / Side Offset and Align Offset',
  render: () => (
    <StoryFrame
      title="Context Menu"
      name={'Side Offset and Align Offset'}
      render={() => renderExample(ContextMenuExamples['Side Offset and Align Offset'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context Menu example from packages/ljkui/examples/context-menu.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn2: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn3: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn4: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn5: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn6: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn7: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn8: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn9: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn10: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn11: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn12: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn13: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn14: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardReturn15: Story = {
  name: 'Credit Card / return',
  render: () => (
    <StoryFrame title="Credit Card" name={'return'} render={() => renderExample(CreditCardExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardLjkuiCard: Story = {
  name: 'Credit Card / ljkui Card',
  render: () => (
    <StoryFrame
      title="Credit Card"
      name={'ljkui Card'}
      render={() => renderExample(CreditCardExamples['ljkui Card'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardCustomDesign: Story = {
  name: 'Credit Card / Custom Design',
  render: () => (
    <StoryFrame
      title="Credit Card"
      name={'Custom Design'}
      render={() => renderExample(CreditCardExamples['Custom Design'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardBackOnly: Story = {
  name: 'Credit Card / Back Only',
  render: () => (
    <StoryFrame title="Credit Card" name={'Back Only'} render={() => renderExample(CreditCardExamples['Back Only'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardInputStates: Story = {
  name: 'Credit Card / Input States',
  render: () => (
    <StoryFrame
      title="Credit Card"
      name={'Input States'}
      render={() => renderExample(CreditCardExamples['Input States'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardFormIntegration: Story = {
  name: 'Credit Card / Form Integration',
  render: () => (
    <StoryFrame
      title="Credit Card"
      name={'Form Integration'}
      render={() => renderExample(CreditCardExamples['Form Integration'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardPerFaceColors: Story = {
  name: 'Credit Card / Per-Face Colors',
  render: () => (
    <StoryFrame
      title="Credit Card"
      name={'Per-Face Colors'}
      render={() => renderExample(CreditCardExamples['Per-Face Colors'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardCardBrands: Story = {
  name: 'Credit Card / Card Brands',
  render: () => (
    <StoryFrame
      title="Credit Card"
      name={'Card Brands'}
      render={() => renderExample(CreditCardExamples['Card Brands'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardProviderDetection: Story = {
  name: 'Credit Card / Provider Detection',
  render: () => (
    <StoryFrame
      title="Credit Card"
      name={'Provider Detection'}
      render={() => renderExample(CreditCardExamples['Provider Detection'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const CreditCardCustomFields: Story = {
  name: 'Credit Card / Custom Fields',
  render: () => (
    <StoryFrame
      title="Credit Card"
      name={'Custom Fields'}
      render={() => renderExample(CreditCardExamples['Custom Fields'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Credit Card example from packages/ljkui/examples/credit-card.examples.tsx.',
      },
    },
  },
};

export const DataTableSize: Story = {
  name: 'Data Table / Size',
  render: () => <StoryFrame title="Data Table" name={'Size'} render={() => renderExample(DataTableExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Data Table example from packages/ljkui/examples/data-table.examples.tsx.',
      },
    },
  },
};

export const DataTableOrientation: Story = {
  name: 'Data Table / Orientation',
  render: () => (
    <StoryFrame
      title="Data Table"
      name={'Orientation'}
      render={() => renderExample(DataTableExamples['Orientation'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Data Table example from packages/ljkui/examples/data-table.examples.tsx.',
      },
    },
  },
};

export const DataTableColor: Story = {
  name: 'Data Table / Color',
  render: () => (
    <StoryFrame title="Data Table" name={'Color'} render={() => renderExample(DataTableExamples['Color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Data Table example from packages/ljkui/examples/data-table.examples.tsx.',
      },
    },
  },
};

export const DataTableHighContrast: Story = {
  name: 'Data Table / High Contrast',
  render: () => (
    <StoryFrame
      title="Data Table"
      name={'High Contrast'}
      render={() => renderExample(DataTableExamples['High Contrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Data Table example from packages/ljkui/examples/data-table.examples.tsx.',
      },
    },
  },
};

export const DateFieldSize: Story = {
  name: 'Date Field / Size',
  render: () => <StoryFrame title="Date Field" name={'Size'} render={() => renderExample(DateFieldExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Date Field example from packages/ljkui/examples/date-field.examples.tsx.',
      },
    },
  },
};

export const DateFieldMinValue: Story = {
  name: 'Date Field / MinValue',
  render: () => (
    <StoryFrame title="Date Field" name={'MinValue'} render={() => renderExample(DateFieldExamples['MinValue'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Date Field example from packages/ljkui/examples/date-field.examples.tsx.',
      },
    },
  },
};

export const DateFieldWithTime: Story = {
  name: 'Date Field / With time',
  render: () => (
    <StoryFrame title="Date Field" name={'With time'} render={() => renderExample(DateFieldExamples['With time'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Date Field example from packages/ljkui/examples/date-field.examples.tsx.',
      },
    },
  },
};

export const DatePickerSizes: Story = {
  name: 'Date Picker / Sizes',
  render: () => (
    <StoryFrame title="Date Picker" name={'Sizes'} render={() => renderExample(DatePickerExamples['Sizes'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Date Picker example from packages/ljkui/examples/date-picker.examples.tsx.',
      },
    },
  },
};

export const DatePickerCustom: Story = {
  name: 'Date Picker / Custom',
  render: () => (
    <StoryFrame title="Date Picker" name={'Custom'} render={() => renderExample(DatePickerExamples['Custom'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Date Picker example from packages/ljkui/examples/date-picker.examples.tsx.',
      },
    },
  },
};

export const DateRangePickerSizes: Story = {
  name: 'Date Range Picker / Sizes',
  render: () => (
    <StoryFrame
      title="Date Range Picker"
      name={'Sizes'}
      render={() => renderExample(DateRangePickerExamples['Sizes'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Date Range Picker example from packages/ljkui/examples/date-range-picker.examples.tsx.',
      },
    },
  },
};

export const DateRangePickerCustom: Story = {
  name: 'Date Range Picker / Custom',
  render: () => (
    <StoryFrame
      title="Date Range Picker"
      name={'Custom'}
      render={() => renderExample(DateRangePickerExamples['Custom'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Date Range Picker example from packages/ljkui/examples/date-range-picker.examples.tsx.',
      },
    },
  },
};

export const DialogDefault: Story = {
  name: 'Dialog / Default',
  render: () => <StoryFrame title="Dialog" name={'Default'} render={() => renderExample(DialogExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogSizes: Story = {
  name: 'Dialog / Sizes',
  render: () => <StoryFrame title="Dialog" name={'Sizes'} render={() => renderExample(DialogExamples['Sizes'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogWithInsetContent: Story = {
  name: 'Dialog / With inset content',
  render: () => (
    <StoryFrame
      title="Dialog"
      name={'With inset content'}
      render={() => renderExample(DialogExamples['With inset content'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogDetachedTriggers: Story = {
  name: 'Dialog / Detached Triggers',
  render: () => (
    <StoryFrame
      title="Dialog"
      name={'Detached Triggers'}
      render={() => renderExample(DialogExamples['Detached Triggers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogMultipleTriggersWithPayload: Story = {
  name: 'Dialog / Multiple Triggers with Payload',
  render: () => (
    <StoryFrame
      title="Dialog"
      name={'Multiple Triggers with Payload'}
      render={() => renderExample(DialogExamples['Multiple Triggers with Payload'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogControlledMode: Story = {
  name: 'Dialog / Controlled Mode',
  render: () => (
    <StoryFrame
      title="Dialog"
      name={'Controlled Mode'}
      render={() => renderExample(DialogExamples['Controlled Mode'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogActionsRef: Story = {
  name: 'Dialog / Actions Ref',
  render: () => (
    <StoryFrame title="Dialog" name={'Actions Ref'} render={() => renderExample(DialogExamples['Actions Ref'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogInitialFocus: Story = {
  name: 'Dialog / Initial Focus',
  render: () => (
    <StoryFrame title="Dialog" name={'Initial Focus'} render={() => renderExample(DialogExamples['Initial Focus'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogFinalFocus: Story = {
  name: 'Dialog / Final Focus',
  render: () => (
    <StoryFrame title="Dialog" name={'Final Focus'} render={() => renderExample(DialogExamples['Final Focus'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogOpenChangeCallbacks: Story = {
  name: 'Dialog / Open Change Callbacks',
  render: () => (
    <StoryFrame
      title="Dialog"
      name={'Open Change Callbacks'}
      render={() => renderExample(DialogExamples['Open Change Callbacks'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogNestedDialogs: Story = {
  name: 'Dialog / Nested Dialogs',
  render: () => (
    <StoryFrame title="Dialog" name={'Nested Dialogs'} render={() => renderExample(DialogExamples['Nested Dialogs'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogCloseConfirmation: Story = {
  name: 'Dialog / Close Confirmation',
  render: () => (
    <StoryFrame
      title="Dialog"
      name={'Close Confirmation'}
      render={() => renderExample(DialogExamples['Close Confirmation'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogWithPopoverAndHoverCard: Story = {
  name: 'Dialog / With Popover and HoverCard',
  render: () => (
    <StoryFrame
      title="Dialog"
      name={'With Popover and HoverCard'}
      render={() => renderExample(DialogExamples['With Popover and HoverCard'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogDialogFromDropdownMenu: Story = {
  name: 'Dialog / Dialog from Dropdown Menu',
  render: () => (
    <StoryFrame
      title="Dialog"
      name={'Dialog from Dropdown Menu'}
      render={() => renderExample(DialogExamples['Dialog from Dropdown Menu'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogDialogTriggerInDropdownMenu: Story = {
  name: 'Dialog / Dialog Trigger in Dropdown Menu',
  render: () => (
    <StoryFrame
      title="Dialog"
      name={'Dialog Trigger in Dropdown Menu'}
      render={() => renderExample(DialogExamples['Dialog Trigger in Dropdown Menu'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DialogDialogDetachedTriggerInDropdownMenuUsingHandle: Story = {
  name: 'Dialog / Dialog detached trigger in Dropdown Menu using handle',
  render: () => (
    <StoryFrame
      title="Dialog"
      name={'Dialog detached trigger in Dropdown Menu using handle'}
      render={() => renderExample(DialogExamples['Dialog detached trigger in Dropdown Menu using handle'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog example from packages/ljkui/examples/dialog.examples.tsx.',
      },
    },
  },
};

export const DrawerDefault: Story = {
  name: 'Drawer / Default',
  render: () => <StoryFrame title="Drawer" name={'Default'} render={() => renderExample(DrawerExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerWithInsetContent: Story = {
  name: 'Drawer / With inset content',
  render: () => (
    <StoryFrame
      title="Drawer"
      name={'With inset content'}
      render={() => renderExample(DrawerExamples['With inset content'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerDetachedTriggers: Story = {
  name: 'Drawer / Detached Triggers',
  render: () => (
    <StoryFrame
      title="Drawer"
      name={'Detached Triggers'}
      render={() => renderExample(DrawerExamples['Detached Triggers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerMultipleTriggersWithPayload: Story = {
  name: 'Drawer / Multiple Triggers with Payload',
  render: () => (
    <StoryFrame
      title="Drawer"
      name={'Multiple Triggers with Payload'}
      render={() => renderExample(DrawerExamples['Multiple Triggers with Payload'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerControlledMode: Story = {
  name: 'Drawer / Controlled Mode',
  render: () => (
    <StoryFrame
      title="Drawer"
      name={'Controlled Mode'}
      render={() => renderExample(DrawerExamples['Controlled Mode'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerActionsRef: Story = {
  name: 'Drawer / Actions Ref',
  render: () => (
    <StoryFrame title="Drawer" name={'Actions Ref'} render={() => renderExample(DrawerExamples['Actions Ref'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerInitialFocus: Story = {
  name: 'Drawer / Initial Focus',
  render: () => (
    <StoryFrame title="Drawer" name={'Initial Focus'} render={() => renderExample(DrawerExamples['Initial Focus'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerFinalFocus: Story = {
  name: 'Drawer / Final Focus',
  render: () => (
    <StoryFrame title="Drawer" name={'Final Focus'} render={() => renderExample(DrawerExamples['Final Focus'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerOpenChangeCallbacks: Story = {
  name: 'Drawer / Open Change Callbacks',
  render: () => (
    <StoryFrame
      title="Drawer"
      name={'Open Change Callbacks'}
      render={() => renderExample(DrawerExamples['Open Change Callbacks'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerKeepMounted: Story = {
  name: 'Drawer / Keep Mounted',
  render: () => (
    <StoryFrame title="Drawer" name={'Keep Mounted'} render={() => renderExample(DrawerExamples['Keep Mounted'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerNestedDrawers: Story = {
  name: 'Drawer / Nested Drawers',
  render: () => (
    <StoryFrame title="Drawer" name={'Nested Drawers'} render={() => renderExample(DrawerExamples['Nested Drawers'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerDeeplyNestedDrawers: Story = {
  name: 'Drawer / Deeply Nested Drawers',
  render: () => (
    <StoryFrame
      title="Drawer"
      name={'Deeply Nested Drawers'}
      render={() => renderExample(DrawerExamples['Deeply Nested Drawers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerWithPopoverSelectDropdownAndHoverCard: Story = {
  name: 'Drawer / With Popover, Select, Dropdown, and HoverCard',
  render: () => (
    <StoryFrame
      title="Drawer"
      name={'With Popover, Select, Dropdown, and HoverCard'}
      render={() => renderExample(DrawerExamples['With Popover, Select, Dropdown, and HoverCard'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DrawerWithDialogInside: Story = {
  name: 'Drawer / With Dialog Inside',
  render: () => (
    <StoryFrame
      title="Drawer"
      name={'With Dialog Inside'}
      render={() => renderExample(DrawerExamples['With Dialog Inside'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer example from packages/ljkui/examples/drawer.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuLibrary: Story = {
  name: 'Dropdown Menu / library',
  render: () => (
    <StoryFrame title="Dropdown Menu" name={'library'} render={() => renderExample(DropdownMenuExamples['library'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuPlayback: Story = {
  name: 'Dropdown Menu / playback',
  render: () => (
    <StoryFrame
      title="Dropdown Menu"
      name={'playback'}
      render={() => renderExample(DropdownMenuExamples['playback'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuShare: Story = {
  name: 'Dropdown Menu / share',
  render: () => (
    <StoryFrame title="Dropdown Menu" name={'share'} render={() => renderExample(DropdownMenuExamples['share'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuDefault: Story = {
  name: 'Dropdown Menu / Default',
  render: () => (
    <StoryFrame title="Dropdown Menu" name={'Default'} render={() => renderExample(DropdownMenuExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuSize: Story = {
  name: 'Dropdown Menu / Size',
  render: () => (
    <StoryFrame title="Dropdown Menu" name={'Size'} render={() => renderExample(DropdownMenuExamples['Size'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuColor: Story = {
  name: 'Dropdown Menu / Color',
  render: () => (
    <StoryFrame title="Dropdown Menu" name={'Color'} render={() => renderExample(DropdownMenuExamples['Color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuOpenOnHover: Story = {
  name: 'Dropdown Menu / Open on Hover',
  render: () => (
    <StoryFrame
      title="Dropdown Menu"
      name={'Open on Hover'}
      render={() => renderExample(DropdownMenuExamples['Open on Hover'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuItemAsLink: Story = {
  name: 'Dropdown Menu / Item as Link',
  render: () => (
    <StoryFrame
      title="Dropdown Menu"
      name={'Item as Link'}
      render={() => renderExample(DropdownMenuExamples['Item as Link'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuDetachedTriggers: Story = {
  name: 'Dropdown Menu / Detached Triggers',
  render: () => (
    <StoryFrame
      title="Dropdown Menu"
      name={'Detached Triggers'}
      render={() => renderExample(DropdownMenuExamples['Detached Triggers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuMultipleTriggers: Story = {
  name: 'Dropdown Menu / Multiple Triggers',
  render: () => (
    <StoryFrame
      title="Dropdown Menu"
      name={'Multiple Triggers'}
      render={() => renderExample(DropdownMenuExamples['Multiple Triggers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuControlledModeWithMultipleTriggers: Story = {
  name: 'Dropdown Menu / Controlled Mode with Multiple Triggers',
  render: () => (
    <StoryFrame
      title="Dropdown Menu"
      name={'Controlled Mode with Multiple Triggers'}
      render={() => renderExample(DropdownMenuExamples['Controlled Mode with Multiple Triggers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuSideAndAlign: Story = {
  name: 'Dropdown Menu / Side and Align',
  render: () => (
    <StoryFrame
      title="Dropdown Menu"
      name={'Side and Align'}
      render={() => renderExample(DropdownMenuExamples['Side and Align'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuSideOffsetAndAlignOffset: Story = {
  name: 'Dropdown Menu / Side Offset and Align Offset',
  render: () => (
    <StoryFrame
      title="Dropdown Menu"
      name={'Side Offset and Align Offset'}
      render={() => renderExample(DropdownMenuExamples['Side Offset and Align Offset'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const DropdownMenuManyAdjacentSubmenus: Story = {
  name: 'Dropdown Menu / Many Adjacent Submenus',
  render: () => (
    <StoryFrame
      title="Dropdown Menu"
      name={'Many Adjacent Submenus'}
      render={() => renderExample(DropdownMenuExamples['Many Adjacent Submenus'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown Menu example from packages/ljkui/examples/dropdown-menu.examples.tsx.',
      },
    },
  },
};

export const EmReturn: Story = {
  name: 'Em / return',
  render: () => <StoryFrame title="Em" name={'return'} render={() => renderExample(EmExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Em example from packages/ljkui/examples/em.examples.tsx.',
      },
    },
  },
};

export const EmptyDefault: Story = {
  name: 'Empty / Default',
  render: () => <StoryFrame title="Empty" name={'Default'} render={() => renderExample(EmptyExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptySearchResults: Story = {
  name: 'Empty / SearchResults',
  render: () => (
    <StoryFrame title="Empty" name={'SearchResults'} render={() => renderExample(EmptyExamples['SearchResults'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyMinimal: Story = {
  name: 'Empty / Minimal',
  render: () => <StoryFrame title="Empty" name={'Minimal'} render={() => renderExample(EmptyExamples['Minimal'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyColors: Story = {
  name: 'Empty / Colors',
  render: () => <StoryFrame title="Empty" name={'Colors'} render={() => renderExample(EmptyExamples['Colors'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyEmojis: Story = {
  name: 'Empty / Emojis',
  render: () => <StoryFrame title="Empty" name={'Emojis'} render={() => renderExample(EmptyExamples['Emojis'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyShinyEmojis: Story = {
  name: 'Empty / ShinyEmojis',
  render: () => (
    <StoryFrame title="Empty" name={'ShinyEmojis'} render={() => renderExample(EmptyExamples['ShinyEmojis'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyWithAvatar: Story = {
  name: 'Empty / WithAvatar',
  render: () => (
    <StoryFrame title="Empty" name={'WithAvatar'} render={() => renderExample(EmptyExamples['WithAvatar'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyWithAvatarStack: Story = {
  name: 'Empty / WithAvatarStack',
  render: () => (
    <StoryFrame title="Empty" name={'WithAvatarStack'} render={() => renderExample(EmptyExamples['WithAvatarStack'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyWithTextFieldAndButton: Story = {
  name: 'Empty / WithTextFieldAndButton',
  render: () => (
    <StoryFrame
      title="Empty"
      name={'WithTextFieldAndButton'}
      render={() => renderExample(EmptyExamples['WithTextFieldAndButton'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyWithCheckbox: Story = {
  name: 'Empty / WithCheckbox',
  render: () => (
    <StoryFrame title="Empty" name={'WithCheckbox'} render={() => renderExample(EmptyExamples['WithCheckbox'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyFileDropHint: Story = {
  name: 'Empty / FileDropHint',
  render: () => (
    <StoryFrame title="Empty" name={'FileDropHint'} render={() => renderExample(EmptyExamples['FileDropHint'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyErrorWithRetry: Story = {
  name: 'Empty / ErrorWithRetry',
  render: () => (
    <StoryFrame title="Empty" name={'ErrorWithRetry'} render={() => renderExample(EmptyExamples['ErrorWithRetry'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyAchievement: Story = {
  name: 'Empty / Achievement',
  render: () => (
    <StoryFrame title="Empty" name={'Achievement'} render={() => renderExample(EmptyExamples['Achievement'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyWithKeyboardShortcut: Story = {
  name: 'Empty / WithKeyboardShortcut',
  render: () => (
    <StoryFrame
      title="Empty"
      name={'WithKeyboardShortcut'}
      render={() => renderExample(EmptyExamples['WithKeyboardShortcut'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyWithOTPField: Story = {
  name: 'Empty / WithOTPField',
  render: () => (
    <StoryFrame title="Empty" name={'WithOTPField'} render={() => renderExample(EmptyExamples['WithOTPField'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyNotFound404: Story = {
  name: 'Empty / NotFound404',
  render: () => (
    <StoryFrame title="Empty" name={'NotFound404'} render={() => renderExample(EmptyExamples['NotFound404'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyAIAssistant: Story = {
  name: 'Empty / AIAssistant',
  render: () => (
    <StoryFrame title="Empty" name={'AIAssistant'} render={() => renderExample(EmptyExamples['AIAssistant'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const EmptyUpgradeToPro: Story = {
  name: 'Empty / UpgradeToPro',
  render: () => (
    <StoryFrame title="Empty" name={'UpgradeToPro'} render={() => renderExample(EmptyExamples['UpgradeToPro'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty example from packages/ljkui/examples/empty.examples.tsx.',
      },
    },
  },
};

export const FieldUrl: Story = {
  name: 'Field / url',
  render: () => <StoryFrame title="Field" name={'url'} render={() => renderExample(FieldExamples['url'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldName: Story = {
  name: 'Field / name',
  render: () => <StoryFrame title="Field" name={'name'} render={() => renderExample(FieldExamples['name'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldMinLength: Story = {
  name: 'Field / minLength',
  render: () => (
    <StoryFrame title="Field" name={'minLength'} render={() => renderExample(FieldExamples['minLength'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldMaxLength: Story = {
  name: 'Field / maxLength',
  render: () => (
    <StoryFrame title="Field" name={'maxLength'} render={() => renderExample(FieldExamples['maxLength'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldValidChars: Story = {
  name: 'Field / validChars',
  render: () => (
    <StoryFrame title="Field" name={'validChars'} render={() => renderExample(FieldExamples['validChars'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldStartsWithLetter: Story = {
  name: 'Field / startsWithLetter',
  render: () => (
    <StoryFrame
      title="Field"
      name={'startsWithLetter'}
      render={() => renderExample(FieldExamples['startsWithLetter'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldNoConsecutiveUnderscores: Story = {
  name: 'Field / noConsecutiveUnderscores',
  render: () => (
    <StoryFrame
      title="Field"
      name={'noConsecutiveUnderscores'}
      render={() => renderExample(FieldExamples['noConsecutiveUnderscores'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldDefault: Story = {
  name: 'Field / Default',
  render: () => <StoryFrame title="Field" name={'Default'} render={() => renderExample(FieldExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithFieldset: Story = {
  name: 'Field / With Fieldset',
  render: () => (
    <StoryFrame title="Field" name={'With Fieldset'} render={() => renderExample(FieldExamples['With Fieldset'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldFieldsetDisabled: Story = {
  name: 'Field / Fieldset Disabled',
  render: () => (
    <StoryFrame
      title="Field"
      name={'Fieldset Disabled'}
      render={() => renderExample(FieldExamples['Fieldset Disabled'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithInput: Story = {
  name: 'Field / With Input',
  render: () => (
    <StoryFrame title="Field" name={'With Input'} render={() => renderExample(FieldExamples['With Input'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithSelect: Story = {
  name: 'Field / With Select',
  render: () => (
    <StoryFrame title="Field" name={'With Select'} render={() => renderExample(FieldExamples['With Select'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithSliderRangeValidation: Story = {
  name: 'Field / With Slider (Range Validation)',
  render: () => (
    <StoryFrame
      title="Field"
      name={'With Slider (Range Validation)'}
      render={() => renderExample(FieldExamples['With Slider (Range Validation)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithSliderBudget: Story = {
  name: 'Field / With Slider (Budget)',
  render: () => (
    <StoryFrame
      title="Field"
      name={'With Slider (Budget)'}
      render={() => renderExample(FieldExamples['With Slider (Budget)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithCombobox: Story = {
  name: 'Field / With Combobox',
  render: () => (
    <StoryFrame title="Field" name={'With Combobox'} render={() => renderExample(FieldExamples['With Combobox'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithAutocomplete: Story = {
  name: 'Field / With Autocomplete',
  render: () => (
    <StoryFrame
      title="Field"
      name={'With Autocomplete'}
      render={() => renderExample(FieldExamples['With Autocomplete'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithNumberField: Story = {
  name: 'Field / With NumberField',
  render: () => (
    <StoryFrame
      title="Field"
      name={'With NumberField'}
      render={() => renderExample(FieldExamples['With NumberField'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithSwitch: Story = {
  name: 'Field / With Switch',
  render: () => (
    <StoryFrame title="Field" name={'With Switch'} render={() => renderExample(FieldExamples['With Switch'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithRadioGroup: Story = {
  name: 'Field / With RadioGroup',
  render: () => (
    <StoryFrame title="Field" name={'With RadioGroup'} render={() => renderExample(FieldExamples['With RadioGroup'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithCheckbox: Story = {
  name: 'Field / With Checkbox',
  render: () => (
    <StoryFrame title="Field" name={'With Checkbox'} render={() => renderExample(FieldExamples['With Checkbox'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldWithSlider: Story = {
  name: 'Field / With Slider',
  render: () => (
    <StoryFrame title="Field" name={'With Slider'} render={() => renderExample(FieldExamples['With Slider'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldCustomValidation: Story = {
  name: 'Field / Custom Validation',
  render: () => (
    <StoryFrame
      title="Field"
      name={'Custom Validation'}
      render={() => renderExample(FieldExamples['Custom Validation'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldCompleteFormExample: Story = {
  name: 'Field / Complete Form Example',
  render: () => (
    <StoryFrame
      title="Field"
      name={'Complete Form Example'}
      render={() => renderExample(FieldExamples['Complete Form Example'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldFieldCustomValidation: Story = {
  name: 'Field / Field Custom Validation',
  render: () => (
    <StoryFrame
      title="Field"
      name={'Field Custom Validation'}
      render={() => renderExample(FieldExamples['Field Custom Validation'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldValidity: Story = {
  name: 'Field / Validity',
  render: () => <StoryFrame title="Field" name={'Validity'} render={() => renderExample(FieldExamples['Validity'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldDisabledState: Story = {
  name: 'Field / Disabled State',
  render: () => (
    <StoryFrame title="Field" name={'Disabled State'} render={() => renderExample(FieldExamples['Disabled State'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldAllValidityStates: Story = {
  name: 'Field / All Validity States',
  render: () => (
    <StoryFrame
      title="Field"
      name={'All Validity States'}
      render={() => renderExample(FieldExamples['All Validity States'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field example from packages/ljkui/examples/field.examples.tsx.',
      },
    },
  },
};

export const FieldsetReturn: Story = {
  name: 'Fieldset / return',
  render: () => (
    <StoryFrame title="Fieldset" name={'return'} render={() => renderExample(FieldsetExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fieldset example from packages/ljkui/examples/fieldset.examples.tsx.',
      },
    },
  },
};

export const FilterChipDefault: Story = {
  name: 'Filter Chip / Default',
  render: () => (
    <StoryFrame title="Filter Chip" name={'Default'} render={() => renderExample(FilterChipExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filter Chip example from packages/ljkui/examples/filter-chip.examples.tsx.',
      },
    },
  },
};

export const FilterChipSize: Story = {
  name: 'Filter Chip / Size',
  render: () => (
    <StoryFrame title="Filter Chip" name={'Size'} render={() => renderExample(FilterChipExamples['Size'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filter Chip example from packages/ljkui/examples/filter-chip.examples.tsx.',
      },
    },
  },
};

export const FilterChipColor: Story = {
  name: 'Filter Chip / Color',
  render: () => (
    <StoryFrame title="Filter Chip" name={'Color'} render={() => renderExample(FilterChipExamples['Color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filter Chip example from packages/ljkui/examples/filter-chip.examples.tsx.',
      },
    },
  },
};

export const FilterChipReadOnly: Story = {
  name: 'Filter Chip / Read Only',
  render: () => (
    <StoryFrame title="Filter Chip" name={'Read Only'} render={() => renderExample(FilterChipExamples['Read Only'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filter Chip example from packages/ljkui/examples/filter-chip.examples.tsx.',
      },
    },
  },
};

export const FilterChipInputRef: Story = {
  name: 'Filter Chip / Input Ref',
  render: () => (
    <StoryFrame title="Filter Chip" name={'Input Ref'} render={() => renderExample(FilterChipExamples['Input Ref'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filter Chip example from packages/ljkui/examples/filter-chip.examples.tsx.',
      },
    },
  },
};

export const FilterChipFormWithValueUncheckedValue: Story = {
  name: 'Filter Chip / Form with value & uncheckedValue',
  render: () => (
    <StoryFrame
      title="Filter Chip"
      name={'Form with value & uncheckedValue'}
      render={() => renderExample(FilterChipExamples['Form with value & uncheckedValue'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filter Chip example from packages/ljkui/examples/filter-chip.examples.tsx.',
      },
    },
  },
};

export const FormIf: Story = {
  name: 'Form / if',
  render: () => <StoryFrame title="Form" name={'if'} render={() => renderExample(FormExamples['if'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormIf2: Story = {
  name: 'Form / if',
  render: () => <StoryFrame title="Form" name={'if'} render={() => renderExample(FormExamples['if'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormId: Story = {
  name: 'Form / id',
  render: () => <StoryFrame title="Form" name={'id'} render={() => renderExample(FormExamples['id'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormName: Story = {
  name: 'Form / name',
  render: () => <StoryFrame title="Form" name={'name'} render={() => renderExample(FormExamples['name'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormEmail: Story = {
  name: 'Form / email',
  render: () => <StoryFrame title="Form" name={'email'} render={() => renderExample(FormExamples['email'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormName2: Story = {
  name: 'Form / name',
  render: () => <StoryFrame title="Form" name={'name'} render={() => renderExample(FormExamples['name'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormAge: Story = {
  name: 'Form / age',
  render: () => <StoryFrame title="Form" name={'age'} render={() => renderExample(FormExamples['age'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormIf3: Story = {
  name: 'Form / if',
  render: () => <StoryFrame title="Form" name={'if'} render={() => renderExample(FormExamples['if'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormFirstName: Story = {
  name: 'Form / firstName',
  render: () => <StoryFrame title="Form" name={'firstName'} render={() => renderExample(FormExamples['firstName'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormLastName: Story = {
  name: 'Form / lastName',
  render: () => <StoryFrame title="Form" name={'lastName'} render={() => renderExample(FormExamples['lastName'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormEmail2: Story = {
  name: 'Form / email',
  render: () => <StoryFrame title="Form" name={'email'} render={() => renderExample(FormExamples['email'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormUsername: Story = {
  name: 'Form / username',
  render: () => <StoryFrame title="Form" name={'username'} render={() => renderExample(FormExamples['username'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormBio: Story = {
  name: 'Form / bio',
  render: () => <StoryFrame title="Form" name={'bio'} render={() => renderExample(FormExamples['bio'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormGettingStarted: Story = {
  name: 'Form / Getting Started',
  render: () => (
    <StoryFrame title="Form" name={'Getting Started'} render={() => renderExample(FormExamples['Getting Started'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormConstraintValidation: Story = {
  name: 'Form / Constraint Validation',
  render: () => (
    <StoryFrame
      title="Form"
      name={'Constraint Validation'}
      render={() => renderExample(FormExamples['Constraint Validation'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormRequiredControls: Story = {
  name: 'Form / Required Controls',
  render: () => (
    <StoryFrame
      title="Form"
      name={'Required Controls'}
      render={() => renderExample(FormExamples['Required Controls'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormDisplayingErrors: Story = {
  name: 'Form / Displaying Errors',
  render: () => (
    <StoryFrame
      title="Form"
      name={'Displaying Errors'}
      render={() => renderExample(FormExamples['Displaying Errors'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormFormReset: Story = {
  name: 'Form / Form Reset',
  render: () => (
    <StoryFrame title="Form" name={'Form Reset'} render={() => renderExample(FormExamples['Form Reset'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormSubmitFormValuesAsAJavaScriptObject: Story = {
  name: 'Form / Submit form values as a JavaScript object',
  render: () => (
    <StoryFrame
      title="Form"
      name={'Submit form values as a JavaScript object'}
      render={() => renderExample(FormExamples['Submit form values as a JavaScript object'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormServerSideValidation: Story = {
  name: 'Form / Server-side Validation',
  render: () => (
    <StoryFrame
      title="Form"
      name={'Server-side Validation'}
      render={() => renderExample(FormExamples['Server-side Validation'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormConditionalFields: Story = {
  name: 'Form / Conditional Fields',
  render: () => (
    <StoryFrame
      title="Form"
      name={'Conditional Fields'}
      render={() => renderExample(FormExamples['Conditional Fields'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormDynamicFormFields: Story = {
  name: 'Form / Dynamic Form Fields',
  render: () => (
    <StoryFrame
      title="Form"
      name={'Dynamic Form Fields'}
      render={() => renderExample(FormExamples['Dynamic Form Fields'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormDirtyStateWarning: Story = {
  name: 'Form / Dirty State Warning',
  render: () => (
    <StoryFrame
      title="Form"
      name={'Dirty State Warning'}
      render={() => renderExample(FormExamples['Dirty State Warning'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormAutoSaveForm: Story = {
  name: 'Form / Auto-save Form',
  render: () => (
    <StoryFrame title="Form" name={'Auto-save Form'} render={() => renderExample(FormExamples['Auto-save Form'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormMultiStepWizardForm: Story = {
  name: 'Form / Multi-step Wizard Form',
  render: () => (
    <StoryFrame
      title="Form"
      name={'Multi-step Wizard Form'}
      render={() => renderExample(FormExamples['Multi-step Wizard Form'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormUsingWithZod: Story = {
  name: 'Form / Using with Zod',
  render: () => (
    <StoryFrame title="Form" name={'Using with Zod'} render={() => renderExample(FormExamples['Using with Zod'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormSubmitWithAServerFunction: Story = {
  name: 'Form / Submit with a Server Function',
  render: () => (
    <StoryFrame
      title="Form"
      name={'Submit with a Server Function'}
      render={() => renderExample(FormExamples['Submit with a Server Function'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormReactHookFormIntegration: Story = {
  name: 'Form / React Hook Form Integration',
  render: () => (
    <StoryFrame
      title="Form"
      name={'React Hook Form Integration'}
      render={() => renderExample(FormExamples['React Hook Form Integration'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const FormTanStackFormIntegration: Story = {
  name: 'Form / TanStack Form Integration',
  render: () => (
    <StoryFrame
      title="Form"
      name={'TanStack Form Integration'}
      render={() => renderExample(FormExamples['TanStack Form Integration'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form example from packages/ljkui/examples/form.examples.tsx.',
      },
    },
  },
};

export const GridReturn: Story = {
  name: 'Grid / return',
  render: () => <StoryFrame title="Grid" name={'return'} render={() => renderExample(GridExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Grid example from packages/ljkui/examples/grid.examples.tsx.',
      },
    },
  },
};

export const HStackReturn: Story = {
  name: 'H Stack / return',
  render: () => <StoryFrame title="H Stack" name={'return'} render={() => renderExample(HStackExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'H Stack example from packages/ljkui/examples/h-stack.examples.tsx.',
      },
    },
  },
};

export const HeadingSize: Story = {
  name: 'Heading / Size',
  render: () => <StoryFrame title="Heading" name={'Size'} render={() => renderExample(HeadingExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Heading example from packages/ljkui/examples/heading.examples.tsx.',
      },
    },
  },
};

export const HeadingColor: Story = {
  name: 'Heading / Color',
  render: () => <StoryFrame title="Heading" name={'Color'} render={() => renderExample(HeadingExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Heading example from packages/ljkui/examples/heading.examples.tsx.',
      },
    },
  },
};

export const HeadingAlign: Story = {
  name: 'Heading / Align',
  render: () => <StoryFrame title="Heading" name={'Align'} render={() => renderExample(HeadingExamples['Align'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Heading example from packages/ljkui/examples/heading.examples.tsx.',
      },
    },
  },
};

export const HeadingTrim: Story = {
  name: 'Heading / Trim',
  render: () => <StoryFrame title="Heading" name={'Trim'} render={() => renderExample(HeadingExamples['Trim'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Heading example from packages/ljkui/examples/heading.examples.tsx.',
      },
    },
  },
};

export const HeadingHighContrast: Story = {
  name: 'Heading / High Contrast',
  render: () => (
    <StoryFrame title="Heading" name={'High Contrast'} render={() => renderExample(HeadingExamples['High Contrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Heading example from packages/ljkui/examples/heading.examples.tsx.',
      },
    },
  },
};

export const HoverCardName: Story = {
  name: 'Hover Card / name',
  render: () => <StoryFrame title="Hover Card" name={'name'} render={() => renderExample(HoverCardExamples['name'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardUsername: Story = {
  name: 'Hover Card / username',
  render: () => (
    <StoryFrame title="Hover Card" name={'username'} render={() => renderExample(HoverCardExamples['username'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardAvatar: Story = {
  name: 'Hover Card / avatar',
  render: () => (
    <StoryFrame title="Hover Card" name={'avatar'} render={() => renderExample(HoverCardExamples['avatar'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardBio: Story = {
  name: 'Hover Card / bio',
  render: () => <StoryFrame title="Hover Card" name={'bio'} render={() => renderExample(HoverCardExamples['bio'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardRepos: Story = {
  name: 'Hover Card / repos',
  render: () => (
    <StoryFrame title="Hover Card" name={'repos'} render={() => renderExample(HoverCardExamples['repos'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardFollowers: Story = {
  name: 'Hover Card / followers',
  render: () => (
    <StoryFrame title="Hover Card" name={'followers'} render={() => renderExample(HoverCardExamples['followers'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardGithub: Story = {
  name: 'Hover Card / github',
  render: () => (
    <StoryFrame title="Hover Card" name={'github'} render={() => renderExample(HoverCardExamples['github'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardVercel: Story = {
  name: 'Hover Card / vercel',
  render: () => (
    <StoryFrame title="Hover Card" name={'vercel'} render={() => renderExample(HoverCardExamples['vercel'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardBaseui: Story = {
  name: 'Hover Card / baseui',
  render: () => (
    <StoryFrame title="Hover Card" name={'baseui'} render={() => renderExample(HoverCardExamples['baseui'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardDefault: Story = {
  name: 'Hover Card / Default',
  render: () => (
    <StoryFrame title="Hover Card" name={'Default'} render={() => renderExample(HoverCardExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardSize: Story = {
  name: 'Hover Card / Size',
  render: () => <StoryFrame title="Hover Card" name={'Size'} render={() => renderExample(HoverCardExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardWithInsetContent: Story = {
  name: 'Hover Card / With inset content',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'With inset content'}
      render={() => renderExample(HoverCardExamples['With inset content'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardCustomDelays: Story = {
  name: 'Hover Card / Custom Delays',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Custom Delays'}
      render={() => renderExample(HoverCardExamples['Custom Delays'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardControlledMode: Story = {
  name: 'Hover Card / Controlled Mode',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Controlled Mode'}
      render={() => renderExample(HoverCardExamples['Controlled Mode'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardPositioning: Story = {
  name: 'Hover Card / Positioning',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Positioning'}
      render={() => renderExample(HoverCardExamples['Positioning'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardProfileCardRealWorld: Story = {
  name: 'Hover Card / Profile Card (Real World)',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Profile Card (Real World)'}
      render={() => renderExample(HoverCardExamples['Profile Card (Real World)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardLinkPreview: Story = {
  name: 'Hover Card / Link Preview',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Link Preview'}
      render={() => renderExample(HoverCardExamples['Link Preview'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardOpenChangeCompleteCallback: Story = {
  name: 'Hover Card / Open Change Complete Callback',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Open Change Complete Callback'}
      render={() => renderExample(HoverCardExamples['Open Change Complete Callback'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardCustomAnchor: Story = {
  name: 'Hover Card / Custom Anchor',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Custom Anchor'}
      render={() => renderExample(HoverCardExamples['Custom Anchor'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardWithButtonTrigger: Story = {
  name: 'Hover Card / With Button Trigger',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'With Button Trigger'}
      render={() => renderExample(HoverCardExamples['With Button Trigger'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardCollisionBoundary: Story = {
  name: 'Hover Card / Collision Boundary',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Collision Boundary'}
      render={() => renderExample(HoverCardExamples['Collision Boundary'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardCollisionAvoidance: Story = {
  name: 'Hover Card / Collision Avoidance',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Collision Avoidance'}
      render={() => renderExample(HoverCardExamples['Collision Avoidance'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardSticky: Story = {
  name: 'Hover Card / Sticky',
  render: () => (
    <StoryFrame title="Hover Card" name={'Sticky'} render={() => renderExample(HoverCardExamples['Sticky'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardDisableAnchorTracking: Story = {
  name: 'Hover Card / Disable Anchor Tracking',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Disable Anchor Tracking'}
      render={() => renderExample(HoverCardExamples['Disable Anchor Tracking'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const HoverCardMultipleTriggers: Story = {
  name: 'Hover Card / Multiple Triggers',
  render: () => (
    <StoryFrame
      title="Hover Card"
      name={'Multiple Triggers'}
      render={() => renderExample(HoverCardExamples['Multiple Triggers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover Card example from packages/ljkui/examples/hover-card.examples.tsx.',
      },
    },
  },
};

export const IconButtonSize: Story = {
  name: 'Icon Button / Size',
  render: () => (
    <StoryFrame title="Icon Button" name={'Size'} render={() => renderExample(IconButtonExamples['Size'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon Button example from packages/ljkui/examples/icon-button.examples.tsx.',
      },
    },
  },
};

export const IconButtonVariant: Story = {
  name: 'Icon Button / Variant',
  render: () => (
    <StoryFrame title="Icon Button" name={'Variant'} render={() => renderExample(IconButtonExamples['Variant'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon Button example from packages/ljkui/examples/icon-button.examples.tsx.',
      },
    },
  },
};

export const IconButtonColor: Story = {
  name: 'Icon Button / Color',
  render: () => (
    <StoryFrame title="Icon Button" name={'Color'} render={() => renderExample(IconButtonExamples['Color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon Button example from packages/ljkui/examples/icon-button.examples.tsx.',
      },
    },
  },
};

export const IconButtonHighContrast: Story = {
  name: 'Icon Button / High Contrast',
  render: () => (
    <StoryFrame
      title="Icon Button"
      name={'High Contrast'}
      render={() => renderExample(IconButtonExamples['High Contrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon Button example from packages/ljkui/examples/icon-button.examples.tsx.',
      },
    },
  },
};

export const IconButtonLoading: Story = {
  name: 'Icon Button / Loading',
  render: () => (
    <StoryFrame title="Icon Button" name={'Loading'} render={() => renderExample(IconButtonExamples['Loading'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon Button example from packages/ljkui/examples/icon-button.examples.tsx.',
      },
    },
  },
};

export const InputGroupDefault: Story = {
  name: 'Input Group / Default',
  render: () => (
    <StoryFrame title="Input Group" name={'Default'} render={() => renderExample(InputGroupExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input Group example from packages/ljkui/examples/input-group.examples.tsx.',
      },
    },
  },
};

export const InputGroupWithUnit: Story = {
  name: 'Input Group / With unit',
  render: () => (
    <StoryFrame title="Input Group" name={'With unit'} render={() => renderExample(InputGroupExamples['With unit'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input Group example from packages/ljkui/examples/input-group.examples.tsx.',
      },
    },
  },
};

export const InputGroupSizes: Story = {
  name: 'Input Group / Sizes',
  render: () => (
    <StoryFrame title="Input Group" name={'Sizes'} render={() => renderExample(InputGroupExamples['Sizes'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input Group example from packages/ljkui/examples/input-group.examples.tsx.',
      },
    },
  },
};

export const InputOtpDefault: Story = {
  name: 'Input OTP / Default',
  render: () => (
    <StoryFrame title="Input OTP" name={'Default'} render={() => renderExample(InputOtpExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input OTP example from packages/ljkui/examples/input-otp.examples.tsx.',
      },
    },
  },
};

export const InputOtpPattern: Story = {
  name: 'Input OTP / Pattern',
  render: () => (
    <StoryFrame title="Input OTP" name={'Pattern'} render={() => renderExample(InputOtpExamples['Pattern'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input OTP example from packages/ljkui/examples/input-otp.examples.tsx.',
      },
    },
  },
};

export const InputOtpSeparator: Story = {
  name: 'Input OTP / Separator',
  render: () => (
    <StoryFrame title="Input OTP" name={'Separator'} render={() => renderExample(InputOtpExamples['Separator'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input OTP example from packages/ljkui/examples/input-otp.examples.tsx.',
      },
    },
  },
};

export const InputOtpControlled: Story = {
  name: 'Input OTP / Controlled',
  render: () => (
    <StoryFrame title="Input OTP" name={'Controlled'} render={() => renderExample(InputOtpExamples['Controlled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input OTP example from packages/ljkui/examples/input-otp.examples.tsx.',
      },
    },
  },
};

export const InputSize: Story = {
  name: 'Input / Size',
  render: () => <StoryFrame title="Input" name={'Size'} render={() => renderExample(InputExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Input example from packages/ljkui/examples/input.examples.tsx.',
      },
    },
  },
};

export const InputVariant: Story = {
  name: 'Input / Variant',
  render: () => <StoryFrame title="Input" name={'Variant'} render={() => renderExample(InputExamples['Variant'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Input example from packages/ljkui/examples/input.examples.tsx.',
      },
    },
  },
};

export const InputColor: Story = {
  name: 'Input / Color',
  render: () => <StoryFrame title="Input" name={'Color'} render={() => renderExample(InputExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Input example from packages/ljkui/examples/input.examples.tsx.',
      },
    },
  },
};

export const InputWithSlot: Story = {
  name: 'Input / With Slot',
  render: () => (
    <StoryFrame title="Input" name={'With Slot'} render={() => renderExample(InputExamples['With Slot'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input example from packages/ljkui/examples/input.examples.tsx.',
      },
    },
  },
};

export const InsetReturn: Story = {
  name: 'Inset / return',
  render: () => <StoryFrame title="Inset" name={'return'} render={() => renderExample(InsetExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Inset example from packages/ljkui/examples/inset.examples.tsx.',
      },
    },
  },
};

export const ItemDefault: Story = {
  name: 'Item / Default',
  render: () => <StoryFrame title="Item" name={'Default'} render={() => renderExample(ItemExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Item example from packages/ljkui/examples/item.examples.tsx.',
      },
    },
  },
};

export const ItemGroup: Story = {
  name: 'Item / Group',
  render: () => <StoryFrame title="Item" name={'Group'} render={() => renderExample(ItemExamples['Group'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Item example from packages/ljkui/examples/item.examples.tsx.',
      },
    },
  },
};

export const ItemVariants: Story = {
  name: 'Item / Variants',
  render: () => <StoryFrame title="Item" name={'Variants'} render={() => renderExample(ItemExamples['Variants'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Item example from packages/ljkui/examples/item.examples.tsx.',
      },
    },
  },
};

export const ItemSizes: Story = {
  name: 'Item / Sizes',
  render: () => <StoryFrame title="Item" name={'Sizes'} render={() => renderExample(ItemExamples['Sizes'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Item example from packages/ljkui/examples/item.examples.tsx.',
      },
    },
  },
};

export const KbdSize: Story = {
  name: 'Kbd / Size',
  render: () => <StoryFrame title="Kbd" name={'Size'} render={() => renderExample(KbdExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Kbd example from packages/ljkui/examples/kbd.examples.tsx.',
      },
    },
  },
};

export const LightboxPadding: Story = {
  name: 'Lightbox / padding',
  render: () => (
    <StoryFrame title="Lightbox" name={'padding'} render={() => renderExample(LightboxExamples['padding'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxBorder: Story = {
  name: 'Lightbox / border',
  render: () => (
    <StoryFrame title="Lightbox" name={'border'} render={() => renderExample(LightboxExamples['border'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxCursor: Story = {
  name: 'Lightbox / cursor',
  render: () => (
    <StoryFrame title="Lightbox" name={'cursor'} render={() => renderExample(LightboxExamples['cursor'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxBackground: Story = {
  name: 'Lightbox / background',
  render: () => (
    <StoryFrame title="Lightbox" name={'background'} render={() => renderExample(LightboxExamples['background'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn2: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn3: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn4: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn5: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn6: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxIndex: Story = {
  name: 'Lightbox / index',
  render: () => <StoryFrame title="Lightbox" name={'index'} render={() => renderExample(LightboxExamples['index'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxImage: Story = {
  name: 'Lightbox / image',
  render: () => <StoryFrame title="Lightbox" name={'image'} render={() => renderExample(LightboxExamples['image'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn7: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn8: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxId: Story = {
  name: 'Lightbox / id',
  render: () => <StoryFrame title="Lightbox" name={'id'} render={() => renderExample(LightboxExamples['id'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxUser: Story = {
  name: 'Lightbox / user',
  render: () => <StoryFrame title="Lightbox" name={'user'} render={() => renderExample(LightboxExamples['user'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxText: Story = {
  name: 'Lightbox / text',
  render: () => <StoryFrame title="Lightbox" name={'text'} render={() => renderExample(LightboxExamples['text'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxTime: Story = {
  name: 'Lightbox / time',
  render: () => <StoryFrame title="Lightbox" name={'time'} render={() => renderExample(LightboxExamples['time'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxImages: Story = {
  name: 'Lightbox / images',
  render: () => (
    <StoryFrame title="Lightbox" name={'images'} render={() => renderExample(LightboxExamples['images'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxStats: Story = {
  name: 'Lightbox / stats',
  render: () => <StoryFrame title="Lightbox" name={'stats'} render={() => renderExample(LightboxExamples['stats'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxIf: Story = {
  name: 'Lightbox / if',
  render: () => <StoryFrame title="Lightbox" name={'if'} render={() => renderExample(LightboxExamples['if'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxPadding2: Story = {
  name: 'Lightbox / padding',
  render: () => (
    <StoryFrame title="Lightbox" name={'padding'} render={() => renderExample(LightboxExamples['padding'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxBorder2: Story = {
  name: 'Lightbox / border',
  render: () => (
    <StoryFrame title="Lightbox" name={'border'} render={() => renderExample(LightboxExamples['border'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxCursor2: Story = {
  name: 'Lightbox / cursor',
  render: () => (
    <StoryFrame title="Lightbox" name={'cursor'} render={() => renderExample(LightboxExamples['cursor'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxBackground2: Story = {
  name: 'Lightbox / background',
  render: () => (
    <StoryFrame title="Lightbox" name={'background'} render={() => renderExample(LightboxExamples['background'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxDisplay: Story = {
  name: 'Lightbox / display',
  render: () => (
    <StoryFrame title="Lightbox" name={'display'} render={() => renderExample(LightboxExamples['display'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxOverflow: Story = {
  name: 'Lightbox / overflow',
  render: () => (
    <StoryFrame title="Lightbox" name={'overflow'} render={() => renderExample(LightboxExamples['overflow'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxIf2: Story = {
  name: 'Lightbox / if',
  render: () => <StoryFrame title="Lightbox" name={'if'} render={() => renderExample(LightboxExamples['if'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxIf3: Story = {
  name: 'Lightbox / if',
  render: () => <StoryFrame title="Lightbox" name={'if'} render={() => renderExample(LightboxExamples['if'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxIf4: Story = {
  name: 'Lightbox / if',
  render: () => <StoryFrame title="Lightbox" name={'if'} render={() => renderExample(LightboxExamples['if'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxIf5: Story = {
  name: 'Lightbox / if',
  render: () => <StoryFrame title="Lightbox" name={'if'} render={() => renderExample(LightboxExamples['if'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxIf6: Story = {
  name: 'Lightbox / if',
  render: () => <StoryFrame title="Lightbox" name={'if'} render={() => renderExample(LightboxExamples['if'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxIf7: Story = {
  name: 'Lightbox / if',
  render: () => <StoryFrame title="Lightbox" name={'if'} render={() => renderExample(LightboxExamples['if'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn9: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn10: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn11: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn12: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn13: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn14: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn15: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn16: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn17: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn18: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn19: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn20: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn21: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn22: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn23: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn24: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn25: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn26: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxId2: Story = {
  name: 'Lightbox / id',
  render: () => <StoryFrame title="Lightbox" name={'id'} render={() => renderExample(LightboxExamples['id'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxLabel: Story = {
  name: 'Lightbox / label',
  render: () => <StoryFrame title="Lightbox" name={'label'} render={() => renderExample(LightboxExamples['label'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxTime2: Story = {
  name: 'Lightbox / time',
  render: () => <StoryFrame title="Lightbox" name={'time'} render={() => renderExample(LightboxExamples['time'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxType: Story = {
  name: 'Lightbox / type',
  render: () => <StoryFrame title="Lightbox" name={'type'} render={() => renderExample(LightboxExamples['type'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn27: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn28: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn29: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxMorphTo: Story = {
  name: 'Lightbox / morphTo',
  render: () => (
    <StoryFrame title="Lightbox" name={'morphTo'} render={() => renderExample(LightboxExamples['morphTo'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn30: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn31: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn32: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxReturn33: Story = {
  name: 'Lightbox / return',
  render: () => (
    <StoryFrame title="Lightbox" name={'return'} render={() => renderExample(LightboxExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxDefault: Story = {
  name: 'Lightbox / Default',
  render: () => (
    <StoryFrame title="Lightbox" name={'Default'} render={() => renderExample(LightboxExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxWithThumbnails: Story = {
  name: 'Lightbox / WithThumbnails',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'WithThumbnails'}
      render={() => renderExample(LightboxExamples['WithThumbnails'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxControlled: Story = {
  name: 'Lightbox / Controlled',
  render: () => (
    <StoryFrame title="Lightbox" name={'Controlled'} render={() => renderExample(LightboxExamples['Controlled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxImperativeAPI: Story = {
  name: 'Lightbox / ImperativeAPI',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'ImperativeAPI'}
      render={() => renderExample(LightboxExamples['ImperativeAPI'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxLazyLoading: Story = {
  name: 'Lightbox / LazyLoading',
  render: () => (
    <StoryFrame title="Lightbox" name={'LazyLoading'} render={() => renderExample(LightboxExamples['LazyLoading'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxWithScrollGallery: Story = {
  name: 'Lightbox / WithScrollGallery',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'WithScrollGallery'}
      render={() => renderExample(LightboxExamples['WithScrollGallery'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxWithinArticle: Story = {
  name: 'Lightbox / Within Article',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'Within Article'}
      render={() => renderExample(LightboxExamples['Within Article'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxSocialFeed: Story = {
  name: 'Lightbox / Social Feed',
  render: () => (
    <StoryFrame title="Lightbox" name={'Social Feed'} render={() => renderExample(LightboxExamples['Social Feed'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxRealEstateListing: Story = {
  name: 'Lightbox / Real Estate Listing',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'Real Estate Listing'}
      render={() => renderExample(LightboxExamples['Real Estate Listing'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxColorPalette: Story = {
  name: 'Lightbox / Color Palette',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'Color Palette'}
      render={() => renderExample(LightboxExamples['Color Palette'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxDesignFileInspector: Story = {
  name: 'Lightbox / Design File Inspector',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'Design File Inspector'}
      render={() => renderExample(LightboxExamples['Design File Inspector'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxFilmTrailers: Story = {
  name: 'Lightbox / Film Trailers',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'Film Trailers'}
      render={() => renderExample(LightboxExamples['Film Trailers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxTeamDirectory: Story = {
  name: 'Lightbox / Team Directory',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'Team Directory'}
      render={() => renderExample(LightboxExamples['Team Directory'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxLifecycleCallbacks: Story = {
  name: 'Lightbox / Lifecycle Callbacks',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'Lifecycle Callbacks'}
      render={() => renderExample(LightboxExamples['Lifecycle Callbacks'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxWithZoom: Story = {
  name: 'Lightbox / With Zoom',
  render: () => (
    <StoryFrame title="Lightbox" name={'With Zoom'} render={() => renderExample(LightboxExamples['With Zoom'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxScrollGalleryWithZoom: Story = {
  name: 'Lightbox / Scroll Gallery with Zoom',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'Scroll Gallery with Zoom'}
      render={() => renderExample(LightboxExamples['Scroll Gallery with Zoom'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxMorphToSetting: Story = {
  name: 'Lightbox / morphTo Setting',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'morphTo Setting'}
      render={() => renderExample(LightboxExamples['morphTo Setting'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxTextMessage: Story = {
  name: 'Lightbox / Text Message',
  render: () => (
    <StoryFrame title="Lightbox" name={'Text Message'} render={() => renderExample(LightboxExamples['Text Message'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LightboxPerfectMorph: Story = {
  name: 'Lightbox / Perfect Morph',
  render: () => (
    <StoryFrame
      title="Lightbox"
      name={'Perfect Morph'}
      render={() => renderExample(LightboxExamples['Perfect Morph'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightbox example from packages/ljkui/examples/lightbox.examples.tsx.',
      },
    },
  },
};

export const LinkSize: Story = {
  name: 'Link / Size',
  render: () => <StoryFrame title="Link" name={'Size'} render={() => renderExample(LinkExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Link example from packages/ljkui/examples/link.examples.tsx.',
      },
    },
  },
};

export const LinkColor: Story = {
  name: 'Link / Color',
  render: () => <StoryFrame title="Link" name={'Color'} render={() => renderExample(LinkExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Link example from packages/ljkui/examples/link.examples.tsx.',
      },
    },
  },
};

export const LinkUnderline: Story = {
  name: 'Link / Underline',
  render: () => <StoryFrame title="Link" name={'Underline'} render={() => renderExample(LinkExamples['Underline'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Link example from packages/ljkui/examples/link.examples.tsx.',
      },
    },
  },
};

export const LinkHighContrast: Story = {
  name: 'Link / High Contrast',
  render: () => (
    <StoryFrame title="Link" name={'High Contrast'} render={() => renderExample(LinkExamples['High Contrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Link example from packages/ljkui/examples/link.examples.tsx.',
      },
    },
  },
};

export const LinkAsButton: Story = {
  name: 'Link / As Button',
  render: () => <StoryFrame title="Link" name={'As Button'} render={() => renderExample(LinkExamples['As Button'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Link example from packages/ljkui/examples/link.examples.tsx.',
      },
    },
  },
};

export const MenubarDefault: Story = {
  name: 'Menubar / Default',
  render: () => (
    <StoryFrame title="Menubar" name={'Default'} render={() => renderExample(MenubarExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menubar example from packages/ljkui/examples/menubar.examples.tsx.',
      },
    },
  },
};

export const NavigationMenuDefault: Story = {
  name: 'Navigation Menu / Default',
  render: () => (
    <StoryFrame
      title="Navigation Menu"
      name={'Default'}
      render={() => renderExample(NavigationMenuExamples['Default'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation Menu example from packages/ljkui/examples/navigation-menu.examples.tsx.',
      },
    },
  },
};

export const NumberFieldSize: Story = {
  name: 'Number Field / Size',
  render: () => (
    <StoryFrame title="Number Field" name={'Size'} render={() => renderExample(NumberFieldExamples['Size'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldVariant: Story = {
  name: 'Number Field / Variant',
  render: () => (
    <StoryFrame title="Number Field" name={'Variant'} render={() => renderExample(NumberFieldExamples['Variant'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldButtonLayout: Story = {
  name: 'Number Field / Button Layout',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'Button Layout'}
      render={() => renderExample(NumberFieldExamples['Button Layout'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldWithSlot: Story = {
  name: 'Number Field / With Slot',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'With Slot'}
      render={() => renderExample(NumberFieldExamples['With Slot'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldColor: Story = {
  name: 'Number Field / Color',
  render: () => (
    <StoryFrame title="Number Field" name={'Color'} render={() => renderExample(NumberFieldExamples['Color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldMinMax: Story = {
  name: 'Number Field / Min / Max',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'Min / Max'}
      render={() => renderExample(NumberFieldExamples['Min / Max'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldAllowOutOfRange: Story = {
  name: 'Number Field / Allow Out of Range',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'Allow Out of Range'}
      render={() => renderExample(NumberFieldExamples['Allow Out of Range'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldStepConfiguration: Story = {
  name: 'Number Field / Step Configuration',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'Step Configuration'}
      render={() => renderExample(NumberFieldExamples['Step Configuration'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldFormatIntlNumberFormatOptions: Story = {
  name: 'Number Field / format (Intl.NumberFormatOptions)',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'format (Intl.NumberFormatOptions)'}
      render={() => renderExample(NumberFieldExamples['format (Intl.NumberFormatOptions)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldDisabled: Story = {
  name: 'Number Field / Disabled',
  render: () => (
    <StoryFrame title="Number Field" name={'Disabled'} render={() => renderExample(NumberFieldExamples['Disabled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldReadOnly: Story = {
  name: 'Number Field / ReadOnly',
  render: () => (
    <StoryFrame title="Number Field" name={'ReadOnly'} render={() => renderExample(NumberFieldExamples['ReadOnly'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldDisabledVsReadOnlyAccessibility: Story = {
  name: 'Number Field / Disabled vs ReadOnly (Accessibility)',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'Disabled vs ReadOnly (Accessibility)'}
      render={() => renderExample(NumberFieldExamples['Disabled vs ReadOnly (Accessibility)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldControlled: Story = {
  name: 'Number Field / Controlled',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'Controlled'}
      render={() => renderExample(NumberFieldExamples['Controlled'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldOnValueChangeVsOnValueCommitted: Story = {
  name: 'Number Field / onValueChange vs onValueCommitted',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'onValueChange vs onValueCommitted'}
      render={() => renderExample(NumberFieldExamples['onValueChange vs onValueCommitted'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldInputRef: Story = {
  name: 'Number Field / Input Ref',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'Input Ref'}
      render={() => renderExample(NumberFieldExamples['Input Ref'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const NumberFieldFormSubmission: Story = {
  name: 'Number Field / Form Submission',
  render: () => (
    <StoryFrame
      title="Number Field"
      name={'Form Submission'}
      render={() => renderExample(NumberFieldExamples['Form Submission'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number Field example from packages/ljkui/examples/number-field.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSProfile: Story = {
  name: 'Oscar / Oscar’s profile',
  render: () => (
    <StoryFrame title="Oscar" name={'Oscar’s profile'} render={() => renderExample(OscarExamples['Oscar’s profile'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSBadges: Story = {
  name: 'Oscar / Oscar’s badges',
  render: () => (
    <StoryFrame title="Oscar" name={'Oscar’s badges'} render={() => renderExample(OscarExamples['Oscar’s badges'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSGuestList: Story = {
  name: 'Oscar / Oscar’s guest list',
  render: () => (
    <StoryFrame
      title="Oscar"
      name={'Oscar’s guest list'}
      render={() => renderExample(OscarExamples['Oscar’s guest list'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSShortlist: Story = {
  name: 'Oscar / Oscar’s shortlist',
  render: () => (
    <StoryFrame
      title="Oscar"
      name={'Oscar’s shortlist'}
      render={() => renderExample(OscarExamples['Oscar’s shortlist'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSBallot: Story = {
  name: 'Oscar / Oscar’s ballot',
  render: () => (
    <StoryFrame title="Oscar" name={'Oscar’s ballot'} render={() => renderExample(OscarExamples['Oscar’s ballot'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSCampaignProgress: Story = {
  name: 'Oscar / Oscar’s campaign progress',
  render: () => (
    <StoryFrame
      title="Oscar"
      name={'Oscar’s campaign progress'}
      render={() => renderExample(OscarExamples['Oscar’s campaign progress'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSPreferences: Story = {
  name: 'Oscar / Oscar’s preferences',
  render: () => (
    <StoryFrame
      title="Oscar"
      name={'Oscar’s preferences'}
      render={() => renderExample(OscarExamples['Oscar’s preferences'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSAnnouncement: Story = {
  name: 'Oscar / Oscar’s announcement',
  render: () => (
    <StoryFrame
      title="Oscar"
      name={'Oscar’s announcement'}
      render={() => renderExample(OscarExamples['Oscar’s announcement'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSCategories: Story = {
  name: 'Oscar / Oscar’s categories',
  render: () => (
    <StoryFrame
      title="Oscar"
      name={'Oscar’s categories'}
      render={() => renderExample(OscarExamples['Oscar’s categories'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSAcceptanceSpeech: Story = {
  name: 'Oscar / Oscar’s acceptance speech',
  render: () => (
    <StoryFrame
      title="Oscar"
      name={'Oscar’s acceptance speech'}
      render={() => renderExample(OscarExamples['Oscar’s acceptance speech'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarOscarSShortcuts: Story = {
  name: 'Oscar / Oscar’s shortcuts',
  render: () => (
    <StoryFrame
      title="Oscar"
      name={'Oscar’s shortcuts'}
      render={() => renderExample(OscarExamples['Oscar’s shortcuts'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OscarNoOscarsFound: Story = {
  name: 'Oscar / No Oscars found',
  render: () => (
    <StoryFrame title="Oscar" name={'No Oscars found'} render={() => renderExample(OscarExamples['No Oscars found'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Oscar example from packages/ljkui/examples/oscar.examples.tsx.',
      },
    },
  },
};

export const OverlayReturn: Story = {
  name: 'Overlay / return',
  render: () => <StoryFrame title="Overlay" name={'return'} render={() => renderExample(OverlayExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Overlay example from packages/ljkui/examples/overlay.examples.tsx.',
      },
    },
  },
};

export const PaginationReturn: Story = {
  name: 'Pagination / return',
  render: () => (
    <StoryFrame title="Pagination" name={'return'} render={() => renderExample(PaginationExamples['return'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pagination example from packages/ljkui/examples/pagination.examples.tsx.',
      },
    },
  },
};

export const PaginationDefault: Story = {
  name: 'Pagination / Default',
  render: () => (
    <StoryFrame title="Pagination" name={'Default'} render={() => renderExample(PaginationExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pagination example from packages/ljkui/examples/pagination.examples.tsx.',
      },
    },
  },
};

export const PaginationWithEllipsis: Story = {
  name: 'Pagination / With ellipsis',
  render: () => (
    <StoryFrame
      title="Pagination"
      name={'With ellipsis'}
      render={() => renderExample(PaginationExamples['With ellipsis'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pagination example from packages/ljkui/examples/pagination.examples.tsx.',
      },
    },
  },
};

export const PaginationSizes: Story = {
  name: 'Pagination / Sizes',
  render: () => (
    <StoryFrame title="Pagination" name={'Sizes'} render={() => renderExample(PaginationExamples['Sizes'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pagination example from packages/ljkui/examples/pagination.examples.tsx.',
      },
    },
  },
};

export const PopoverReturn: Story = {
  name: 'Popover / return',
  render: () => <StoryFrame title="Popover" name={'return'} render={() => renderExample(PopoverExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverDefault: Story = {
  name: 'Popover / Default',
  render: () => (
    <StoryFrame title="Popover" name={'Default'} render={() => renderExample(PopoverExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverVariant: Story = {
  name: 'Popover / Variant',
  render: () => (
    <StoryFrame title="Popover" name={'Variant'} render={() => renderExample(PopoverExamples['Variant'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverWithInsetContent: Story = {
  name: 'Popover / With inset content',
  render: () => (
    <StoryFrame
      title="Popover"
      name={'With inset content'}
      render={() => renderExample(PopoverExamples['With inset content'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverOpeningOnHover: Story = {
  name: 'Popover / Opening on Hover',
  render: () => (
    <StoryFrame
      title="Popover"
      name={'Opening on Hover'}
      render={() => renderExample(PopoverExamples['Opening on Hover'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverDetachedTriggers: Story = {
  name: 'Popover / Detached Triggers',
  render: () => (
    <StoryFrame
      title="Popover"
      name={'Detached Triggers'}
      render={() => renderExample(PopoverExamples['Detached Triggers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverMultipleTriggersWithPayload: Story = {
  name: 'Popover / Multiple Triggers with Payload',
  render: () => (
    <StoryFrame
      title="Popover"
      name={'Multiple Triggers with Payload'}
      render={() => renderExample(PopoverExamples['Multiple Triggers with Payload'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverControlledModeWithMultipleTriggers: Story = {
  name: 'Popover / Controlled Mode with Multiple Triggers',
  render: () => (
    <StoryFrame
      title="Popover"
      name={'Controlled Mode with Multiple Triggers'}
      render={() => renderExample(PopoverExamples['Controlled Mode with Multiple Triggers'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverCustomAnchor: Story = {
  name: 'Popover / Custom Anchor',
  render: () => (
    <StoryFrame title="Popover" name={'Custom Anchor'} render={() => renderExample(PopoverExamples['Custom Anchor'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverDisableAnchorTracking: Story = {
  name: 'Popover / Disable Anchor Tracking',
  render: () => (
    <StoryFrame
      title="Popover"
      name={'Disable Anchor Tracking'}
      render={() => renderExample(PopoverExamples['Disable Anchor Tracking'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverSticky: Story = {
  name: 'Popover / Sticky',
  render: () => <StoryFrame title="Popover" name={'Sticky'} render={() => renderExample(PopoverExamples['Sticky'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverCollisionBoundary: Story = {
  name: 'Popover / Collision Boundary',
  render: () => (
    <StoryFrame
      title="Popover"
      name={'Collision Boundary'}
      render={() => renderExample(PopoverExamples['Collision Boundary'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverCollisionAvoidance: Story = {
  name: 'Popover / Collision Avoidance',
  render: () => (
    <StoryFrame
      title="Popover"
      name={'Collision Avoidance'}
      render={() => renderExample(PopoverExamples['Collision Avoidance'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverModalBehavior: Story = {
  name: 'Popover / Modal Behavior',
  render: () => (
    <StoryFrame
      title="Popover"
      name={'Modal Behavior'}
      render={() => renderExample(PopoverExamples['Modal Behavior'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverOpenChangeCallbacks: Story = {
  name: 'Popover / Open Change Callbacks',
  render: () => (
    <StoryFrame
      title="Popover"
      name={'Open Change Callbacks'}
      render={() => renderExample(PopoverExamples['Open Change Callbacks'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverActionsRef: Story = {
  name: 'Popover / Actions Ref',
  render: () => (
    <StoryFrame title="Popover" name={'Actions Ref'} render={() => renderExample(PopoverExamples['Actions Ref'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverFinalFocus: Story = {
  name: 'Popover / Final Focus',
  render: () => (
    <StoryFrame title="Popover" name={'Final Focus'} render={() => renderExample(PopoverExamples['Final Focus'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PopoverInitialFocus: Story = {
  name: 'Popover / Initial Focus',
  render: () => (
    <StoryFrame title="Popover" name={'Initial Focus'} render={() => renderExample(PopoverExamples['Initial Focus'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover example from packages/ljkui/examples/popover.examples.tsx.',
      },
    },
  },
};

export const PortalDefault: Story = {
  name: 'Portal / Default',
  render: () => <StoryFrame title="Portal" name={'Default'} render={() => renderExample(PortalExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Portal example from packages/ljkui/examples/portal.examples.tsx.',
      },
    },
  },
};

export const PortalCustomContainer: Story = {
  name: 'Portal / Custom Container',
  render: () => (
    <StoryFrame
      title="Portal"
      name={'Custom Container'}
      render={() => renderExample(PortalExamples['Custom Container'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Portal example from packages/ljkui/examples/portal.examples.tsx.',
      },
    },
  },
};

export const PortalWithRenderProp: Story = {
  name: 'Portal / With Render Prop',
  render: () => (
    <StoryFrame
      title="Portal"
      name={'With Render Prop'}
      render={() => renderExample(PortalExamples['With Render Prop'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Portal example from packages/ljkui/examples/portal.examples.tsx.',
      },
    },
  },
};

export const PortalModalExample: Story = {
  name: 'Portal / Modal Example',
  render: () => (
    <StoryFrame title="Portal" name={'Modal Example'} render={() => renderExample(PortalExamples['Modal Example'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Portal example from packages/ljkui/examples/portal.examples.tsx.',
      },
    },
  },
};

export const PortalToastNotifications: Story = {
  name: 'Portal / Toast Notifications',
  render: () => (
    <StoryFrame
      title="Portal"
      name={'Toast Notifications'}
      render={() => renderExample(PortalExamples['Toast Notifications'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Portal example from packages/ljkui/examples/portal.examples.tsx.',
      },
    },
  },
};

export const ProgressSize: Story = {
  name: 'Progress / Size',
  render: () => <StoryFrame title="Progress" name={'Size'} render={() => renderExample(ProgressExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Progress example from packages/ljkui/examples/progress.examples.tsx.',
      },
    },
  },
};

export const ProgressColor: Story = {
  name: 'Progress / Color',
  render: () => <StoryFrame title="Progress" name={'Color'} render={() => renderExample(ProgressExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Progress example from packages/ljkui/examples/progress.examples.tsx.',
      },
    },
  },
};

export const ProgressHighContrast: Story = {
  name: 'Progress / High Contrast',
  render: () => (
    <StoryFrame
      title="Progress"
      name={'High Contrast'}
      render={() => renderExample(ProgressExamples['High Contrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress example from packages/ljkui/examples/progress.examples.tsx.',
      },
    },
  },
};

export const QuoteReturn: Story = {
  name: 'Quote / return',
  render: () => <StoryFrame title="Quote" name={'return'} render={() => renderExample(QuoteExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Quote example from packages/ljkui/examples/quote.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupStarter: Story = {
  name: 'Radio Button Group / starter',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'starter'}
      render={() => renderExample(RadioButtonGroupExamples['starter'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupPro: Story = {
  name: 'Radio Button Group / pro',
  render: () => (
    <StoryFrame title="Radio Button Group" name={'pro'} render={() => renderExample(RadioButtonGroupExamples['pro'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupEnterprise: Story = {
  name: 'Radio Button Group / enterprise',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'enterprise'}
      render={() => renderExample(RadioButtonGroupExamples['enterprise'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupHighContrast: Story = {
  name: 'Radio Button Group / HighContrast',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'HighContrast'}
      render={() => renderExample(RadioButtonGroupExamples['HighContrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupWithCard: Story = {
  name: 'Radio Button Group / WithCard',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'WithCard'}
      render={() => renderExample(RadioButtonGroupExamples['WithCard'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupColor: Story = {
  name: 'Radio Button Group / Color',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'Color'}
      render={() => renderExample(RadioButtonGroupExamples['Color'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupDisabledGroup: Story = {
  name: 'Radio Button Group / Disabled (Group)',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'Disabled (Group)'}
      render={() => renderExample(RadioButtonGroupExamples['Disabled (Group)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupDisabledSingleItem: Story = {
  name: 'Radio Button Group / Disabled (Single Item)',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'Disabled (Single Item)'}
      render={() => renderExample(RadioButtonGroupExamples['Disabled (Single Item)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupOnValueChangeTypeScript: Story = {
  name: 'Radio Button Group / onValueChange (TypeScript)',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'onValueChange (TypeScript)'}
      render={() => renderExample(RadioButtonGroupExamples['onValueChange (TypeScript)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupOnValueChangeEventDetails: Story = {
  name: 'Radio Button Group / onValueChange (Event Details)',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'onValueChange (Event Details)'}
      render={() => renderExample(RadioButtonGroupExamples['onValueChange (Event Details)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupFormName: Story = {
  name: 'Radio Button Group / Form Name',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'Form Name'}
      render={() => renderExample(RadioButtonGroupExamples['Form Name'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupInputRefGroup: Story = {
  name: 'Radio Button Group / Input Ref (Group)',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'Input Ref (Group)'}
      render={() => renderExample(RadioButtonGroupExamples['Input Ref (Group)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioButtonGroupTypeSafeValues: Story = {
  name: 'Radio Button Group / Type-Safe Values',
  render: () => (
    <StoryFrame
      title="Radio Button Group"
      name={'Type-Safe Values'}
      render={() => renderExample(RadioButtonGroupExamples['Type-Safe Values'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Button Group example from packages/ljkui/examples/radio-button-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupStandard: Story = {
  name: 'Radio Group / standard',
  render: () => (
    <StoryFrame title="Radio Group" name={'standard'} render={() => renderExample(RadioGroupExamples['standard'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupExpress: Story = {
  name: 'Radio Group / express',
  render: () => (
    <StoryFrame title="Radio Group" name={'express'} render={() => renderExample(RadioGroupExamples['express'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupOvernight: Story = {
  name: 'Radio Group / overnight',
  render: () => (
    <StoryFrame title="Radio Group" name={'overnight'} render={() => renderExample(RadioGroupExamples['overnight'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupId: Story = {
  name: 'Radio Group / id',
  render: () => <StoryFrame title="Radio Group" name={'id'} render={() => renderExample(RadioGroupExamples['id'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupName: Story = {
  name: 'Radio Group / name',
  render: () => (
    <StoryFrame title="Radio Group" name={'name'} render={() => renderExample(RadioGroupExamples['name'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupPrice: Story = {
  name: 'Radio Group / price',
  render: () => (
    <StoryFrame title="Radio Group" name={'price'} render={() => renderExample(RadioGroupExamples['price'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupFeatures: Story = {
  name: 'Radio Group / features',
  render: () => (
    <StoryFrame title="Radio Group" name={'features'} render={() => renderExample(RadioGroupExamples['features'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupComposed: Story = {
  name: 'Radio Group / Composed',
  render: () => (
    <StoryFrame title="Radio Group" name={'Composed'} render={() => renderExample(RadioGroupExamples['Composed'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupSize: Story = {
  name: 'Radio Group / Size',
  render: () => (
    <StoryFrame title="Radio Group" name={'Size'} render={() => renderExample(RadioGroupExamples['Size'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupColor: Story = {
  name: 'Radio Group / Color',
  render: () => (
    <StoryFrame title="Radio Group" name={'Color'} render={() => renderExample(RadioGroupExamples['Color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupHighContrast: Story = {
  name: 'Radio Group / High Contrast',
  render: () => (
    <StoryFrame
      title="Radio Group"
      name={'High Contrast'}
      render={() => renderExample(RadioGroupExamples['High Contrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupAlignmentWithText: Story = {
  name: 'Radio Group / Alignment with text',
  render: () => (
    <StoryFrame
      title="Radio Group"
      name={'Alignment with text'}
      render={() => renderExample(RadioGroupExamples['Alignment with text'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupDisabledGroup: Story = {
  name: 'Radio Group / Disabled (Group)',
  render: () => (
    <StoryFrame
      title="Radio Group"
      name={'Disabled (Group)'}
      render={() => renderExample(RadioGroupExamples['Disabled (Group)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupDisabledSingleItem: Story = {
  name: 'Radio Group / Disabled (Single Item)',
  render: () => (
    <StoryFrame
      title="Radio Group"
      name={'Disabled (Single Item)'}
      render={() => renderExample(RadioGroupExamples['Disabled (Single Item)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupInputRefGroup: Story = {
  name: 'Radio Group / Input Ref (Group)',
  render: () => (
    <StoryFrame
      title="Radio Group"
      name={'Input Ref (Group)'}
      render={() => renderExample(RadioGroupExamples['Input Ref (Group)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupInputRefItem: Story = {
  name: 'Radio Group / Input Ref (Item)',
  render: () => (
    <StoryFrame
      title="Radio Group"
      name={'Input Ref (Item)'}
      render={() => renderExample(RadioGroupExamples['Input Ref (Item)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupOnValueChangeTypeScript: Story = {
  name: 'Radio Group / onValueChange (TypeScript)',
  render: () => (
    <StoryFrame
      title="Radio Group"
      name={'onValueChange (TypeScript)'}
      render={() => renderExample(RadioGroupExamples['onValueChange (TypeScript)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupOnValueChangeEventDetails: Story = {
  name: 'Radio Group / onValueChange (Event Details)',
  render: () => (
    <StoryFrame
      title="Radio Group"
      name={'onValueChange (Event Details)'}
      render={() => renderExample(RadioGroupExamples['onValueChange (Event Details)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupFormName: Story = {
  name: 'Radio Group / Form Name',
  render: () => (
    <StoryFrame title="Radio Group" name={'Form Name'} render={() => renderExample(RadioGroupExamples['Form Name'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupObjectValues: Story = {
  name: 'Radio Group / Object Values',
  render: () => (
    <StoryFrame
      title="Radio Group"
      name={'Object Values'}
      render={() => renderExample(RadioGroupExamples['Object Values'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RadioGroupTypeSafeValues: Story = {
  name: 'Radio Group / Type-Safe Values',
  render: () => (
    <StoryFrame
      title="Radio Group"
      name={'Type-Safe Values'}
      render={() => renderExample(RadioGroupExamples['Type-Safe Values'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio Group example from packages/ljkui/examples/radio-group.examples.tsx.',
      },
    },
  },
};

export const RangeCalendarDefault: Story = {
  name: 'Range Calendar / Default',
  render: () => (
    <StoryFrame
      title="Range Calendar"
      name={'Default'}
      render={() => renderExample(RangeCalendarExamples['Default'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Range Calendar example from packages/ljkui/examples/range-calendar.examples.tsx.',
      },
    },
  },
};

export const RangeCalendarDisabled: Story = {
  name: 'Range Calendar / Disabled',
  render: () => (
    <StoryFrame
      title="Range Calendar"
      name={'Disabled'}
      render={() => renderExample(RangeCalendarExamples['Disabled'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Range Calendar example from packages/ljkui/examples/range-calendar.examples.tsx.',
      },
    },
  },
};

export const RangeCalendarUnavailableDates: Story = {
  name: 'Range Calendar / Unavailable Dates',
  render: () => (
    <StoryFrame
      title="Range Calendar"
      name={'Unavailable Dates'}
      render={() => renderExample(RangeCalendarExamples['Unavailable Dates'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Range Calendar example from packages/ljkui/examples/range-calendar.examples.tsx.',
      },
    },
  },
};

export const ResizableHeight: Story = {
  name: 'Resizable / height',
  render: () => (
    <StoryFrame title="Resizable" name={'height'} render={() => renderExample(ResizableExamples['height'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resizable example from packages/ljkui/examples/resizable.examples.tsx.',
      },
    },
  },
};

export const ResizableBorderRadius: Story = {
  name: 'Resizable / borderRadius',
  render: () => (
    <StoryFrame
      title="Resizable"
      name={'borderRadius'}
      render={() => renderExample(ResizableExamples['borderRadius'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resizable example from packages/ljkui/examples/resizable.examples.tsx.',
      },
    },
  },
};

export const ResizableBoxShadow: Story = {
  name: 'Resizable / boxShadow',
  render: () => (
    <StoryFrame title="Resizable" name={'boxShadow'} render={() => renderExample(ResizableExamples['boxShadow'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resizable example from packages/ljkui/examples/resizable.examples.tsx.',
      },
    },
  },
};

export const ResizableHorizontal: Story = {
  name: 'Resizable / Horizontal',
  render: () => (
    <StoryFrame title="Resizable" name={'Horizontal'} render={() => renderExample(ResizableExamples['Horizontal'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resizable example from packages/ljkui/examples/resizable.examples.tsx.',
      },
    },
  },
};

export const ResizableVertical: Story = {
  name: 'Resizable / Vertical',
  render: () => (
    <StoryFrame title="Resizable" name={'Vertical'} render={() => renderExample(ResizableExamples['Vertical'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resizable example from packages/ljkui/examples/resizable.examples.tsx.',
      },
    },
  },
};

export const ResizableThreePanels: Story = {
  name: 'Resizable / Three panels',
  render: () => (
    <StoryFrame
      title="Resizable"
      name={'Three panels'}
      render={() => renderExample(ResizableExamples['Three panels'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resizable example from packages/ljkui/examples/resizable.examples.tsx.',
      },
    },
  },
};

export const ScrollAreaTypeVisibilityBehavior: Story = {
  name: 'Scroll Area / Type (Visibility Behavior)',
  render: () => (
    <StoryFrame
      title="Scroll Area"
      name={'Type (Visibility Behavior)'}
      render={() => renderExample(ScrollAreaExamples['Type (Visibility Behavior)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Scroll Area example from packages/ljkui/examples/scroll-area.examples.tsx.',
      },
    },
  },
};

export const ScrollAreaSize: Story = {
  name: 'Scroll Area / Size',
  render: () => (
    <StoryFrame title="Scroll Area" name={'Size'} render={() => renderExample(ScrollAreaExamples['Size'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Scroll Area example from packages/ljkui/examples/scroll-area.examples.tsx.',
      },
    },
  },
};

export const ScrollAreaScrollbars: Story = {
  name: 'Scroll Area / Scrollbars',
  render: () => (
    <StoryFrame
      title="Scroll Area"
      name={'Scrollbars'}
      render={() => renderExample(ScrollAreaExamples['Scrollbars'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Scroll Area example from packages/ljkui/examples/scroll-area.examples.tsx.',
      },
    },
  },
};

export const ScrollAreaBothScrollbars: Story = {
  name: 'Scroll Area / Both Scrollbars',
  render: () => (
    <StoryFrame
      title="Scroll Area"
      name={'Both Scrollbars'}
      render={() => renderExample(ScrollAreaExamples['Both Scrollbars'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Scroll Area example from packages/ljkui/examples/scroll-area.examples.tsx.',
      },
    },
  },
};

export const ScrollAreaScrollableElementRef: Story = {
  name: 'Scroll Area / Scrollable Element Ref',
  render: () => (
    <StoryFrame
      title="Scroll Area"
      name={'Scrollable Element Ref'}
      render={() => renderExample(ScrollAreaExamples['Scrollable Element Ref'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Scroll Area example from packages/ljkui/examples/scroll-area.examples.tsx.',
      },
    },
  },
};

export const SelectUSD: Story = {
  name: 'Select / USD',
  render: () => <StoryFrame title="Select" name={'USD'} render={() => renderExample(SelectExamples['USD'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectEUR: Story = {
  name: 'Select / EUR',
  render: () => <StoryFrame title="Select" name={'EUR'} render={() => renderExample(SelectExamples['EUR'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectGBP: Story = {
  name: 'Select / GBP',
  render: () => <StoryFrame title="Select" name={'GBP'} render={() => renderExample(SelectExamples['GBP'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectJPY: Story = {
  name: 'Select / JPY',
  render: () => <StoryFrame title="Select" name={'JPY'} render={() => renderExample(SelectExamples['JPY'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectCAD: Story = {
  name: 'Select / CAD',
  render: () => <StoryFrame title="Select" name={'CAD'} render={() => renderExample(SelectExamples['CAD'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectJavascript: Story = {
  name: 'Select / javascript',
  render: () => (
    <StoryFrame title="Select" name={'javascript'} render={() => renderExample(SelectExamples['javascript'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectTypescript: Story = {
  name: 'Select / typescript',
  render: () => (
    <StoryFrame title="Select" name={'typescript'} render={() => renderExample(SelectExamples['typescript'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectPython: Story = {
  name: 'Select / python',
  render: () => <StoryFrame title="Select" name={'python'} render={() => renderExample(SelectExamples['python'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectJava: Story = {
  name: 'Select / java',
  render: () => <StoryFrame title="Select" name={'java'} render={() => renderExample(SelectExamples['java'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectCsharp: Story = {
  name: 'Select / csharp',
  render: () => <StoryFrame title="Select" name={'csharp'} render={() => renderExample(SelectExamples['csharp'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectPhp: Story = {
  name: 'Select / php',
  render: () => <StoryFrame title="Select" name={'php'} render={() => renderExample(SelectExamples['php'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectCpp: Story = {
  name: 'Select / cpp',
  render: () => <StoryFrame title="Select" name={'cpp'} render={() => renderExample(SelectExamples['cpp'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectRust: Story = {
  name: 'Select / rust',
  render: () => <StoryFrame title="Select" name={'rust'} render={() => renderExample(SelectExamples['rust'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectGo: Story = {
  name: 'Select / go',
  render: () => <StoryFrame title="Select" name={'go'} render={() => renderExample(SelectExamples['go'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectSwift: Story = {
  name: 'Select / swift',
  render: () => <StoryFrame title="Select" name={'swift'} render={() => renderExample(SelectExamples['swift'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectId: Story = {
  name: 'Select / id',
  render: () => <StoryFrame title="Select" name={'id'} render={() => renderExample(SelectExamples['id'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectName: Story = {
  name: 'Select / name',
  render: () => <StoryFrame title="Select" name={'name'} render={() => renderExample(SelectExamples['name'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectDuration: Story = {
  name: 'Select / duration',
  render: () => (
    <StoryFrame title="Select" name={'duration'} render={() => renderExample(SelectExamples['duration'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectPrice: Story = {
  name: 'Select / price',
  render: () => <StoryFrame title="Select" name={'price'} render={() => renderExample(SelectExamples['price'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectSize: Story = {
  name: 'Select / Size',
  render: () => <StoryFrame title="Select" name={'Size'} render={() => renderExample(SelectExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectTriggerVariant: Story = {
  name: 'Select / TriggerVariant',
  render: () => (
    <StoryFrame title="Select" name={'TriggerVariant'} render={() => renderExample(SelectExamples['TriggerVariant'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectColor: Story = {
  name: 'Select / Color',
  render: () => <StoryFrame title="Select" name={'Color'} render={() => renderExample(SelectExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectPlaceholder: Story = {
  name: 'Select / Placeholder',
  render: () => (
    <StoryFrame title="Select" name={'Placeholder'} render={() => renderExample(SelectExamples['Placeholder'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectHighContrast: Story = {
  name: 'Select / High Contrast',
  render: () => (
    <StoryFrame title="Select" name={'High Contrast'} render={() => renderExample(SelectExamples['High Contrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectFormattingTheValue: Story = {
  name: 'Select / Formatting the Value',
  render: () => (
    <StoryFrame
      title="Select"
      name={'Formatting the Value'}
      render={() => renderExample(SelectExamples['Formatting the Value'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectDropdownPositioning: Story = {
  name: 'Select / Dropdown Positioning',
  render: () => (
    <StoryFrame
      title="Select"
      name={'Dropdown Positioning'}
      render={() => renderExample(SelectExamples['Dropdown Positioning'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectSideAndAlign: Story = {
  name: 'Select / Side and Align',
  render: () => (
    <StoryFrame title="Select" name={'Side and Align'} render={() => renderExample(SelectExamples['Side and Align'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectSideOffsetAndAlignOffset: Story = {
  name: 'Select / Side Offset and Align Offset',
  render: () => (
    <StoryFrame
      title="Select"
      name={'Side Offset and Align Offset'}
      render={() => renderExample(SelectExamples['Side Offset and Align Offset'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectControlledMode: Story = {
  name: 'Select / Controlled Mode',
  render: () => (
    <StoryFrame
      title="Select"
      name={'Controlled Mode'}
      render={() => renderExample(SelectExamples['Controlled Mode'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectManyItems: Story = {
  name: 'Select / Many Items',
  render: () => (
    <StoryFrame title="Select" name={'Many Items'} render={() => renderExample(SelectExamples['Many Items'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectMultipleSelection: Story = {
  name: 'Select / Multiple Selection',
  render: () => (
    <StoryFrame
      title="Select"
      name={'Multiple Selection'}
      render={() => renderExample(SelectExamples['Multiple Selection'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectControlled: Story = {
  name: 'Select / Controlled',
  render: () => (
    <StoryFrame title="Select" name={'Controlled'} render={() => renderExample(SelectExamples['Controlled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SelectObjectValues: Story = {
  name: 'Select / Object Values',
  render: () => (
    <StoryFrame title="Select" name={'Object Values'} render={() => renderExample(SelectExamples['Object Values'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select example from packages/ljkui/examples/select.examples.tsx.',
      },
    },
  },
};

export const SeparatorSize: Story = {
  name: 'Separator / Size',
  render: () => <StoryFrame title="Separator" name={'Size'} render={() => renderExample(SeparatorExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Separator example from packages/ljkui/examples/separator.examples.tsx.',
      },
    },
  },
};

export const SeparatorColor: Story = {
  name: 'Separator / Color',
  render: () => (
    <StoryFrame title="Separator" name={'Color'} render={() => renderExample(SeparatorExamples['Color'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separator example from packages/ljkui/examples/separator.examples.tsx.',
      },
    },
  },
};

export const SeparatorOrientation: Story = {
  name: 'Separator / Orientation',
  render: () => (
    <StoryFrame title="Separator" name={'Orientation'} render={() => renderExample(SeparatorExamples['Orientation'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separator example from packages/ljkui/examples/separator.examples.tsx.',
      },
    },
  },
};

export const SheetDefault: Story = {
  name: 'Sheet / Default',
  render: () => <StoryFrame title="Sheet" name={'Default'} render={() => renderExample(SheetExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetNested: Story = {
  name: 'Sheet / Nested',
  render: () => <StoryFrame title="Sheet" name={'Nested'} render={() => renderExample(SheetExamples['Nested'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetWithInsetContent: Story = {
  name: 'Sheet / With inset content',
  render: () => (
    <StoryFrame
      title="Sheet"
      name={'With inset content'}
      render={() => renderExample(SheetExamples['With inset content'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetScrollableContent: Story = {
  name: 'Sheet / Scrollable content',
  render: () => (
    <StoryFrame
      title="Sheet"
      name={'Scrollable content'}
      render={() => renderExample(SheetExamples['Scrollable content'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetControlledNonDismissable: Story = {
  name: 'Sheet / Controlled (non dismissable)',
  render: () => (
    <StoryFrame
      title="Sheet"
      name={'Controlled (non dismissable)'}
      render={() => renderExample(SheetExamples['Controlled (non dismissable)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetInitialFocus: Story = {
  name: 'Sheet / Initial Focus',
  render: () => (
    <StoryFrame title="Sheet" name={'Initial Focus'} render={() => renderExample(SheetExamples['Initial Focus'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetFinalFocus: Story = {
  name: 'Sheet / Final Focus',
  render: () => (
    <StoryFrame title="Sheet" name={'Final Focus'} render={() => renderExample(SheetExamples['Final Focus'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetPreventFocusOnClose: Story = {
  name: 'Sheet / Prevent Focus on Close',
  render: () => (
    <StoryFrame
      title="Sheet"
      name={'Prevent Focus on Close'}
      render={() => renderExample(SheetExamples['Prevent Focus on Close'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetControlledWithForm: Story = {
  name: 'Sheet / Controlled with Form',
  render: () => (
    <StoryFrame
      title="Sheet"
      name={'Controlled with Form'}
      render={() => renderExample(SheetExamples['Controlled with Form'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetOpenChangeCallbacks: Story = {
  name: 'Sheet / Open Change Callbacks',
  render: () => (
    <StoryFrame
      title="Sheet"
      name={'Open Change Callbacks'}
      render={() => renderExample(SheetExamples['Open Change Callbacks'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetCloseConfirmation: Story = {
  name: 'Sheet / Close Confirmation',
  render: () => (
    <StoryFrame
      title="Sheet"
      name={'Close Confirmation'}
      render={() => renderExample(SheetExamples['Close Confirmation'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetSheetFromDropdownMenu: Story = {
  name: 'Sheet / Sheet from Dropdown Menu',
  render: () => (
    <StoryFrame
      title="Sheet"
      name={'Sheet from Dropdown Menu'}
      render={() => renderExample(SheetExamples['Sheet from Dropdown Menu'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const SheetSheetTriggerInDropdownMenu: Story = {
  name: 'Sheet / Sheet Trigger in Dropdown Menu',
  render: () => (
    <StoryFrame
      title="Sheet"
      name={'Sheet Trigger in Dropdown Menu'}
      render={() => renderExample(SheetExamples['Sheet Trigger in Dropdown Menu'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet example from packages/ljkui/examples/sheet.examples.tsx.',
      },
    },
  },
};

export const ShineReturn: Story = {
  name: 'Shine / return',
  render: () => <StoryFrame title="Shine" name={'return'} render={() => renderExample(ShineExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Shine example from packages/ljkui/examples/shine.examples.tsx.',
      },
    },
  },
};

export const SidebarWorkspace: Story = {
  name: 'Sidebar / Workspace',
  render: () => (
    <StoryFrame title="Sidebar" name={'Workspace'} render={() => renderExample(SidebarExamples['Workspace'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar example from packages/ljkui/examples/sidebar.examples.tsx.',
      },
    },
  },
};

export const SidebarAccount: Story = {
  name: 'Sidebar / Account',
  render: () => (
    <StoryFrame title="Sidebar" name={'Account'} render={() => renderExample(SidebarExamples['Account'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar example from packages/ljkui/examples/sidebar.examples.tsx.',
      },
    },
  },
};

export const SidebarReturn: Story = {
  name: 'Sidebar / return',
  render: () => <StoryFrame title="Sidebar" name={'return'} render={() => renderExample(SidebarExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Sidebar example from packages/ljkui/examples/sidebar.examples.tsx.',
      },
    },
  },
};

export const SidebarDefault: Story = {
  name: 'Sidebar / Default',
  render: () => (
    <StoryFrame title="Sidebar" name={'Default'} render={() => renderExample(SidebarExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar example from packages/ljkui/examples/sidebar.examples.tsx.',
      },
    },
  },
};

export const SidebarCollapseToIconRail: Story = {
  name: 'Sidebar / Collapse to icon rail',
  render: () => (
    <StoryFrame
      title="Sidebar"
      name={'Collapse to icon rail'}
      render={() => renderExample(SidebarExamples['Collapse to icon rail'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar example from packages/ljkui/examples/sidebar.examples.tsx.',
      },
    },
  },
};

export const SidebarNotCollapsible: Story = {
  name: 'Sidebar / Not collapsible',
  render: () => (
    <StoryFrame
      title="Sidebar"
      name={'Not collapsible'}
      render={() => renderExample(SidebarExamples['Not collapsible'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar example from packages/ljkui/examples/sidebar.examples.tsx.',
      },
    },
  },
};

export const SkeletonLabel: Story = {
  name: 'Skeleton / label',
  render: () => <StoryFrame title="Skeleton" name={'label'} render={() => renderExample(SkeletonExamples['label'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonRender: Story = {
  name: 'Skeleton / render',
  render: () => (
    <StoryFrame title="Skeleton" name={'render'} render={() => renderExample(SkeletonExamples['render'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonAvatar: Story = {
  name: 'Skeleton / Avatar',
  render: () => (
    <StoryFrame title="Skeleton" name={'Avatar'} render={() => renderExample(SkeletonExamples['Avatar'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonAvatarSizes: Story = {
  name: 'Skeleton / Avatar sizes',
  render: () => (
    <StoryFrame title="Skeleton" name={'Avatar sizes'} render={() => renderExample(SkeletonExamples['Avatar sizes'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonAvatarColors: Story = {
  name: 'Skeleton / Avatar colors',
  render: () => (
    <StoryFrame
      title="Skeleton"
      name={'Avatar colors'}
      render={() => renderExample(SkeletonExamples['Avatar colors'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonAvatarHighContrast: Story = {
  name: 'Skeleton / Avatar high contrast',
  render: () => (
    <StoryFrame
      title="Skeleton"
      name={'Avatar high contrast'}
      render={() => renderExample(SkeletonExamples['Avatar high contrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonText: Story = {
  name: 'Skeleton / Text',
  render: () => <StoryFrame title="Skeleton" name={'Text'} render={() => renderExample(SkeletonExamples['Text'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonTextSizes: Story = {
  name: 'Skeleton / Text sizes',
  render: () => (
    <StoryFrame title="Skeleton" name={'Text sizes'} render={() => renderExample(SkeletonExamples['Text sizes'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonTextColors: Story = {
  name: 'Skeleton / Text colors',
  render: () => (
    <StoryFrame title="Skeleton" name={'Text colors'} render={() => renderExample(SkeletonExamples['Text colors'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonTextHighContrast: Story = {
  name: 'Skeleton / Text high contrast',
  render: () => (
    <StoryFrame
      title="Skeleton"
      name={'Text high contrast'}
      render={() => renderExample(SkeletonExamples['Text high contrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonRect: Story = {
  name: 'Skeleton / Rect',
  render: () => <StoryFrame title="Skeleton" name={'Rect'} render={() => renderExample(SkeletonExamples['Rect'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonRectColors: Story = {
  name: 'Skeleton / Rect colors',
  render: () => (
    <StoryFrame title="Skeleton" name={'Rect colors'} render={() => renderExample(SkeletonExamples['Rect colors'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonRectHighContrast: Story = {
  name: 'Skeleton / Rect high contrast',
  render: () => (
    <StoryFrame
      title="Skeleton"
      name={'Rect high contrast'}
      render={() => renderExample(SkeletonExamples['Rect high contrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonSyncedAnimation: Story = {
  name: 'Skeleton / Synced animation',
  render: () => (
    <StoryFrame
      title="Skeleton"
      name={'Synced animation'}
      render={() => renderExample(SkeletonExamples['Synced animation'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonComposed: Story = {
  name: 'Skeleton / Composed',
  render: () => (
    <StoryFrame title="Skeleton" name={'Composed'} render={() => renderExample(SkeletonExamples['Composed'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SkeletonComposedColor: Story = {
  name: 'Skeleton / Composed color',
  render: () => (
    <StoryFrame
      title="Skeleton"
      name={'Composed color'}
      render={() => renderExample(SkeletonExamples['Composed color'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton example from packages/ljkui/examples/skeleton.examples.tsx.',
      },
    },
  },
};

export const SliderSize: Story = {
  name: 'Slider / Size',
  render: () => <StoryFrame title="Slider" name={'Size'} render={() => renderExample(SliderExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Slider example from packages/ljkui/examples/slider.examples.tsx.',
      },
    },
  },
};

export const SliderColor: Story = {
  name: 'Slider / Color',
  render: () => <StoryFrame title="Slider" name={'Color'} render={() => renderExample(SliderExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Slider example from packages/ljkui/examples/slider.examples.tsx.',
      },
    },
  },
};

export const SliderHighContrast: Story = {
  name: 'Slider / High Contrast',
  render: () => (
    <StoryFrame title="Slider" name={'High Contrast'} render={() => renderExample(SliderExamples['High Contrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Slider example from packages/ljkui/examples/slider.examples.tsx.',
      },
    },
  },
};

export const SliderRange: Story = {
  name: 'Slider / Range',
  render: () => <StoryFrame title="Slider" name={'Range'} render={() => renderExample(SliderExamples['Range'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Slider example from packages/ljkui/examples/slider.examples.tsx.',
      },
    },
  },
};

export const SliderOrientation: Story = {
  name: 'Slider / Orientation',
  render: () => (
    <StoryFrame title="Slider" name={'Orientation'} render={() => renderExample(SliderExamples['Orientation'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Slider example from packages/ljkui/examples/slider.examples.tsx.',
      },
    },
  },
};

export const SliderValueCallbacks: Story = {
  name: 'Slider / Value Callbacks',
  render: () => (
    <StoryFrame
      title="Slider"
      name={'Value Callbacks'}
      render={() => renderExample(SliderExamples['Value Callbacks'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Slider example from packages/ljkui/examples/slider.examples.tsx.',
      },
    },
  },
};

export const SliderMinStepsBetweenValues: Story = {
  name: 'Slider / Min Steps Between Values',
  render: () => (
    <StoryFrame
      title="Slider"
      name={'Min Steps Between Values'}
      render={() => renderExample(SliderExamples['Min Steps Between Values'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Slider example from packages/ljkui/examples/slider.examples.tsx.',
      },
    },
  },
};

export const SliderInputRef: Story = {
  name: 'Slider / Input Ref',
  render: () => (
    <StoryFrame title="Slider" name={'Input Ref'} render={() => renderExample(SliderExamples['Input Ref'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Slider example from packages/ljkui/examples/slider.examples.tsx.',
      },
    },
  },
};

export const SonnerSuccess: Story = {
  name: 'Sonner / Success',
  render: () => <StoryFrame title="Sonner" name={'Success'} render={() => renderExample(SonnerExamples['Success'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerError: Story = {
  name: 'Sonner / Error',
  render: () => <StoryFrame title="Sonner" name={'Error'} render={() => renderExample(SonnerExamples['Error'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerInfo: Story = {
  name: 'Sonner / Info',
  render: () => <StoryFrame title="Sonner" name={'Info'} render={() => renderExample(SonnerExamples['Info'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerWarning: Story = {
  name: 'Sonner / Warning',
  render: () => <StoryFrame title="Sonner" name={'Warning'} render={() => renderExample(SonnerExamples['Warning'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerLoading: Story = {
  name: 'Sonner / Loading',
  render: () => <StoryFrame title="Sonner" name={'Loading'} render={() => renderExample(SonnerExamples['Loading'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerDefault: Story = {
  name: 'Sonner / Default',
  render: () => <StoryFrame title="Sonner" name={'Default'} render={() => renderExample(SonnerExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerWithDescription: Story = {
  name: 'Sonner / With Description',
  render: () => (
    <StoryFrame
      title="Sonner"
      name={'With Description'}
      render={() => renderExample(SonnerExamples['With Description'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerPromisePattern: Story = {
  name: 'Sonner / Promise Pattern',
  render: () => (
    <StoryFrame
      title="Sonner"
      name={'Promise Pattern'}
      render={() => renderExample(SonnerExamples['Promise Pattern'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerPromiseError: Story = {
  name: 'Sonner / Promise Error',
  render: () => (
    <StoryFrame title="Sonner" name={'Promise Error'} render={() => renderExample(SonnerExamples['Promise Error'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerPromiseConditionalToasts: Story = {
  name: 'Sonner / Promise — Conditional Toasts',
  render: () => (
    <StoryFrame
      title="Sonner"
      name={'Promise — Conditional Toasts'}
      render={() => renderExample(SonnerExamples['Promise — Conditional Toasts'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerLoadingReplace: Story = {
  name: 'Sonner / Loading → Replace',
  render: () => (
    <StoryFrame
      title="Sonner"
      name={'Loading → Replace'}
      render={() => renderExample(SonnerExamples['Loading → Replace'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerLoadingReplaceError: Story = {
  name: 'Sonner / Loading → Replace (Error)',
  render: () => (
    <StoryFrame
      title="Sonner"
      name={'Loading → Replace (Error)'}
      render={() => renderExample(SonnerExamples['Loading → Replace (Error)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerFileUploadWithProgress: Story = {
  name: 'Sonner / File Upload with Progress',
  render: () => (
    <StoryFrame
      title="Sonner"
      name={'File Upload with Progress'}
      render={() => renderExample(SonnerExamples['File Upload with Progress'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerWithAction: Story = {
  name: 'Sonner / With Action',
  render: () => (
    <StoryFrame title="Sonner" name={'With Action'} render={() => renderExample(SonnerExamples['With Action'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerCustomDuration: Story = {
  name: 'Sonner / Custom Duration',
  render: () => (
    <StoryFrame
      title="Sonner"
      name={'Custom Duration'}
      render={() => renderExample(SonnerExamples['Custom Duration'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerVaryingHeights: Story = {
  name: 'Sonner / Varying Heights',
  render: () => (
    <StoryFrame
      title="Sonner"
      name={'Varying Heights'}
      render={() => renderExample(SonnerExamples['Varying Heights'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerCustomPositionPerToast: Story = {
  name: 'Sonner / Custom Position (per-toast)',
  render: () => (
    <StoryFrame
      title="Sonner"
      name={'Custom Position (per-toast)'}
      render={() => renderExample(SonnerExamples['Custom Position (per-toast)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerDeduplication: Story = {
  name: 'Sonner / Deduplication',
  render: () => (
    <StoryFrame title="Sonner" name={'Deduplication'} render={() => renderExample(SonnerExamples['Deduplication'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerDismissAll: Story = {
  name: 'Sonner / Dismiss All',
  render: () => (
    <StoryFrame title="Sonner" name={'Dismiss All'} render={() => renderExample(SonnerExamples['Dismiss All'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerCustomContent: Story = {
  name: 'Sonner / Custom Content',
  render: () => (
    <StoryFrame title="Sonner" name={'Custom Content'} render={() => renderExample(SonnerExamples['Custom Content'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SonnerAllVariants: Story = {
  name: 'Sonner / All Variants',
  render: () => (
    <StoryFrame title="Sonner" name={'All Variants'} render={() => renderExample(SonnerExamples['All Variants'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sonner example from packages/ljkui/examples/sonner.examples.tsx.',
      },
    },
  },
};

export const SpacerReturn: Story = {
  name: 'Spacer / return',
  render: () => <StoryFrame title="Spacer" name={'return'} render={() => renderExample(SpacerExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Spacer example from packages/ljkui/examples/spacer.examples.tsx.',
      },
    },
  },
};

export const SpinnerSize: Story = {
  name: 'Spinner / Size',
  render: () => <StoryFrame title="Spinner" name={'Size'} render={() => renderExample(SpinnerExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Spinner example from packages/ljkui/examples/spinner.examples.tsx.',
      },
    },
  },
};

export const SpinnerWithChildren: Story = {
  name: 'Spinner / With children',
  render: () => (
    <StoryFrame title="Spinner" name={'With children'} render={() => renderExample(SpinnerExamples['With children'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner example from packages/ljkui/examples/spinner.examples.tsx.',
      },
    },
  },
};

export const StrongReturn: Story = {
  name: 'Strong / return',
  render: () => <StoryFrame title="Strong" name={'return'} render={() => renderExample(StrongExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Strong example from packages/ljkui/examples/strong.examples.tsx.',
      },
    },
  },
};

export const SwitchSize: Story = {
  name: 'Switch / Size',
  render: () => <StoryFrame title="Switch" name={'Size'} render={() => renderExample(SwitchExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Switch example from packages/ljkui/examples/switch.examples.tsx.',
      },
    },
  },
};

export const SwitchColor: Story = {
  name: 'Switch / Color',
  render: () => <StoryFrame title="Switch" name={'Color'} render={() => renderExample(SwitchExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Switch example from packages/ljkui/examples/switch.examples.tsx.',
      },
    },
  },
};

export const SwitchHighContrast: Story = {
  name: 'Switch / High Contrast',
  render: () => (
    <StoryFrame title="Switch" name={'High Contrast'} render={() => renderExample(SwitchExamples['High Contrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch example from packages/ljkui/examples/switch.examples.tsx.',
      },
    },
  },
};

export const SwitchAlignmentWithText: Story = {
  name: 'Switch / Alignment with text',
  render: () => (
    <StoryFrame
      title="Switch"
      name={'Alignment with text'}
      render={() => renderExample(SwitchExamples['Alignment with text'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch example from packages/ljkui/examples/switch.examples.tsx.',
      },
    },
  },
};

export const SwitchFormWithUncheckedValue: Story = {
  name: 'Switch / Form with uncheckedValue',
  render: () => (
    <StoryFrame
      title="Switch"
      name={'Form with uncheckedValue'}
      render={() => renderExample(SwitchExamples['Form with uncheckedValue'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch example from packages/ljkui/examples/switch.examples.tsx.',
      },
    },
  },
};

export const SwitchReadOnly: Story = {
  name: 'Switch / Read Only',
  render: () => (
    <StoryFrame title="Switch" name={'Read Only'} render={() => renderExample(SwitchExamples['Read Only'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch example from packages/ljkui/examples/switch.examples.tsx.',
      },
    },
  },
};

export const SwitchInputRef: Story = {
  name: 'Switch / Input Ref',
  render: () => (
    <StoryFrame title="Switch" name={'Input Ref'} render={() => renderExample(SwitchExamples['Input Ref'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch example from packages/ljkui/examples/switch.examples.tsx.',
      },
    },
  },
};

export const TableId: Story = {
  name: 'Table / id',
  render: () => <StoryFrame title="Table" name={'id'} render={() => renderExample(TableExamples['id'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Table example from packages/ljkui/examples/table.examples.tsx.',
      },
    },
  },
};

export const TableAmount: Story = {
  name: 'Table / amount',
  render: () => <StoryFrame title="Table" name={'amount'} render={() => renderExample(TableExamples['amount'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Table example from packages/ljkui/examples/table.examples.tsx.',
      },
    },
  },
};

export const TableStatus: Story = {
  name: 'Table / status',
  render: () => <StoryFrame title="Table" name={'status'} render={() => renderExample(TableExamples['status'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Table example from packages/ljkui/examples/table.examples.tsx.',
      },
    },
  },
};

export const TableEmail: Story = {
  name: 'Table / email',
  render: () => <StoryFrame title="Table" name={'email'} render={() => renderExample(TableExamples['email'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Table example from packages/ljkui/examples/table.examples.tsx.',
      },
    },
  },
};

export const TableReturn: Story = {
  name: 'Table / return',
  render: () => <StoryFrame title="Table" name={'return'} render={() => renderExample(TableExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Table example from packages/ljkui/examples/table.examples.tsx.',
      },
    },
  },
};

export const TableVariant: Story = {
  name: 'Table / Variant',
  render: () => <StoryFrame title="Table" name={'Variant'} render={() => renderExample(TableExamples['Variant'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Table example from packages/ljkui/examples/table.examples.tsx.',
      },
    },
  },
};

export const TableTableFooter: Story = {
  name: 'Table / TableFooter',
  render: () => (
    <StoryFrame title="Table" name={'TableFooter'} render={() => renderExample(TableExamples['TableFooter'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table example from packages/ljkui/examples/table.examples.tsx.',
      },
    },
  },
};

export const TableHorizontalScroll: Story = {
  name: 'Table / HorizontalScroll',
  render: () => (
    <StoryFrame
      title="Table"
      name={'HorizontalScroll'}
      render={() => renderExample(TableExamples['HorizontalScroll'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table example from packages/ljkui/examples/table.examples.tsx.',
      },
    },
  },
};

export const TableTanstackTable: Story = {
  name: 'Table / TanstackTable',
  render: () => (
    <StoryFrame title="Table" name={'TanstackTable'} render={() => renderExample(TableExamples['TanstackTable'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table example from packages/ljkui/examples/table.examples.tsx.',
      },
    },
  },
};

export const TabsNavSize: Story = {
  name: 'Tabs Nav / Size',
  render: () => <StoryFrame title="Tabs Nav" name={'Size'} render={() => renderExample(TabsNavExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Tabs Nav example from packages/ljkui/examples/tabs-nav.examples.tsx.',
      },
    },
  },
};

export const TabsNavColor: Story = {
  name: 'Tabs Nav / Color',
  render: () => <StoryFrame title="Tabs Nav" name={'Color'} render={() => renderExample(TabsNavExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Tabs Nav example from packages/ljkui/examples/tabs-nav.examples.tsx.',
      },
    },
  },
};

export const TabsNavHighContrast: Story = {
  name: 'Tabs Nav / High Contrast',
  render: () => (
    <StoryFrame
      title="Tabs Nav"
      name={'High Contrast'}
      render={() => renderExample(TabsNavExamples['High Contrast'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs Nav example from packages/ljkui/examples/tabs-nav.examples.tsx.',
      },
    },
  },
};

export const TabsNavRenderPropClientSideRouting: Story = {
  name: 'Tabs Nav / Render Prop (Client-Side Routing)',
  render: () => (
    <StoryFrame
      title="Tabs Nav"
      name={'Render Prop (Client-Side Routing)'}
      render={() => renderExample(TabsNavExamples['Render Prop (Client-Side Routing)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs Nav example from packages/ljkui/examples/tabs-nav.examples.tsx.',
      },
    },
  },
};

export const TabsDefault: Story = {
  name: 'Tabs / Default',
  render: () => <StoryFrame title="Tabs" name={'Default'} render={() => renderExample(TabsExamples['Default'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Tabs example from packages/ljkui/examples/tabs.examples.tsx.',
      },
    },
  },
};

export const TabsSize: Story = {
  name: 'Tabs / Size',
  render: () => <StoryFrame title="Tabs" name={'Size'} render={() => renderExample(TabsExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Tabs example from packages/ljkui/examples/tabs.examples.tsx.',
      },
    },
  },
};

export const TabsColor: Story = {
  name: 'Tabs / Color',
  render: () => <StoryFrame title="Tabs" name={'Color'} render={() => renderExample(TabsExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Tabs example from packages/ljkui/examples/tabs.examples.tsx.',
      },
    },
  },
};

export const TabsHighContrast: Story = {
  name: 'Tabs / High Contrast',
  render: () => (
    <StoryFrame title="Tabs" name={'High Contrast'} render={() => renderExample(TabsExamples['High Contrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs example from packages/ljkui/examples/tabs.examples.tsx.',
      },
    },
  },
};

export const TabsActivateOnFocus: Story = {
  name: 'Tabs / Activate on Focus',
  render: () => (
    <StoryFrame
      title="Tabs"
      name={'Activate on Focus'}
      render={() => renderExample(TabsExamples['Activate on Focus'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs example from packages/ljkui/examples/tabs.examples.tsx.',
      },
    },
  },
};

export const TabsKeepMounted: Story = {
  name: 'Tabs / Keep Mounted',
  render: () => (
    <StoryFrame title="Tabs" name={'Keep Mounted'} render={() => renderExample(TabsExamples['Keep Mounted'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs example from packages/ljkui/examples/tabs.examples.tsx.',
      },
    },
  },
};

export const TextSize: Story = {
  name: 'Text / Size',
  render: () => <StoryFrame title="Text" name={'Size'} render={() => renderExample(TextExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Text example from packages/ljkui/examples/text.examples.tsx.',
      },
    },
  },
};

export const TextWeight: Story = {
  name: 'Text / Weight',
  render: () => <StoryFrame title="Text" name={'Weight'} render={() => renderExample(TextExamples['Weight'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Text example from packages/ljkui/examples/text.examples.tsx.',
      },
    },
  },
};

export const TextColor: Story = {
  name: 'Text / Color',
  render: () => <StoryFrame title="Text" name={'Color'} render={() => renderExample(TextExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Text example from packages/ljkui/examples/text.examples.tsx.',
      },
    },
  },
};

export const TextAlign: Story = {
  name: 'Text / Align',
  render: () => <StoryFrame title="Text" name={'Align'} render={() => renderExample(TextExamples['Align'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Text example from packages/ljkui/examples/text.examples.tsx.',
      },
    },
  },
};

export const TextTrim: Story = {
  name: 'Text / Trim',
  render: () => <StoryFrame title="Text" name={'Trim'} render={() => renderExample(TextExamples['Trim'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Text example from packages/ljkui/examples/text.examples.tsx.',
      },
    },
  },
};

export const TextFormatting: Story = {
  name: 'Text / Formatting',
  render: () => (
    <StoryFrame title="Text" name={'Formatting'} render={() => renderExample(TextExamples['Formatting'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text example from packages/ljkui/examples/text.examples.tsx.',
      },
    },
  },
};

export const TextWithFormControls: Story = {
  name: 'Text / With form controls',
  render: () => (
    <StoryFrame
      title="Text"
      name={'With form controls'}
      render={() => renderExample(TextExamples['With form controls'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text example from packages/ljkui/examples/text.examples.tsx.',
      },
    },
  },
};

export const TextHighContrast: Story = {
  name: 'Text / High Contrast',
  render: () => (
    <StoryFrame title="Text" name={'High Contrast'} render={() => renderExample(TextExamples['High Contrast'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text example from packages/ljkui/examples/text.examples.tsx.',
      },
    },
  },
};

export const TextAsFormLabel: Story = {
  name: 'Text / As Form Label',
  render: () => (
    <StoryFrame title="Text" name={'As Form Label'} render={() => renderExample(TextExamples['As Form Label'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text example from packages/ljkui/examples/text.examples.tsx.',
      },
    },
  },
};

export const TextareaSize: Story = {
  name: 'Textarea / Size',
  render: () => <StoryFrame title="Textarea" name={'Size'} render={() => renderExample(TextareaExamples['Size'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Textarea example from packages/ljkui/examples/textarea.examples.tsx.',
      },
    },
  },
};

export const TextareaVariant: Story = {
  name: 'Textarea / Variant',
  render: () => (
    <StoryFrame title="Textarea" name={'Variant'} render={() => renderExample(TextareaExamples['Variant'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea example from packages/ljkui/examples/textarea.examples.tsx.',
      },
    },
  },
};

export const TextareaColor: Story = {
  name: 'Textarea / Color',
  render: () => <StoryFrame title="Textarea" name={'Color'} render={() => renderExample(TextareaExamples['Color'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Textarea example from packages/ljkui/examples/textarea.examples.tsx.',
      },
    },
  },
};

export const ToggleGroupNavDefault: Story = {
  name: 'Toggle Group Nav / Default',
  render: () => (
    <StoryFrame
      title="Toggle Group Nav"
      name={'Default'}
      render={() => renderExample(ToggleGroupNavExamples['Default'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle Group Nav example from packages/ljkui/examples/toggle-group-nav.examples.tsx.',
      },
    },
  },
};

export const ToggleGroupNavRenderPropClientSideRouting: Story = {
  name: 'Toggle Group Nav / Render Prop (Client-Side Routing)',
  render: () => (
    <StoryFrame
      title="Toggle Group Nav"
      name={'Render Prop (Client-Side Routing)'}
      render={() => renderExample(ToggleGroupNavExamples['Render Prop (Client-Side Routing)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle Group Nav example from packages/ljkui/examples/toggle-group-nav.examples.tsx.',
      },
    },
  },
};

export const ToggleGroupRadioGroupInputRef: Story = {
  name: 'Toggle Group Radio Group / Input Ref',
  render: () => (
    <StoryFrame
      title="Toggle Group Radio Group"
      name={'Input Ref'}
      render={() => renderExample(ToggleGroupRadioGroupExamples['Input Ref'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle Group Radio Group example from packages/ljkui/examples/toggle-group-radio-group.examples.tsx.',
      },
    },
  },
};

export const ToggleGroupRadioGroupControlled: Story = {
  name: 'Toggle Group Radio Group / Controlled',
  render: () => (
    <StoryFrame
      title="Toggle Group Radio Group"
      name={'Controlled'}
      render={() => renderExample(ToggleGroupRadioGroupExamples['Controlled'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle Group Radio Group example from packages/ljkui/examples/toggle-group-radio-group.examples.tsx.',
      },
    },
  },
};

export const ToggleGroupRadioGroupTypeSafeValues: Story = {
  name: 'Toggle Group Radio Group / Type-Safe Values',
  render: () => (
    <StoryFrame
      title="Toggle Group Radio Group"
      name={'Type-Safe Values'}
      render={() => renderExample(ToggleGroupRadioGroupExamples['Type-Safe Values'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle Group Radio Group example from packages/ljkui/examples/toggle-group-radio-group.examples.tsx.',
      },
    },
  },
};

export const ToggleGroupDefault: Story = {
  name: 'Toggle Group / Default',
  render: () => (
    <StoryFrame title="Toggle Group" name={'Default'} render={() => renderExample(ToggleGroupExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle Group example from packages/ljkui/examples/toggle-group.examples.tsx.',
      },
    },
  },
};

export const ToggleGroupInADrawer: Story = {
  name: 'Toggle Group / In a drawer',
  render: () => (
    <StoryFrame
      title="Toggle Group"
      name={'In a drawer'}
      render={() => renderExample(ToggleGroupExamples['In a drawer'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle Group example from packages/ljkui/examples/toggle-group.examples.tsx.',
      },
    },
  },
};

export const ToggleGroupActivateOnFocus: Story = {
  name: 'Toggle Group / Activate on Focus',
  render: () => (
    <StoryFrame
      title="Toggle Group"
      name={'Activate on Focus'}
      render={() => renderExample(ToggleGroupExamples['Activate on Focus'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle Group example from packages/ljkui/examples/toggle-group.examples.tsx.',
      },
    },
  },
};

export const ToggleGroupKeepMounted: Story = {
  name: 'Toggle Group / Keep Mounted',
  render: () => (
    <StoryFrame
      title="Toggle Group"
      name={'Keep Mounted'}
      render={() => renderExample(ToggleGroupExamples['Keep Mounted'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle Group example from packages/ljkui/examples/toggle-group.examples.tsx.',
      },
    },
  },
};

export const ToggleVariants: Story = {
  name: 'Toggle / Variants',
  render: () => (
    <StoryFrame title="Toggle" name={'Variants'} render={() => renderExample(ToggleExamples['Variants'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle example from packages/ljkui/examples/toggle.examples.tsx.',
      },
    },
  },
};

export const ToggleSizes: Story = {
  name: 'Toggle / Sizes',
  render: () => <StoryFrame title="Toggle" name={'Sizes'} render={() => renderExample(ToggleExamples['Sizes'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Toggle example from packages/ljkui/examples/toggle.examples.tsx.',
      },
    },
  },
};

export const ToggleControlled: Story = {
  name: 'Toggle / Controlled',
  render: () => (
    <StoryFrame title="Toggle" name={'Controlled'} render={() => renderExample(ToggleExamples['Controlled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle example from packages/ljkui/examples/toggle.examples.tsx.',
      },
    },
  },
};

export const ToggleDisabled: Story = {
  name: 'Toggle / Disabled',
  render: () => (
    <StoryFrame title="Toggle" name={'Disabled'} render={() => renderExample(ToggleExamples['Disabled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle example from packages/ljkui/examples/toggle.examples.tsx.',
      },
    },
  },
};

export const TooltipDefault: Story = {
  name: 'Tooltip / Default',
  render: () => (
    <StoryFrame title="Tooltip" name={'Default'} render={() => renderExample(TooltipExamples['Default'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipWithProviderGroupDelay: Story = {
  name: 'Tooltip / With Provider (Group Delay)',
  render: () => (
    <StoryFrame
      title="Tooltip"
      name={'With Provider (Group Delay)'}
      render={() => renderExample(TooltipExamples['With Provider (Group Delay)'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipPositioning: Story = {
  name: 'Tooltip / Positioning',
  render: () => (
    <StoryFrame title="Tooltip" name={'Positioning'} render={() => renderExample(TooltipExamples['Positioning'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipCustomDelay: Story = {
  name: 'Tooltip / Custom Delay',
  render: () => (
    <StoryFrame title="Tooltip" name={'Custom Delay'} render={() => renderExample(TooltipExamples['Custom Delay'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipDisableHoverablePopup: Story = {
  name: 'Tooltip / Disable Hoverable Popup',
  render: () => (
    <StoryFrame
      title="Tooltip"
      name={'Disable Hoverable Popup'}
      render={() => renderExample(TooltipExamples['Disable Hoverable Popup'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipCloseOnClick: Story = {
  name: 'Tooltip / Close on Click',
  render: () => (
    <StoryFrame
      title="Tooltip"
      name={'Close on Click'}
      render={() => renderExample(TooltipExamples['Close on Click'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipDisabled: Story = {
  name: 'Tooltip / Disabled',
  render: () => (
    <StoryFrame title="Tooltip" name={'Disabled'} render={() => renderExample(TooltipExamples['Disabled'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipControlledMode: Story = {
  name: 'Tooltip / Controlled Mode',
  render: () => (
    <StoryFrame
      title="Tooltip"
      name={'Controlled Mode'}
      render={() => renderExample(TooltipExamples['Controlled Mode'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipSideOffset: Story = {
  name: 'Tooltip / Side Offset',
  render: () => (
    <StoryFrame title="Tooltip" name={'Side Offset'} render={() => renderExample(TooltipExamples['Side Offset'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipTrackCursorAxis: Story = {
  name: 'Tooltip / Track Cursor Axis',
  render: () => (
    <StoryFrame
      title="Tooltip"
      name={'Track Cursor Axis'}
      render={() => renderExample(TooltipExamples['Track Cursor Axis'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipOpenChangeCompleteCallback: Story = {
  name: 'Tooltip / Open Change Complete Callback',
  render: () => (
    <StoryFrame
      title="Tooltip"
      name={'Open Change Complete Callback'}
      render={() => renderExample(TooltipExamples['Open Change Complete Callback'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const TooltipActionsRef: Story = {
  name: 'Tooltip / Actions Ref',
  render: () => (
    <StoryFrame title="Tooltip" name={'Actions Ref'} render={() => renderExample(TooltipExamples['Actions Ref'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip example from packages/ljkui/examples/tooltip.examples.tsx.',
      },
    },
  },
};

export const VStackReturn: Story = {
  name: 'V Stack / return',
  render: () => <StoryFrame title="V Stack" name={'return'} render={() => renderExample(VStackExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'V Stack example from packages/ljkui/examples/v-stack.examples.tsx.',
      },
    },
  },
};

export const VisuallyHiddenDefault: Story = {
  name: 'Visually Hidden / Default',
  render: () => (
    <StoryFrame
      title="Visually Hidden"
      name={'Default'}
      render={() => renderExample(VisuallyHiddenExamples['Default'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visually Hidden example from packages/ljkui/examples/visually-hidden.examples.tsx.',
      },
    },
  },
};

export const VisuallyHiddenIconButtonWithLabel: Story = {
  name: 'Visually Hidden / Icon Button with Label',
  render: () => (
    <StoryFrame
      title="Visually Hidden"
      name={'Icon Button with Label'}
      render={() => renderExample(VisuallyHiddenExamples['Icon Button with Label'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visually Hidden example from packages/ljkui/examples/visually-hidden.examples.tsx.',
      },
    },
  },
};

export const VisuallyHiddenSkipLink: Story = {
  name: 'Visually Hidden / Skip Link',
  render: () => (
    <StoryFrame
      title="Visually Hidden"
      name={'Skip Link'}
      render={() => renderExample(VisuallyHiddenExamples['Skip Link'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visually Hidden example from packages/ljkui/examples/visually-hidden.examples.tsx.',
      },
    },
  },
};

export const VisuallyHiddenFormLabels: Story = {
  name: 'Visually Hidden / Form Labels',
  render: () => (
    <StoryFrame
      title="Visually Hidden"
      name={'Form Labels'}
      render={() => renderExample(VisuallyHiddenExamples['Form Labels'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visually Hidden example from packages/ljkui/examples/visually-hidden.examples.tsx.',
      },
    },
  },
};

export const VisuallyHiddenWithRenderProp: Story = {
  name: 'Visually Hidden / With Render Prop',
  render: () => (
    <StoryFrame
      title="Visually Hidden"
      name={'With Render Prop'}
      render={() => renderExample(VisuallyHiddenExamples['With Render Prop'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visually Hidden example from packages/ljkui/examples/visually-hidden.examples.tsx.',
      },
    },
  },
};

export const WidgetStackOrientation: Story = {
  name: 'Widget Stack / Orientation',
  render: () => (
    <StoryFrame
      title="Widget Stack"
      name={'Orientation'}
      render={() => renderExample(WidgetStackExamples['Orientation'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Widget Stack example from packages/ljkui/examples/widget-stack.examples.tsx.',
      },
    },
  },
};

export const WidgetStackSingleWidget: Story = {
  name: 'Widget Stack / SingleWidget',
  render: () => (
    <StoryFrame
      title="Widget Stack"
      name={'SingleWidget'}
      render={() => renderExample(WidgetStackExamples['SingleWidget'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Widget Stack example from packages/ljkui/examples/widget-stack.examples.tsx.',
      },
    },
  },
};

export const WidgetStackWithControls: Story = {
  name: 'Widget Stack / WithControls',
  render: () => (
    <StoryFrame
      title="Widget Stack"
      name={'WithControls'}
      render={() => renderExample(WidgetStackExamples['WithControls'])}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Widget Stack example from packages/ljkui/examples/widget-stack.examples.tsx.',
      },
    },
  },
};

export const WidgetStackAutoPlay: Story = {
  name: 'Widget Stack / AutoPlay',
  render: () => (
    <StoryFrame title="Widget Stack" name={'AutoPlay'} render={() => renderExample(WidgetStackExamples['AutoPlay'])} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Widget Stack example from packages/ljkui/examples/widget-stack.examples.tsx.',
      },
    },
  },
};

export const ZStackReturn: Story = {
  name: 'Z Stack / return',
  render: () => <StoryFrame title="Z Stack" name={'return'} render={() => renderExample(ZStackExamples['return'])} />,
  parameters: {
    docs: {
      description: {
        story: 'Z Stack example from packages/ljkui/examples/z-stack.examples.tsx.',
      },
    },
  },
};

export const Components: Story = {
  name: 'Component browser',
  render: () => (
    <Theme accentColor="indigo" grayColor="slate" radius="medium" scaling="100%" hasBackground>
      <main className="ljkui-component-index">
        {groups.map((group) => (
          <section key={group.title}>
            <Typography.Heading as="h2" size="5">
              {group.title}
            </Typography.Heading>
            <div>
              {Object.entries(group.examples).map(([name, render]) => (
                <StoryFrame key={name} title={group.title} name={name} render={() => renderExample(render)} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </Theme>
  ),
};
