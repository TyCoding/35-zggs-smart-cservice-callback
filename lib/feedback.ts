export function createFeedback(category: string) {
  return `${category}工单已创建，已同步到服务台并生成处理留痕`;
}

export function advanceFeedback(status: string) {
  return `工单状态已推进至${status}，服务留痕已更新`;
}

export function deleteFeedback(category: string) {
  return `${category}工单已删除，相关统计已刷新`;
}

export function aiFeedback(source: "glm" | "local") {
  return source === "glm" ? "智能处理建议已生成，可继续追问或直接采纳" : "客服建议初稿已生成，可补充追问后再采纳";
}
