const lightStr = "/* PrismJS 1.28.0\
https://prismjs.com/download.html#themes=prism-solarizedlight&languages=markup+css+clike+javascript+typoscript&plugins=line-numbers+show-language+toolbar */\
code[class*='language-'],\
pre[class*='language-'] {\
  color: #657b83;\
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\
  font-size: 1em;\
  text-align: left;\
  white-space: pre;\
  word-spacing: normal;\
  word-break: normal;\
  word-wrap: normal;\
  line-height: 1.5;\
  -moz-tab-size: 4;\
  -o-tab-size: 4;\
  tab-size: 4;\
  -webkit-hyphens: none;\
  -moz-hyphens: none;\
  -ms-hyphens: none;\
  hyphens: none;\
}\
code[class*='language-'] {\
  height: 50px;\
  line-height: 50px;\
  display: block;\
  overflow-x: auto;\
  overflow-y: hidden;\
}\
code[class*='language-'] ::-moz-selection,\
code[class*='language-']::-moz-selection,\
pre[class*='language-'] ::-moz-selection,\
pre[class*='language-']::-moz-selection {\
  background: #073642;\
}\
code[class*='language-'] ::selection,\
code[class*='language-']::selection,\
pre[class*='language-'] ::selection,\
pre[class*='language-']::selection {\
  background: #073642;\
}\
pre[class*='language-'] {\
  padding: 1em;\
  margin: 0.5em 0;\
  overflow: auto;\
  border-radius: 0.3em;\
}\
:not(pre) > code[class*='language-'],\
pre[class*='language-'] {\
  background-color: #fdf6e3;\
}\
:not(pre) > code[class*='language-'] {\
  padding: 0.1em;\
  padding-left: 1rem;\
  border-radius: 0.3em;\
}\
.token.cdata,\
.token.comment,\
.token.doctype,\
.token.prolog {\
  color: #93a1a1;\
}\
.token.punctuation {\
  color: #586e75;\
}\
.token.namespace {\
  opacity: 0.7;\
}\
.token.boolean,\
.token.constant,\
.token.deleted,\
.token.number,\
.token.property,\
.token.symbol,\
.token.tag {\
  color: #268bd2;\
}\
.token.attr-name,\
.token.builtin,\
.token.char,\
.token.inserted,\
.token.selector,\
.token.string,\
.token.url {\
  color: #2aa198;\
}\
.token.entity {\
  color: #657b83;\
  background: #eee8d5;\
}\
.token.atrule,\
.token.attr-value,\
.token.keyword {\
  color: #859900;\
}\
.token.class-name,\
.token.function {\
  color: #b58900;\
}\
.token.important,\
.token.regex,\
.token.variable {\
  color: #cb4b16;\
}\
.token.bold,\
.token.important {\
  font-weight: 700;\
}\
.token.italic {\
  font-style: italic;\
}\
.token.entity {\
  cursor: help;\
}\
pre[class*='language-'].line-numbers {\
  position: relative;\
  padding-left: 3.8em;\
  counter-reset: linenumber;\
}\
pre[class*='language-'].line-numbers > code {\
  position: relative;\
  white-space: inherit;\
}\
.line-numbers .line-numbers-rows {\
  position: absolute;\
  pointer-events: none;\
  top: 0;\
  font-size: 100%;\
  left: -3.8em;\
  width: 3em;\
  letter-spacing: -1px;\
  border-right: 1px solid #999;\
  -webkit-user-select: none;\
  -moz-user-select: none;\
  -ms-user-select: none;\
  user-select: none;\
}\
.line-numbers-rows > span {\
  display: block;\
  counter-increment: linenumber;\
}\
.line-numbers-rows > span:before {\
  content: counter(linenumber);\
  color: #999;\
  display: block;\
  padding-right: 0.8em;\
  text-align: right;\
}\
div.code-toolbar {\
  position: relative;\
}\
div.code-toolbar > .toolbar {\
  position: absolute;\
  z-index: 10;\
  top: 0.3em;\
  right: 0.2em;\
  transition: opacity 0.3s ease-in-out;\
  opacity: 0;\
}\
div.code-toolbar:hover > .toolbar {\
  opacity: 1;\
}\
div.code-toolbar:focus-within > .toolbar {\
  opacity: 1;\
}\
div.code-toolbar > .toolbar > .toolbar-item {\
  display: inline-block;\
}\
div.code-toolbar > .toolbar > .toolbar-item > a {\
  cursor: pointer;\
}\
div.code-toolbar > .toolbar > .toolbar-item > button {\
  background: 0 0;\
  border: 0;\
  color: inherit;\
  font: inherit;\
  line-height: normal;\
  overflow: visible;\
  padding: 0;\
  -webkit-user-select: none;\
  -moz-user-select: none;\
  -ms-user-select: none;\
}\
div.code-toolbar > .toolbar > .toolbar-item > a,\
div.code-toolbar > .toolbar > .toolbar-item > button,\
div.code-toolbar > .toolbar > .toolbar-item > span {\
  color: #bbb;\
  font-size: 0.8em;\
  padding: 0 0.5em;\
  background: #f5f2f0;\
  background: rgba(224, 224, 224, 0.2);\
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);\
  border-radius: 0.5em;\
}\
div.code-toolbar > .toolbar > .toolbar-item > a:focus,\
div.code-toolbar > .toolbar > .toolbar-item > a:hover,\
div.code-toolbar > .toolbar > .toolbar-item > button:focus,\
div.code-toolbar > .toolbar > .toolbar-item > button:hover,\
div.code-toolbar > .toolbar > .toolbar-item > span:focus,\
div.code-toolbar > .toolbar > .toolbar-item > span:hover {\
  color: inherit;\
  text-decoration: none;\
}\
"
const darkStr = "\
/* PrismJS 1.28.0\
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+typoscript&plugins=line-numbers+show-language+remove-initial-line-feed+toolbar */ \
code[class*='language-'],\
pre[class*='language-'] {\
  color: #ccc;\
  background: 0 0;\
  font-family: Consolas,\ Monaco,\ 'Andale Mono',\ 'Ubuntu Mono',\ monospace;\
  font-size: 1em;\
  text-align: left;\
  white-space: pre-wrap;\
  word-spacing: normal;\
  word-break: normal;\
  word-wrap: normal;\
  line-height: 1.5;\
  -moz-tab-size: 4;\
  -o-tab-size: 4;\
  tab-size: 4;\
  -webkit-hyphens: none;\
  -moz-hyphens: none;\
  -ms-hyphens: none;\
  hyphens: none;\
}\
code[class*='language-'] {\
  height:auto;\
  line-height: 50px;\
  display: block;\
  overflow-x: auto;\
  overflow-y: hidden;\
}\
pre[class*='language-'] {\
  padding: 1em;\
  margin: 0.5em 0;\
  overflow-x: scroll;\
}\
:not(pre) > code[class*='language-'],\
pre[class*='language-'] {\
  background: #2d2d2d;\
}\
:not(pre) > code[class*='language-'] {\
  padding: 0.1em;\
  padding-left: 1rem;\
  border-radius: 0.3em;\
  white-space: normal;\
}\
.token.block-comment,\
.token.cdata,\
.token.comment,\
.token.doctype,\
.token.prolog {\
  color: #999;\
}\
.token.punctuation {\
  color: #ccc;\
}\
.token.attr-name,\
.token.deleted,\
.token.namespace,\
.token.tag {\
  color: #e2777a;\
}\
.token.function-name {\
  color: #6196cc;\
}\
.token.boolean,\
.token.function,\
.token.number {\
  color: #f08d49;\
}\
.token.class-name,\
.token.constant,\
.token.property,\
.token.symbol {\
  color: #f8c555;\
}\
.token.atrule,\
.token.builtin,\
.token.important,\
.token.keyword,\
.token.selector {\
  color: #cc99cd;\
}\
.token.attr-value,\
.token.char,\
.token.regex,\
.token.string,\
.token.variable {\
  color: #7ec699;\
}\
.token.entity,\
.token.operator,\
.token.url {\
  color: #67cdcc;\
}\
.token.bold,\
.token.important {\
  font-weight: 700;\
}\
.token.italic {\
  font-style: italic;\
}\
.token.entity {\
  cursor: help;\
}\
.token.inserted {\
  color: green;\
}\
pre[class*='language-'].line-numbers {\
  position: relative;\
  padding-left: 3.8em;\
  counter-reset: linenumber;\
}\
pre[class*='language-'].line-numbers > code {\
  position: relative;\
  white-space: inherit;\
}\
.line-numbers .line-numbers-rows {\
  position: absolute;\
  pointer-events: none;\
  top: 0;\
  font-size: 100%;\
  left: -3.8em;\
  width: 3em;\
  letter-spacing: -1px;\
  border-right: 1px solid #999;\
  -webkit-user-select: none;\
  -moz-user-select: none;\
  -ms-user-select: none;\
  user-select: none;\
}\
.line-numbers-rows > span {\
  display: block;\
  counter-increment: linenumber;\
}\
.line-numbers-rows > span:before {\
  content: counter(linenumber);\
  color: #999;\
  display: block;\
  padding-right: 0.8em;\
  text-align: right;\
}\
div.code-toolbar {\
  position: relative;\
}\
div.code-toolbar > .toolbar {\
  position: absolute;\
  z-index: 10;\
  top: 0.3em;\
  right: 0.2em;\
  transition: opacity 0.3s ease-in-out;\
  opacity: 0;\
}\
div.code-toolbar:hover > .toolbar {\
  opacity: 1;\
}\
div.code-toolbar:focus-within > .toolbar {\
  opacity: 1;\
}\
div.code-toolbar > .toolbar > .toolbar-item {\
  display: inline-block;\
}\
div.code-toolbar > .toolbar > .toolbar-item > a {\
  cursor: pointer;\
}\
div.code-toolbar > .toolbar > .toolbar-item > button {\
  background: 0 0;\
  border: 0;\
  color: inherit;\
  font: inherit;\
  line-height: normal;\
  overflow: visible;\
  padding: 0;\
  -webkit-user-select: none;\
  -moz-user-select: none;\
  -ms-user-select: none;\
}\
div.code-toolbar > .toolbar > .toolbar-item > a,\
div.code-toolbar > .toolbar > .toolbar-item > button,\
div.code-toolbar > .toolbar > .toolbar-item > span {\
  color: #bbb;\
  font-size: 0.8em;\
  padding: 0 0.5em;\
  background: #f5f2f0;\
  background: rgba(224,\ 224,\ 224,\ 0.2);\
  box-shadow: 0 2px 0 0 rgba(0,\ 0,\ 0,\ 0.2);\
  border-radius: 0.5em;\
}\
div.code-toolbar > .toolbar > .toolbar-item > a:focus,\
div.code-toolbar > .toolbar > .toolbar-item > a:hover,\
div.code-toolbar > .toolbar > .toolbar-item > button:focus,\
div.code-toolbar > .toolbar > .toolbar-item > button:hover,\
div.code-toolbar > .toolbar > .toolbar-item > span:focus,\
div.code-toolbar > .toolbar > .toolbar-item > span:hover {\
  color: inherit;\
  text-decoration: none;\
}\
"
const darkStr1 = `\

`
export { lightStr, darkStr, darkStr1 }