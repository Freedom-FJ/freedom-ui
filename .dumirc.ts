/*
 * @Author: mjh
 * @Date: 2024-04-26 14:41:21
 * @LastEditors: mjh
 * @LastEditTime: 2024-04-26 17:37:02
 * @Description: 
 */
import { defineConfig } from 'dumi';
import path from 'path';

let base: string | undefined;
let publicPath: string | undefined;

// Github Pages 部署时需要更换为自己的仓库名
if (process.env.NODE_ENV === 'production' && process.env.PREVIEW !== '1') {
  base = '/freedom-ui/';
  publicPath = '/freedom-ui/';
}

export default defineConfig({
  base,
  publicPath,
  title: 'Freedom UI',
  outputPath: 'doc-site',
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'component', dir: 'src' }],
  },
  exportStatic: {},
  forkTSChecker: {},
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'freedom-ui',
        libraryDirectory: '',
        customStyleName: (name: string) => path.resolve(__dirname, `src/${name}/style/index.ts`),
      },
    ],
  ],
});
