export default {
  rules: {
    // Disallow element type selector. View-transition names (counted as type
    // selectors since stylelint 16) are legitimate custom idents, not elements.
    'selector-max-type': [0, { ignoreTypes: [/^fui-/, 'root'] }],
    // Allow 0,1,1 specificity for pseudo elements and effectively cap at 0,1,0 in all other cases.
    // This is so that Tailwind classes work as expected.
    // TODO: enable this and fix specificity issues
    // 'selector-max-specificity': ['0,1,1'],
    // Enforce prefixes on classnames and keyframes
    // The optional `(xs|sm|md|lg|xl):` prefix matches the responsive classes emitted by
    // `withBreakpoints` (e.g. `md:fui-r-size-3`), used by Container/Section/Bleed.
    'selector-class-pattern': /^((xs|sm|md|lg|xl):)?-?fui-|^ljkui$|^(light|dark)(-theme)?$/,
    'keyframes-name-pattern': /^fui-([a-z]|-)+$/,
  },
};
