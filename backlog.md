# Backlog du Produit — Calma WorkSpace

## Conventions

- **Priorité** : Haute (indispensable au parcours de réservation minimal), Moyenne (attendue par le cahier des charges mais non bloquante), Basse (extension optionnelle, bonus).
- **Estimation** : points d'effort relatif, suite de Fibonacci (1, 2, 3, 5, 8, 13). Référence : US02 « Se connecter » = 3 points.
- **Sprint** : Sprint 1 = Incrément 1, Sprint 2 = Incrément 2, Sprint 3 = Incrément 3. « Plus tard » = extension non planifiée.
- **Critères d'acceptation** : chaque critère est vérifiable sur l'environnement de test et correspond à au moins un test automatisé.

## Paramètres du centre (à valider par le PO)

Ces valeurs sont utilisées par les critères d'acceptation ci-dessous.

| Paramètre | Valeur |
| :--- | :--- |
| Horaires d'ouverture | 08:00 – 22:00, tous les jours |
| Granularité des créneaux | 30 minutes |
| Durée minimale d'une réservation | 30 minutes |
| Durée maximale d'une réservation | 8 heures |
| Temps tampon entre deux réservations d'une même salle | 15 minutes |
| Réservation possible jusqu'à | 30 jours à l'avance |

**Types de salle** : box individuel, salle de réunion, salle de formation.

**Nature de réservation et compatibilité :**

| Nature | Mode | Nombre de personnes | Type de salle |
| :--- | :--- | :--- | :--- |
| Étude personnelle | Individuel | 1 | Box individuel |
| Tâche personnelle | Individuel | 1 | Box individuel |
| Réunion | Groupe | ≥ 2 | Salle de réunion |
| Formation de groupe | Groupe | ≥ 2 | Salle de formation |

## Vue d'ensemble

| ID | Jira | Thème | User Story | Priorité | Points | Sprint |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| US01 | SCRUM-5 | Comptes et profils | En tant que client, je veux créer un compte afin d'utiliser le centre. | Haute | 3 | Sprint 1 |
| US02 | SCRUM-6 | Comptes et profils | En tant qu'utilisateur, je veux me connecter afin d'accéder à mon espace. | Haute | 3 | Sprint 1 |
| US11 | SCRUM-21 | Comptes et profils | En tant que client, je veux modifier mon profil afin de garder mes informations à jour. | Moyenne | 2 | Sprint 2 |
| US03 | SCRUM-7 | Gestion des salles | En tant que gérant, je veux gérer les salles afin de les proposer aux clients. | Haute | 5 | Sprint 1 |
| US04 | SCRUM-8 | Disponibilités | En tant que client, je veux voir les salles libres afin de choisir un créneau. | Haute | 5 | Sprint 1 |
| US05 | SCRUM-9 | Réservation | En tant que client, je veux réserver une salle afin de travailler. | Haute | 8 | Sprint 2 |
| US06 | SCRUM-10 | Réservation | En tant que gérant, je veux bloquer les réservations en double afin d'éviter les conflits. | Haute | 5 | Sprint 2 |
| US12 | SCRUM-22 | Réservation | En tant que gérant, je veux que la capacité, la durée maximale et le temps tampon soient respectés afin de garantir le bon fonctionnement du centre. | Haute | 5 | Sprint 2 |
| US13 | SCRUM-23 | Réservation | En tant que client, je veux consulter mes réservations afin de connaître mes prochains créneaux. | Moyenne | 2 | Sprint 3 |
| US14 | SCRUM-24 | Tarification et paiement | En tant que gérant, je veux définir les tarifs des salles afin de fixer le prix des réservations. | Haute | 2 | Sprint 3 |
| US07 | SCRUM-11 | Tarification et paiement | En tant que client, je veux voir le prix de ma réservation afin de savoir combien payer. | Haute | 3 | Sprint 3 |
| US08 | SCRUM-12 | Tarification et paiement | En tant qu'agent de paiement, je veux enregistrer un paiement et donner un reçu afin de garder une preuve. | Haute | 5 | Sprint 3 |
| US09 | SCRUM-13 | Suivi de l'occupation | En tant qu'agent de suivi, je veux voir le planning du jour afin d'accueillir les clients. | Moyenne | 3 | Sprint 3 |
| US10 | SCRUM-25 | Extensions | En tant que client, je veux annuler ma réservation afin de libérer la salle. | Basse | 3 | Plus tard |
| US15 | SCRUM-26 | Extensions | En tant que client, je veux souscrire un abonnement mensuel afin de payer moins cher un usage régulier. | Basse | 8 | Plus tard |
| US16 | SCRUM-27 | Extensions | En tant que parent, je veux autoriser la réservation de mon enfant mineur afin qu'il puisse utiliser le centre. | Basse | 5 | Plus tard |
| US17 | SCRUM-28 | Extensions | En tant que client, je veux recevoir des notifications afin de ne pas oublier mes réservations. | Basse | 5 | Plus tard |
| US18 | SCRUM-29 | Extensions | En tant qu'agent de suivi, je veux enregistrer l'arrivée des clients afin de suivre la présence. | Basse | 3 | Plus tard |
| US19 | SCRUM-30 | Extensions | En tant que gérant, je veux un tableau de bord afin de suivre l'occupation et le chiffre d'affaires. | Basse | 5 | Plus tard |

