/**
 * @description helper fns
 * @author yutons
 */

import {IDomEditor} from '@wangeditor/editor'
import {IUploadConfigForImportFromWord} from './config'
import mammoth from "mammoth";

function getImportFromWordMenuConfig(editor: IDomEditor): IUploadConfigForImportFromWord {
  // 获取配置，见 `./config.js`
  return editor.getMenuConfig('importFromWord') as IUploadConfigForImportFromWord
}

function base64ToBlob(imageBuffer: string, contentType: string) {
  let bytes = window.atob(imageBuffer);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ia], { type: contentType });
}

function base64ToFile(imageBuffer: string, contentType: string) {
  let blob = base64ToBlob(imageBuffer,contentType);
  return new File([blob],Date.now() + '.'+contentType.split('/')[1],{type:blob.type})
}

/**
 * 从Word导入文件
 * @param editor editor
 * @param files files
 */
export async function importFromWords(editor: IDomEditor, files: FileList | null) {
  if (files == null) return
  const fileList = Array.prototype.slice.call(files)

  // 获取菜单配置
  const { customUpload } = getImportFromWordMenuConfig(editor)

  const menuConfig = getImportFromWordMenuConfig(editor);
  // 校验选择数量
  const maxNumberOfFiles = menuConfig.maxNumberOfFiles||0;
  if (fileList.length===0 || fileList.length> maxNumberOfFiles){
    alert('文件导入单次只允许选择一个文件。')
    return
  }

  // 按顺序导入
  for await (const file of fileList) {
    // 校验文件格式
    const allowedFileTypes = menuConfig.allowedFileTypes||[];
    if (allowedFileTypes.length!=0 && !allowedFileTypes.includes(file.type)){
      alert(file.type)
      return
    }

    let reader = new FileReader();
    reader.readAsArrayBuffer(file)
    reader.onload = e=>{
      if (reader.result instanceof ArrayBuffer){
        let options = {
          // TODO
          // css格式化
          // https://mp.weixin.qq.com/s/kVbbPm3pVuH3ZZZ7saETBw
          // 图片处理
          // https://www.zhihu.com/question/605777855/answer/3384486501
          convertImage:mammoth.images.imgElement(function (image){
            return image.read("base64").then(async function (imageBuffer) {
              // base64转blob
              const contentType = image.contentType
              const imageFile = base64ToFile(imageBuffer, contentType)
              // 上传
              let imageUrl = ''
              if (customUpload) {
                // 自定义上传
                imageUrl = await customUpload(imageFile)
              } else {
                // 默认上传，使用axios实现
                imageUrl = await uploadFile(editor, imageFile)
              }
              return {
                src: imageUrl
              };
            });
          })
        }
        mammoth.convertToHtml({arrayBuffer: reader.result},options).then(r=>{
          editor.setHtml(r.value)
        })
      }
    }
    editor.setHtml('')
    editor.move(1)
  }
}

/**
 * 上传文件
 * @param editor editor
 * @param file file
 */
async function uploadFile(editor: IDomEditor, file: File) {
  const menuConfig = getImportFromWordMenuConfig(editor);
  let server = menuConfig.server;
  let meta = menuConfig.meta;

  // 如果meta不是空对象，则添加到URL中
  // @ts-ignore
  server = JSON.stringify(meta) === '{}' ? server : `${server}?${new URLSearchParams(meta).toString()}`;

  const formData = new FormData();
  formData.append('file', file);

  var requestOptions = {
    method: 'POST',
    body: formData,
  };

  try {
    const response = await fetch(server, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json(); // 或者使用 response.json() 如果预期是JSON格式
    return result.data[0].url; // 返回请求的结果
  } catch (error) {
    console.error('Error:', error);
    throw error; // 再次抛出错误以便调用者可以处理它
  }
}
