# postcss-hubl-ignore

## Overview

Allows postcss to ignore hubl written inside of stylesheets.

## install 

`npm install @jazzyclimber/postcss-hubl-ignore`

## Useage
### 1. Install with isntructions above
### 2. Add to postcss-config.js
```
module.exports = {
  plugins: [
    //important to add this before any other plugins
    require('@jazzyclimber/postcss-hubl-ignore/postcss-hubl-remove'),
    //include other plugins here
    require('autoprefixer'),
    // important to put this at the end
    require(@jazzyclimber/postcss-hubl-ignore/postcss-hubl-add'),
  ]
};
```

If you want to call a hubl variable you can by:

`display: hubl("theme.displayvalue")`

Which will translate into 
`dispaly {{theme.dispalyvalue}}`

---

**The following feature will cause an error and is currently not working**
In order to add hubl expressions such as for loops and if statements put them in comments

`/* {% if statment here %} */`

will translate into 

`{% if statment here %}`

