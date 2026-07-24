// kebab demo name -> display label, keeping the library's CamelStack names intact.
// Shared by the landing-page showcase and `scripts/gen-component-pages.ts`, so a page's
// title and its showcase card can't drift apart.
const SPECIAL: Record<string, string> = {
  'h-stack': 'HStack',
  'v-stack': 'VStack',
  'z-stack': 'ZStack',
  'input-otp': 'InputOTP',
  'aspect-ratio': 'AspectRatio',
};

export function componentLabel(name: string): string {
  if (SPECIAL[name]) return SPECIAL[name];
  return name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
