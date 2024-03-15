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

export type Config = AliOSSConfig | BOSConfig;

export type Options = {
  overwrite?:boolean;
  ignore?: string[];
  client: IClient;
  enabled: boolean;
};


export type UploadParameter = {
  overwrite:boolean;
  fileFullPath:string;
  filePath:string;
  ossFilePath:string;
  completePath:string
  output:string
}