**Charge par sprint** : Sprint 1 = 16 points, Sprint 2 = 20 points, Sprint 3 = 15 points, Plus tard = 29 points.

US11 et US13 ont été ajoutées après le démarrage du Sprint 1 ; elles sont planifiées dans les Sprints 2 et 3 pour ne pas modifier le périmètre du sprint en cours.

---

## Thème 1 — Comptes et profils

### US01 — Créer un compte · Haute · 3 pts · Sprint 1

*En tant que client, je veux créer un compte afin d'utiliser le centre.*

1. Le formulaire d'inscription demande : nom, prénom, email, téléphone, date de naissance, mot de passe, confirmation du mot de passe et type de profil (étudiant, élève, développeur, entrepreneur).
2. Tous les champs sont obligatoires ; un champ manquant ou invalide affiche un message sous le champ concerné et le compte n'est pas créé.
3. Le mot de passe contient au moins 8 caractères dont une lettre et un chiffre, et la confirmation doit être identique.
4. Un email déjà utilisé est refusé avec le message « Cet email est déjà utilisé ».
5. Le mot de passe est stocké haché, jamais en clair.
6. Après une inscription réussie, le client est connecté et redirigé vers son espace client.

### US02 — Se connecter · Haute · 3 pts · Sprint 1

*En tant qu'utilisateur, je veux me connecter afin d'accéder à mon espace.*

