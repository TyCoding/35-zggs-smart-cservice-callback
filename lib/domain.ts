import type { AnalysisView, ConsoleRoute, DashboardSnapshot, RouteMetric, WorkspaceView, WorkItemInput } from "@/lib/types";

export const appMeta = {
  seq: "35",
  title: "智能客服与自动回访",
  department: "资管公司",
  shortName: "客服回访中枢",
  description: "面向在线咨询、自动回访、看房预约与知识库维护的智能客服管理后台。",
  modules: ["在线咨询", "自动回访", "看房预约", "FAQ知识库", "服务质检"],
  statuses: ["待接待", "处理中", "已回访", "已完成"],
  aiTitle: "智能客服助手",
  aiPrompt: "请基于客户诉求生成答复建议、回访话术和下一步处理动作。",
  integrations: ["语音回访任务池", "在线咨询会话", "客户档案中心", "FAQ知识库"],
  sourceObjectName: "客服工单",
  dataSourceTitle: "服务批次",
  aiExperience: {
    panelTag: "在线咨询 / 回访话术 / FAQ匹配",
    objectLabel: "当前客服工单",
    emptyTitle: "请选择客服工单后发起智能处理",
    emptyDescription: "系统会结合历史会话和FAQ内容，生成回复建议、回访话术和预约提醒。",
    resultType: "客服处理建议",
    savedStatusLabel: "已采纳",
    saveActionLabel: "采纳处理建议",
    saveEventAction: "采纳处理建议",
    generateEventAction: "生成处理建议",
    savedSuccessText: "智能处理建议已同步到当前客服工单。",
    stepTitles: ["读取客户诉求和历史记录", "匹配FAQ和回访规则", "生成回复与回访建议", "等待采纳并写入服务留痕"],
    focusAreas: ["客户意图识别", "FAQ匹配", "回访话术", "预约安排", "风险提醒", "服务闭环"],
    quickPrompts: [
      "请给出该客户诉求的标准答复和转人工建议。",
      "请生成自动回访话术，并给出跟进状态建议。",
      "请根据知识库推荐可复用的FAQ条目和补充话术。",
    ],
    resultFields: [
      { label: "工单类型", source: "category" },
      { label: "当前状态", source: "status" },
      { label: "风险等级", source: "riskLevel" },
      { label: "建议摘要", source: "summary" },
    ],
  },
  prd: "35_资管公司_智能客服与自动回访_PRD.md",
  demand: "35_资管公司_智能客服与自动回访_需求文档.md",
} as const;

