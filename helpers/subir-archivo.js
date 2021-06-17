const path = require('path');
const { v4: uuidv4 }= require('uuid');


const subirArchivo = ( files, extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif' ], storageDir = '' ) => {

    return new Promise( (resolve, reject) => {
        const { archivo } = files;
    
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];
    
        // Validar la extension
        if ( !extensionesValidas.includes( extension ) ){
            return reject(`La extensión ${ extension } no es permitida, use archivos: ${ extensionesValidas }`);
        }
    
        // Creación del id unico de imagen
        const nombreTemporal = uuidv4() + '.' + extension;

        
        // Almacenamiento del archivo
        const uploadPath = path.join( __dirname, '../uploads/', storageDir, nombreTemporal);
        archivo.mv(uploadPath, (err) => {
            if (err) { reject( res.status(500).json({ err }) ); }
    
            resolve( nombreTemporal );
        });

    });


}



module.exports = {
    subirArchivo
}


