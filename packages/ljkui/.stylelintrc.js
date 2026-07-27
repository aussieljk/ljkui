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
    'selector-class-pattern': /^-?fui-|^ljkui$|^(light|dark)(-theme)?$/,
    'keyframes-name-pattern': /^fui-([a-z]|-)+$/,
  },
};
