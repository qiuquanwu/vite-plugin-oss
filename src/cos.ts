import IClient from "./IClient";
import { CosConfig, UploadParameter } from "./types";
import COS from "cos-nodejs-sdk-v5";
import fs from "fs";
class CosClient implements IClient {
  client: any;
  Bucket: string = "";
  Region: string = "";
  constructor(config: CosConfig) {
    if (!config.SecretId) {
      throw new Error("SecretId is required");
    }
    if (!config.SecretKey) {
      throw new Error("SecretKey is required");
    }

    if (!config.Bucket) {
      throw new Error("Bucket is required");
    }
    if (!config.Region) {
      throw new Error("Region is required");
    }
    this.client = new COS({
      SecretId: config.SecretId, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
      SecretKey: config.SecretKey, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
    });
    this.Bucket = config.Bucket;
    this.Region = config.Region;
  }
  async upload(uploadParameter: UploadParameter) {
    const { overwrite, filePath, ossFilePath, fileFullPath, output } =
      uploadParameter;

    this.client.putObject(
      {
        Bucket: this.Bucket /* 必须 */,
        Region: this.Region /* 必须 */,
        Key: ossFilePath /* 必须 */,
        StorageClass: "STANDARD",
        Body: fs.createReadStream(fileFullPath), // 上传文件对象
        onProgress: function (progressData: any) {
          console.log(JSON.stringify(progressData));
        },
      },
      function (err: any, data: any) {
        console.log("上传成功", ossFilePath);
        console.log(err || data);
      }
    );
  }
}
export default CosClient;
