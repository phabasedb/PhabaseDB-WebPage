//standard

// third party

//local

/**
 * Reads history from localStorage under key `key`.
 */
export function readHistory(key = "searchHistory") {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

/**
 * Add term to history, remove duplicates and trim to `limit`.
 * @param {string[]} historyArray Previous Term array
 * @param {string} term Term to add
 * @param {number} limit Maximum history size
 * @returns {string[]} New history array
 */
export function updateHistoryArray(historyArray, term, limit) {
  const filtered = historyArray.filter((t) => t !== term);
  filtered.unshift(term);
  return filtered.length > limit ? filtered.slice(0, limit) : filtered;
}

/**
 * Writes the array to localStorage under the key `key`.
 */
export function writeHistory(array, key = "searchHistory") {
  localStorage.setItem(key, JSON.stringify(array));
}
