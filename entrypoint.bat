@echo off
REM Ce fichier est utilisé pour configurer un serveur local pour permettre à certaines fonctions du jeu, tel le stockage local
REM de fonctionner.
REM Chris Yang, Felix Wu - Concentration Informatique 5

SET PATH=%~dp0\node;%PATH%
ECHO Fermer cette fenêtre lorsque la consulation est terminée.
npx live-server