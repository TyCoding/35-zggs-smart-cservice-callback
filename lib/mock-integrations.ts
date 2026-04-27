import { appMeta } from "@/lib/domain";

export type MockAiResponse = {
  topic: string;
  result: string;
};

export async function runLocalAiAssistant(prompt: string): Promise<MockAiResponse> {
  const topic = prompt.trim().slice(0, 48) || appMeta.aiTitle;
  const modules = appMeta.modules.slice(0, 4).join("、");

  return {
    topic,
    result: [
      `处理主题：${topic}`,
      `建议从${modules}四个维度进行处理，并保留人工确认节点。`,
      "处理流程：先识别客户意图，再匹配FAQ，随后生成回访话术并安排下一步动作。",
      "风险提示：高风险客诉建议立即转人工并设置回访提醒。",
    ].join("\n"),
  };
}

export function getMockIntegrationHealth() {
  return appMeta.integrations.map((service, index) => ({
    service,
    status: index === 0 ? "已同步" : index === 1 ? "已校验" : "持续更新",
    batch: `${service}·2026年第${index + 1}批`,
    quality: index === 0 ? "完整率 97%" : index === 1 ? "准确率 95%" : "抽检通过",
    detail:
      index === 0
        ? "回访任务池已完成同步，支持自动回访任务下发。"
        : index === 1
          ? "在线咨询会话已完成抽样校验，支持FAQ命中分析。"
          : "客户档案与知识库持续更新，支持多轮问答与回访建议。",
  }));
}
