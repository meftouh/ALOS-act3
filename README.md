# Alos_act3

# API Versioning :

Utilisation  :le middleware express-routes-versioning

Cela vous aiderait à prendre en charge plusieurs versions sans modifier l'URL de l'API, il vous suffit d'envoyer la version de l'API et de diriger l'appel vers cette version du contrôleur de route.

----------------------------------------


     // call api/auth/login response -> login 
     // call api/auth/register response -> register
----------------------------------------

    // call api/annonces_ventes/ response -> annonces_ventes
----------------------------------------

    // call api/profile/ response -> profile_user
    // call api/profile/annonces_ventes response -> Tous les annonces poster pour l'utilisateur
    // call put  api/profile/annonces_ventes/ response -> Tous les annonces poster pour l'utilisateur



## On a deux versions v1 et v2:

## v1 :        Pas de modification de la version 1

           https://github.com/meftouh/Alos_act2

## v2 : 
    
  . Authentification (login,register) 
      ### Login :
      ![](images/Capture%20d%E2%80%99e%CC%81cran%202022-04-26%20a%CC%80%2018.39.05.png)

   ###Register:
   
   
  autorisation et  profil de chaque utilisateur et tous les annonces postées par le utilisateur . 
  

  . Une nouvelle format de données (annonces_ventes)
  
  .  Utilisation : 
   
   Passport strategy .
  
   CRUD dans le file avec  FS (File System)(NPM)  .
  
