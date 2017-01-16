'use strict'

const isVoidElement = require('is-void-element')
const isPresent = require('is-present')
const { load } = require('cheerio')

const SKIP_FORMAT = [ // https://www.w3.org/TR/html5/dom.html#phrasing-content
  'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'data',
  'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen',
  'label', 'map', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q',
  'ruby', 's', 'samp', 'script', 'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg',
  'template', 'textarea', 'time', 'u', 'var', 'video', 'wbr', 'text'
]

const SKIP_CONTENT_FORMAT = [
  'pre', 'code'
]

const INDENTATION_CHARS = '  '

module.exports = (html, options = {}) => {
  const root = load(html).root()
  const prettyHtml = ''

  root.children().each((_, el) => {
    console.log(stringify(el, 0).trim())
  })

  return html.toString()
}

const stringify = (el, indentLevel = 0) => {
  if (el.children) {
    if (isVoidElement(el.name)) {
      return indent(indentLevel, `<${el.name} ${stringifyAttrs(el)} />`)
    } else {
      const open = `<${el.name} ${stringifyAttrs(el)}>`
      const children = el.children.map(c => stringify(c, indentLevel + 1)).filter(isPresent).join("\n")
      const close = `</${el.name}>`

      return [
        indent(indentLevel, open),
        children,
        indent(indentLevel, close)
      ].join("\n")
    }
  } else {
    return isPresent(el.data) ? indent(indentLevel, el.data.trim()) : ''
  }
}

const indent = (level, str = '') => {
  let indentStr = ''
  for (let i = 0; i < level; i++) {
    indentStr += INDENTATION_CHARS
  }

  return `${indentStr}${str}`
}

const stringifyAttrs = el => Object.keys(el.attribs).map(attr => `${attr}="${el.attribs[attr]}"`).join(' ')
