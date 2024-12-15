import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'src/lib/index.ts',
    output: [
        {
            file: 'dist/lib/index.mjs',
            format: 'es'
        },
        {
            file: 'dist/lib/index.cjs',
            format: 'cjs'
        }
    ],
    external: ['@faker-js/faker'],
    plugins: [
        json(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist/lib/types'
        }),
        resolve(),
        commonjs()
    ]
}