export const seedRecords = [
  {
    code: "CSR-2026-001",
    title: "租金缴纳方式咨询",
    modelType: "在线咨询",
    industry: "小程序",
    region: "天河区·和悦府",
    status: "处理中",
    priority: "P1",
    riskLevel: "低",
    owner: "客服专员-王珊",
    analyst: "客服专员-王珊",
    description: "客户咨询租金缴纳渠道及逾期处理规则。",
    inputParams: "客户：李女士；问题：租金缴纳方式；是否逾期：否",
    outputResult: "已推送线上缴费入口和缴费时限说明。",
    prediction: "预计一次回复可闭环，满意度约92%。",
    source: "在线咨询会话",
    sourceType: "客服工单",
    sourceTitle: "租金缴纳方式咨询-001",
    sourceBatch: "咨询批次·2026-04-26 AM",
    dueDateOffsetDays: 1,
  },
  {
    code: "CSR-2026-002",
    title: "看房时间二次确认回访",
    modelType: "自动回访",
    industry: "热线电话",
    region: "白云区·云境苑",
    status: "待接待",
    priority: "P1",
    riskLevel: "中",
    owner: "回访专员-陈宁",
    analyst: "回访专员-陈宁",
    description: "客户已表达看房意向，需确认周末到访时间并发送提醒。",
    inputParams: "客户：张先生；意向：三居室；期望：周六上午",
    outputResult: "待外呼确认，已生成两轮回访话术。",
    prediction: "确认后72小时内到访概率较高。",
    source: "语音回访任务池",
    sourceType: "客服工单",
    sourceTitle: "看房时间二次确认回访-002",
    sourceBatch: "回访批次·2026-04-26",
    dueDateOffsetDays: 2,
  },
  {
    code: "CSR-2026-003",
    title: "停车位收费政策答疑",
    modelType: "在线咨询",
    industry: "企业微信",
    region: "南山区·锦宸园",
    status: "已完成",
    priority: "P2",
    riskLevel: "低",
    owner: "客服专员-刘颖",
    analyst: "客服专员-刘颖",
    description: "客户咨询月租车位和临停收费标准。",
    inputParams: "客户：赵先生；问题：车位收费；是否业主：是",
    outputResult: "已发送收费标准与办理入口，客户确认无继续问题。",
    prediction: "可直接归档为FAQ命中样本。",
    source: "在线咨询会话",
    sourceType: "客服工单",
    sourceTitle: "停车位收费政策答疑-003",
    sourceBatch: "咨询批次·2026-04-25 PM",
    dueDateOffsetDays: 1,
  },
  {
    code: "CSR-2026-004",
    title: "合同到期续签提醒",
    modelType: "自动回访",
    industry: "短信+电话",
    region: "浦东新区·星河里",
    status: "已回访",
    priority: "P1",
    riskLevel: "中",
    owner: "回访专员-周楠",
    analyst: "回访专员-周楠",
    description: "租赁合同30天内到期，回访确认是否续租。",
    inputParams: "客户：吴女士；合同到期：2026-05-20；意向：待确认",
    outputResult: "已完成首轮回访，客户倾向续租，等待价格确认。",
    prediction: "二次回访后可进入续签流程。",
    source: "语音回访任务池",
    sourceType: "客服工单",
    sourceTitle: "合同到期续签提醒-004",
    sourceBatch: "回访批次·2026-04-26",
    dueDateOffsetDays: 3,
  },
  {
    code: "CSR-2026-005",
    title: "维修进度催办咨询",
    modelType: "在线咨询",
    industry: "小程序",
    region: "福田区·悦府",
    status: "处理中",
    priority: "P1",
    riskLevel: "高",
    owner: "客服班长-邓凯",
    analyst: "客服班长-邓凯",
    description: "客户连续两次催问空调维修进度，情绪较激动。",
    inputParams: "客户：周先生；问题：空调维修超时；历史催办：2次",
    outputResult: "已升级工单并承诺24小时内反馈。",
    prediction: "若48小时未闭环，存在投诉升级风险。",
    source: "在线咨询会话",
    sourceType: "客服工单",
    sourceTitle: "维修进度催办咨询-005",
    sourceBatch: "咨询批次·2026-04-26 PM",
    dueDateOffsetDays: 1,
  },
  {
    code: "CSR-2026-006",
    title: "看房预约提醒",
    modelType: "看房预约",
    industry: "企业微信",
    region: "滨江区·水岸府",
    status: "待接待",
    priority: "P2",
    riskLevel: "低",
    owner: "回访专员-叶青",
    analyst: "回访专员-叶青",
    description: "已预约周日下午看房，需提前发送路线和材料提醒。",
    inputParams: "客户：孙女士；预约时间：周日14:00；房型：两居",
    outputResult: "待发送出行提醒并确认到访人数。",
    prediction: "预计按时到访概率85%。",
    source: "客户档案中心",
    sourceType: "客服工单",
    sourceTitle: "看房预约提醒-006",
    sourceBatch: "预约批次·2026-04-27",
    dueDateOffsetDays: 2,
  },
  {
    code: "CSR-2026-007",
    title: "宠物管理规定FAQ维护",
    modelType: "FAQ维护",
    industry: "知识库后台",
    region: "总部",
    status: "已完成",
    priority: "P2",
    riskLevel: "低",
    owner: "知识运营-高宁",
    analyst: "知识运营-高宁",
    description: "新增宠物管理政策问答，覆盖遛狗区域和办证流程。",
    inputParams: "条目类型：政策说明；关键词：宠物、遛狗、办证",
    outputResult: "FAQ条目已上架，支持机器人自动匹配。",
    prediction: "预计相关咨询转人工率下降15%。",
    source: "FAQ知识库",
    sourceType: "客服工单",
    sourceTitle: "宠物管理规定FAQ维护-007",
    sourceBatch: "知识批次·2026-04-24",
    dueDateOffsetDays: 4,
  },
  {
    code: "CSR-2026-008",
    title: "停车缴费失败回访",
    modelType: "自动回访",
    industry: "热线电话",
    region: "海珠区·悦湾",
    status: "处理中",
    priority: "P1",
    riskLevel: "中",
    owner: "回访专员-何涛",
    analyst: "回访专员-何涛",
    description: "客户反馈停车缴费失败，需核实支付路径并回访解释。",
    inputParams: "客户：郑先生；失败次数：2；支付渠道：支付宝",
    outputResult: "已指导重新绑定车牌，等待支付确认。",
    prediction: "回访后可恢复正常缴费。",
    source: "语音回访任务池",
    sourceType: "客服工单",
    sourceTitle: "停车缴费失败回访-008",
    sourceBatch: "回访批次·2026-04-27",
    dueDateOffsetDays: 1,
  },
  {
    code: "CSR-2026-009",
    title: "押金退还时效说明",
    modelType: "在线咨询",
    industry: "官网在线客服",
    region: "黄浦区·云庐",
    status: "已回访",
    priority: "P2",
    riskLevel: "中",
    owner: "客服专员-严婷",
    analyst: "客服专员-严婷",
    description: "客户退租后咨询押金到账时点和扣费明细。",
    inputParams: "客户：林先生；退租日期：2026-04-20；关注：扣费明细",
    outputResult: "已提供退款进度与明细查询入口。",
    prediction: "无需升级，建议48小时内回访确认。",
    source: "在线咨询会话",
    sourceType: "客服工单",
    sourceTitle: "押金退还时效说明-009",
    sourceBatch: "咨询批次·2026-04-26",
    dueDateOffsetDays: 2,
  },
  {
    code: "CSR-2026-010",
    title: "看房路线与到访提醒FAQ维护",
    modelType: "FAQ维护",
    industry: "知识库后台",
    region: "总部",
    status: "处理中",
    priority: "P2",
    riskLevel: "低",
    owner: "知识运营-任雪",
    analyst: "知识运营-任雪",
    description: "补充看房路线模板与停车指引模板，提升预约转化。",
    inputParams: "条目类型：预约提醒；关键词：看房、路线、停车",
    outputResult: "已完成内容草稿，待审核发布。",
    prediction: "上线后预约到访率预计提升8%。",
    source: "FAQ知识库",
    sourceType: "客服工单",
    sourceTitle: "看房路线与到访提醒FAQ维护-010",
    sourceBatch: "知识批次·2026-04-27",
    dueDateOffsetDays: 3,
  },
] as const;

