import { ref } from "vue";
import { useIntersectionObserver, useIntervalFn } from "@vueuse/core";

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

export function useCountDown(count: number) {
  const time = ref(0);
  const { pause, resume } = useIntervalFn(
    () => {
      time.value--;
      if (time.value === 0) {
        pause();
      }
    },
    1000,
    { immediate: false },
  );

  const start = () => {
    time.value = count;
    resume();
  };

  return {
    time,
    start,
  };
}
