/**
 * @description examples entry
 * @author yutons
 */

import {
  createEditor,
  createToolbar,
  Boot,
  IEditorConfig,
  i18nChangeLanguage,
} from '@wangeditor/editor'
import module, { ImportFromWord } from '../src/index'

Boot.registerModule(module)

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  onChange(editor) {
    const html = editor.getHtml()
    // @ts-ignore
    document.getElementById('text-html').value = html
    const contentStr = JSON.stringify(editor.children, null, 2)
    // @ts-ignore
    document.getElementById('text-json').value = contentStr
  },
  MENU_CONF: {
    // 从Word导入的菜单配置
    importFromWord: {
      server: 'http://127.0.0.1:3000/api/upload-img', //一个文件地址
      timeout: 5 * 1000, // 5s

      fieldName: 'custom-fileName',
      meta: { token: 'xxx', a: 100 },
      metaWithUrl: true, // 参数拼接到 url 上
      headers: { Accept: 'text/x-json' },
      maxFileSize: 20 * 1024 * 1024, // 10M
      maxNumberOfFiles: 1,
      // // 用户自定义上传
      /*customUpload: async (file: string | Blob) => {
        const formData = new FormData();
        formData.append('file', file);

        var requestOptions = {
          method: 'POST',
          body: formData,
        };

        const server = 'http://127.0.0.1:3000/api/upload-img?token=xxx&a=100'

        try {
          const response = await fetch(server, requestOptions);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json(); // 或者使用 response.json() 如果预期是JSON格式

          return result.data[0].url
        } catch (error) {
          console.error('Error:', error);
          throw error; // 再次抛出错误以便调用者可以处理它
        }
      },*/
    },
  },
}

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  // content: [
  //   {
  //     type: 'paragraph',
  //     children: [
  //       { text: 'hello world' },
  //       {
  //         // @ts-ignore
  //         type: 'word',
  //         fileName: '附件文件名',
  //         link: 'https://pan.baidu.com/',
  //         children: [{ text: '' }],
  //       },
  //     ],
  //   },
  // {
  //   "type": "paragraph",
  //   "children": [
  //     {
  //       "text": " "
  //     },
  //     {
  //       "type": "link",
  //       "url": "http://localhost:8000/",
  //       "children": [
  //         {
  //           "text": "http://localhost:8000/"
  //         }
  //       ]
  //     },
  //     {
  //       "text": " "
  //     }
  //   ]
  // },
  //   {
  //     // @ts-ignore
  //     type: 'paragraph',
  //     children: [{ text: '选一个视频文件，作为附件上传：' }],
  //   },
  // ],
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {
    insertKeys: {
      index: 0,
      keys: ['importFromWord'], // “从Word导入”菜单
    },
  },
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