export const seedInsights = [
  { title: "当日在线咨询", value: "128", trend: "up", level: "success" },
  { title: "待回访任务", value: "36", trend: "down", level: "warning" },
  { title: "FAQ命中率", value: "74%", trend: "up", level: "processing" },
] as const;

export const consoleRoutes: ConsoleRoute[] = [
  {
    key: "dashboard",
    slug: "dashboard",
    path: "/dashboard",
    title: "客服首页",
    description: "聚合咨询、回访和服务留痕的整体看板。",
    kind: "dashboard",
  },
  {
    key: "consultation",
    slug: "consultation",
    path: "/consultation",
    title: "在线咨询",
    description: "管理客户咨询、回复建议和转人工处理。",
    kind: "workspace",
  },
  {
    key: "callback",
    slug: "callback",
    path: "/callback",
    title: "回访管理",
    description: "维护自动回访任务、回访记录和预约确认。",
    kind: "workspace",
  },
  {
    key: "knowledge",
    slug: "knowledge",
    path: "/knowledge",
    title: "知识库",
    description: "查看FAQ条目、命中效果和优化建议。",
    kind: "analysis",
  },
  {
    key: "users",
    slug: "users",
    path: "/users",
    title: "用户管理",
    description: "维护后台用户、角色和账号状态。",
    kind: "users",
  },
  {
    key: "audit-logs",
    slug: "audit-logs",
    path: "/audit-logs",
    title: "日志审计",
    description: "查看咨询、回访和知识库操作留痕。",
    kind: "auditLogs",
  },
  {
    key: "settings",
    slug: "settings",
    path: "/settings",
    title: "系统设置",
    description: "维护回访时限、通知规则和智能客服开关。",
    kind: "settings",
  },
  {
    key: "assistant",
    slug: "assistant",
    path: "/assistant",
    title: appMeta.aiTitle,
    description: "调用智能客服助手生成答复建议和回访话术。",
    kind: "assistant",
  },
] as const;

