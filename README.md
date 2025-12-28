# MarketHub — E-commerce Platform

**Collaborateurs :**  
- **MELLAK Khadija**  
- **OUFQUIR Khadija**  
**École :** National School of Applied Sciences of Fez  
**Filière :** Software & AI Engineering, 4th year  

MarketHub est une plateforme e-commerce complète, développée avec **Spring Boot** pour le backend et **Angular** pour le frontend.  
Le projet est organisé de manière professionnelle avec des modules clairs et des rôles bien définis (USER, ADMIN).  

---

## Plan de travail

### Phase 1 — Mise en place et fondations
- Création projets **Spring Boot** et **Angular**
- Configuration base de données (MySQL ou PostgreSQL)
- Architecture des modules :
  - Backend : User, Product, Category, Auth, Order, Payment
  - Frontend : Auth, Products, Cart, Admin

### Phase 2 — Authentification & Rôles (JWT)
- **Backend** :
  - Entités : User, Role
  - Spring Security : chain filters, endpoints sécurisés par rôle
  - JWT + Refresh Token
- **Frontend** :
  - AuthService : login/register/logout
  - Guards : AuthGuard, AdminGuard
  - JWT Interceptor pour toutes les requêtes

### Phase 3 — CRUD Produits & Catégories (Admin)
- **Backend** : CRUD /products et /categories, upload images
- **Frontend** : Dashboard admin, gestion des produits et catégories

### Phase 4 — Catalogue produits (User)
- **Backend** : Endpoints publics pour recherche et filtrage
- **Frontend** : Affichage produits, filtres, page détails produit

### Phase 5 — Panier & Commandes
- **Backend** : CartItem, Order, OrderItem, gestion du panier et validation des commandes
- **Frontend** : Composant Panier, total dynamique, validation de commande

### Phase 6 — Paiement Stripe
- **Backend** : Création PaymentIntent, validation paiement
- **Frontend** : Stripe Checkout, page paiement, redirection après paiement


## Répartition des tâches

| Phase | Mellak Khadija | Oufquir Khadija |
| --- | --- | --- |
| Auth & Roles | Role + sécurité globale, JWT Interceptor, AdminGuard | User, login/register, JWT génération, AuthGuard |
| Produits & Catégories | Backend Category, Frontend admin produits | Backend Product, Frontend admin catégories |
| Catalogue User | Backend endpoints publics, pagination | Frontend affichage catalogue, filtres, détails produit |
| Panier & Commande | Backend Cart, Frontend panier | Backend Order, Frontend confirmation commande |
| Paiement Stripe | Backend PaymentIntent, validation | Frontend intégration Stripe Checkout |
| Auth Google | Backend token → JWT | Frontend OAuth Google |



## Démonstrations (à compléter)

- [Connexion au compte utilisateur](photos_demo/demo6.png)  
- [Client normal authentifié](photos_demo/demo1.png)  
- [Détails d'un produit](photos_demo/demo2.png)  
- [Gèrer les catégories par un Admin ](photos_demo/demo3.png)  
- [Modifier une catégorie](photos_demo/demo4.png)  
- [Gérer les produits](photos_demo/demo5.png)  