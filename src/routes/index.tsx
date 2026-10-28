import { createFileRoute } from "@tanstack/react-router";
import { HomePage, homeHead } from "@/components/HomePage";

export const Route = createFileRoute("/")({
  head: () => homeHead("en"),
  component: () => <HomePage lang="en" />,
});
