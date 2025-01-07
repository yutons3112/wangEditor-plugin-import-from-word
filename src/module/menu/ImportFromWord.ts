/**
 * @description import from word menu
 * @author yutons
 */

import { DomEditor, IDomEditor, SlateRange, t } from '@wangeditor-next/editor'
import { IButtonMenu } from '@wangeditor-next/editor'
import { IMPORT_FROM_WORD_SVG } from '../../constants/icon-svg'
import { IUploadConfigForImportFromWord } from './config'
import $ from '../../utils/dom'
import { importFromWords } from './helper'

class ImportFromWordMenu implements IButtonMenu {
  readonly title = t('word.import')
  readonly iconSvg = IMPORT_FROM_WORD_SVG
  readonly tag = 'button'

  getValue(editor: IDomEditor): string | boolean {
    // 无需获取 val
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 任何时候，都不用激活 menu
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    const { allowedFileTypes = [] } = this.getMenuConfig(editor)
    // 设置选择文件的类型
    let acceptAttr = ''
    if (allowedFileTypes.length > 0) {
      acceptAttr = `accept="${allowedFileTypes.join(', ')}"`
    }

    // 添加 file input（每次重新创建 input）
    const $body = $('body')
    const $inputFile = $(`<input type="file" ${acceptAttr} multiple/>`)
    $inputFile.hide()
    $body.append($inputFile)
    $inputFile.click()
    // 选中文件
    $inputFile.on('change', () => {
      const files = ($inputFile[0] as HTMLInputElement).files
      importFromWords(editor, files) // 上传文件
    })
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isExpanded(selection)) return true // 选区非折叠，禁用

    const selectedElems = DomEditor.getSelectedElems(editor)

    const hasVoidElem = selectedElems.some(elem => editor.isVoid(elem))
    if (hasVoidElem) return true // 选中了 void 元素，禁用

    const hasPreElem = selectedElems.some(elem => DomEditor.getNodeType(elem) === 'pre')
    if (hasPreElem) return true // 选中了 pre 原则，禁用

    return false
  }

  private getMenuConfig(editor: IDomEditor): IUploadConfigForImportFromWord {
    // 获取配置，见 `./config.js`
    return editor.getMenuConfig('importFromWord') as IUploadConfigForImportFromWord
  }
}

export default ImportFromWordMenu
