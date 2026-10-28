import { createFileRoute } from "@tanstack/react-router";
import { guideBySlug } from "@/data/guides";
import { GuidePage, guideHead } from "@/components/GuidePage";

const guide = guideBySlug("cashew-export-documentation");

export const Route = createFileRoute("/cashew-export-documentation/")({
  head: () => guideHead(guide),
  component: () => <GuidePage guide={guide} />,
});
