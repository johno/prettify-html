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
  const elements = []

  root
    .children()
    .each((_, el) => elements.push(el))

  return elements.map(el => stringify(el)).join("\n")
}

const stringify = (el, indentLevel = 0) => {
  if (el.children) {
    const attrs = stringifyAttrs(el)
    if (isVoidElement(el.name)) {
      const voidHtml = [`<${el.name}`, attrs, '/>'].filter(Boolean).join(' ')
      return indent(indentLevel, voidHtml)
    } else {
      const allTextChildren = !el.children.map(c => c.type).filter(t => t !== 'text').length

      const open = attrs ? `<${el.name} ${attrs}>` : `<${el.name}>`
      const close = `</${el.name}>`

      if (allTextChildren) {
        return indent(indentLevel, [open, el.children[0].data, close].join(''))
      }

      const children = el.children.map(
        c => stringify(c, indentLevel + 1)
      ).filter(isPresent).join("\n")
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

const indent = (level = 0, str = '') => `${Array(level + 1).join(INDENTATION_CHARS)}${str}`

const stringifyAttrs = el => Object.keys(el.attribs).map(attr => `${attr}="${el.attribs[attr]}"`).join(' ')
