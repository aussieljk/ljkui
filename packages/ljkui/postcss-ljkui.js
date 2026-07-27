const postcssLJKUI = () => ({
  postcssPlugin: 'postcss-ljkui',
  Comment(comment) {
    // Remove all comments from CSS source
    comment.remove();
  },
});

postcssLJKUI.postcss = true;

export default postcssLJKUI;
