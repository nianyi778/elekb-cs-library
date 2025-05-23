// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/ai-chat-bot-sdk.umd.js',
      format: 'umd',
      name: 'AIChatBox',
      globals: {},
    },
    {
      file: 'dist/ai-chat-bot-sdk.esm.js',
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
