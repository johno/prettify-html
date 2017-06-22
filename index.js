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
  const $parser = load(html, { decodeEntities: false })
  const root = $parser.root()
  const elements = []

  return root.children().map((_, el) => stringify(el, 0, $parser)).get().join('\n')
}

const stringify = (el, indentLevel = 0, $parser) => {
  if (el.children) {
    const attrs = stringifyAttrs(el)
    if (isVoidElement(el.name)) {
      const voidHtml = [`<${el.name}`, attrs, '/>'].filter(Boolean).join(' ')
      return indent(indentLevel, voidHtml)
    } else {
      const allTextChildren = !el.children.map(c => c.type).filter(t => t !== 'text').length

      const open = attrs ? `<${el.name} ${attrs}>` : `<${el.name}>`
      const close = `</${el.name}>`

      let innerHtml = ''
      if (SKIP_CONTENT_FORMAT.includes(el.tagName)) {
        innerHtml = $parser(el).html()
        return indent(indentLevel, [open, innerHtml, close].join(''))
      } else if (allTextChildren) {
        innerHtml = collapseWhitespace(el.children.map(c => c.data).join(''))
        return indent(indentLevel, [open, innerHtml, close].join(''))
      }

      const children = el.children.map(
        c => stringify(c, indentLevel + 1, $parser)
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
const collapseWhitespace = (content = '') => (
  content.replace(/(\s)/g, ' ').replace(/(\s{2,})/g, ' ')
)

const stringifyAttrs = el => Object.keys(el.attribs).map(attr => `${attr}="${el.attribs[attr]}"`).join(' ')
