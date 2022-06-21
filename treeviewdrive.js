/** ce script permet d'afficher l'arborescence des dossiers et sous dossiers dans google drive.
 * Afficher l'arborescence du dossier parent et sous dossiers
 * Modifier uniquement NOM_DU_DOSSIER pour afficher l'arborescence 
 */

function generateFolderTree() {
     try {
          // Si on veut l'arborescence de n'importe quel sous dossier
          var folderName = "NOM_DU_DOSSIER"; // à modifier
          var parent = DriveApp.getFoldersByName(folderName).next(); 

          // Si on souhaite effectuer une recherche à partir du dossier supérieur (racine)
          var parentFolder = DriveApp.getRootFolder(); 

          getChildFolders(parentFolder);

     } catch (e) { 
          Logger.log(e.toString());
     }
}

function getChildFolders(parent) {
     var childFolders = parent.getFolders();

     while (childFolders.hasNext()) {
          var childFolder = childFolders.next();

          Logger.log("----------------------  NOM DU DOSSIER: " + childFolder.getName() + "  ----------------------");
          Logger.log("Nombre de fichiers: " + childFolder.getFiles().length);
          Logger.log("Nombre de sous-dossiers: " + childFolder.getFolders().length);
          Logger.log("Lien du dossier: " + childFolder.getUrl());
          Logger.log("Taille du dossier: " + childFolder.getSize());
          Logger.log("Date de création du dossier: " + childFolder.getCreatedDate());

          var files = childFolder.getFiles();

          while (files.hasNext()) {
               // On affiche la liste des fichiers contenus dans le dossier

               Logger.log("Nom du fichier: " + files.next().getName());
          }
          Logger.log("----------------------------------------------------------------------------------------------------------");

          // On fait appelle à la fonction récursive pour afficher les sous dossiers
          getChildFolders(childFolder);
     }
}
