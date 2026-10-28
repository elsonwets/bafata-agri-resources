import { createFileRoute } from "@tanstack/react-router";
import { guideBySlug } from "@/data/guides";
import { GuidePage, guideHead } from "@/components/GuidePage";

const guide = guideBySlug("raw-cashew-nuts-guinea-bissau");

export const Route = createFileRoute("/raw-cashew-nuts-guinea-bissau/")({
  head: () => guideHead(guide),
  component: () => <GuidePage guide={guide} />,
});
