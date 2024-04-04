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
百度云上传配置
```ts
export type BOSConfig = {
  endpoint: string; //传入Bucket所在区域域名
  bucket: string;
  credentials: {
    ak: string; //您的AccessKey
    sk: string; //您的SecretAccessKey
  };
};
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
阿里云上传配置
```ts
    interface Options {
        /** access secret you create */
        accessKeyId: string;
        /** access secret you create */
        accessKeySecret: string;
        /** used by temporary authorization */
        stsToken?: string | undefined;
        /** the default bucket you want to access If you don't have any bucket, please use putBucket() create one first. */
        bucket?: string | undefined;
        /** oss region domain. It takes priority over region. */
        endpoint?: string | undefined;
        /** the bucket data region location, please see Data Regions, default is oss-cn-hangzhou. */
        region?: string | undefined;
        /** access OSS with aliyun internal network or not, default is false. If your servers are running on aliyun too, you can set true to save lot of money. */
        internal?: boolean | undefined;
        /** instruct OSS client to use HTTPS (secure: true) or HTTP (secure: false) protocol. */
        secure?: boolean | undefined;
        /** instance level timeout for all operations, default is 60s */
        timeout?: string | number | undefined;
        /** use custom domain name */
        cname?: boolean | undefined;
        /** use time (ms) of refresh STSToken interval it should be less than sts info expire interval, default is 300000ms(5min) when sts info expires. */
        refreshSTSTokenInterval?: number;
        /** used by auto set stsToken、accessKeyId、accessKeySecret when sts info expires. return value must be object contains stsToken、accessKeyId、accessKeySecret */
        refreshSTSToken?: () => Promise<{ accessKeyId: string; accessKeySecret: string; stsToken: string }>;
    }
```

- 七牛云对象存储


```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginOSS,{QiNiuResolve} from "@isfive/vite-plugin-oss"
import type {QiNiuConfig} from "@isfive/vite-plugin-oss"
console.log(typeof VitePluginOSS)
const config: QiNiuConfig = {
  bucket: xxx;
  accessKey: xxxx;
  secretKey: xxxx;
  overwrite: true;
  zone: "huadong"
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VitePluginOSS({
    overwrite:true,
    enabled:true,
    client:QiNiuResolve(config),
  })],
})
```
七牛上传配置
```ts
export type QiNiuConfig = {
  bucket: string;
  accessKey: string;
  secretKey: string;
  overwrite?: boolean;
  zone:
    | "huadong"
    | "huadong2"
    | "huabei"
    | "huanan"
    | "beimei"
    | "Southeast-Asia";
};
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