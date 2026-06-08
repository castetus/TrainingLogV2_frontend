export const useDebounce = function<T extends (...args: unknown[]) => unknown> (fn: T, delay: number = 1000) {

  let timerId: ReturnType<typeof setTimeout> | null = null;

  const functionToReturn = function (...args: Parameters<T>) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args)
    }, delay);
  }

  return functionToReturn;
};