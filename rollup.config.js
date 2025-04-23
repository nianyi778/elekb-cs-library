// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/ai-chat-box-sdk.umd.js',
      format: 'umd',
      name: 'AIChatBox',
      globals: {},
    },
    {
      file: 'dist/ai-chat-box-sdk.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' })
  ],
  external: [],
};