const workspaceFieldMap = {
  consultation: [
    { key: "title", label: "咨询主题", placeholder: "例如：租金缴纳方式咨询", required: true },
    { key: "industry", label: "咨询渠道", type: "select", options: ["小程序", "企业微信", "官网在线客服", "热线电话"], required: true },
    { key: "region", label: "项目/小区", placeholder: "例如：天河区·和悦府", required: true },
    { key: "owner", label: "处理坐席", placeholder: "例如：客服专员-王珊", required: true },
    { key: "riskLevel", label: "客诉风险", type: "select", options: ["高", "中", "低"], required: true },
    { key: "inputParams", label: "客户诉求", type: "textarea", placeholder: "描述客户问题、历史沟通信息和关注点", required: true },
  ],
  callback: [
    { key: "title", label: "回访任务", placeholder: "例如：看房时间二次确认回访", required: true },
    { key: "owner", label: "回访专员", placeholder: "例如：回访专员-陈宁", required: true },
    { key: "riskLevel", label: "风险等级", type: "select", options: ["高", "中", "低"], required: true },
    { key: "outputResult", label: "回访结果", type: "textarea", placeholder: "填写首轮回访结论、客户反馈和确认事项", required: true },
    { key: "prediction", label: "跟进建议", type: "textarea", placeholder: "填写预约确认、二次回访或转人工建议", required: true },
  ],
} as const;

function routeMetrics(snapshot: DashboardSnapshot, rows = snapshot.items): RouteMetric[] {
  const finalStatus = appMeta.statuses.at(-1);
  const openCount = rows.filter((item) => item.status !== finalStatus).length;
  const highRisk = rows.filter((item) => item.riskLevel === "高").length;
  const completedCount = rows.filter((item) => item.status === finalStatus).length;

  return [
    { label: "当前工单", value: rows.length, helper: "已纳入本页视图的客服工单", tone: "default" },
    { label: "高风险", value: highRisk, helper: "可能升级投诉的工单", tone: highRisk > 0 ? "danger" : "success" },
    { label: "处理中", value: openCount, helper: "待继续跟进的咨询或回访", tone: openCount > 0 ? "warning" : "success" },
    { label: "已完成", value: completedCount, helper: "已完成服务闭环的工单", tone: "success" },
  ];
}

