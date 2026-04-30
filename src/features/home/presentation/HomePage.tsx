import { component$ } from "@builder.io/qwik";
import { Hero } from "@/features/home/presentation/sections/Hero";
import { Challenges } from "@/features/home/presentation/sections/Challenges";
import { Capabilities } from "@/features/home/presentation/sections/Capabilities";
import { Benchmark } from "@/features/home/presentation/sections/Benchmark";
import { Workflow } from "@/features/home/presentation/sections/Workflow";
import { Plans } from "@/features/home/presentation/sections/Plans";
import { Platforms } from "@/features/home/presentation/sections/Platforms";

export const HomePage = component$(() => {
  return (
    <>
      <Hero />
      <Challenges />
      <Capabilities />
      <Benchmark />
      <Workflow />
      <Plans />
      <Platforms />
    </>
  );
});
