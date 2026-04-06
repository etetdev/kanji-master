const STORAGE_KEY = 'kanji-master-data';
const SCORES_KEY = 'kanji-master-scores';

/**
 * Save parsed weeks data to localStorage.
 * @param {Object} weeksData - Map of weekName -> { weekName, cards }
 */
export function saveWeeksData(weeksData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weeksData));
  } catch (e) {
    console.error('Failed to save data to localStorage:', e);
  }
}

/**
 * Load parsed weeks data from localStorage.
 * @returns {Object|null}
 */
export function loadWeeksData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load data from localStorage:', e);
    return null;
  }
}

/**
 * Clear all saved data.
 */
export function clearAllData() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SCORES_KEY);
}

/**
 * Save score history.
 * @param {Array} scores
 */
export function saveScores(scores) {
  try {
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  } catch (e) {
    console.error('Failed to save scores:', e);
  }
}

/**
 * Load score history.
 * @returns {Array}
 */
export function loadScores() {
  try {
    const data = localStorage.getItem(SCORES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load scores:', e);
    return [];
  }
}

/**
 * Add a score entry.
 * @param {{ week: string, mode: string, correct: number, total: number, date: string }} entry
 */
export function addScore(entry) {
  const scores = loadScores();
  scores.unshift(entry);
  // Keep only last 50 entries
  if (scores.length > 50) scores.length = 50;
  saveScores(scores);
}
