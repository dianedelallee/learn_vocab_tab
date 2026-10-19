const TAB_URL = chrome.runtime.getURL('html/tab.html');

chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-vocab-tab') chrome.tabs.create({ url: TAB_URL });
});

// Arc ignores the newtab override, so open the page once on install to let it be pinned as a Favorite.
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') chrome.tabs.create({ url: TAB_URL });
});
