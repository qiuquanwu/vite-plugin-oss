// 导入阿里OSS模块
import OSS from "ali-oss";
// 导入picocolors模块
import color from "picocolors";
// 导入IClient接口
import type IClient from "./IClient";
// 导入VitePluginOSS中的AliOSSConfig类型
import type { UploadParameter ,AliOSSConfig} from "./types";

// 实现IClient接口的AliOSSClient类
class AliOSSClient implements IClient {
  // 定义OSS客户端
  client: any;
  constructor(createOssOption:AliOSSConfig) {
    // 实例化OSS客户端
    this.client = new OSS(createOssOption);
  }
  // 打印"AliOSSClient"
  info() {
    console.log("AliOSSClient");
  }
  // 上传文件
  async upload({
    overwrite,
    filePath,
    ossFilePath,
    fileFullPath,
    output ,
  }:UploadParameter) {
    // 如果options.overwrite为true，则直接上传
    try {
      await this.client.put(ossFilePath, fileFullPath, {
        headers: {},
      });
    } catch (error) {
      console.error("上传失败：",error)
    }

  }
}
export default AliOSSClient;