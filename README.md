# Learn Vocab Tab

A Chromium extension that shows an illustrated vocabulary word, inspired by
[LinguaTab](https://github.com/pavelsalauyou/linguatab-chome-extension) for the content and
[MaiTab](https://github.com/mayoi7/MaiTab) for the clean look.

Built for **Arc**, where ⌘T opens the command bar instead of a new tab page.

## Features

- 161 everyday words in French, English, Spanish, German, Italian, Brazilian Portuguese and Japanese.
- Configurable language pair (« Je parle » / « J'apprends », i.e. "I speak" / "I'm learning").
- Pronunciation under each word: IPA (International Phonetic Alphabet) for every language, romaji for Japanese.
  Kanji also get their reading as furigana.
- One illustration per word ([Fluent Emoji](https://github.com/microsoft/fluentui-emoji), MIT licence), bundled with the extension, so everything works offline.
- Listen to the word with your system's text-to-speech.
- The last 40 words shown don't come back right away.

Shortcuts on the page: `space` or `→` for the next word, `S` to listen.

## Local installation

The extension isn't published on the Chrome Web Store: it loads straight from the code folder.
It works in Arc, Chrome, Brave and Edge. There's nothing to build and nothing else to install, since the illustrations are already in the repo.

### 1. Get the code

The repo is private: you need to be signed in to GitHub with an account that has access to it.

```bash
git clone git@github.com:dianedelallee/learn_vocab_tab.git
```

Or, on GitHub: **Code → Download ZIP**, then unzip it.

> Keep the folder somewhere permanent (not in Downloads): the browser loads the extension from it.
> If the folder is moved or deleted, the extension stops working.

### 2. Load the extension

1. Open `arc://extensions` (or `chrome://extensions` in Chrome).
2. Turn on **Developer mode** (toggle in the top-right corner). Leave it on: turning it off disables the extension too.
3. Click **Load unpacked** and pick the `learn_vocab_tab` folder (the one that contains `manifest.json`).

The vocabulary page opens automatically in a new tab.

### 3. Keep it at hand in Arc

Arc has no new tab page (⌘T opens the command bar). There are three ways to get to the words:

- **Favorite**: drag the tab that opened on install into your Arc Favorites. One click then shows a new word.
- **Keyboard shortcut**: `⌥⇧V` opens the page in a new tab. To change it, go to `arc://extensions/shortcuts`.
- **Popup**: pin the extension from Arc's extensions menu (puzzle-piece icon), then click its icon for a compact version.

In Chrome, Brave or Edge, the page also replaces the new tab page.

### Updating

```bash
cd learn_vocab_tab
git pull
```

Then, in `arc://extensions`, click the reload arrow on the Learn Vocab Tab card.
Your settings (chosen languages) are kept.

### Uninstalling

In `arc://extensions`, click **Remove** on the extension's card. You can then delete the folder.

### Troubleshooting

- **An illustration is missing**: run `node scripts/fetch-icons.mjs` (Node 18 or later), then reload the extension.
- **The shortcut does nothing**: it may clash with an Arc or macOS shortcut. Pick another one in `arc://extensions/shortcuts`.
- **Error when loading**: make sure you picked the folder that contains `manifest.json`, not a parent folder.
- **No sound**: pronunciation uses the macOS voices. For Japanese, for example, you need a Japanese voice installed
  (System Settings → Accessibility → Spoken Content → System Voice → Manage Voices).

## Development

There's no build step: it's plain JavaScript with no dependencies. After a change, click the extension's
reload arrow in `arc://extensions`.

## Structure

```
manifest.json            Manifest V3
html/tab.html            Full-page view
html/popup.html          Compact view (extension icon)
js/tab.js                Display logic, shared by both pages
js/words.js              Languages and word list
js/phonetics.js          Pronunciation of each word, per language
js/settings.js           Settings (chrome.storage.sync)
js/background.js         Keyboard shortcut + opening the page on install
css/tab.css              Styles
img/words/               SVG illustrations
scripts/fetch-icons.mjs  Downloads missing illustrations
```

Illustrations: [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) © Microsoft, MIT licence (see `img/words/LICENSE`).

## Adding a word

1. Find the illustration's name on [Iconify — Fluent Emoji Flat](https://icon-sets.iconify.design/fluent-emoji-flat/).
2. Add the entry to `WORDS` (`js/words.js`), with `kana` if the Japanese contains kanji.
3. Add its pronunciation for each language in `js/phonetics.js`.
4. Run `node scripts/fetch-icons.mjs`.
