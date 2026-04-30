import type { CSSProperties } from "@builder.io/qwik";

declare module "@builder.io/qwik" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
