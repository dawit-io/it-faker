import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'src/lib/index.ts',
    output: [
        {
            dir: 'dist/lib',
            format: 'es',
            entryFileNames: '[name].mjs',
            chunkFileNames: 'chunks/[name]-[hash].mjs',
            preserveModules: true,
            preserveModulesRoot: 'src/lib',
            inlineDynamicImports: false
        },
        {
            dir: 'dist/lib',
            format: 'cjs',
            entryFileNames: '[name].cjs',
            chunkFileNames: 'chunks/[name]-[hash].cjs',
            preserveModules: true,
            preserveModulesRoot: 'src/lib',
            inlineDynamicImports: false
        }
    ],
    external: [
        '@faker-js/faker',
        'rxjs',
        'rxjs/operators'
    ],
    plugins: [
        json({
            compact: true,
            preferConst: true,
            namedExports: true
        }),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist/lib/types'
        }),
        resolve(),
        commonjs()
    ]
}