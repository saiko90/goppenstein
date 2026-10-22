# Goppenstein – carnet de terrain

Mini web app statique pour une sortie à l'ancienne mine de plomb-zinc de Goppenstein (Lötschental, VS).

- Carte swisstopo (plan + aérien) avec Leaflet
- GPS live, altitude affichée sur la coupe des niveaux
- Marquage de points sur le terrain (stockés dans le téléphone), export GPX
- Fiches des trois étages de la mine, histoire, sécurité, checklist, sources
- Fonctionne en partie hors ligne (service worker)

Déploiement : site statique, aucune build. Vercel sert `index.html` directement.
