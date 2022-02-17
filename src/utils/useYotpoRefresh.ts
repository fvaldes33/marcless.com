import { useEffect } from "react";
import { debounce } from "./debounce";

declare global {
  interface Window {
    yotpo?: {
      refreshWidgets: Function;
    };
  }
}

export function useYotpoRefresh(debounceTime: number = 200): void {
  console.log('useYotpoRefresh')
  useEffect(() => {
    const debouncedRefresh = () => {
      const refreshWidgets = window.yotpo
        ? window.yotpo.refreshWidgets.bind(window.yotpo)
        : () => { };

      console.log('useYotpoRefresh -> call debounced refresh')
      return debounce(refreshWidgets, debounceTime);
    };

    if (typeof window !== 'undefined' && window.yotpo) {
      debouncedRefresh();
    }
  }, [debounceTime]);
}
