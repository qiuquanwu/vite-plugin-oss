import { defineConfig } from 'tsup'

// 导出默认配置
export default defineConfig({
	// 生成d.ts文件
	dts: true,
	// 清理输出目录
	clean: true,
	// 最小化输出
	minify: true,
	// 将项目拆分为单个文件
	splitting: true,
	// 输出目录
	outDir: 'dist',
	// 格式
	format: ['cjs', 'esm'],
	// 入口文件
	entry: ['src/index.ts'],
	// 排除vite
	external:['vite']
})
