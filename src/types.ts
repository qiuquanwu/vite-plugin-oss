import OSS from "ali-oss";
import IClient from "./IClient";

//   阿里云oss配置类型
export type AliOSSConfig = OSS.Options;
//百度云bos配置
export type BOSConfig = {
  endpoint: string; //传入Bucket所在区域域名
  bucket: string;
  credentials: {
    ak: string; //您的AccessKey
    sk: string; //您的SecretAccessKey
  };
};

export type Config = AliOSSConfig | BOSConfig | QiNiuConfig;

export type Options = {
  base?: string; //对象存储路径前缀
  overwrite?: boolean; //是否覆盖原文件
  ignore?: string[]; //忽略文件数组
  client: IClient; //上传客户端类
  enabled: boolean; //是否开启上传
};

export type UploadParameter = {
  // 是否覆盖
  overwrite: boolean;
  // 文件完整路径
  fileFullPath: string;
  // 文件相对路径
  filePath: string;
  // oss路径
  ossFilePath: string;
  // 完成时路径
  completePath: string;
  // 输出路径
  output: string;
};

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

export type CosConfig = {
  // 用户的 SecretId
  SecretId: string;
  //   用户的 SecretKey
  SecretKey: string;
  //   存储桶的名称，命名规则为 BucketName-APPID，此处填写的存储桶名称必须为此格式
  Bucket: string;
  //   存储桶所在地域
  Region: string;
};
