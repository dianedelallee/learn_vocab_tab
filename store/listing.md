# Fiche Chrome Web Store

Textes prêts à coller dans le [tableau de bord développeur](https://chrome.google.com/webstore/devconsole).
Les visuels sont dans ce dossier.

## Onglet « Fiche » (Store listing)

**Catégorie :** Éducation
**Langue principale :** Français

### Résumé (132 caractères max, repris de `manifest.json`)

> Un mot de vocabulaire illustré à chaque ouverture — pensé pour Arc.

### Description — français

```
Apprenez du vocabulaire sans y penser : à chaque ouverture, Learn Vocab Tab affiche un mot illustré, sa prononciation et sa traduction.

• 7 langues, dans les deux sens : français, anglais, espagnol, allemand, italien, portugais (Brésil) et japonais.
• La prononciation sous chaque mot, en alphabet phonétique international (romaji pour le japonais, avec les furigana au-dessus des kanji).
• Un bouton pour écouter le mot, avec la voix de votre système.
• 161 mots du quotidien, chacun avec une illustration douce et lisible.
• Un design épuré, en mode clair ou sombre selon votre système.
• Fonctionne entièrement hors ligne. Aucun compte, aucune publicité, aucune donnée collectée.

Pensée pour Arc
Dans Arc, ⌘T ouvre la barre de commande au lieu d'une page « nouvel onglet ». Learn Vocab Tab propose donc trois façons de réviser :
– épinglez la page dans vos Favoris Arc ;
– ouvrez-la avec le raccourci ⌥⇧V (modifiable) ;
– ou cliquez sur l'icône de l'extension pour une version compacte.
Dans Chrome, Brave ou Edge, elle remplace aussi la page « nouvel onglet ».

Raccourcis : espace ou → pour le mot suivant, S pour écouter.

Illustrations : Fluent Emoji © Microsoft, licence MIT.
```

### Description — anglais (ajouter la langue « English » dans la fiche)

```
Learn vocabulary without trying: every time you open it, Learn Vocab Tab shows an illustrated word with its pronunciation and translation.

• 7 languages, in any direction: French, English, Spanish, German, Italian, Brazilian Portuguese and Japanese.
• Pronunciation under every word in the International Phonetic Alphabet (romaji for Japanese, with furigana above kanji).
• A button to hear the word, using your system's voice.
• 161 everyday words, each with a soft, readable illustration.
• A clean design, light or dark to match your system.
• Works fully offline. No account, no ads, no data collected.

Made for Arc
In Arc, ⌘T opens the command bar instead of a new tab page. So Learn Vocab Tab gives you three ways to practise:
– pin the page to your Arc Favorites;
– open it with the ⌥⇧V shortcut (customisable);
– or click the extension icon for a compact version.
In Chrome, Brave or Edge, it also replaces the new tab page.

Shortcuts: space or → for the next word, S to listen.

Illustrations: Fluent Emoji © Microsoft, MIT licence.
```

### Visuels

| Champ | Fichier |
|---|---|
| Icône (128×128) | incluse dans le zip (`icons/icon128.png`) |
| Captures d'écran (1280×800, jusqu'à 5) | `screenshot-1-anglais.png` … `screenshot-5-popup.png` |
| Petite vignette promotionnelle (440×280) | `promo-small-440x280.png` |
| Bannière promotionnelle (1400×560, facultative) | `promo-marquee-1400x560.png` |

## Onglet « Confidentialité »

**Objectif unique :**

```
Afficher un mot de vocabulaire illustré avec sa prononciation et sa traduction, dans la langue que l'utilisateur apprend.
```

**Justification de la permission `storage` :**

```
Mémoriser les langues choisies par l'utilisateur et la liste des derniers mots affichés, pour ne pas les répéter. Ces données restent dans le navigateur.
```

**Remplacement de la page « nouvel onglet »** (si le formulaire le demande) :

```
La page « nouvel onglet » affiche le mot de vocabulaire du moment. C'est la fonction principale de l'extension.
```

**Code distant :** Non, je n'utilise pas de code distant.

**Utilisation des données :** ne cocher aucune catégorie (aucune donnée utilisateur collectée), puis cocher les trois certifications.

**Règles de confidentialité (URL) :** non nécessaire, puisqu'aucune donnée n'est collectée.

## Onglet « Distribution »

- **Visibilité :** Public (ou « Non répertorié » pour un test avec un lien privé).
- **Régions :** toutes.
- **Prix :** gratuit.
