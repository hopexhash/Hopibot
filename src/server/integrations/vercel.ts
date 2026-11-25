import "../guard";
import { AgentError } from "./anthropic";
import { getCredential, IntegrationUnavailableError, touchIntegrationSuccess } from "./credentials";

const API = "https://api.vercel.com";

async function call<T>(token: string, path: string, init: RequestInit & { teamId?: string } = {}): Promise<T> {
  const url = new URL(API + path);
  if (init.teamId) url.searchParams.set("teamId", init.teamId);
  const res = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(60000),
  });
  const json = (await res.json().catch(() => ({}))) as T & { error?: { message: string; code: string } };
  if (!res.ok) {
    const msg = json.error?.message ?? `HTTP ${res.status}`;
    throw new AgentError(`Vercel: ${msg}`, `VERCEL_${json.error?.code ?? res.status}`, res.status === 429 || res.status >= 500);
  }
  return json;
}

export type VercelDeployment = { id: string; url: string; readyState: string; errorMessage?: string };

export async function vercelDeploy(
  organizationId: string,
  opts: { projectName: string; files: { path: string; content: Buffer }[]; target: "preview" | "production"; meta?: Record<string, string> },
): Promise<VercelDeployment> {
  const cred = await getCredential(organizationId, "vercel");
  if (!cred.secret) throw new IntegrationUnavailableError("vercel");
  const body = {
    name: opts.projectName,
    files: opts.files.map((f) => ({ file: f.path, data: f.content.toString("base64"), encoding: "base64" })),
    projectSettings: { framework: null, buildCommand: null, outputDirectory: null, installCommand: null },
    ...(opts.target === "production" ? { target: "production" } : {}),
    meta: opts.meta ?? {},
  };
  const dep = await call<VercelDeployment>(cred.secret, "/v13/deployments?skipAutoDetectionConfirmation=1", {
    method: "POST",
    body: JSON.stringify(body),
    teamId: cred.config.teamId,
  });
  void touchIntegrationSuccess(organizationId, "vercel");
  return dep;
}

export async function vercelGetDeployment(organizationId: string, id: string): Promise<VercelDeployment> {
  const cred = await getCredential(organizationId, "vercel");
  if (!cred.secret) throw new IntegrationUnavailableError("vercel");
  return call<VercelDeployment>(cred.secret, `/v13/deployments/${encodeURIComponent(id)}`, { teamId: cred.config.teamId });
}

export async function vercelAddDomain(organizationId: string, projectName: string, domain: string) {
  const cred = await getCredential(organizationId, "vercel");
  if (!cred.secret) throw new IntegrationUnavailableError("vercel");
  return call<{ name: string; verified: boolean }>(cred.secret, `/v10/projects/${encodeURIComponent(projectName)}/domains`, {
    method: "POST",
    body: JSON.stringify({ name: domain }),
    teamId: cred.config.teamId,
  });
}

export async function testVercel(token: string, teamId?: string) {
  const r = await call<{ user: { username: string } }>(token, "/v2/user", { teamId });
  return `Connected as ${r.user.username}${teamId ? ` (team ${teamId})` : ""}.`;
}
