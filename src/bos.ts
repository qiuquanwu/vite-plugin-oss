// 导入IClient接口
import IClient from "./IClient";

// 导入BosClient和BOSConfig、UploadParameter类型
import { BosClient } from "@baiducloud/sdk";
import { BOSConfig ,UploadParameter} from "./types";

// 实现IClient接口的BOSClient类
class BOSClint implements IClient {
  // 定义百度云客户端
  client: any;
  // 定义要上传的bucket
  bucket: string;
  constructor(client: BOSConfig) {
    // 设置bucket
    this.bucket = client.bucket;
    // 创建百度云客户端
    this.client = new BosClient(client);
  }
  // 打印BOSClient
  info() {
    console.log("BOSClient");
  }
  // 上传文件
  async upload({
    overwrite,
    filePath,
    ossFilePath,
    fileFullPath,
    output ,
  }:UploadParameter) {
    console.log("BOSClient");
    try {
      // 上传文件
      const response = await this.client.putObjectFromFile(
        this.bucket,
        ossFilePath,
        fileFullPath
      );
    } catch (error) {
      console.log("百度云上传失败", error);
    } // 失败
  }
}

// 导出BOSClient
export default BOSClint;