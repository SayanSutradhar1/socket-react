import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      dir: "dist",
      format: "es",
      name: "react-socket",
    },
  ],
  external: ["react", "react-dom","socket.io-client"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
});
