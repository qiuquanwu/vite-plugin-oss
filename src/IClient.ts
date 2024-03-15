import { UploadParameter } from "./types";

interface IClient {
  client: any;
  upload: (uploadParameter:UploadParameter)=>Promise<unknown>;
  info?: Function;
  beforeUpload?: Function;
  afterUpload?: Function;
}

export default IClient;