1. Avec un email et un mot de passe valides, l'utilisateur est redirigé selon son rôle : client → espace client, gérant → gestion des salles, agent de suivi → planning du jour, agent de paiement → paiements.
2. Avec des identifiants invalides, le message « Email ou mot de passe incorrect » s'affiche, sans préciser lequel est faux.
3. Une page protégée ouverte sans être connecté redirige vers la page de connexion.
4. Un utilisateur ne peut pas accéder aux pages ni aux routes API d'un autre rôle (réponse 403).
5. Le bouton « Se déconnecter » termine la session ; les pages protégées ne sont plus accessibles ensuite.
6. Les comptes du gérant, de l'agent de suivi et de l'agent de paiement sont fournis par les données initiales (pas d'inscription publique pour ces rôles).

### US11 — Modifier mon profil · Moyenne · 2 pts · Sprint 2

*En tant que client, je veux modifier mon profil afin de garder mes informations à jour.*

1. Le client voit ses informations actuelles pré-remplies dans un formulaire.
2. Il peut modifier nom, prénom, téléphone et type de profil ; les mêmes règles de validation qu'à l'inscription s'appliquent.
3. L'email n'est pas modifiable.
4. Après enregistrement, un message de confirmation s'affiche et les nouvelles valeurs sont visibles après rechargement de la page.

## Thème 2 — Gestion des salles

### US03 — Gérer les salles · Haute · 5 pts · Sprint 1

*En tant que gérant, je veux gérer les salles afin de les proposer aux clients.*

1. Le gérant voit la liste des salles avec nom, type, capacité, équipements et statut (active / inactive).
2. Il peut créer une salle avec : nom (unique), type (box individuel, salle de réunion, salle de formation), capacité (entier ≥ 1) et équipements (choix multiple : Wi-Fi, vidéoprojecteur, écran, tableau blanc, prises électriques, climatisation).
3. Un box individuel a obligatoirement une capacité de 1 ; une salle de réunion ou de formation a une capacité ≥ 2.
4. Il peut modifier toutes les informations d'une salle.
5. Il peut désactiver une salle : elle n'apparaît plus dans les recherches des clients. Il peut la réactiver.
6. Une salle n'est jamais supprimée définitivement, afin de conserver l'historique des réservations.
7. Seul le gérant a accès à ces fonctions.

## Thème 3 — Disponibilités

### US04 — Voir les salles libres · Haute · 5 pts · Sprint 1

*En tant que client, je veux voir les salles libres afin de choisir un créneau.*

1. Le client recherche par date, heure de début, heure de fin et nombre de personnes.
2. Les résultats ne contiennent que les salles actives, de capacité ≥ au nombre de personnes, sans réservation sur le créneau demandé (temps tampon inclus).
3. Chaque résultat affiche nom, type, capacité et équipements.
4. Une date passée, une date au-delà de 30 jours, une heure de fin ≤ heure de début ou un créneau hors des horaires d'ouverture sont refusés avec un message explicite.
5. Les heures proposées respectent la granularité de 30 minutes.
6. Si aucune salle ne correspond, le message « Aucune salle disponible pour ce créneau » s'affiche.

## Thème 4 — Réservation

### US05 — Réserver une salle · Haute · 8 pts · Sprint 2

*En tant que client, je veux réserver une salle afin de travailler.*

1. Depuis un résultat de recherche, le client choisit la nature de la réservation (étude personnelle, tâche personnelle, réunion, formation de groupe) ; date, créneau et nombre de personnes sont repris de la recherche.
2. Pour une nature individuelle, le nombre de personnes est fixé à 1 ; pour une nature de groupe, il doit être ≥ 2.
3. La nature doit être compatible avec le type de salle (voir le tableau de compatibilité dans le backlog) ; sinon la réservation est refusée avec un message explicite.
4. Avant validation, un récapitulatif affiche salle, date, créneau, nature et nombre de personnes.
5. Après validation, la réservation est enregistrée avec le statut « Confirmée » et un message de confirmation s'affiche.
6. Le créneau réservé n'apparaît plus comme libre dans la recherche (US04).

### US06 — Bloquer les réservations en double · Haute · 5 pts · Sprint 2

*En tant que gérant, je veux bloquer les réservations en double afin d'éviter les conflits.*

1. Une réservation dont le créneau chevauche, même partiellement, une réservation confirmée de la même salle est refusée.
2. Le message « Cette salle est déjà réservée sur ce créneau » s'affiche et aucune réservation n'est créée.
3. Deux réservations de salles différentes sur le même créneau sont acceptées.
4. Si deux clients valident en même temps le même créneau de la même salle, une seule réservation est enregistrée.
5. La vérification est faite côté serveur : un appel direct à l'API ne permet pas de la contourner.

### US12 — Respecter la capacité, la durée maximale et le temps tampon · Haute · 5 pts · Sprint 2

*En tant que gérant, je veux que la capacité, la durée maximale et le temps tampon soient respectés afin de garantir le bon fonctionnement du centre.*

1. Une réservation dont le nombre de personnes dépasse la capacité de la salle est refusée.
2. Une réservation de plus de 8 heures ou de moins de 30 minutes est refusée.
3. Une réservation qui commence moins de 15 minutes après la fin d'une autre réservation de la même salle (ou qui se termine moins de 15 minutes avant le début d'une autre) est refusée.
4. Une réservation qui respecte exactement le temps tampon (écart de 15 minutes) est acceptée.
5. Chaque refus affiche un message indiquant la règle non respectée.
6. Ces règles sont vérifiées côté serveur, en plus du formulaire.

### US13 — Consulter mes réservations · Moyenne · 2 pts · Sprint 3

*En tant que client, je veux consulter mes réservations afin de connaître mes prochains créneaux.*

1. Le client voit uniquement ses propres réservations.
2. Elles sont séparées en « À venir » (triées de la plus proche à la plus lointaine) et « Passées ».
3. Chaque réservation affiche salle, date, créneau, nature, nombre de personnes, statut, prix et statut de paiement.

## Thème 5 — Tarification et paiement

### US14 — Définir les tarifs · Haute · 2 pts · Sprint 3

*En tant que gérant, je veux définir les tarifs des salles afin de fixer le prix des réservations.*

1. Pour chaque salle, le gérant saisit un tarif horaire et un tarif journalier, en dinars (TND), strictement positifs.
2. Le tarif journalier doit être inférieur à 8 × le tarif horaire ; sinon un message l'indique.
3. Une salle sans tarif ne peut pas être réservée.
4. Un changement de tarif ne modifie pas le prix des réservations déjà enregistrées.

### US07 — Voir le prix de ma réservation · Haute · 3 pts · Sprint 3

*En tant que client, je veux voir le prix de ma réservation afin de savoir combien payer.*

1. Le prix est calculé ainsi : prix = min(durée en heures × tarif horaire, tarif journalier). La durée est comptée par tranches de 30 minutes.
2. Le récapitulatif avant validation (US05) affiche le prix et précise s'il s'agit du tarif horaire ou journalier.
3. Le prix est enregistré avec la réservation au moment de la validation.
4. Le prix est affiché dans « Mes réservations » (US13).
5. Exemples à couvrir par les tests (tarif horaire 5 TND, journalier 30 TND) : 1 h 30 → 7,500 TND ; 4 h → 20 TND ; 7 h → 30 TND (tarif journalier).

