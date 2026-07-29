# EF-Application-fullstack
L’objectif est de réaliser une petite application full-stack permettant de visualiser les consommations énergétiques d’un bâtiment.

## **Backend :**
Python ![Python](https://img.shields.io/badge/Python-3.12-blue) + FastAPI ![FastAPI](https://img.shields.io/badge/FastAPI-0.140-green).
Installation et démarrage :
cd back
pip install fastapi uvicorn
python -m uvicorn main:app --reload

Le backend s'appuie sur 5 fichiers JSON, un par site, contenant chacun 12 mois de données de consommation ainsi que des indicateurs synthétiques (moyenne, variance, somme cumulée, évolution). Ces fichiers ont été générés par IA plutôt que par tirage aléatoire pur, afin d'obtenir des séries de consommation cohérentes (saisonnalité hiver/été, tendance, bruit réaliste) plutôt que des valeurs sans logique sous-jacente.

Pour les prévisions, le choix s'est porté sur la méthode de lissage exponentiel double (Holt), plutôt que sur un lissage exponentiel simple qui était le calcul prévu de base pour ce projet. Cependant le lissage simple ne projette qu'une valeur constante dans le futur, ce qui ne permet pas de distinguer les 3 mois de prévision les uns des autres. La méthode de Holt introduit un second paramètre de tendance, permettant de calculer une prévision différente pour chacun des 3 mois à partir du niveau et de la tendance estimés sur les 12 mois historiques.

Les formules mathématiques étant les suivantes :
**Lissage simple :**
Chaque valeur lissée est une moyenne pondérée entre l'observation actuelle et la valeur lissée précédente. (Dans le code en lui même, on peut utiliser la méthode de récursion pour calculer nos prévisions)

$$S_t = \alpha \times X_t + (1 - \alpha) \times S_{t-1}$$

Où :
- $S_t$ : valeur lissée au mois $t$
- $X_t$ : valeur réelle observée au mois $t$
- $\alpha$ : coefficient de lissage, compris entre 0 et 1
- $S_{t-1}$ : valeur lissée du mois précédent

*Initialisation*
$$S_1 = X_1$$

*Limite* : cette méthode ne capture aucune tendance. La prévision pour les mois futurs reste donc **constante**, égale à la dernière valeur lissée ($S_{12}$ dans notre cas).

**Lissage double (Holt) :**
Introduit un second paramètre pour capturer la tendance (hausse ou baisse), en plus du niveau.

*Niveau*
$$L_t = \alpha \times X_t + (1 - \alpha) \times (L_{t-1} + T_{t-1})$$

*Tendance*
$$T_t = \beta \times (L_t - L_{t-1}) + (1 - \beta) \times T_{t-1}$$

Où :
- $L_t$ : niveau lissé au mois $t$
- $T_t$ : tendance lissée au mois $t$
- $\alpha$ : coefficient de lissage du niveau
- $\beta$ : coefficient de lissage de la tendance
- $X_t$ : valeur réelle observée au mois $t$

*Initialisation*
$$L_1 = X_1$$
$$T_1 = X_2 - X_1$$

*Prévision à $h$ mois dans le futur*
$$\hat{X}_{t+h} = L_t + h \times T_t$$

---

**Frontend :**
React(Vite).
Installation et démarrage :
cd front
npm install
npm run dev

Le frontend est développé en React, avec pour objectif d'afficher les données exposées par l'API : indicateurs synthétiques, tableau des valeurs, graphique comparatif, gestion des états de chargement et d'erreur.

Le graphique comparant historique et prévisions utilise la librairie Recharts, à partir d'un exemple de graphique prêt à l'emploi trouvé sur GitHub, adapté aux données du projet.

Le composant Tableau.jsx, affichant les valeurs sous forme de tableau, a été généré avec l'aide d'une IA.

Le composant App.jsx a servi de support d'apprentissage pour les bases de React : la gestion de l'état local avec useState, la synchronisation avec une source de données externe via useEffect, et la récupération des données de l'API avec fetch.

*Attention : vous ne pouvez utiliser un seul terminal pour faire tourner uvicorn (localhost:8000) ET npm (localhost:5173), il vous en faudra deux.*

