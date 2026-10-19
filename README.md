# Learn Vocab Tab

Extension Chromium qui affiche un mot de vocabulaire illustré, dans l'esprit de
[LinguaTab](https://github.com/pavelsalauyou/linguatab-chome-extension) pour le contenu et de
[MaiTab](https://github.com/mayoi7/MaiTab) pour le style épuré.

Pensée pour **Arc**, où ⌘T ouvre la barre de commande au lieu d'une page « nouvel onglet ».

## Fonctionnement

- 161 mots concrets en français, anglais, espagnol, allemand, italien, portugais (Brésil) et japonais.
- Paire de langues réglable (« Je parle » / « J'apprends »).
- Prononciation sous le mot : API (alphabet phonétique international) pour toutes les langues, romaji pour le japonais.
  Les kanji ont aussi leur lecture en furigana.
- Une illustration par mot ([Fluent Emoji](https://github.com/microsoft/fluentui-emoji), licence MIT), incluse dans l'extension : tout marche hors ligne.
- Écoute via la synthèse vocale du système.
- Les 40 derniers mots affichés ne reviennent pas tout de suite.

Raccourcis sur la page : `espace` ou `→` pour le mot suivant, `S` pour écouter.

## Installation

### Depuis le Chrome Web Store

Bientôt disponible. Le Chrome Web Store fonctionne aussi pour Arc, Brave et Edge.

### Manuellement, depuis ce repo

1. Télécharger le code : bouton **Code → Download ZIP** sur GitHub, puis dézipper. Ou bien :
   ```bash
   git clone git@github.com:dianedelallee/learn_vocab_tab.git
   ```
2. Ouvrir `arc://extensions` (ou `chrome://extensions`).
3. Activer le **mode développeur** (interrupteur en haut à droite).
4. Cliquer sur **Charger l'extension non empaquetée** et choisir le dossier `learn_vocab_tab`.

La page de vocabulaire s'ouvre automatiquement. Les illustrations sont déjà dans le repo, il n'y a rien d'autre à installer.

## Utilisation dans Arc

Arc ignore le remplacement du nouvel onglet. À la place, il y a trois façons d'ouvrir la page :

- **Favori épinglé** : la page s'ouvre une fois à l'installation. Glisse-la dans tes Favoris et clique dessus quand tu veux.
- **Raccourci clavier** : `⌥⇧V` ouvre la page dans un nouvel onglet (modifiable dans `arc://extensions/shortcuts`).
- **Popup** : l'icône de l'extension affiche une version compacte du mot.

Dans Chrome, la page remplace aussi le nouvel onglet.

## Développement

Il n'y a pas d'étape de build : c'est du JavaScript sans dépendance. Après une modification, cliquer sur la
flèche de rechargement de l'extension dans `arc://extensions`.

Pour publier une nouvelle version : augmenter `version` dans `manifest.json`, lancer `scripts/package.sh`,
puis envoyer le zip de `dist/` dans le [tableau de bord du Chrome Web Store](https://chrome.google.com/webstore/devconsole).

## Structure

```
manifest.json            Manifest V3
html/tab.html            Page plein écran
html/popup.html          Version compacte (icône de l'extension)
js/tab.js                Logique d'affichage, partagée par les deux pages
js/words.js              Langues et liste de mots
js/phonetics.js          Prononciation de chaque mot, par langue
js/settings.js           Réglages (chrome.storage.sync)
js/background.js         Raccourci clavier + ouverture à l'installation
css/tab.css              Styles
img/words/               Illustrations SVG
scripts/fetch-icons.mjs  Télécharge les illustrations manquantes
scripts/package.sh       Crée le zip pour le Chrome Web Store
store/                   Visuels et textes de la fiche Chrome Web Store (listing.md)
```

Illustrations : [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) © Microsoft, licence MIT (voir `img/words/LICENSE`).

## Ajouter un mot

1. Trouver le nom de l'illustration sur [Iconify — Fluent Emoji Flat](https://icon-sets.iconify.design/fluent-emoji-flat/).
2. Ajouter l'entrée dans `WORDS` (`js/words.js`), avec `kana` si le japonais contient des kanji.
3. Ajouter sa prononciation dans chaque langue de `js/phonetics.js`.
4. Lancer `node scripts/fetch-icons.mjs`.
