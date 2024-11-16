/**
 * @description menu config
 * @author yutons
 */

import { IUploadConfig } from '@wangeditor/editor'

// 在通用 uploadConfig 上，扩展 ImportFromWord 相关配置
export type IUploadConfigForImportFromWord = IUploadConfig & {
  allowedFileTypes?: string[]
  // 用户自定义从Word导入
  customUpload?: (file: any) => Promise<any>
}

export function genImportFromWordMenuConfig(): {
  server: string;
  fieldName: string;
  withCredentials: boolean;
  meta: {};
  maxNumberOfFiles: number;
  metaWithUrl: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  timeout: number
} {
  return {
    server: '', // server API 地址，需用户配置

    fieldName: 'wangeditor-import-from-word', // formData 中，文件的 key
    maxFileSize: 10 * 1024 * 1024, // 10M
    maxNumberOfFiles: 1, // 最多上传 多少 个
    allowedFileTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.template'],
    meta: {
      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      // 例如：token: 'xxxxx', x: 100
    },
    metaWithUrl: false,
    // headers: {
    //   // 自定义 http headers
    //   // 例如：Accept: 'text/x-json', a: 100,
    // },
    withCredentials: false,
    timeout: 30 * 1000, // 30s
    // 自定义从Word导入，用户配置
    // customUpload: async (file: any) => {},
  }
}
