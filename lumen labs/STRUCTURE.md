# 📂 Structure du projet Lumen Lab

```
lumen-lab/
│
├── 📄 index.html                    # Page d'accueil avec robot 3D
├── 📄 projects.html                 # Page des projets
├── 📄 vision.html                   # Page vision & compétences
├── 📄 contact.html                  # Page de contact
│
├── 📄 index-standalone.html         # Version standalone (tout en un)
├── 📄 test.html                     # Page de test
│
├── 📄 README.md                     # Documentation principale
├── 📄 PERSONNALISATION.md           # Guide de personnalisation
├── 📄 STRUCTURE.md                  # Ce fichier
│
├── 📁 css/
│   └── 📄 style.css                 # Styles principaux (710 lignes)
│
├── 📁 js/
│   └── 📄 main.js                   # JavaScript principal (robot 3D + animations)
│
└── 📁 assets/
    ├── 📄 README.md                 # Documentation des assets
    │
    ├── 📁 icons/
    │   ├── 🎨 logo.svg              # Logo Lumen Lab
    │   └── 🎨 favicon.svg           # Favicon du site
    │
    ├── 📁 images/
    │   ├── 📄 README.md             # Guide des images
    │   ├── 🎨 bg-pattern.svg        # Motif de fond géométrique
    │   └── 📁 projects/
    │       └── 🎨 placeholder.svg   # Image placeholder pour projets
    │
    └── 📁 robot/
        ├── 📄 README.md             # Documentation du robot 3D
        └── 🤖 robot.gltf            # Modèle 3D du robot (format GLTF)
```

## 📊 Statistiques

- **Total fichiers HTML** : 6 (4 pages + 2 bonus)
- **Total fichiers CSS** : 1 (style.css - 710 lignes)
- **Total fichiers JS** : 1 (main.js - ~400 lignes)
- **Total assets SVG** : 4 (logo, favicon, bg-pattern, placeholder)
- **Total modèles 3D** : 1 (robot.gltf)
- **Total documentation** : 7 fichiers MD

## 🎯 Fichiers essentiels

**Pour un déploiement minimal** :
- index.html
- projects.html
- vision.html
- contact.html
- css/style.css
- js/main.js
- assets/icons/favicon.svg
- assets/robot/robot.gltf ✨ (nouveau !)

**Optionnels mais recommandés** :
- README.md
- assets/icons/logo.svg
- assets/images/bg-pattern.svg
- assets/images/projects/placeholder.svg

**Pour le développement** :
- index-standalone.html (debug)
- test.html (debug)
- PERSONNALISATION.md (guide)
- STRUCTURE.md (guide)
- assets/README.md (guide)
- assets/robot/README.md (guide)
- assets/images/README.md (guide)

## 🚀 Déploiement GitHub Pages

Uploadez tous les fichiers sauf :
- test.html (optionnel)
- index-standalone.html (optionnel)

**Important** : Gardez la structure des dossiers intacte !

## 📝 À personnaliser

1. **Contenu** :
   - Textes des pages
   - Projets dans projects.html
   - Informations dans vision.html
   - Liens sociaux dans contact.html

2. **Visuels** :
   - Ajoutez vos images de projets dans assets/images/projects/
   - Remplacez le logo si nécessaire
   - Ajoutez une photo de profil
   - ✨ (Optionnel) Remplacez robot.gltf par votre propre modèle 3D

3. **Robot 3D** ✨ :
   - Le fichier robot.gltf est chargé depuis assets/robot/
   - Vous pouvez le remplacer par votre propre modèle .glb ou .gltf
   - Un robot de secours en code pur existe si le fichier ne charge pas
   - Voir assets/robot/README.md pour plus de détails

4. **Couleurs** :
   - Modifiez les variables CSS dans :root (style.css ligne 7-35)

5. **Domaine** :
   - Configurez votre domaine personnalisé dans GitHub Pages

## ✅ Checklist de déploiement

- [ ] Tous les fichiers uploadés sur GitHub
- [ ] GitHub Pages activé (Settings > Pages)
- [ ] Favicon visible dans l'onglet
- [ ] Navigation fonctionne entre toutes les pages
- [ ] Robot 3D s'affiche et s'anime
- [ ] Responsive testé (mobile, tablette, desktop)
- [ ] Liens sociaux mis à jour
- [ ] Contenu personnalisé
- [ ] Méta descriptions remplies
- [ ] Test sur différents navigateurs

---

**Version** : 1.0
**Dernière mise à jour** : Février 2026
**Compatibilité** : Tous navigateurs modernes
