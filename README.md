# Le Domaine — site vitrine

Site du bar à vin "Le Domaine" (Grenoble), construit avec [Astro](https://astro.build) + Tailwind CSS, avec un espace d'administration ([Decap CMS](https://decapcms.org)) pour que l'équipe puisse modifier le contenu sans toucher au code.

## Développement local

```bash
npm install
npm run dev
```

Le site est disponible sur `http://localhost:4321`.

## Structure du contenu (modifiable via l'admin ou directement en fichier)

- `src/data/site.json` — nom, adresse, horaires, réseaux sociaux, lien Google Maps
- `src/content/menu/*.json` — catégories et plats de la carte
- `src/content/events/*.md` — soirées et événements à venir
- `src/content/gallery/*.json` — photos de la galerie
- `src/content/reviews/*.json` — avis clients mis en avant (auteur, note, texte, date)

Les images sont dans `public/images/`. Certains éléments (galerie, événements) ont encore des visuels de substitution (SVG) — à remplacer par de vraies photos via l'admin (voir plus bas).

**⚠️ À faire avant la mise en ligne définitive :**
- Remplacer les 3 avis d'exemple dans `src/content/reviews/` par de vrais avis clients (actuellement des exemples fictifs — ne pas laisser en prod).
- Ajouter au moins un événement à venir dans `src/content/events/` (les événements actuels sont déjà passés).
- Renseigner `telephone` dans `src/data/site.json` si vous voulez qu'un numéro apparaisse sur le site.

## Déploiement (Netlify) + administration en autonomie

1. **Créer un dépôt Git** (GitHub) pour ce projet et y pousser le code.
2. **Créer un site Netlify** relié à ce dépôt (build command `npm run build`, publish directory `dist` — déjà configuré dans `netlify.toml`).
3. Dans Netlify : **Site settings → Identity → Enable Identity**.
   - Dans "Registration", passer sur "Invite only".
   - Activer **Git Gateway** (Identity → Services → Git Gateway).
4. Inviter tes amis comme utilisateurs Identity (Identity → Invite users) avec leur email — ils recevront un lien pour créer leur mot de passe.
5. Une fois connectés, ils peuvent modifier le site sur `https://votre-site.netlify.app/admin/` :
   - Modifier la carte, ajouter/supprimer des soirées, changer les photos, mettre à jour les horaires — tout depuis une interface simple, sans coder.
   - Chaque modification déclenche automatiquement un nouveau déploiement du site.

## Remplacer les photos par les vraies

- `public/images/galerie/placeholder.svg` → remplacer chaque entrée de la galerie via l'admin (`Galerie photo`)
- `public/images/evenements/placeholder.svg` → idem pour chaque événement

## Flux Instagram automatique

Pour afficher les derniers posts Instagram automatiquement (sans API Meta à configurer) :

1. Créer un compte gratuit sur [SnapWidget](https://snapwidget.com) ou [Elfsight](https://elfsight.com), connecter le compte `@ledomaine_gre`.
2. Récupérer le lien d'intégration ("embed URL").
3. Le renseigner dans l'admin, section **Informations générales → Widget Instagram**.

## Avis Google

Deux options, au choix :

1. **Manuel (par défaut)** — ajouter/modifier les avis un par un dans l'admin, section **Avis Google**. Seuls les avis notés 4★ ou 5★ sont affichés sur le site, triés du plus favorable/récent au moins récent (6 max).
2. **Automatique** — pour que les avis Google les plus récents et les mieux notés s'affichent tout seuls, sans rien retaper :
   1. Créer un compte gratuit sur [Elfsight](https://elfsight.com) ou [EmbedSocial](https://embedsocial.com), connecter la fiche Google Business du Domaine.
   2. Configurer le widget pour trier par "les plus récents" et filtrer sur 4★ minimum.
   3. Récupérer le lien d'intégration ("embed URL") et le renseigner dans l'admin, section **Informations générales → Widget avis Google**. Dès qu'il est rempli, il prend le pas sur les avis saisis manuellement.

## Domaine personnalisé

Une fois satisfait du rendu, un nom de domaine (ex. `ledomaine-grenoble.fr`) peut être branché directement dans Netlify (Domain settings).

**⚠️ Une fois l'URL définitive connue** (sous-domaine Netlify ou domaine personnalisé), mettre à jour :
- `site` dans `astro.config.mjs` (utilisé pour le sitemap et les balises SEO/Open Graph)
- l'URL du sitemap dans `public/robots.txt`
