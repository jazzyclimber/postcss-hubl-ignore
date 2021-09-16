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
    require('postcss-hubl-ignore/postcss-hubl-remove'),
    //include other plugins here
    require('autoprefixer'),
    // important to put this at the end
    require('postcss-hubl-ignore/post-css-hubl-add'),
  ]
};
```