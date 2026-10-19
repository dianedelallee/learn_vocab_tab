export const DEFAULT_SETTINGS = {
  source: 'fr',
  target: 'en',
  showImages: true,
};

export async function loadSettings() {
  return chrome.storage.sync.get(DEFAULT_SETTINGS);
}

export async function saveSettings(patch) {
  await chrome.storage.sync.set(patch);
}
