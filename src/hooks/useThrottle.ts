import { useMemo } from "react";

import { throttle } from "lodash";

function useThrottle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  cooldown: number
) {
  return useMemo(() => throttle(fn, cooldown), [fn, cooldown]);
}

export default useThrottle;
