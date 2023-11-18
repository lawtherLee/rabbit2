// export default function Confirm(
//   title: string,
//   content: string,
//   {
//     onCancel,
//     onConfirm,
//   }: {
//     onCancel: () => void;
//     onConfirm: () => void;
//   },
// ) {
//   const VNode = h(XtxConfirm, {
//     title,
//     content,
//     onCancel,
//     onConfirm,
//   });
//
//   render(VNode, document.body);
// }

// 第二种触发方式
import { h, render } from "vue";
import XtxConfirm from "@/components/confirm/index.vue";

export default function Confirm(title: string, content: string) {
  return new Promise((resolve, reject) => {
    const onConfirm = () => {
      resolve("");
      render(null, document.body);
    };
    const onCancel = () => {
      reject();
      render(null, document.body);
    };
    const VNode = h(XtxConfirm, {
      title,
      content,
      onConfirm,
      onCancel,
    });
    render(VNode, document.body);
  });
}
