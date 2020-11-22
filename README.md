Uso de node version : v10.15.3

IMPORTANTE
- Si se desea probar de una la app sin comandos ni nada, se puede usar la versión compilada que está dentro de la carpeta dist y probar de esta manera, suponiendo que el frontend este dentro de una carpeta llamada frontend
    http://localhost/projects/tests/frontend/dist

- Se debe verificar el index.html dentro de dist, la ruta relativa se debe poner en <base> comenzando con / y terminando con /

- Verificar en main.55ba1a4b0b3950045c10.js el dominio de la api buscando http://localhost/projects/tests/api/public/api/ en el archivo, y sustiuir por la ruta real del backend en su equipo
    

PRUEBA USANDO COMANDOS DE DESARROLLO HABITUALES

- Comnandos para probar en navegador
    npm install --save 
    npm rebuild node-sass
    ng serve

    NOTA:
        Probado en la versión v10.15.3 (las más estable para las librerias)

- Verificar en src/index.html el valor de <base> , debe apuntar a /
- Verificar en src/app/config/routes el dominio de la api, de acuerdo a donde se instale, se debe modificar esta variable, nótese en el ejemplo que ya existe que la ruta es hasta el último segmento previo a los parámetros dinámicos de la api:
    http://localhost/projects/tests/api/public/api

    En mi servidor hay en la raiz una carpeta llamada projects, dentro otra llamada test que a su vez contiene la api como tal. Por último public/api son segmentos que pide la api para comenzar a llamar a lasrutas, la api no está optimizada con htaccess para evadir estas dos ultimos segmentos