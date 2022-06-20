export function LocalStorageHelpers() {
  const get = <T>(key: string): T | null => {
    if (typeof window !== "undefined") {
      const str = localStorage.getItem(key);
      if (str == null) {
        return null;
      }
      try {
        return JSON.parse(str) as T;
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  };

  const set = <T>(key: string, state: T) => {
    if (typeof window !== "undefined") {
      if (state == null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(state));
      }
    }
  };

  return {
    get,
    set,
  };
}
