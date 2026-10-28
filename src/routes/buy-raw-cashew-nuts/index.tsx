import { createFileRoute } from "@tanstack/react-router";
import { guideBySlug } from "@/data/guides";
import { GuidePage, guideHead } from "@/components/GuidePage";

const guide = guideBySlug("buy-raw-cashew-nuts");

export const Route = createFileRoute("/buy-raw-cashew-nuts/")({
  head: () => guideHead(guide),
  component: () => <GuidePage guide={guide} />,
});
