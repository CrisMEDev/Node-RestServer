# **Rest Server**

Implementación de un rest server con sus diferentes endpoints

### **Configuraciones necesarias**

* Recordar reconstruir los módulos de node con ``` npm install ```

* Crear el archivo .env en el directorio raíz del proyecto y asignar:
    * El puerto a usar
    * El enlace para la conexión a la base de datos en la nube
    * El password firma para el JWT
    * Key de google necesaria para obtener los tokens y datos necesarios por inició de sesión

Ejemplo:
```
PORT=8080
MONGODB_CNN=mongodb+srv://{MyUserName}:{MyPassword}@miclustercafe.noxip.mongodb.net/mydbcrisme
SECRETORPRIVATEKEY=MyUltraSecretPassword
GOOGLE_CLIENT_ID=MyAwesomeGoogleID
```

* No olvidar agregar las ip de conexión deseadas a la lista blanca de la base de datos de mongo

### **Documentación usada**

[Express](https://www.npmjs.com/package/express)

[Dotenv](https://www.npmjs.com/package/dotenv)

[CORS](https://www.npmjs.com/package/cors)

[Mongoose](https://mongoosejs.com/)

[bcryptjs](https://www.npmjs.com/package/bcryptjs)

[express-validator](https://www.npmjs.com/package/express-validator)

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

[express-fileupload](https://www.npmjs.com/package/express-fileupload)

[uuid](https://www.npmjs.com/package/uuid)

[Integrating Google Sign-In into your web app](https://developers.google.com/identity/sign-in/web/sign-in)
