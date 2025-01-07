/**
 * @description word plugin
 * @author yutons
 */

import { DomEditor, IDomEditor } from '@wangeditor-next/editor'

function withWord<T extends IDomEditor>(editor: T) {
  const { isInline, isVoid } = editor
  const newEditor = editor

  // 重写 isInline
  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'word') {
      return true
    }

    return isInline(elem)
  }

  // 重写 isVoid
  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'word') {
      return true
    }

    return isVoid(elem)
  }

  return newEditor
}

export default withWord
