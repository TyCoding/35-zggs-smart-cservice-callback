import { prisma } from "@/lib/prisma";
import { appMeta, seedInsights, seedRecords } from "@/lib/domain";
import { getMockIntegrationHealth } from "@/lib/mock-integrations";
import type { AiConversationView, DashboardSnapshot } from "@/lib/types";

declare global {
  var __zggsSeedPromise: Promise<void> | undefined;
}

function toIso(value: Date | null) {
  return value ? value.toISOString() : null;
}

function createSeedAiDrafts(items: Array<{ id: string; title: string; category: string; status: string; owner: string; riskLevel: string; sourceBatch: string }>) {
  return items.slice(0, 3).flatMap((item, index) => {
    const conversationId = `seed-${appMeta.seq}-conversation-${index + 1}`;
    const topic = `${item.title} · ${appMeta.aiExperience.resultType}`.slice(0, 48);
    const base = {
      conversationId,
      topic,
      resultType: appMeta.aiExperience.resultType,
      sourceSummary: `已读取${item.sourceBatch}，当前状态${item.status}，责任岗位${item.owner}。`,
      businessObjectId: item.id,
      businessObjectType: appMeta.sourceObjectName,
      businessObjectTitle: item.title,
      sourceMode: "local" as const,
      saveStatus: index === 0 ? appMeta.aiExperience.savedStatusLabel : "待采纳",
      saveSummary: index === 0 ? appMeta.aiExperience.savedSuccessText : null,
      savedAt: index === 0 ? new Date() : null,
    };

    return [
      {
        ...base,
        turnIndex: 0,
        prompt: appMeta.aiExperience.quickPrompts[index] ?? appMeta.aiPrompt,
        result: [
          `处理对象：${item.title}`,
          `${appMeta.aiExperience.focusAreas[0]}：建议围绕${item.category}先核验历史会话与FAQ命中结果。`,
          `${appMeta.aiExperience.focusAreas[1]}：由${item.owner}牵头处理，保持${item.status}阶段的服务留痕。`,
          `${appMeta.aiExperience.focusAreas[2]}：当前风险等级${item.riskLevel}，建议补充回访话术与升级策略。`,
        ].join("\n"),
        status: index === 0 ? "已保存" : "已形成初稿",
      },
      {
        ...base,
        turnIndex: 1,
        prompt: `请继续补充${appMeta.aiExperience.focusAreas[3]}与最优推荐。`,
        result: [
          `后续动作：继续围绕${item.title}完善${appMeta.aiExperience.focusAreas[3]}和${appMeta.aiExperience.focusAreas[4]}。`,
          `执行建议：同步更新回访结果、预约安排和风险提醒。`,
          `保存提醒：确认后可直接采纳，刷新页面仍可恢复当前会话。`,
        ].join("\n"),
        status: "已形成初稿",
      },
    ];
  });
}

function governanceUsers(now: Date) {
  return [
    {
      username: "admin",
      displayName: "演示管理员",
      department: appMeta.department,
      role: "系统管理员",
      status: "启用",
      lastLoginAt: now,
    },
    {
      username: `${appMeta.seq}-manager`,
      displayName: `${appMeta.shortName}负责人`,
      department: appMeta.department,
      role: "业务负责人",
      status: "启用",
      lastLoginAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    },
    {
      username: `${appMeta.seq}-analyst`,
      displayName: "客服分析专员",
      department: appMeta.department,
      role: "分析师",
      status: "启用",
      lastLoginAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
    },
    {
      username: `${appMeta.seq}-auditor`,
      displayName: "审计复核岗",
      department: appMeta.department,
      role: "审计员",
      status: "停用",
      lastLoginAt: null,
    },
  ];
}

