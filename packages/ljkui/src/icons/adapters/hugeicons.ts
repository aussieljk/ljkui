/**
 * Hugeicons (@hugeicons/react + @hugeicons/core-free-icons) adapter. Importing this module registers it:
 *
 *   import 'ljkui/icons/hugeicons';
 *
 * Or scope it with `<IconProvider library={hugeiconsAdapter}>`.
 *
 * GENERATED FILE — do not edit by hand. Edit `scripts/icon-map.ts` and run
 * `bun run generate:icon-adapters`.
 */
import {
  Alert02Icon,
  AlertCircleIcon,
  ArchiveIcon,
  ArrowDown01Icon,
  ArrowDown02Icon,
  ArrowLeft01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  ArrowUp02Icon,
  AtIcon,
  AttachmentIcon,
  BatteryFullIcon,
  Bookmark01Icon,
  BubbleChatIcon,
  Bug01Icon,
  Calendar03Icon,
  CallIcon,
  Camera01Icon,
  Cancel01Icon,
  ChampionIcon,
  Clock01Icon,
  CloudIcon,
  CodeIcon,
  CommandLineIcon,
  Copy01Icon,
  CreditCardIcon,
  DatabaseIcon,
  Delete02Icon,
  Download01Icon,
  FavouriteIcon,
  File01Icon,
  FilterIcon,
  FireIcon,
  Flag01Icon,
  Folder01Icon,
  GiftIcon,
  GlobalIcon,
  GridViewIcon,
  HashIcon,
  HelpCircleIcon,
  Home01Icon,
  Image01Icon,
  InboxIcon,
  InformationCircleIcon,
  Key01Icon,
  LeftToRightListBulletIcon,
  Link01Icon,
  LinkSquare02Icon,
  Login01Icon,
  Logout01Icon,
  Mail01Icon,
  MapPinIcon,
  Menu01Icon,
  Mic01Icon,
  MinusSignIcon,
  Moon02Icon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  Notification03Icon,
  PackageIcon,
  PaintBoardIcon,
  PaintBrush01Icon,
  PauseIcon,
  PencilEdit02Icon,
  PlayIcon,
  PlusSignIcon,
  PreferenceHorizontalIcon,
  PrinterIcon,
  RefreshIcon,
  ScissorIcon,
  Search01Icon,
  SentIcon,
  ServerStack01Icon,
  Settings01Icon,
  Share01Icon,
  Shield01Icon,
  ShoppingCart01Icon,
  SmileIcon,
  SquareLock02Icon,
  SquareUnlock02Icon,
  StarIcon,
  Sun03Icon,
  Tag01Icon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Tick02Icon,
  TruckIcon,
  Upload01Icon,
  UserIcon,
  UserMultiple02Icon,
  Video01Icon,
  ViewIcon,
  ViewOffSlashIcon,
  VolumeHighIcon,
  VolumeOffIcon,
  WifiIcon,
  ZapIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import * as React from 'react';
import { registerIconAdapter } from '../registry';
import type { AdapterIconComponent, IconAdapter } from '../types';

function toNumber(value: number | string | undefined): number | undefined {
  if (value == null) return undefined;
  return typeof value === 'number' ? value : parseFloat(value);
}

let warnedBrokenCjs = false;

/** Binds a Hugeicons svg object to the `HugeiconsIcon` renderer. */
function wrap(icon: IconSvgElement): AdapterIconComponent {
  // @hugeicons/core-free-icons declares `"type": "module"` but ships a CommonJS
  // `require` entry, which Node parses as ESM and resolves to an empty module.
  // Guard so plain-CJS consumers degrade to rendering nothing instead of crashing;
  // bundlers and ESM consumers resolve the working ESM build and are unaffected.
  if (icon == null) {
    if (!warnedBrokenCjs) {
      warnedBrokenCjs = true;
      console.warn(
        '[ljkui] @hugeicons/core-free-icons resolved to an empty module ' +
          '(its CommonJS entry is broken upstream). Load the hugeicons adapter from ESM instead.',
      );
    }
    const Empty: AdapterIconComponent = () => null;
    return Empty;
  }
  const Component: AdapterIconComponent = ({ width, height, strokeWidth, ...props }) =>
    React.createElement(HugeiconsIcon, {
      icon,
      size: toNumber(width ?? height),
      strokeWidth: toNumber(strokeWidth),
      ...props,
    });
  return Component;
}

export const hugeiconsAdapter: IconAdapter = {
  name: 'hugeicons',
  icons: {
    AlertCircle: wrap(AlertCircleIcon),
    Archive: wrap(ArchiveIcon),
    ArrowDown: wrap(ArrowDown02Icon),
    ArrowLeft: wrap(ArrowLeft02Icon),
    ArrowRight: wrap(ArrowRight02Icon),
    ArrowUp: wrap(ArrowUp02Icon),
    AtSign: wrap(AtIcon),
    Battery: wrap(BatteryFullIcon),
    Bell: wrap(Notification03Icon),
    Bookmark: wrap(Bookmark01Icon),
    Brush: wrap(PaintBrush01Icon),
    Bug: wrap(Bug01Icon),
    Calendar: wrap(Calendar03Icon),
    Camera: wrap(Camera01Icon),
    Check: wrap(Tick02Icon),
    ChevronDown: wrap(ArrowDown01Icon),
    ChevronLeft: wrap(ArrowLeft01Icon),
    ChevronRight: wrap(ArrowRight01Icon),
    ChevronUp: wrap(ArrowUp01Icon),
    Clock: wrap(Clock01Icon),
    Close: wrap(Cancel01Icon),
    Cloud: wrap(CloudIcon),
    Code: wrap(CodeIcon),
    Copy: wrap(Copy01Icon),
    CreditCard: wrap(CreditCardIcon),
    Database: wrap(DatabaseIcon),
    DotsHorizontal: wrap(MoreHorizontalIcon),
    DotsVertical: wrap(MoreVerticalIcon),
    Download: wrap(Download01Icon),
    Edit: wrap(PencilEdit02Icon),
    ExternalLink: wrap(LinkSquare02Icon),
    Eye: wrap(ViewIcon),
    EyeOff: wrap(ViewOffSlashIcon),
    File: wrap(File01Icon),
    Filter: wrap(FilterIcon),
    Flag: wrap(Flag01Icon),
    Flame: wrap(FireIcon),
    Folder: wrap(Folder01Icon),
    Gift: wrap(GiftIcon),
    Globe: wrap(GlobalIcon),
    Hash: wrap(HashIcon),
    Heart: wrap(FavouriteIcon),
    HelpCircle: wrap(HelpCircleIcon),
    Home: wrap(Home01Icon),
    Image: wrap(Image01Icon),
    Inbox: wrap(InboxIcon),
    Info: wrap(InformationCircleIcon),
    Key: wrap(Key01Icon),
    LayoutGrid: wrap(GridViewIcon),
    Link: wrap(Link01Icon),
    List: wrap(LeftToRightListBulletIcon),
    Lock: wrap(SquareLock02Icon),
    LogIn: wrap(Login01Icon),
    LogOut: wrap(Logout01Icon),
    Mail: wrap(Mail01Icon),
    MapPin: wrap(MapPinIcon),
    Menu: wrap(Menu01Icon),
    Message: wrap(BubbleChatIcon),
    Mic: wrap(Mic01Icon),
    Minus: wrap(MinusSignIcon),
    Moon: wrap(Moon02Icon),
    Package: wrap(PackageIcon),
    Palette: wrap(PaintBoardIcon),
    Paperclip: wrap(AttachmentIcon),
    Pause: wrap(PauseIcon),
    Phone: wrap(CallIcon),
    Play: wrap(PlayIcon),
    Plus: wrap(PlusSignIcon),
    Printer: wrap(PrinterIcon),
    Refresh: wrap(RefreshIcon),
    Scissors: wrap(ScissorIcon),
    Search: wrap(Search01Icon),
    Send: wrap(SentIcon),
    Server: wrap(ServerStack01Icon),
    Settings: wrap(Settings01Icon),
    Share: wrap(Share01Icon),
    Shield: wrap(Shield01Icon),
    ShoppingCart: wrap(ShoppingCart01Icon),
    Sliders: wrap(PreferenceHorizontalIcon),
    Smile: wrap(SmileIcon),
    Star: wrap(StarIcon),
    Sun: wrap(Sun03Icon),
    Tag: wrap(Tag01Icon),
    Terminal: wrap(CommandLineIcon),
    ThumbsDown: wrap(ThumbsDownIcon),
    ThumbsUp: wrap(ThumbsUpIcon),
    Trash: wrap(Delete02Icon),
    Trophy: wrap(ChampionIcon),
    Truck: wrap(TruckIcon),
    Unlock: wrap(SquareUnlock02Icon),
    Upload: wrap(Upload01Icon),
    User: wrap(UserIcon),
    Users: wrap(UserMultiple02Icon),
    Video: wrap(Video01Icon),
    Volume: wrap(VolumeHighIcon),
    VolumeOff: wrap(VolumeOffIcon),
    Warning: wrap(Alert02Icon),
    Wifi: wrap(WifiIcon),
    Zap: wrap(ZapIcon),
  },
};

registerIconAdapter(hugeiconsAdapter);
