import { component$, Slot } from "@builder.io/qwik";
import { Header } from "@/app/shell/Header";
import { Footer } from "@/app/shell/Footer";

export default component$(() => {
  return (
    <>
      <Header />
      <main style={{
        paddingTop: "var(--header-height)",
        flex: "1",
        display: "flex",
        flexDirection: "column",
      }}>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
