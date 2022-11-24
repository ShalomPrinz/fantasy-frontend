const setProperty = (
  obj: Object,
  prop: string,
  value: number | string | Function
) =>
  Object.defineProperty(obj, prop, {
    writable: true,
    configurable: true,
    value: value,
  });

const setWindowSize = (value: number) =>
  setProperty(window, "innerWidth", value);

export { setProperty, setWindowSize };
