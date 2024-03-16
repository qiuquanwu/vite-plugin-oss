## vite-plugin-oss
vite插件：将打包后的文件上传到oss
## 安装

```bash
npm install @isfive/vite-plugin-oss --save-dev
```

## 使用方法

- 百度云对象存储

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginOSS,{BaiduResolve} from "@isfive/vite-plugin-oss"
import type {BOSConfig} from "@isfive/vite-plugin-oss"

const config: BOSConfig = {
  endpoint: "https://xxx.bcebos.com", //传入Bucket所在区域域名
  bucket: "stoneku",
  credentials: {
    ak: "xxxxxxxxxxxxxxxx", //您的AccessKey
    sk: "xxxxxxxxxxxxxxxxxxxxx" //您的SecretAccessKey
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VitePluginOSS({
    base:"/" //oss路径前缀
    overwrite:true,
    enabled:true,
    client:BaiduResolve(config),
    ignore:["xxx.xxx"] //忽略文件列表
  })],
})

```
- 阿里云对象存储
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginOSS,{AliOSSResolve} from "@isfive/vite-plugin-oss"
import type {AliOSSConfig} from "@isfive/vite-plugin-oss"
console.log(typeof VitePluginOSS)
const config: AliOSSConfig = {
  accessKeyId: 'XXXXXXXXXXXXXXXX',
  accessKeySecret: 'XXXXXXXXXXXXXXXXXXXX'
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VitePluginOSS({
    overwrite:true,
    enabled:true,
    client:AliOSSResolve(config),
  })],
})
```
- 自定义上传

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginOSS from "@isfive/vite-plugin-oss"
import type {CustomClient, UploadParameter} from "@isfive/vite-plugin-oss"
console.log(typeof VitePluginOSS)

/**
 * 自定义resolve 需要继承 CustomClient接口
 */

class MyResolve implements CustomClient {
  client: any
  constructor() {}
  // 需要实现upload方法
  async upload (uploadParameter: UploadParameter){
    console.log(uploadParameter.completePath) //完成路径
    console.log(uploadParameter.fileFullPath) //文件完整路径
    console.log(uploadParameter.filePath) //文件相对路径
    /**
     * 在这里做自定义文件上传
     */
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VitePluginOSS({
    overwrite:true,
    enabled:true,
    client:new MyResolve(),
  })],
})

```


## 构建
```bash
yarn build
```