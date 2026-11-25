import "../guard";
import { Octokit } from "@octokit/rest";
import { AgentError } from "./anthropic";
import { getCredential, IntegrationUnavailableError, touchIntegrationSuccess } from "./credentials";

async function client(organizationId: string) {
  const cred = await getCredential(organizationId, "github");
  if (!cred.secret) throw new IntegrationUnavailableError("github");
  const octokit = new Octokit({ auth: cred.secret, request: { timeout: 30000 } });
  const owner = cred.config.owner || (await octokit.users.getAuthenticated()).data.login;
  return { octokit, owner };
}

function wrap(err: unknown): never {
  const e = err as { status?: number; message?: string };
  throw new AgentError(`GitHub: ${e.message ?? "request failed"}`, `GITHUB_${e.status ?? "ERR"}`, e.status === 429 || (e.status ?? 0) >= 500);
}

/** Creates (if needed) a private repository and commits the site files as one commit. */
export async function pushSiteToGithub(
  organizationId: string,
  opts: { repo: string; files: { path: string; content: Buffer }[]; message: string; description: string },
): Promise<{ repo: string; commitSha: string; htmlUrl: string }> {
  const { octokit, owner } = await client(organizationId);
  try {
    let defaultBranch = "main";
    try {
      const r = await octokit.repos.get({ owner, repo: opts.repo });
      defaultBranch = r.data.default_branch;
    } catch (err) {
      if ((err as { status?: number }).status !== 404) throw err;
      const me = (await octokit.users.getAuthenticated()).data.login;
      const params = { name: opts.repo, private: true, description: opts.description.slice(0, 300), auto_init: true };
      if (me.toLowerCase() === owner.toLowerCase()) await octokit.repos.createForAuthenticatedUser(params);
      else await octokit.repos.createInOrg({ org: owner, ...params });
    }
    const ref = await octokit.git.getRef({ owner, repo: opts.repo, ref: `heads/${defaultBranch}` });
    const parentSha = ref.data.object.sha;
    const parent = await octokit.git.getCommit({ owner, repo: opts.repo, commit_sha: parentSha });
    const tree = await octokit.git.createTree({
      owner,
      repo: opts.repo,
      base_tree: parent.data.tree.sha,
      tree: await Promise.all(
        opts.files.map(async (f) => {
          const blob = await octokit.git.createBlob({ owner, repo: opts.repo, content: f.content.toString("base64"), encoding: "base64" });
          return { path: f.path, mode: "100644" as const, type: "blob" as const, sha: blob.data.sha };
        }),
      ),
    });
    const commit = await octokit.git.createCommit({ owner, repo: opts.repo, message: opts.message, tree: tree.data.sha, parents: [parentSha] });
    await octokit.git.updateRef({ owner, repo: opts.repo, ref: `heads/${defaultBranch}`, sha: commit.data.sha });
    void touchIntegrationSuccess(organizationId, "github");
    return { repo: `${owner}/${opts.repo}`, commitSha: commit.data.sha, htmlUrl: `https://github.com/${owner}/${opts.repo}` };
  } catch (err) {
    if (err instanceof AgentError) throw err;
    wrap(err);
  }
}

export async function testGithub(token: string, owner?: string) {
  const octokit = new Octokit({ auth: token, request: { timeout: 15000 } });
  const me = await octokit.users.getAuthenticated();
  return `Connected as ${me.data.login}${owner ? `; repositories will be created under ${owner}` : ""}.`;
}
