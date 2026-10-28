import { createFileRoute } from "@tanstack/react-router";
import { HomePage, homeHead } from "@/components/HomePage";

export const Route = createFileRoute("/pt/")({
  head: () => homeHead("pt"),
  component: () => <HomePage lang="pt" />,
});
