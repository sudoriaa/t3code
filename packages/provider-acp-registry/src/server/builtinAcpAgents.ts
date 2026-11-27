import type { AcpRegistryAgent } from "./AcpRegistrySupport.ts";

/**
 * ACP agents T3 Code ships with, so adding one does not depend on the registry CDN listing it.
 * Setup, install, probe, and session handling stay on the shared ACP path.
 *
 * A registry entry with the same id outranks the bundled one: the CDN carries the freshest
 * version, and the bundled copy only fills the gap.
 */
export const BUILT_IN_ACP_REGISTRY_AGENTS: ReadonlyArray<AcpRegistryAgent> = [
  {
    id: "dsh",
    name: "DeepSeek Harness",
    version: "0.2.2-rc.5",
    description:
      "DeepSeek's coding agent harness, driven over its ACP server. It manages its own sandbox and approvals.",
    authors: ["DeepSeek"],
    license: "MIT",
    website: "https://github.com/deepseek-ai/deepseek-harness",
    repository: "https://github.com/deepseek-ai/deepseek-harness",
    distribution: {
      npx: { package: "@deepseek-ai/dsh@0.2.2-rc.5", args: ["acp"] },
    },
  },
];

export function mergeBuiltInAcpRegistryAgents(
  agents: ReadonlyArray<AcpRegistryAgent>,
): ReadonlyArray<AcpRegistryAgent> {
  const listed = new Set(agents.map((agent) => agent.id));
  const bundled = BUILT_IN_ACP_REGISTRY_AGENTS.filter((agent) => !listed.has(agent.id));
  if (bundled.length === 0) {
    return agents;
  }
  return [...agents, ...bundled];
}
