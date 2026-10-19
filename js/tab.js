import { LANGUAGES, WORDS } from './words.js';
import { PHONETICS } from './phonetics.js';
import { loadSettings, saveSettings } from './settings.js';

const RECENT_SIZE = 40;
const $ = (id) => document.getElementById(id);

let settings;
let current;

async function pickWord() {
  const { recent = [] } = await chrome.storage.local.get('recent');
  const pool = WORDS.filter((w) => !recent.includes(w.icon));
  const word = pool[Math.floor(Math.random() * pool.length)];
  await chrome.storage.local.set({ recent: [...recent, word.icon].slice(-RECENT_SIZE) });
  return word;
}

// Japanese kanji get their kana reading as furigana above.
function fillWord(el, word, lang) {
  el.lang = lang;
  if (lang === 'ja' && word.kana) {
    const ruby = document.createElement('ruby');
    ruby.append(word.ja, Object.assign(document.createElement('rt'), { textContent: word.kana }));
    el.replaceChildren(ruby);
  } else {
    el.textContent = word[lang];
  }
}

function phoneticOf(word, lang) {
  const text = PHONETICS[lang]?.[word.icon];
  if (!text) return '';
  return lang === 'ja' ? text : `/${text}/`;
}

function render(word) {
  fillWord($('target'), word, settings.target);
  fillWord($('source'), word, settings.source);
  $('phonetic').textContent = phoneticOf(word, settings.target);
  $('langPair').textContent = `${LANGUAGES[settings.source].label} → ${LANGUAGES[settings.target].label}`;

  const illustration = $('illustration');
  illustration.hidden = !settings.showImages;
  illustration.src = `../img/words/${word.icon}.svg`;
}

async function next() {
  current = await pickWord();
  render(current);
}

function speak() {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(current[settings.target]);
  utterance.lang = LANGUAGES[settings.target].voice;
  speechSynthesis.speak(utterance);
}

function setupSettingsPanel() {
  const panel = $('settings');
  if (!panel) return;

  for (const select of [$('sourceLang'), $('targetLang')]) {
    for (const [code, { label }] of Object.entries(LANGUAGES)) {
      select.append(new Option(label, code));
    }
  }
  $('sourceLang').value = settings.source;
  $('targetLang').value = settings.target;
  $('showImages').checked = settings.showImages;

  $('settingsToggle').addEventListener('click', () => { panel.hidden = !panel.hidden; });

  panel.addEventListener('input', async (event) => {
    const previous = { ...settings };
    settings.source = $('sourceLang').value;
    settings.target = $('targetLang').value;
    // Picking the same language on both sides swaps them instead.
    if (settings.source === settings.target) {
      if (event.target.id === 'sourceLang') settings.target = previous.source;
      else settings.source = previous.target;
      $('sourceLang').value = settings.source;
      $('targetLang').value = settings.target;
    }
    settings.showImages = $('showImages').checked;

    await saveSettings(settings);
    render(current);
  });
}

function setupControls() {
  $('next').addEventListener('click', next);
  $('speak').addEventListener('click', speak);
  $('openFull')?.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('html/tab.html') });
    window.close();
  });
  // A missing SVG should not leave a broken-image icon on screen.
  $('illustration').addEventListener('error', (event) => { event.target.hidden = true; });

  document.addEventListener('keydown', (event) => {
    if (event.target.closest('input, select, textarea') || event.metaKey || event.ctrlKey) return;
    if (event.key === ' ' || event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 's') {
      speak();
    }
  });
}

settings = await loadSettings();
setupSettingsPanel();
setupControls();
await next();
