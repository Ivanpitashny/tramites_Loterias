# tramites_Loterias
Aplicacion movil para iniciar tramites y verificarlos

#para usar la apliacacion acordarse de instalar todas las dependendcias

# para instalar las dependencias para la web 
anteriormente instalar node 20.16.0 y npm 10.8.2
instalar npm install expo --legacy-peer-deps
npx expo install react-dom react-native-web @expo/metro-runtime -- --legacy-peer-deps

# para instalar la libreria de componentes
si es que lo solicita utilizar el codigo de abajo, este codigo puede dar error, si lo da utilizar el que recomienda la terminal
npx expo install react-native-paper react-native-vector-icons react-native-safe-area-context --legacy-peer-deps

# Para Iniciar el proyecto 
 usar desde la terminal  npx expo start
 desde aca cuando inicie, si se quiere mirar desde el telefono descargar la apliacion de expo go y escanear el codigo qr,
 si no pulsando w abre la pantalla del navegador web

# para recargar el proyecto 
si no se reproducieron los cambios pulsar la letra r y reiniciara e proyecto

##Para modificar el back y correrlo
descargar java 17 y maven 3.9.x
para descargar java ir a https://www.oracle.com/ar/java/technologies/downloads/#jdk17-windows
descargar maven https://maven.apache.org/download.cgi
para al maven hay que realizar una instalacion de paths

#Codigos git
-para crear una nueva rama
 git checkout main
 git pull //actualiza el proyecto
 git checkout -b "nombre_de _tarea-Iniciales de cada uno"

-una vez solucionado el problema
  git add . //agrega las modificaciones
  git commit -m "descripcion de lo que se hizo"
  git push origin ramaCreada // para subir las modificaciones
  git checkout main //vuelve a la rama principal
  git pull //actualizamos el proyecto de nuevo
  git merge --no-f origin/ramaCreada  //merge de la rama

  git add .
  git commit -m "merge ramaCreada"
  git push origin main
