import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "cjs/index.js", 
      format: "cjs", 
      inlineDynamicImports: true,
    },
    plugins: [
      nodeResolve(), // resolver módulos desde node_modules
      commonjs(), // convertir módulos CommonJS a ESModules
    ],
  },
];
