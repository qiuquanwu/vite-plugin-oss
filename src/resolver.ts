// 导入IClient类型
import IClient from "./IClient";
// 导入AliOSSClient类型
import AliOSSClient from "./alioss";
// 导入BOSClint类型
import BOSClint from "./bos";
// 导入AliOSSConfig和BOSConfig类型
import type { AliOSSConfig,BOSConfig } from "./types";

// 导出AliOSSResolve函数，参数为AliOSSConfig类型，返回值为IClient类型
/**
 * 
 * @param config 
 * @returns 
 */
export const AliOSSResolve = (config: AliOSSConfig): IClient => {
  // 返回一个新的AliOSSClient实例
  return new AliOSSClient(config);
};
/**
 * 
 * @param config 
 * @returns 
 */
// 导出BaiduResolve函数，参数为BOSConfig类型，返回值为IClient类型
export const BaiduResolve = (config: BOSConfig): IClient => {
  // 返回一个新的BOSClint实例
  return new BOSClint(config);
};