### US08 — Enregistrer un paiement et donner un reçu · Haute · 5 pts · Sprint 3

*En tant qu'agent de paiement, je veux enregistrer un paiement et donner un reçu afin de garder une preuve.*

1. L'agent de paiement recherche une réservation par nom du client ou par date.
2. Il enregistre le paiement avec le mode de paiement (espèces, carte bancaire) ; le montant est celui de la réservation et n'est pas modifiable.
3. La réservation passe au statut de paiement « Payée ».
4. Un reçu est généré avec : numéro unique, date du paiement, nom du client, salle, date et créneau, montant, mode de paiement et nom de l'agent.
5. Le reçu peut être imprimé ou téléchargé en PDF ; le client peut aussi le consulter depuis « Mes réservations ».
6. Une réservation déjà payée ne peut pas être payée une deuxième fois.

## Thème 6 — Suivi de l'occupation

### US09 — Voir le planning du jour · Moyenne · 3 pts · Sprint 3

*En tant qu'agent de suivi, je veux voir le planning du jour afin d'accueillir les clients.*

1. Par défaut, le planning affiche les réservations confirmées du jour, regroupées par salle et triées par heure de début.
2. Chaque réservation affiche créneau, nom du client, nature, nombre de personnes et statut de paiement.
3. L'agent peut choisir une autre date.
4. Les salles sans réservation ce jour-là apparaissent comme « Libre toute la journée ».
5. Le planning indique le taux d'occupation du jour par salle (heures réservées / heures d'ouverture).

## Thème 7 — Extensions (bonus)

### US10 — Annuler ma réservation · Basse · 3 pts · Plus tard

*En tant que client, je veux annuler ma réservation afin de libérer la salle.*

1. Le client peut annuler une réservation à venir, au plus tard 2 heures avant son début.
2. Une réservation déjà payée ne peut pas être annulée en ligne ; le message invite à contacter l'accueil.
3. Après annulation, la réservation passe au statut « Annulée » et le créneau redevient libre dans la recherche.
4. Un client ne peut annuler que ses propres réservations.

### US15 — Abonnement mensuel · Basse · 8 pts · Plus tard

*En tant que client, je veux souscrire un abonnement mensuel afin de payer moins cher un usage régulier.*

1. Le gérant définit une ou plusieurs formules d'abonnement (prix mensuel, nombre d'heures incluses).
2. L'agent de paiement enregistre la souscription et son paiement ; un reçu est émis.
3. Les réservations d'un client abonné sont décomptées de ses heures incluses, à un prix de 0 TND, tant qu'il lui reste des heures.
4. Le client voit ses heures restantes et la date de fin de son abonnement.

### US16 — Autorisation parentale pour les mineurs · Basse · 5 pts · Plus tard

*En tant que parent, je veux autoriser la réservation de mon enfant mineur afin qu'il puisse utiliser le centre.*

1. À l'inscription, un client de moins de 18 ans (d'après sa date de naissance) doit saisir l'email d'un parent.
2. Le parent reçoit un lien pour valider l'autorisation.
3. Tant que l'autorisation n'est pas validée, le mineur peut se connecter mais pas réserver.

### US17 — Notifications · Basse · 5 pts · Plus tard

*En tant que client, je veux recevoir des notifications afin de ne pas oublier mes réservations.*

1. Le client reçoit un email de confirmation après chaque réservation.
2. Il reçoit un rappel 24 heures avant le début de la réservation.
3. Il reçoit un email après chaque paiement, avec le reçu en pièce jointe.

### US18 — Suivi de présence · Basse · 3 pts · Plus tard

*En tant qu'agent de suivi, je veux enregistrer l'arrivée des clients afin de suivre la présence.*

1. Depuis le planning du jour, l'agent marque une réservation comme « Présent » ou « Absent ».
2. Une réservation non marquée 30 minutes après son début est signalée visuellement.
3. Le gérant voit le taux d'absence par client.

### US19 — Tableau de bord du gérant · Basse · 5 pts · Plus tard

*En tant que gérant, je veux un tableau de bord afin de suivre l'occupation et le chiffre d'affaires.*

1. Le tableau de bord affiche, pour une période choisie : taux d'occupation par salle, nombre de réservations par nature et chiffre d'affaires encaissé.
2. Les données affichées correspondent aux réservations et paiements enregistrés sur la période.
3. Seul le gérant y a accès.