function governanceSettings() {
  return [
    {
      group: "客服设置",
      key: `${appMeta.seq}.service.confidence`,
      label: "答复置信度阈值",
      value: "0.85",
      valueType: "number",
      enabled: true,
      description: `${appMeta.title}智能答复结果的最低置信度要求。`,
      updatedBy: "演示管理员",
    },
    {
      group: "流程设置",
      key: `${appMeta.seq}.sla.hours`,
      label: "高优先级回访时限",
      value: "4",
      valueType: "number",
      enabled: true,
      description: `${appMeta.title}高优先级工单的处理时限，单位为小时。`,
      updatedBy: "演示管理员",
    },
    {
      group: "通知设置",
      key: `${appMeta.seq}.notice.owner`,
      label: "责任人提醒",
      value: "开启",
      valueType: "select",
      enabled: true,
      description: "状态流转后提醒责任人复核分析进度。",
      updatedBy: "演示管理员",
    },
    {
      group: "智能分析",
      key: `${appMeta.seq}.ai.enabled`,
      label: "智能客服助手",
      value: "开启",
      valueType: "boolean",
      enabled: true,
      description: `允许在${appMeta.aiTitle}中发起咨询答复和回访建议生成。`,
      updatedBy: "演示管理员",
    },
  ];
}

function governanceAuditLogs(now: Date) {
  return [
    {
      module: "用户管理",
      action: "初始化用户",
      targetType: "管理用户",
      targetName: `${appMeta.shortName}负责人`,
      result: "成功",
      actor: "演示管理员",
      summary: `${appMeta.department}已初始化业务负责人、客服分析专员和审计复核岗。`,
      createdAt: now,
    },
    {
      module: "系统设置",
      action: "初始化设置",
      targetType: "业务参数",
      targetName: "答复置信度阈值",
      result: "成功",
      actor: "演示管理员",
      summary: `${appMeta.title}客服参数、流程阈值和智能助手开关已就绪。`,
      createdAt: new Date(now.getTime() - 30 * 60 * 1000),
    },
  ];
}

async function ensureGovernanceData() {
  const now = new Date();
  for (const user of governanceUsers(now)) {
    await prisma.systemUser.upsert({
      where: { username: user.username },
      create: user,
      update: {
        displayName: user.displayName,
        department: user.department,
        role: user.role,
        status: user.status,
        lastLoginAt: user.lastLoginAt,
      },
    });
  }

  for (const setting of governanceSettings()) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      create: setting,
      update: {
        group: setting.group,
        label: setting.label,
        value: setting.value,
        valueType: setting.valueType,
        enabled: setting.enabled,
        description: setting.description,
        updatedBy: setting.updatedBy,
      },
    });
  }

  const auditCount = await prisma.auditLog.count();
  if (auditCount === 0) {
    await prisma.auditLog.createMany({ data: governanceAuditLogs(now) });
  }
}

async function runSeedDataJob() {
  const now = new Date();
  await prisma.$transaction(async (tx) => {
    const createdItems: Array<{
      id: string;
      title: string;
      category: string;
      status: string;
      owner: string;
      riskLevel: string;
      sourceBatch: string;
    }> = [];

    for (const record of seedRecords) {
      const item = await tx.investModel.upsert({
        where: { code: record.code },
        update: {},
        create: {
          code: record.code,
          title: record.title,
          modelType: record.modelType,
          industry: record.industry,
          region: record.region,
          status: record.status,
          priority: record.priority,
          riskLevel: record.riskLevel,
          owner: record.owner,
          analyst: record.analyst,
          description: record.description,
          inputParams: record.inputParams,
          outputResult: record.outputResult,
          prediction: record.prediction,
          source: record.source,
          sourceType: record.sourceType,
          sourceTitle: record.sourceTitle,
          sourceBatch: record.sourceBatch,
          dueDate: new Date(now.getTime() + record.dueDateOffsetDays * 24 * 60 * 60 * 1000),
        },
      });

      const eventCount = await tx.modelEvent.count({ where: { modelId: item.id } });
      if (eventCount === 0) {
        await tx.modelEvent.createMany({
          data: [
            {
              modelId: item.id,
              sourceType: item.sourceType,
              sourceTitle: item.sourceTitle,
              action: "创建客服工单",
              actor: item.owner,
              content: `来自${item.sourceType}《${item.sourceTitle}》：${record.modelType}已创建，等待坐席处理和回访跟进。`,
            },
            {
              modelId: item.id,
              sourceType: item.sourceType,
              sourceTitle: item.sourceTitle,
              action: "智能客服建议",
              actor: "智能客服助手",
              content: `来自${item.sourceType}《${item.sourceTitle}》：渠道为${record.industry}，项目为${record.region}，风险等级${item.riskLevel}，已生成初步处理建议。`,
            },
          ],
        });
      }

      createdItems.push({
        id: item.id,
        title: item.title,
        category: item.modelType,
        status: item.status,
        owner: item.owner,
        riskLevel: item.riskLevel,
        sourceBatch: item.sourceBatch,
      });
    }

    if ((await tx.insight.count()) === 0) {
      await tx.insight.createMany({ data: [...seedInsights] });
    }
    if ((await tx.integrationLog.count()) === 0) {
      await tx.integrationLog.createMany({ data: getMockIntegrationHealth() });
    }
    if ((await tx.aiDraft.count()) === 0) {
      await tx.aiDraft.createMany({
        data: createSeedAiDrafts(createdItems),
      });
    }
  });

  await ensureGovernanceData();
}

