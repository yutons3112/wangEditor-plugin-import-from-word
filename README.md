# wangEditor 从Word导入 插件

## 介绍

[wangEditor](https://www.wangeditor.com/) 从Word导入 插件。

![](./_img/demo.png)

## 更新记录

### 20250107

更新至V0.0.2

1. 新增支持从Word文档导入（仅支持从docx文档导入）
2. 解决文档导入后图片自动上传问题
3. 发布npm仓库

## 安装

```shell
yarn add wang-editor-plugin-import-from-word
```

## 使用

【注意】该文档要求 `@wangeditor-next/editor` 版本 `>=5.6.26`

### 注册到编辑器

```js
import { Boot } from '@wangeditor-next/editor'
import wordModule from 'wang-editor-plugin-import-from-word'

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(wordModule)
```

### 配置

编辑器配置

```ts
// ts
import { IEditorConfig } from '@wangeditor-next/editor'
// ts
const editorConfig: Partial<IEditorConfig> = {
// js
//const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    // “从Word导入”菜单的配置
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

  // 其他...
}
```

工具栏配置

```ts
// ts
import { IToolbarConfig } from '@wangeditor-next/editor'

// ts
const toolbarConfig: Partial<IToolbarConfig> = {
// js
// const toolbarConfig = {
  // 插入哪些菜单
  insertKeys: {
    index: 0, // 自定义插入的位置
    keys: ['importFromWord'], // “从Word导入”菜单
  },

  // 其他...
}
```

然后创建编辑器和工具栏，会用到 `editorConfig` 和 `toolbarConfig` 。具体查看 wangEditor 文档。
