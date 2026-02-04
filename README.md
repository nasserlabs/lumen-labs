# Lumen Lab - Site Vitrine

Un site vitrine moderne, élégant et immersif avec design noir contre-jour et robot 3D interactif.

## 🎨 Caractéristiques

- **Design premium** : fond noir profond avec accents bleus lumineux
- **Robot 3D interactif** : personnage mignon créé avec Three.js qui suit la souris
- **Animations fluides** : transitions subtiles et micro-interactions soignées
- **Responsive** : adaptation parfaite mobile, tablette et desktop
- **Multi-pages** : Accueil, Projets, Vision, Contact
- **Performance** : code optimisé, pas de framework lourd

## 📁 Structure du projet

```
lumen-lab/
├── index.html          # Page d'accueil avec robot 3D
├── projects.html       # Grille de projets
├── vision.html         # Vision et compétences
├── contact.html        # Informations de contact
├── css/
│   └── style.css      # Styles principaux
├── js/
│   └── main.js        # JavaScript (robot 3D, animations)
└── README.md          # Ce fichier
```

## 🚀 Déploiement sur GitHub Pages

### Méthode 1 : Via l'interface GitHub

1. Créez un nouveau repository sur GitHub
2. Uploadez tous les fichiers du projet
3. Allez dans **Settings** > **Pages**
4. Sous "Source", sélectionnez **main** branch et dossier **/ (root)**
5. Cliquez sur **Save**
6. Votre site sera accessible à `https://[votre-username].github.io/[nom-du-repo]/`

### Méthode 2 : Via Git en ligne de commande

```bash
# Initialiser le repository
git init
git add .
git commit -m "Initial commit: Lumen Lab website"

# Lier au repository distant
git remote add origin https://github.com/[votre-username]/[nom-du-repo].git
git branch -M main
git push -u origin main

# Activer GitHub Pages via Settings > Pages
```

### Méthode 3 : Repository nommé username.github.io

Si vous nommez votre repository `[votre-username].github.io`, votre site sera automatiquement publié à `https://[votre-username].github.io/`

## 🛠️ Technologies utilisées

- **HTML5** : structure sémantique
- **CSS3** : variables CSS, Grid, Flexbox, animations
- **JavaScript (Vanilla)** : pas de framework
- **Three.js** : rendu 3D du robot
- **Google Fonts** : Space Grotesk et Inter

## 🎯 Pages

### Accueil (index.html)
- Hero plein écran avec titre et sous-titre
- Robot 3D interactif qui suit la souris
- Effets de lumière ambiante avec orbes flottants

### Projets (projects.html)
- Grille responsive de 6 projets
- Cartes avec effet hover (élévation + glow)
- Tags technologiques pour chaque projet

### Vision (vision.html)
- Présentation de la philosophie Lumen Lab
- Citation mise en valeur
- Barres de compétences animées au scroll :
  - HTML : 85%
  - CSS : 80%
  - Java : 65%
  - Python : 70%

### Contact (contact.html)
- Icônes sociales cliquables (Email, Instagram, Facebook)
- Animations au hover
- Email de contact : contact@lumenlab.dev

## 📱 Responsive

Le site s'adapte automatiquement aux différentes tailles d'écran :
- **Desktop** : navigation horizontale, grilles multi-colonnes
- **Tablette** : adaptation des espacements et tailles
- **Mobile** : menu hamburger, grilles en colonne unique

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans les variables CSS (`:root` dans `style.css`) :
```css
--color-bg: #0f0f12;              /* Fond principal */
--color-accent: #6bb6ff;          /* Accent bleu */
--color-text: #e8e8ea;            /* Texte principal */
```

### Robot 3D
Le robot est créé dans `js/main.js` avec Three.js. Vous pouvez :
- Modifier les couleurs dans les matériaux
- Ajuster la taille des éléments (corps, tête, yeux)
- Changer l'intensité de la lumière
- Remplacer par un modèle GLB personnalisé

### Contenu
- **Projets** : éditez `projects.html` pour ajouter/modifier les projets
- **Vision** : personnalisez le texte dans `vision.html`
- **Contact** : mettez à jour les liens sociaux dans `contact.html`

## 🔗 Liens sociaux

Pour remplacer les liens fictifs par vos vraies URLs :

1. Ouvrez `contact.html`
2. Remplacez `href="index.html"` par vos vrais liens :
```html
<a href="mailto:votre@email.com" class="social-link">
<a href="https://instagram.com/votre-profil" class="social-link">
<a href="https://facebook.com/votre-profil" class="social-link">
```

## 💡 Conseils

- **Performance** : le site charge Three.js depuis un CDN. Pour une meilleure performance, téléchargez-le localement
- **SEO** : ajoutez un fichier `robots.txt` et `sitemap.xml`
- **Analytics** : ajoutez Google Analytics ou un outil similaire si besoin
- **Favicon** : ajoutez un `favicon.ico` à la racine du projet

## 📄 Licence

Ce projet est libre d'utilisation. Personnalisez-le selon vos besoins !

## 🤝 Support

Pour toute question ou problème :
- Email : contact@lumenlab.dev
- GitHub Issues : créez une issue sur le repository

---

**Fait avec ❤️ par Lumen Lab**
