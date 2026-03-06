import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      dir: "dist",
      format: "es",
      name: "socket-react",
    },
  ],
  external: ["react", "react-dom","socket.io-client"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
});
