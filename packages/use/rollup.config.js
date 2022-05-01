import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { externals } from 'rollup-plugin-node-externals'
import alias from '@rollup/plugin-alias'
import size from 'rollup-plugin-size'
import mutiple from 'rollup-plugin-multi-input'
import ce from 'rollup-plugin-condition-exports'
import { defineConfig } from 'rollup'

export default defineConfig([
  {
    input: ['src/**.ts'],
    plugins: [
      mutiple(),
      /**
       * Bundle devDependencies, exclude dependencies
       */
      externals({
        devDeps: false,
      }),
      commonjs(),
      typescript({
        tsconfigOverride: {
          exclude: ['test'],
        },
      }),
      alias({
        resolve: ['.ts', '.js', '.tsx', '.jsx'],
        entries: [{ find: '@/', replacement: './src/' }],
      }),
      resolve({ preferBuiltins: true }),
      /**
       * Auto setup package.json
       * @see {@link https://github.com/JiangWeixian/rollup-plugin-condition-exports}
       */
      ce(),
      size(),
    ],
    output: [
      { dir: 'dist', entryFileNames: '[name].cjs', format: 'cjs' },
      { dir: 'dist', entryFileNames: '[name].mjs', format: 'es' },
    ],
  },
])
