/**
 * @description menu entry
 * @author yutons
 */

import ImportFromWord from './ImportFromWord'
import { genImportFromWordMenuConfig } from './config'

export const importFromWordMenuConf = {
  key: 'importFromWord', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new ImportFromWord()
  },

  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
  config: genImportFromWordMenuConfig(),
}