export async function ensureSeedData() {
  if (!globalThis.__zggsSeedPromise) {
    globalThis.__zggsSeedPromise = runSeedDataJob().finally(() => {
      globalThis.__zggsSeedPromise = undefined;
    });
  }
  await globalThis.__zggsSeedPromise;
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  await ensureSeedData();

  const [items, events, insights, integrations, aiDrafts, systemUsers, auditLogs, systemSettings] = await Promise.all([
    prisma.investModel.findMany({ orderBy: [{ updatedAt: "desc" }] }),
    prisma.modelEvent.findMany({ orderBy: [{ createdAt: "desc" }], take: 12 }),
    prisma.insight.findMany({ orderBy: [{ createdAt: "desc" }] }),
    prisma.integrationLog.findMany({ orderBy: [{ createdAt: "desc" }] }),
    prisma.aiDraft.findMany({ orderBy: [{ createdAt: "desc" }], take: 24 }),
    prisma.systemUser.findMany({ orderBy: [{ updatedAt: "desc" }] }),
    prisma.auditLog.findMany({ orderBy: [{ createdAt: "desc" }], take: 80 }),
    prisma.systemSetting.findMany({ orderBy: [{ group: "asc" }, { updatedAt: "desc" }] }),
  ]);

  const aiDraftViews = aiDrafts.map((draft) => ({
    ...draft,
    sourceMode: draft.sourceMode as "glm" | "local",
    savedAt: toIso(draft.savedAt),
    createdAt: draft.createdAt.toISOString(),
  }));

  const conversationAccumulator = new Map<string, AiConversationView>();
  for (const draft of aiDraftViews) {
    const existing = conversationAccumulator.get(draft.conversationId);
    if (!existing) {
      conversationAccumulator.set(draft.conversationId, {
        id: draft.conversationId,
        topic: draft.topic,
        businessObjectId: draft.businessObjectId,
        businessObjectType: draft.businessObjectType,
        businessObjectTitle: draft.businessObjectTitle,
        resultType: draft.resultType,
        sourceSummary: draft.sourceSummary,
        latestStatus: draft.status,
        saveStatus: draft.saveStatus,
        lastPrompt: draft.prompt,
        turnCount: 1,
        updatedAt: draft.createdAt,
      });
      continue;
    }

    existing.turnCount += 1;
  }

  return {
    items: items.map((item) => ({
      ...item,
      category: item.modelType,
      dueDate: toIso(item.dueDate),
      updatedAt: item.updatedAt.toISOString(),
    })),
    events: events.map((event) => ({
      ...event,
      itemId: event.modelId,
      createdAt: event.createdAt.toISOString(),
    })),
    insights,
    integrations: integrations.map((log) => ({
      ...log,
      createdAt: log.createdAt.toISOString(),
    })),
    aiDrafts: aiDraftViews,
    aiConversations: Array.from(conversationAccumulator.values()).sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
    systemUsers: systemUsers.map((user) => ({
      ...user,
      lastLoginAt: toIso(user.lastLoginAt),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    })),
    auditLogs: auditLogs.map((log) => ({
      ...log,
      createdAt: log.createdAt.toISOString(),
    })),
    systemSettings: systemSettings.map((setting) => ({
      ...setting,
      createdAt: setting.createdAt.toISOString(),
      updatedAt: setting.updatedAt.toISOString(),
    })),
  };
}

export async function getRouteSnapshot(): Promise<DashboardSnapshot> {
  return getDashboardSnapshot();
}
