import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export function useLazyData(fn: () => void) {
  const target = ref(null);
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      fn();
      stop();
    }
  });
  return target;
}
