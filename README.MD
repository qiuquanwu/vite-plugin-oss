## vite-plugin-oss
vite插件：将打包后的文件上传到oss
## 安装

```bash
npm install @qqw/vite-plugin-oss --save-dev
```

## 使用方法

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginOSS,{BaiduResolve} from "@qqw/vite-plugin-oss"
import type {BOSConfig} from "@qqw/vite-plugin-oss"

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
    overwrite:true,
    enabled:true,
    client:BaiduResolve(config),
  })],
})

```