function sortedRows(rows: DashboardSnapshot["items"]) {
  return rows.slice().sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function byCategories(snapshot: DashboardSnapshot, categories: string[]) {
  return sortedRows(snapshot.items.filter((item) => categories.includes(item.category)));
}

export function getRouteBySlug(slug?: string) {
  const target = slug?.trim() ? slug : "dashboard";
  return consoleRoutes.find((route) => route.slug === target);
}

export function getRouteByKey(key: string) {
  return consoleRoutes.find((route) => route.key === key);
}

export function buildWorkItemInput(routeKey: string, values: Record<string, string>): WorkItemInput {
  if (routeKey === "consultation") {
    const title = values.title?.trim() || "待处理咨询";
    const channel = values.industry?.trim() || "小程序";
    const region = values.region?.trim() || "未分配小区";
    const demand = values.inputParams?.trim() || "待补充客户诉求";

    return {
      title,
      category: "在线咨询",
      owner: values.owner?.trim() || "客服专员",
      riskLevel: values.riskLevel || "中",
      description: `渠道：${channel}；项目：${region}；诉求：${demand}`,
      industry: channel,
      region,
      inputParams: demand,
      outputResult: "待生成答复建议",
      prediction: "建议在2小时内确认客户问题是否闭环",
    };
  }

  if (routeKey === "callback") {
    const title = values.title?.trim() || "待执行回访";
    const output = values.outputResult?.trim() || "待补充回访结果";
    const prediction = values.prediction?.trim() || "待补充跟进建议";

    return {
      title,
      category: "自动回访",
      owner: values.owner?.trim() || "回访专员",
      riskLevel: values.riskLevel || "中",
      description: `回访结果：${output}；跟进建议：${prediction}`,
      industry: "热线电话",
      region: "待确认项目",
      inputParams: "自动回访任务",
      outputResult: output,
      prediction,
    };
  }

  return {
    title: values.title?.trim() || "待完善客服工单",
    category: "FAQ维护",
    owner: values.owner?.trim() || "知识运营",
    riskLevel: values.riskLevel || "低",
    description: values.inputParams?.trim() || "待补充知识库维护说明",
    industry: "知识库后台",
    region: "总部",
    inputParams: values.inputParams?.trim() || "待补充知识库维护说明",
    outputResult: values.outputResult?.trim() || "待补充条目结果",
    prediction: values.prediction?.trim() || "待观察FAQ命中效果",
  };
}

export function getWorkspaceView(routeKey: string, snapshot: DashboardSnapshot): WorkspaceView {
  if (routeKey === "consultation") {
    const rows = byCategories(snapshot, ["在线咨询"]).slice(0, 12);
    return {
      title: "在线咨询",
      description: "管理咨询工单、智能回复和转人工处理。",
      metrics: routeMetrics(snapshot, rows),
      formTitle: "新建咨询工单",
      submitLabel: "创建咨询工单",
      fields: [...workspaceFieldMap.consultation],
      columns: [
        { key: "code", label: "工单编号", width: 140 },
        { key: "title", label: "咨询主题", width: 260, kind: "summary" },
        { key: "industry", label: "咨询渠道", width: 120 },
        { key: "region", label: "项目/小区", width: 160 },
        { key: "status", label: "处理状态", width: 110, kind: "badge" },
        { key: "riskLevel", label: "风险等级", width: 100, kind: "tag" },
        { key: "owner", label: "处理坐席", width: 140 },
      ],
      rows,
      emptyDescription: "暂无咨询工单，可通过上方表单新增。",
      actions: [
        { key: "advance", label: "推进处理", disabledWhenFinal: true },
        {
          key: "delete",
          label: "删除",
          danger: true,
          confirmTitle: "确认删除该咨询工单？",
          confirmText: "删除后将同步移除关联服务留痕，请确认无需继续跟进。",
        },
      ],
      timelineTitle: "咨询处理流程",
      timeline: [
        { title: "客户接入", description: "记录客户问题、渠道来源和项目信息。" },
        { title: "智能答复", description: "机器人先行回复并给出转人工建议。" },
        { title: "闭环确认", description: "确认客户问题是否解决并沉淀服务留痕。" },
      ],
    };
  }

  if (routeKey === "callback") {
    const rows = byCategories(snapshot, ["自动回访", "看房预约"]).slice(0, 12);
    return {
      title: "回访管理",
      description: "维护回访任务、预约确认和回访结果记录。",
      metrics: routeMetrics(snapshot, rows),
      formTitle: "新建回访任务",
      submitLabel: "创建回访任务",
      fields: [...workspaceFieldMap.callback],
      columns: [
        { key: "code", label: "任务编号", width: 140 },
        { key: "title", label: "回访主题", width: 260, kind: "summary" },
        { key: "modelType", label: "任务类型", width: 120, kind: "tag" },
        { key: "status", label: "回访状态", width: 110, kind: "badge" },
        { key: "riskLevel", label: "风险等级", width: 100, kind: "tag" },
        { key: "owner", label: "回访专员", width: 140 },
        { key: "dueDate", label: "计划完成", width: 180 },
      ],
      rows,
      emptyDescription: "暂无回访任务，可通过上方表单新增。",
      actions: [
        { key: "advance", label: "完成一步", disabledWhenFinal: true },
        {
          key: "delete",
          label: "删除",
          danger: true,
          confirmTitle: "确认删除该回访任务？",
          confirmText: "删除后将清理本次回访留痕，请确认无需继续执行。",
        },
      ],
      timelineTitle: "回访执行流程",
      timeline: [
        { title: "任务下发", description: "按客户意向自动生成回访任务。" },
        { title: "外呼确认", description: "执行外呼并记录客户反馈、预约状态。" },
        { title: "结果归档", description: "写入回访结论并触发下一步动作。" },
      ],
    };
  }

  const finalStatus = appMeta.statuses.at(-1);
  const rows = sortedRows(snapshot.items.filter((item) => item.status === finalStatus)).slice(0, 12);
  return {
    title: "已完成工单",
    description: "查看已完成闭环的服务工单。",
    metrics: routeMetrics(snapshot, rows),
    columns: [
      { key: "code", label: "工单编号", width: 140 },
      { key: "title", label: "工单主题", width: 220, kind: "summary" },
      { key: "modelType", label: "工单类型", width: 120, kind: "tag" },
      { key: "industry", label: "来源渠道", width: 120 },
      { key: "riskLevel", label: "风险等级", width: 100, kind: "tag" },
      { key: "owner", label: "负责人", width: 120 },
    ],
    rows,
    emptyDescription: "当前暂无已完成工单。",
    timelineTitle: "近期完成动作",
    timeline: snapshot.events
      .filter((event) => event.action.includes("完成") || event.action.includes("采纳"))
      .slice(0, 6)
      .map((event) => ({
        title: event.action,
        description: event.content,
        tag: event.sourceTitle,
      })),
  };
}

export function getAnalysisView(snapshot: DashboardSnapshot): AnalysisView {
  const faqRows = sortedRows(snapshot.items.filter((item) => item.category === "FAQ维护"));
  const channelStats = snapshot.items.reduce((acc, item) => {
    const channel = item.industry || "其他渠道";
    acc[channel] = (acc[channel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    title: "知识库与FAQ",
    description: "查看FAQ条目维护进度、渠道分布和近期服务留痕。",
    metrics: routeMetrics(snapshot, faqRows.length > 0 ? faqRows : snapshot.items),
    highlights: [
      "租金缴纳、看房预约、押金退还是当前咨询高频场景。",
      "高风险工单需在回访页面执行二次确认与升级处理。",
      "FAQ命中率可通过持续补充标准答复和话术模板提升。",
    ],
    tables: [
      {
        title: "FAQ维护清单",
        columns: [
          { key: "title", label: "条目主题" },
          { key: "owner", label: "维护人" },
          { key: "status", label: "状态" },
          { key: "prediction", label: "预期效果" },
        ],
        rows: (faqRows.length ? faqRows : sortedRows(snapshot.items).slice(0, 6)).map((item) => ({
          title: item.title,
          owner: item.owner,
          status: item.status,
          prediction: item.prediction || "持续跟踪命中效果",
        })),
      },
      {
        title: "渠道工单分布",
        columns: [
          { key: "channel", label: "渠道" },
          { key: "count", label: "工单数" },
          { key: "insight", label: "洞察" },
        ],
        rows: Object.entries(channelStats)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([channel, count]) => ({
            channel,
            count: String(count),
            insight: count >= 3 ? "咨询量较高，建议补充FAQ" : "咨询量平稳",
          })),
      },
      {
        title: "近期服务留痕",
        columns: [
          { key: "action", label: "动作" },
          { key: "content", label: "内容" },
          { key: "actor", label: "操作人" },
        ],
        rows: snapshot.events.slice(0, 6).map((event) => ({
          action: event.action,
          content: event.content,
          actor: event.actor,
        })),
      },
    ],
  };
}
