import path from 'path';
import autoprefixer from 'autoprefixer';
import postcssCombineDuplicatedSelectors from 'postcss-combine-duplicated-selectors';
import postcssCustomMedia from 'postcss-custom-media';
import postcssDiscardEmpty from 'postcss-discard-empty';
import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import postcssLJKUI from './postcss-ljkui.js';

export default {
  plugins: [
    postcssImport({
      path: [path.relative(process.cwd(), '../')],
    }),
    postcssNesting,
    postcssLJKUI,
    postcssCustomMedia,
    postcssCombineDuplicatedSelectors,
    postcssDiscardEmpty,
    autoprefixer,
  ],
};
