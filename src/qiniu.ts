import IClient from "./IClient";
import { QiNiuConfig, UploadParameter } from "./types";
import qiniu from "qiniu";
class QiNiuClient implements IClient {
  client: any;
  bucket: any;
  constructor(config: QiNiuConfig) {
    const { accessKey, secretKey, bucket, overwrite = true } = config;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    this.client = mac;
    this.bucket = bucket;
  }
  async upload({
    overwrite,
    filePath,
    ossFilePath,
    fileFullPath,
    output,
  }: UploadParameter) {
    var qiniuOptions = {
      scope: overwrite ? this.bucket + ":" + ossFilePath : this.bucket,
    };
    var putPolicy = new qiniu.rs.PutPolicy(qiniuOptions);
    var uploadToken = putPolicy.uploadToken(this.client);
    var config = new qiniu.conf.Config() as any;
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z2;
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    console.log(fileFullPath);
    //获取fileFullPath的文件名
    // 拿到文件的完整路径了
    return new Promise((resolve, reject) => {
      formUploader.putFile(
        uploadToken,
        ossFilePath,
        fileFullPath,
        putExtra,
        function (respErr, respBody, respInfo) {
          if (respErr) {
            throw respErr;
          }
          if (respInfo.statusCode == 200) {
            console.log("上传成功", respBody);
            resolve(respBody);
          } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            reject(respBody);
          }
        }
      );
    });
  }
}

export default QiNiuClient;
