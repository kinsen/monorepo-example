import nodeResolve from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

import path from "path";

const { LERNA_PACKAGE_NAME } = process.env;
const PACKAGE_ROOT_PATH = process.cwd();
export default [
  {
    input: path.join(PACKAGE_ROOT_PATH, "src", "index.ts"),
    output: [
      {
        file: `dist/index.cjs.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `dist/index.esm.js`,
        format: "esm",
        sourcemap: true,
      },
      {
        name: LERNA_PACKAGE_NAME,
        file: `dist/index.umd.js`,
        sourcemap: true,
        format: "umd",
      },
    ],
    plugins: [
      ts(), 
      nodeResolve({exportConditions: ["node"]}), 
      terser(), 
      json(),
      commonjs({
        include: [
          /node_modules/,
        ]
      }),
    ],
  },
];
