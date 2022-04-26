# Alos_act3

# API Versioning :

### Utilisation  :le middleware express-routes-versioning

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
    
  ## Authentification (login,register) 
  
   ### Login Et Register :
      
  ![](images/Capture%20d’écran%202022-04-26%20à%2018.39.05.png)

   ### Login et Register (La vérification de e-mails existant): 
   
   ![](images/Capture%20d’écran%202022-04-26%20à%2018.58.23.png)

   
  ### profil de chaque utilisateur 
   ![](images/Capture%20d’écran%202022-04-26%20à%2019.01.07.png)

  
   ### Tous les annonces postées par le utilisateur . 
  
   ![]( images/Capture%20d’écran%202022-04-26%20à%2019.01.36.png)


  ### Une nouvelle format de données (annonces_ventes)
  
   ![](images/Capture%20d’écran%202022-04-26%20à%2019.00.27.png)

  
  ### Utilisation : 
   
   Passport strategy .
  
   CRUD dans le file avec  FS (File System)(NPM)  .
  
