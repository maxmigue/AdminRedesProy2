# Manual de ejecución 📖
## **Proyecto:** Despliegue y aseguramiento de microservicios con Docker 🐳
En este archivo se encuentran las instrucciones a seguir para lograr ejecutar este 
sistema empaquetado con docker y docker-compose.
Las tecnologías utilizadas en este proyecto son Node.js para los servicios API, 
MongoDB para la base de datos y Nginx Proxy Manager para el servicio de Proxy
inverso.
### **Instrucciones** 🧾
1. Lo primero que se realiza es ubicarse en la carpeta donde haya clonado este
repositorio.
2. Al estar en la carpeta, debe abrir la consola de su dispositivo (CMD en Windows)
desde el directorio actual. Otra opción sería accediendo a la carpeta desde la consola.
3. En la consola, ejecute el comando *docker-compose up*, lo cual ejecutará el sistema completo. 
Si desea que la consola no se muestre, agregue la opción *-d* al final del comando anterior.
4. Para validar el estado de los servicios, puede realizar una solicitud *GET* a la dirección
*http://localhost/api/(servicio)/health*. En el campo (servicio) puede reemplazar con el servicio que desee
probar (users o tasks). Para el primero, la dirección sería *http://localhost/api/users/health*.
