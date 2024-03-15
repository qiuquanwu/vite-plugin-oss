// 导入 normalizePath 函数，用于处理路径
import { normalizePath } from "vite";
// 导入 picocolors 库，用于生成随机颜色
import color from "picocolors";
// 导入 globSync 函数，用于处理 glob 匹配
import { globSync } from "glob";
// 导入 path 库，用于处理文件路径
import path from "path";
// 导入 Options 类型，用于声明配置参数
import type { Options } from "./types";
import IClient from "./IClient";
// 导出 resolver 中的所有内容
export * from "./resolver"
// 导出 types 中的所有内容
export * from "./types"
export * as IClient from "./IClient";
// 定义 handleIgnore 函数，用于处理忽略规则
const handleIgnore = (
  ignore: string[],
  ssrServer: string,
  ssrClient: string
) => {
  if (ignore === undefined) return "";
  if (ignore) {
    if (ssrClient) {
      return ["**/ssr-manifest.json", "**/*.html", ...ignore];
    }
    if (ssrServer) {
      return ["**"];
    }
  }
};
// 定义 VitePluginOSS 函数，用于处理上传OSS操作
/**
 * 
 * @param config 插件入参
 * @param {IClient} config.client - 上传客户端类
 * @param {boolean} config.enabled - 是否开启上传
 * @param {string[]} [config.ignore] - 忽略文件数组
 * @param {boolean} [config.overwrite] - 是否覆盖原文件
 * @param {string} [config.base] - 对象存储路径前缀
 * @returns 
 */
const VitePluginOSS = (config: Options) => {
  // 获取配置参数
  const { client, enabled, ignore = [], overwrite = true,base="/" } = config;
  // 打印配置参数
  console.log("进入插件", config);
  // 设置基础路径
  let baseConfig = base;
  // 设置构建路径
  let buildConfig = {} as any;
  // 返回插件对象
  return {
    name: "vite-plugin-oss",
    enforce: "post",
    apply: "build",
    configResolved(resolvedConfig: any) {
      // 存储最终解析的配置
      buildConfig = resolvedConfig.build;
    },

   async closeBundle() {
      //   console.log("VitePluginOSS", config);
      //   console.log("resolvedConfig", buildConfig);
      //   console.log("baseConfig", baseConfig);
      // 获取输出目录路径
      const outDirPath = normalizePath(
        path.resolve(normalizePath(buildConfig.outDir))
      );
      // 获取 ssr 客户端路径
      const ssrClient = buildConfig.ssrManifest;
      // 获取 ssr 服务端路径
      const ssrServer = buildConfig.ssr;
      // 获取输出目录下的所有文件
      const files = globSync(`${outDirPath}/**/*`, {
        // 忽略 nodir
        nodir: true,
        // 忽略 dot
        dot: true,
        // 处理忽略规则
        ignore: handleIgnore(ignore, ssrServer, ssrClient),
      });
      let statTime = new Date().getTime();
      // 遍历所有文件
      for (const fileFullPath of files) {
        // 获取文件路径
        const filePath = normalizePath(fileFullPath).split(`${outDirPath}/`)[1];
        // 获取 oss 存储路径
        const ossFilePath = baseConfig + filePath;
        // 获取完成时路径
        const completePath = ossFilePath;

        // 打印输出路径
        const output = `${buildConfig.outDir + filePath} => ${color.green(
          completePath
        )}`;

        // 上传文件
        await client.upload({
          fileFullPath,
          filePath,
          ossFilePath,
          completePath,
          output,
          overwrite,
        });

        console.log(fileFullPath);

      }
      // 计算耗时
      const duration = (new Date().getTime() - statTime) / 1000;

      console.log("");
      console.log(
        color.green(`文件已全部上传完毕 ^_^, 耗时 ${duration.toFixed(2)}秒`)
      );
      console.log("");
    },
  } as any;
}

// 导出 VitePluginOSS
export default VitePluginOSS;

