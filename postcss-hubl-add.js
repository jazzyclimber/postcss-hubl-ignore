module.exports = (opts = {}) => {

  // Work with options here

  let declToAdd = [];
  let expToAdd = [];
  return {

    postcssPlugin: 'postcss-hubl-add',
    Once(root) {
      // for testing to make sure this is loading
      console.log('custom load');
    },
    Root(root, postcss) {
      // Transform CSS AST here
      const msgs = postcss.result.messages;

      console.log('-----------------------------')

      // Loop through messages and store data
      msgs.forEach(msg => {
        msg['hubl-ignore-remove'].ignoredLineData.forEach(declaration => {
          declToAdd.push(declaration);
        })
        msg['hubl-ignore-remove'].ignoredExpData.forEach(exp => {
          expToAdd.push(exp);
        })
      });

      // Loop through declarations
      declToAdd.forEach(decl => {
        // Convert hubl target into hubl tag
        if (decl.value.includes("hubl(")) {
          var v = decl.value.match(/\((.*?)\)/g)
          v = v[0].slice(2, -2);
          v = '{{' + v + '}}';
          decl.value = v;
        }
      })

      // Put the hubl tag into the appropriate place in stylesheet
      root.walkRules(rules => {
        declToAdd.forEach(decl => {
          if (rules.selector === decl.selector && decl.atRule === undefined) {
            rules.append({
              prop: decl.prop,
              value: decl.value,
            });
          }
        })
      })

      // Find comments 
      root.walkComments((comment) => {
        // console.log(comment);

        // If comment is hubl expression replace with the actual expression
        if (comment.text.includes('{%')) {
          let exp = comment.text
          // comment.raw();
          comment.replaceWith(exp);
        }
      })

      console.log(declToAdd);

      // postcss.result.messages['hubl-ignore-remove'].ignoredLineData.forEach(item => {
      //   console.log('item ', item);
      // });
    }
  }
}
module.exports.postcss = true