import { UploadParameter } from "./types";

interface IClient {
  client: any;
  upload: (uploadParameter:UploadParameter)=>Promise<any>;
  info: Function;
}

export default IClient;
