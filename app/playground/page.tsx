import PlaygroundExperience from "../playground-experience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorer",
  description:
    "An interactive map of my Linux environment, cloud practice, system boundaries and AI architecture experiments.",
};

export default function PlaygroundPage() {
  return <PlaygroundExperience />;
}
