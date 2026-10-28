import { createFileRoute } from "@tanstack/react-router";
import { HomePage, homeHead } from "@/components/HomePage";

export const Route = createFileRoute("/fr/")({
  head: () => homeHead("fr"),
  component: () => <HomePage lang="fr" />,
});
