
export function debounce(callback: (data: any) => void, delay: number = 500) {
  let timeout: NodeJS.Timeout;

  return function (data: any) {
    clearTimeout(timeout); // Clear any existing timer

    timeout = setTimeout(() => {
      callback(data);
    }, delay);
  };
}
