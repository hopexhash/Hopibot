import { sql } from "drizzle-orm";
import {
  bigserial,
  boolean,
  doublePrecision,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const id = () => uuid("id").primaryKey().defaultRandom();
const orgId = () =>
  uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" });
const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const updatedAt = () => timestamp("updated_at", { withTimezone: true }).notNull().defaultNow();
const money = (name: string) => numeric(name, { precision: 14, scale: 6, mode: "number" });

// ───────────────────────── Identity & tenancy ─────────────────────────

export const organizations = pgTable("organizations", {
  id: id(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  /** OrgSettings (src/lib/types.ts): agency identity, limits, scoring weights. */
  settings: jsonb("settings").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const users = pgTable("users", {
  id: id(),
  email: text("email").notNull().unique(),
  name: text("name"),
  /** scrypt hash; null for Supabase-authenticated users. */
  passwordHash: text("password_hash"),
  authProvider: text("auth_provider").notNull().default("local"),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: createdAt(),
});

export const organizationMembers = pgTable(
  "organization_members",
  {
    id: id(),
    organizationId: orgId(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").$type<"owner" | "admin" | "member" | "viewer">().notNull().default("member"),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("org_members_unique").on(t.organizationId, t.userId), index("org_members_user").on(t.userId)],
);

export const sessions = pgTable(
  "sessions",
  {
    id: id(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ip: text("ip"),
    userAgent: text("user_agent"),
    createdAt: createdAt(),
  },
  (t) => [index("sessions_user").on(t.userId)],
);

// ───────────────────────── Agents ─────────────────────────

export const agents = pgTable(
  "agents",
  {
    id: id(),
    organizationId: orgId(),
    key: text("key").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    enabled: boolean("enabled").notNull().default(true),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("agents_org_key").on(t.organizationId, t.key)],
);

export const agentConfigurations = pgTable(
  "agent_configurations",
  {
    id: id(),
    organizationId: orgId(),
    agentId: uuid("agent_id")
      .notNull()
      .references(() => agents.id, { onDelete: "cascade" }),
    instructions: text("instructions").notNull().default(""),
    model: text("model"),
    effort: text("effort"),
    temperature: doublePrecision("temperature"),
    maxTasksPerRun: integer("max_tasks_per_run").notNull().default(100),
    concurrency: integer("concurrency").notNull().default(2),
    dailySpendLimitUsd: money("daily_spend_limit_usd"),
    maxRetries: integer("max_retries").notNull().default(3),
    settings: jsonb("settings").$type<Record<string, unknown>>().notNull().default({}),
    version: integer("version").notNull().default(1),
    updatedBy: uuid("updated_by").references(() => users.id, { onDelete: "set null" }),
    updatedAt: updatedAt(),
  },
  (t) => [uniqueIndex("agent_config_agent").on(t.agentId)],
);

// ───────────────────────── Businesses & leads ─────────────────────────

export const discoveryCampaigns = pgTable(
  "discovery_campaigns",
  {
    id: id(),
    organizationId: orgId(),
    name: text("name").notNull(),
    params: jsonb("params").$type<Record<string, unknown>>().notNull(),
    status: text("status").notNull().default("PENDING"),
    found: integer("found").notNull().default(0),
    qualified: integer("qualified").notNull().default(0),
    duplicates: integer("duplicates").notNull().default(0),
    runId: uuid("run_id"),
    isMock: boolean("is_mock").notNull().default(false),
    error: text("error"),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    createdAt: createdAt(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (t) => [index("campaigns_org_created").on(t.organizationId, t.createdAt)],
);

export const businesses = pgTable(
  "businesses",
  {
    id: id(),
    organizationId: orgId(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    address: text("address"),
    city: text("city"),
    country: text("country"),
    postalCode: text("postal_code"),
    lat: doublePrecision("lat"),
    lng: doublePrecision("lng"),
    phone: text("phone"),
    websiteUrl: text("website_url"),
    googlePlaceId: text("google_place_id"),
    googleMapsUrl: text("google_maps_url"),
    rating: doublePrecision("rating"),
    reviewCount: integer("review_count"),
    openingHours: jsonb("opening_hours").$type<string[] | null>(),
    businessStatus: text("business_status"),
    /** none_found | verified_none | has_website | unreachable | unknown */
    websiteStatus: text("website_status").notNull().default("unknown"),
    websiteAudit: jsonb("website_audit").$type<Record<string, unknown> | null>(),
    websiteQuality: integer("website_quality"),
    leadScore: integer("lead_score"),
    researchStatus: text("research_status").notNull().default("not_started"),
    pipelineStage: text("pipeline_stage").notNull().default("DISCOVERED"),
    salesValueCents: integer("sales_value_cents"),
    followUpAt: timestamp("follow_up_at", { withTimezone: true }),
    lostReason: text("lost_reason"),
    /** Outreach permission: unknown | consent | existing_customer | legitimate_interest | not_allowed | opted_out */
    contactPermission: text("contact_permission").notNull().default("unknown"),
    /** Where the permission/contact basis comes from (e.g. "contact form on own website", "phone call 12 May"). */
    permissionSource: text("permission_source"),
    /** Proof of consent: free text or a link to the stored evidence. */
    permissionProof: text("permission_proof"),
    permissionAt: timestamp("permission_at", { withTimezone: true }),
    /** Redesign qualification (see lib/qualification): excellent | good | average | rejected | review | qualified | high_priority | no_email | not_inspected. Null = never assessed (manual leads, businesses without a website). */
    qualification: text("qualification"),
    /** 0–100: how badly the current website needs a redesign. */
    redesignScore: integer("redesign_score"),
    inspectedAt: timestamp("inspected_at", { withTimezone: true }),
    dedupeKey: text("dedupe_key").notNull(),
    source: text("source").notNull().default("google_places"),
    sourceData: jsonb("source_data").$type<Record<string, unknown> | null>(),
    campaignId: uuid("campaign_id").references(() => discoveryCampaigns.id, { onDelete: "set null" }),
    isMock: boolean("is_mock").notNull().default(false),
    /** GDPR: set when the business asked to be erased; row kept as a tombstone only. */
    erasedAt: timestamp("erased_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("businesses_org_place").on(t.organizationId, t.googlePlaceId),
    index("businesses_org_dedupe").on(t.organizationId, t.dedupeKey),
    index("businesses_org_stage").on(t.organizationId, t.pipelineStage),
    index("businesses_org_score").on(t.organizationId, t.leadScore),
    index("businesses_org_created").on(t.organizationId, t.createdAt),
    index("businesses_org_qualification").on(t.organizationId, t.qualification),
  ],
);

export const leads = pgTable(
  "leads",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    campaignId: uuid("campaign_id").references(() => discoveryCampaigns.id, { onDelete: "set null" }),
    qualified: boolean("qualified").notNull().default(false),
    status: text("status").notNull().default("new"),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("leads_business_campaign").on(t.businessId, t.campaignId),
    index("leads_org_created").on(t.organizationId, t.createdAt),
  ],
);

export const leadScores = pgTable(
  "lead_scores",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    breakdown: jsonb("breakdown").$type<{ factor: string; points: number; reason: string }[]>().notNull(),
    weights: jsonb("weights").$type<Record<string, number>>().notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("lead_scores_business").on(t.businessId, t.createdAt)],
);

export const businessContacts = pgTable(
  "business_contacts",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // email | phone | contact_form
    value: text("value").notNull(),
    isGeneric: boolean("is_generic").notNull().default(false),
    source: text("source").notNull(), // website | hunter | google_places | manual
    sourceUrl: text("source_url"),
    /** unverified | valid | invalid | accept_all | unknown */
    verificationStatus: text("verification_status").notNull().default("unverified"),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    confidence: integer("confidence"),
    lawfulBasis: text("lawful_basis"), // e.g. legitimate_interest_b2b_public_listing
    isMock: boolean("is_mock").notNull().default(false),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("contacts_business_value").on(t.businessId, t.type, t.value)],
);

export const businessResearch = pgTable(
  "business_research",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    profile: jsonb("profile").$type<Record<string, unknown>>().notNull(),
    brief: jsonb("brief").$type<Record<string, unknown>>().notNull(),
    sources: jsonb("sources").$type<string[]>().notNull().default([]),
    model: text("model"),
    isMock: boolean("is_mock").notNull().default(false),
    createdAt: createdAt(),
  },
  (t) => [index("research_business").on(t.businessId, t.createdAt)],
);

// ───────────────────────── Websites ─────────────────────────

export const websiteTemplates = pgTable("website_templates", {
  id: id(),
  key: text("key").notNull().unique(),
  category: text("category").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  designTokens: jsonb("design_tokens").$type<Record<string, unknown>>().notNull(),
  sections: jsonb("sections").$type<string[]>().notNull(),
  createdAt: createdAt(),
});

export const websiteProjects = pgTable(
  "website_projects",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    templateKey: text("template_key").notNull(),
    slug: text("slug").notNull().unique(),
    /** draft | generating | testing | needs_fixes | ready | failed */
    status: text("status").notNull().default("draft"),
    /** pending | approved | rejected */
    approvalStatus: text("approval_status").notNull().default("pending"),
    currentVersionId: uuid("current_version_id"),
    qualityScore: integer("quality_score"),
    previewUrl: text("preview_url"),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("projects_org_status").on(t.organizationId, t.status), index("projects_business").on(t.businessId)],
);

export const websiteVersions = pgTable(
  "website_versions",
  {
    id: id(),
    organizationId: orgId(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => websiteProjects.id, { onDelete: "cascade" }),
    versionNo: integer("version_no").notNull(),
    spec: jsonb("spec").$type<Record<string, unknown>>().notNull(),
    changeSummary: text("change_summary"),
    instruction: text("instruction"),
    qcScore: integer("qc_score"),
    qcReport: jsonb("qc_report").$type<Record<string, unknown> | null>(),
    qcAttempts: integer("qc_attempts").notNull().default(0),
    files: jsonb("files").$type<{ path: string; size: number; sha1: string }[] | null>(),
    storagePath: text("storage_path"),
    isMock: boolean("is_mock").notNull().default(false),
    createdBy: text("created_by").notNull().default("agent"),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("versions_project_no").on(t.projectId, t.versionNo)],
);

/** Rendered static files of a version: what QC tests is exactly what preview serves and what gets deployed. */
export const websiteFiles = pgTable(
  "website_files",
  {
    id: id(),
    organizationId: orgId(),
    versionId: uuid("version_id")
      .notNull()
      .references(() => websiteVersions.id, { onDelete: "cascade" }),
    path: text("path").notNull(),
    content: text("content").notNull(),
    contentType: text("content_type").notNull(),
    sha1: text("sha1").notNull(),
    size: integer("size").notNull(),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("website_files_version_path").on(t.versionId, t.path)],
);

export const deployments = pgTable(
  "deployments",
  {
    id: id(),
    organizationId: orgId(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => websiteProjects.id, { onDelete: "cascade" }),
    versionId: uuid("version_id").references(() => websiteVersions.id, { onDelete: "set null" }),
    provider: text("provider").notNull(), // vercel | internal
    environment: text("environment").notNull().default("preview"), // preview | production
    /** queued | building | ready | error | cancelled */
    status: text("status").notNull().default("queued"),
    url: text("url"),
    providerDeploymentId: text("provider_deployment_id"),
    githubRepo: text("github_repo"),
    githubCommit: text("github_commit"),
    customDomain: text("custom_domain"),
    error: text("error"),
    attempts: integer("attempts").notNull().default(0),
    isMock: boolean("is_mock").notNull().default(false),
    createdAt: createdAt(),
    readyAt: timestamp("ready_at", { withTimezone: true }),
  },
  (t) => [index("deployments_project").on(t.projectId, t.createdAt), index("deployments_org").on(t.organizationId, t.createdAt)],
);

// ───────────────────────── Sales & CRM ─────────────────────────

export const salesEmails = pgTable(
  "sales_emails",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").references(() => websiteProjects.id, { onDelete: "set null" }),
    contactId: uuid("contact_id").references(() => businessContacts.id, { onDelete: "set null" }),
    kind: text("kind").notNull().default("intro"), // intro | follow_up | proposal
    subject: text("subject").notNull(),
    bodyText: text("body_text").notNull(),
    toEmail: text("to_email"),
    proposal: jsonb("proposal").$type<Record<string, unknown> | null>(),
    crmNotes: text("crm_notes"),
    /** draft | awaiting_approval | approved | sending | sent | failed | cancelled | blocked */
    status: text("status").notNull().default("draft"),
    blockedReason: text("blocked_reason"),
    approvedBy: uuid("approved_by").references(() => users.id, { onDelete: "set null" }),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    providerMessageId: text("provider_message_id"),
    unsubscribeToken: text("unsubscribe_token").notNull().unique(),
    error: text("error"),
    isMock: boolean("is_mock").notNull().default(false),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("emails_org_status").on(t.organizationId, t.status), index("emails_business").on(t.businessId)],
);

export const emailEvents = pgTable(
  "email_events",
  {
    id: id(),
    organizationId: orgId(),
    emailId: uuid("email_id").references(() => salesEmails.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    providerEventId: text("provider_event_id"),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("email_events_email").on(t.emailId), uniqueIndex("email_events_provider").on(t.providerEventId)],
);

export const crmActivities = pgTable(
  "crm_activities",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    type: text("type").notNull(), // note | stage_change | email | call | meeting | system
    content: text("content").notNull(),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: createdAt(),
  },
  (t) => [index("crm_business").on(t.businessId, t.createdAt)],
);

export const suppressionList = pgTable(
  "suppression_list",
  {
    id: id(),
    organizationId: orgId(),
    email: text("email"),
    domain: text("domain"),
    reason: text("reason").notNull(), // opt_out | bounce | complaint | manual | gdpr_erasure
    source: text("source"),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("suppression_org_email").on(t.organizationId, t.email),
    index("suppression_org_domain").on(t.organizationId, t.domain),
  ],
);

// ───────────────────────── Workflows & orchestration ─────────────────────────

export const workflows = pgTable(
  "workflows",
  {
    id: id(),
    organizationId: orgId(),
    name: text("name").notNull(),
    description: text("description"),
    /** manual | new_qualified_lead | schedule */
    triggerType: text("trigger_type").notNull(),
    triggerConfig: jsonb("trigger_config").$type<Record<string, unknown>>().notNull().default({}),
    enabled: boolean("enabled").notNull().default(true),
    maxRunsPerDay: integer("max_runs_per_day").notNull().default(10),
    lastRunAt: timestamp("last_run_at", { withTimezone: true }),
    nextRunAt: timestamp("next_run_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("workflows_org").on(t.organizationId), index("workflows_next_run").on(t.enabled, t.nextRunAt)],
);

export const workflowSteps = pgTable(
  "workflow_steps",
  {
    id: id(),
    organizationId: orgId(),
    workflowId: uuid("workflow_id")
      .notNull()
      .references(() => workflows.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    action: text("action").notNull(), // research | contacts | generate_website | qc | deploy | sales_email | notify
    enabled: boolean("enabled").notNull().default(true),
    config: jsonb("config").$type<Record<string, unknown>>().notNull().default({}),
  },
  (t) => [uniqueIndex("workflow_steps_position").on(t.workflowId, t.position)],
);

export const workflowRuns = pgTable(
  "workflow_runs",
  {
    id: id(),
    organizationId: orgId(),
    workflowId: uuid("workflow_id").references(() => workflows.id, { onDelete: "set null" }),
    objective: text("objective"),
    plan: jsonb("plan").$type<Record<string, unknown>>().notNull(),
    status: text("status").notNull().default("PENDING"),
    error: text("error"),
    report: jsonb("report").$type<Record<string, unknown> | null>(),
    isMock: boolean("is_mock").notNull().default(false),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("runs_org_created").on(t.organizationId, t.createdAt)],
);

export const agentTasks = pgTable(
  "agent_tasks",
  {
    id: id(),
    organizationId: orgId(),
    runId: uuid("run_id").references(() => workflowRuns.id, { onDelete: "cascade" }),
    agentKey: text("agent_key").notNull(),
    type: text("type").notNull(),
    businessId: uuid("business_id").references(() => businesses.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").references(() => websiteProjects.id, { onDelete: "cascade" }),
    /** PENDING | RUNNING | WAITING_FOR_APPROVAL | COMPLETED | FAILED | CANCELLED */
    status: text("status").notNull().default("PENDING"),
    input: jsonb("input").$type<Record<string, unknown>>().notNull().default({}),
    output: jsonb("output").$type<Record<string, unknown> | null>(),
    dependsOn: uuid("depends_on")
      .array()
      .notNull()
      .default(sql`'{}'::uuid[]`),
    idempotencyKey: text("idempotency_key").notNull(),
    priority: integer("priority").notNull().default(5),
    attempts: integer("attempts").notNull().default(0),
    maxAttempts: integer("max_attempts").notNull().default(3),
    waitingReason: text("waiting_reason"),
    error: jsonb("error").$type<{ message: string; code?: string; retryable?: boolean } | null>(),
    costUsd: money("cost_usd").notNull().default(0),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull().defaultNow(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    heartbeatAt: timestamp("heartbeat_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("tasks_org_idempotency").on(t.organizationId, t.idempotencyKey),
    index("tasks_org_status").on(t.organizationId, t.status),
    index("tasks_status_heartbeat").on(t.status, t.heartbeatAt),
    index("tasks_run").on(t.runId),
    index("tasks_org_agent_created").on(t.organizationId, t.agentKey, t.createdAt),
  ],
);

export const agentLogs = pgTable(
  "agent_logs",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    organizationId: orgId(),
    taskId: uuid("task_id").references(() => agentTasks.id, { onDelete: "cascade" }),
    runId: uuid("run_id"),
    agentKey: text("agent_key").notNull(),
    level: text("level").notNull().default("info"), // debug | info | warn | error
    message: text("message").notNull(),
    data: jsonb("data").$type<Record<string, unknown> | null>(),
    /** Structured event fields for the Live Operations feed (see lib/activity). */
    category: text("category"),
    kind: text("kind"),
    /** running | completed | failed | waiting | warning | info */
    status: text("status"),
    businessId: uuid("business_id"),
    url: text("url"),
    createdAt: createdAt(),
  },
  (t) => [index("logs_org_created").on(t.organizationId, t.createdAt), index("logs_task").on(t.taskId), index("logs_org_id").on(t.organizationId, t.id), index("logs_run_kind").on(t.runId, t.kind)],
);

export const approvals = pgTable(
  "approvals",
  {
    id: id(),
    organizationId: orgId(),
    /** send_email | publish_website | connect_domain | purchase | budget_override | modify_external */
    kind: text("kind").notNull(),
    subjectType: text("subject_type").notNull(),
    subjectId: uuid("subject_id").notNull(),
    taskId: uuid("task_id").references(() => agentTasks.id, { onDelete: "set null" }),
    status: text("status").notNull().default("pending"), // pending | approved | rejected
    summary: text("summary").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
    decidedBy: uuid("decided_by").references(() => users.id, { onDelete: "set null" }),
    decidedAt: timestamp("decided_at", { withTimezone: true }),
    reason: text("reason"),
    createdAt: createdAt(),
  },
  (t) => [index("approvals_org_status").on(t.organizationId, t.status), index("approvals_subject").on(t.subjectType, t.subjectId)],
);

// ───────────────────────── Costs, billing, integrations ─────────────────────────

export const apiUsage = pgTable(
  "api_usage",
  {
    id: id(),
    organizationId: orgId(),
    provider: text("provider").notNull(), // anthropic | google_places | hunter | vercel | resend | hosting | images
    operation: text("operation").notNull(),
    model: text("model"),
    inputTokens: integer("input_tokens").notNull().default(0),
    outputTokens: integer("output_tokens").notNull().default(0),
    cacheReadTokens: integer("cache_read_tokens").notNull().default(0),
    units: integer("units").notNull().default(1),
    costUsd: money("cost_usd").notNull().default(0),
    agentKey: text("agent_key"),
    taskId: uuid("task_id").references(() => agentTasks.id, { onDelete: "set null" }),
    businessId: uuid("business_id").references(() => businesses.id, { onDelete: "set null" }),
    projectId: uuid("project_id").references(() => websiteProjects.id, { onDelete: "set null" }),
    isMock: boolean("is_mock").notNull().default(false),
    createdAt: createdAt(),
  },
  (t) => [
    index("usage_org_created").on(t.organizationId, t.createdAt),
    index("usage_org_provider").on(t.organizationId, t.provider),
    index("usage_business").on(t.businessId),
  ],
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id").references(() => businesses.id, { onDelete: "set null" }),
    stripeSubscriptionId: text("stripe_subscription_id").unique(),
    stripeCustomerId: text("stripe_customer_id"),
    status: text("status").notNull(),
    plan: text("plan"),
    amountCents: integer("amount_cents").notNull().default(0),
    currency: text("currency").notNull().default("eur"),
    interval: text("interval").notNull().default("month"),
    startedAt: timestamp("started_at", { withTimezone: true }),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("subs_org").on(t.organizationId)],
);

export const payments = pgTable(
  "payments",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id").references(() => businesses.id, { onDelete: "set null" }),
    stripeId: text("stripe_id").unique(),
    amountCents: integer("amount_cents").notNull(),
    currency: text("currency").notNull().default("eur"),
    status: text("status").notNull(),
    description: text("description"),
    source: text("source").notNull().default("stripe"), // stripe | manual
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("payments_org_paid").on(t.organizationId, t.paidAt)],
);

export const integrationCredentials = pgTable(
  "integration_credentials",
  {
    id: id(),
    organizationId: orgId(),
    provider: text("provider").notNull(),
    encryptedSecret: text("encrypted_secret"),
    secretHint: text("secret_hint"),
    config: jsonb("config").$type<Record<string, string>>().notNull().default({}),
    status: text("status").notNull().default("untested"), // untested | connected | error
    lastSuccessAt: timestamp("last_success_at", { withTimezone: true }),
    lastTestedAt: timestamp("last_tested_at", { withTimezone: true }),
    lastError: text("last_error"),
    updatedAt: updatedAt(),
  },
  (t) => [uniqueIndex("integrations_org_provider").on(t.organizationId, t.provider)],
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    action: text("action").notNull(),
    targetType: text("target_type"),
    targetId: text("target_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    ip: text("ip"),
    createdAt: createdAt(),
  },
  (t) => [index("audit_org_created").on(t.organizationId, t.createdAt)],
);

export const notifications = pgTable(
  "notifications",
  {
    id: id(),
    organizationId: orgId(),
    /** info | success | warning | error | approval | budget */
    kind: text("kind").notNull().default("info"),
    title: text("title").notNull(),
    body: text("body"),
    href: text("href"),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("notifications_org").on(t.organizationId, t.createdAt)],
);

// ───────────────────────── Custom agents (Agent Builder) ─────────────────────────

export const customAgents = pgTable(
  "custom_agents",
  {
    id: id(),
    organizationId: orgId(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    /** System instructions written by the operator (or generated and then reviewed). */
    instructions: text("instructions").notNull(),
    model: text("model").notNull(),
    effort: text("effort").notNull().default("medium"),
    maxOutputTokens: integer("max_output_tokens").notNull().default(8000),
    /** Names from the server-side tool registry. Anything not listed is never offered to the model. */
    tools: text("tools").array().notNull().default(sql`'{}'::text[]`),
    /** What the agent may do beyond reading: validated again on every tool call. */
    permissions: jsonb("permissions").$type<{ writeCrm: boolean; usePaidApis: boolean; startAgents: boolean }>().notNull(),
    memoryEnabled: boolean("memory_enabled").notNull().default(false),
    /** Notes the agent chose to remember between runs (only when memory is enabled). */
    memory: text("memory").notNull().default(""),
    dailyBudgetUsd: money("daily_budget_usd").notNull().default(1),
    maxRunSeconds: integer("max_run_seconds").notNull().default(300),
    maxSteps: integer("max_steps").notNull().default(15),
    maxRetries: integer("max_retries").notNull().default(1),
    /** draft (only test runs) | active | paused */
    status: text("status").notNull().default("draft"),
    /** Set after a test run finished successfully; required before activation. */
    testedAt: timestamp("tested_at", { withTimezone: true }),
    lastRunAt: timestamp("last_run_at", { withTimezone: true }),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("custom_agents_org").on(t.organizationId, t.createdAt)],
);

// ───────────────────────── Outreach campaigns ─────────────────────────

export const emailCampaigns = pgTable(
  "email_campaigns",
  {
    id: id(),
    organizationId: orgId(),
    name: text("name").notNull(),
    /** draft | awaiting_approval | active | paused | completed | cancelled */
    status: text("status").notNull().default("draft"),
    subjectTemplate: text("subject_template").notNull(),
    bodyTemplate: text("body_template").notNull(),
    followUpEnabled: boolean("follow_up_enabled").notNull().default(false),
    followUpAfterDays: integer("follow_up_after_days").notNull().default(5),
    followUpSubject: text("follow_up_subject"),
    followUpBody: text("follow_up_body"),
    /** Hard cap on emails this campaign may send per UTC day. */
    dailyLimit: integer("daily_limit").notNull().default(20),
    startAt: timestamp("start_at", { withTimezone: true }),
    approvedBy: uuid("approved_by").references(() => users.id, { onDelete: "set null" }),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("email_campaigns_org").on(t.organizationId, t.status)],
);

export const campaignRecipients = pgTable(
  "campaign_recipients",
  {
    id: id(),
    organizationId: orgId(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => emailCampaigns.id, { onDelete: "cascade" }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    toEmail: text("to_email"),
    /** pending | sent | follow_up_sent | skipped | failed | replied */
    status: text("status").notNull().default("pending"),
    skipReason: text("skip_reason"),
    introEmailId: uuid("intro_email_id").references(() => salesEmails.id, { onDelete: "set null" }),
    followUpEmailId: uuid("follow_up_email_id").references(() => salesEmails.id, { onDelete: "set null" }),
    introSentAt: timestamp("intro_sent_at", { withTimezone: true }),
    followUpDueAt: timestamp("follow_up_due_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("campaign_recipient_unique").on(t.campaignId, t.businessId), index("campaign_recipients_status").on(t.campaignId, t.status)],
);

// ───────────────────────── Finance & CRM extras ─────────────────────────

/** Operating expenses entered by hand (hosting, tools, freelancers). API usage is tracked separately. */
export const expenses = pgTable(
  "expenses",
  {
    id: id(),
    organizationId: orgId(),
    /** hosting | email | software | contractor | other */
    category: text("category").notNull(),
    description: text("description").notNull(),
    amountCents: integer("amount_cents").notNull(),
    currency: text("currency").notNull().default("eur"),
    incurredOn: timestamp("incurred_on", { withTimezone: true }).notNull(),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    createdAt: createdAt(),
  },
  (t) => [index("expenses_org_date").on(t.organizationId, t.incurredOn)],
);

export const crmTasks = pgTable(
  "crm_tasks",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    dueAt: timestamp("due_at", { withTimezone: true }),
    doneAt: timestamp("done_at", { withTimezone: true }),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    createdAt: createdAt(),
  },
  (t) => [index("crm_tasks_business").on(t.businessId, t.doneAt), index("crm_tasks_org_due").on(t.organizationId, t.dueAt)],
);

// ───────────────────────── Sales: demo pages & checkout ─────────────────────────

/** A prospect's order from the demo page: one package, optional care plan and add-ons. */
export const orders = pgTable(
  "orders",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").references(() => websiteProjects.id, { onDelete: "set null" }),
    /** requested (no online payment available) | checkout_started | paid | cancelled */
    status: text("status").notNull().default("requested"),
    packageKey: text("package_key").notNull(),
    planKey: text("plan_key"),
    /** Snapshot of what was ordered and the prices at that moment. */
    items: jsonb("items").$type<{ key: string; name: string; kind: "one_time" | "monthly"; unitCents: number; quantity: number }[]>().notNull(),
    oneTimeCents: integer("one_time_cents").notNull().default(0),
    monthlyCents: integer("monthly_cents").notNull().default(0),
    currency: text("currency").notNull().default("eur"),
    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone"),
    note: text("note"),
    stripeSessionId: text("stripe_session_id"),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("orders_org_created").on(t.organizationId, t.createdAt), index("orders_business").on(t.businessId), index("orders_stripe").on(t.stripeSessionId)],
);

/** Prospect activity on a demo page (never recorded for signed-in agency users). */
export const demoEvents = pgTable(
  "demo_events",
  {
    id: id(),
    organizationId: orgId(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => websiteProjects.id, { onDelete: "cascade" }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    /** view | checkout_view | order */
    type: text("type").notNull(),
    /** Daily-rotating anonymous hash, used only to count unique visitors. No IP is stored. */
    visitor: text("visitor"),
    createdAt: createdAt(),
  },
  (t) => [index("demo_events_org_created").on(t.organizationId, t.createdAt), index("demo_events_project").on(t.projectId, t.type)],
);

// ───────────────────────── Website inspection & qualification ─────────────────────────

/** One real-browser inspection of a business's existing website, with the decision and why. */
export const websiteInspections = pgTable(
  "website_inspections",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    qualification: text("qualification").notNull(),
    redesignScore: integer("redesign_score").notNull(),
    /** Points per area (higher = bigger problem): mobile, visual, structure, freshness, technical, conversion, performance. */
    areaScores: jsonb("area_scores").$type<Record<string, number>>().notNull(),
    measured: jsonb("measured").$type<Record<string, unknown>>().notNull(),
    problems: jsonb("problems").$type<{ area: string; problem: string; evidence: string }[]>().notNull(),
    opportunities: jsonb("opportunities").$type<string[]>().notNull(),
    /** Why it was accepted or rejected, in plain language. */
    explanation: text("explanation").notNull(),
    summary: text("summary"),
    verdict: text("verdict"),
    verification: jsonb("verification").$type<{ approach: boolean; problems: string[]; reasoning: string } | null>(),
    /** JPEG screenshots, base64. Never selected in list queries. */
    desktopShot: text("desktop_shot"),
    mobileShot: text("mobile_shot"),
    costUsd: money("cost_usd"),
    isMock: boolean("is_mock").notNull().default(false),
    createdAt: createdAt(),
  },
  (t) => [index("website_inspections_business").on(t.businessId, t.createdAt), index("website_inspections_org").on(t.organizationId, t.createdAt)],
);

/** The owner's own judgement of a website; used as calibration examples for future assessments. */
export const websiteFeedback = pgTable(
  "website_feedback",
  {
    id: id(),
    organizationId: orgId(),
    businessId: uuid("business_id").references(() => businesses.id, { onDelete: "set null" }),
    domain: text("domain").notNull(),
    businessName: text("business_name"),
    /** excellent | modern | average | needs_redesign */
    classification: text("classification").notNull(),
    /** What the AI had concluded when the owner corrected or confirmed it. */
    aiQualification: text("ai_qualification"),
    aiScore: integer("ai_score"),
    aiSummary: text("ai_summary"),
    note: text("note"),
    createdBy: uuid("created_by"),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("website_feedback_org_domain").on(t.organizationId, t.domain), index("website_feedback_org_created").on(t.organizationId, t.createdAt)],
);

// ───────────────────────── Website performance (field data) ─────────────────────────

/**
 * One Core Web Vitals measurement from a real visit to the public website. Anonymous by
 * design: no IP address, no user agent, no visitor or session identifier, no cookie. Only the
 * page path (without query string), the metric and coarse context (phone or desktop, network
 * class) are kept, for 90 days.
 */
export const webVitals = pgTable(
  "web_vitals",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    organizationId: orgId(),
    path: text("path").notNull(),
    /** LCP | INP | CLS | FCP | TTFB */
    metric: text("metric").notNull(),
    value: doublePrecision("value").notNull(),
    /** good | needs-improvement | poor (Google's thresholds) */
    rating: text("rating").notNull(),
    /** mobile | desktop (from the viewport width) */
    device: text("device").notNull(),
    /** navigate | reload | back-forward | soft-navigation | ... */
    navigation: text("navigation"),
    /** Effective network class reported by the browser (4g, 3g, ...), when available. */
    connection: text("connection"),
    /** LCP: the element and image; INP: the element interacted with; once per page: largest files. */
    detail: jsonb("detail"),
    createdAt: createdAt(),
  },
  (t) => [index("web_vitals_org_created").on(t.organizationId, t.createdAt), index("web_vitals_org_metric").on(t.organizationId, t.metric, t.createdAt)],
);
