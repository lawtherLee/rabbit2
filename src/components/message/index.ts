import { h, render } from "vue";
import XtxMessage from "@/components/message/index.vue";

type MessageType = "success" | "error" | "warning";
export default function Message(
  type: MessageType,
  content: string,
  duration: number,
) {
  // 创建message组件的虚拟dom
  const VNode = h(XtxMessage, { type, content });
  // 将虚拟dom渲染到真实dom
  render(VNode, document.body);
  setTimeout(() => render(null, document.body), duration | 1000);
}
Message.success = function (content: string, duration?: number) {
  Message("success", content, duration);
};
Message.error = function (content: string, duration?: number) {
  Message("error", content, duration);
};
Message.warning = function (content: string, duration?: number) {
  Message("warning", content, duration);
};
