module.exports = (opts = {}) => {

  // Work with options here
  let ignoredLineData = [];
  let ignoredExpData = [];
  return {

    postcssPlugin: 'postcss-hubl-remove',
    Once(root) {
      // for testing
      console.log('custom load');
    },
    Root(root, postcss) {
      // Transform CSS AST here

      root.walkDecls(decl => {
        if (decl.value.includes('hubl')) {
          let declData = {
            ignoredLine: decl.source.start.line,
          };
          ignoredLineData.push(declData);
        }
      });

      root.walkRules((rule) => {
        rule.walkDecls((decl) => {
          const declLine = decl.source.start.line;
          ignoredLineData.forEach((ignoreData) => {
            if (ignoreData.ignoredLine === declLine && ignoreData.exp == undefined) {
              ignoreData.selector = decl.parent.selector;

              ignoreData.prop = decl.prop;
              ignoreData.value = decl.value;
              decl.remove();
            }
          });
        });
      });
      postcss.result.messages.type = 'hubl-ignore-remove';
      postcss.result.messages.push({
        'hubl-ignore-remove': {
          ignoredLineData,
          ignoredExpData
        },
      });
    }
  }
}
module.exports.postcss = true