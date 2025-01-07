/**
 * @description word module entry
 * @author yutons
 */

import './local' // 多语言

import { IModuleConf } from '@wangeditor-next/editor'
import withWord from './plugin'
import { importFromWordMenuConf } from './menu/index'

const module: Partial<IModuleConf> = {
  editorPlugin: withWord,
  menus: [importFromWordMenuConf],
}

export default module
