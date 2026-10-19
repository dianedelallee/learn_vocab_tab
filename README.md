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

## Installation locale

L'extension n'est pas publiée sur le Chrome Web Store : elle se charge directement depuis le dossier du code.
Ça marche dans Arc, Chrome, Brave et Edge. Rien à compiler, rien à installer en plus : les illustrations sont déjà dans le repo.

### 1. Récupérer le code

Le repo est privé : il faut être connecté à GitHub avec un compte qui y a accès.

```bash
git clone git@github.com:dianedelallee/learn_vocab_tab.git
```

Ou, sur GitHub : **Code → Download ZIP**, puis dézipper.

> Range le dossier à un endroit où il restera (pas dans Téléchargements) : le navigateur charge l'extension
> depuis ce dossier. S'il est déplacé ou supprimé, l'extension cesse de fonctionner.

### 2. Charger l'extension

1. Ouvrir `arc://extensions` (ou `chrome://extensions` dans Chrome).
2. Activer le **mode développeur** (interrupteur en haut à droite). Il doit rester activé : s'il est désactivé, l'extension l'est aussi.
3. Cliquer sur **Charger l'extension non empaquetée** et choisir le dossier `learn_vocab_tab` (celui qui contient `manifest.json`).

La page de vocabulaire s'ouvre automatiquement dans un nouvel onglet.

### 3. L'avoir sous la main dans Arc

Arc n'a pas de page « nouvel onglet » (⌘T ouvre la barre de commande). Il y a trois façons d'ouvrir les mots :

- **Favori** : glisser l'onglet ouvert à l'installation dans les Favoris d'Arc. Un clic suffit ensuite pour voir un nouveau mot.
- **Raccourci clavier** : `⌥⇧V` ouvre la page dans un nouvel onglet. Pour le changer : `arc://extensions/shortcuts`.
- **Popup** : épingler l'extension depuis le menu des extensions d'Arc (icône de pièce de puzzle), puis cliquer sur son icône pour une version compacte.

Dans Chrome, Brave ou Edge, la page remplace aussi la page « nouvel onglet ».

### Mettre à jour

```bash
cd learn_vocab_tab
git pull
```

Puis, dans `arc://extensions`, cliquer sur la flèche de rechargement de la carte Learn Vocab Tab.
Les réglages (langues choisies) sont conservés.

### Désinstaller

Dans `arc://extensions`, cliquer sur **Supprimer** sur la carte de l'extension. Le dossier peut ensuite être supprimé.

### En cas de souci

- **Une illustration manque** : lancer `node scripts/fetch-icons.mjs` (Node 18 ou plus), puis recharger l'extension.
- **Le raccourci ne fait rien** : il entre peut-être en conflit avec un raccourci d'Arc ou de macOS. En choisir un autre dans `arc://extensions/shortcuts`.
- **Erreur au chargement** : vérifier que le dossier choisi est bien celui qui contient `manifest.json`, pas un dossier parent.
- **Pas de son** : la prononciation utilise les voix de macOS. Pour le japonais, par exemple, il faut une voix japonaise
  (Réglages Système → Accessibilité → Contenu énoncé → Voix du système → Gérer les voix).

## Développement

Il n'y a pas d'étape de build : c'est du JavaScript sans dépendance. Après une modification, cliquer sur la
flèche de rechargement de l'extension dans `arc://extensions`.

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
```

Illustrations : [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) © Microsoft, licence MIT (voir `img/words/LICENSE`).

## Ajouter un mot

1. Trouver le nom de l'illustration sur [Iconify — Fluent Emoji Flat](https://icon-sets.iconify.design/fluent-emoji-flat/).
2. Ajouter l'entrée dans `WORDS` (`js/words.js`), avec `kana` si le japonais contient des kanji.
3. Ajouter sa prononciation dans chaque langue de `js/phonetics.js`.
4. Lancer `node scripts/fetch-icons.mjs`.
