/**
 * @description DOM 操作
 * @author yutons
 */

import $, { append, on, hide, click } from 'dom7'

if (hide) $.fn.hide = hide
if (append) $.fn.append = append
if (click) $.fn.click = click
if (on) $.fn.on = on

export { Dom7Array } from 'dom7'
export default $

// COMPAT: This is required to prevent TypeScript aliases from doing some very
// weird things for Slate's types with the same name as globals. (2019/11/27)
// https://github.com/microsoft/TypeScript/issues/35002
import DOMNode = globalThis.Node
import DOMComment = globalThis.Comment
import DOMElement = globalThis.Element
import DOMText = globalThis.Text
import DOMRange = globalThis.Range
import DOMSelection = globalThis.Selection
import DOMStaticRange = globalThis.StaticRange
export { DOMNode, DOMComment, DOMElement, DOMText, DOMRange, DOMSelection, DOMStaticRange }
