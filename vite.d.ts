declare module "vite" {
  type VITE = any;

  let normalizePath: any;
  export { normalizePath };
  export default VITE;
}

declare module "@baiducloud/sdk" {
  let BosClient: any;
  export { BosClient };
  type sdk = any;
  export default sdk;
}
