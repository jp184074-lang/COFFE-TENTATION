COFFE TENTATION — PROYECTO WEB

CONTENIDO
- index.html: estructura de la página.
- styles.css: diseño adaptable a celulares y computadores.
- app.js: catálogo, filtros, buscador, carrito, puntos y formulario.
- manifest.webmanifest e icon.svg: datos e icono de la PWA.
- service-worker.js: caché básica para visitas posteriores.

CÓMO PROBAR EN EL COMPUTADOR
1. Descomprime la carpeta.
2. Abre index.html en un navegador para revisar el diseño.
3. Para probar la instalación PWA, sirve la carpeta desde localhost (por ejemplo, con la extensión Live Server de VS Code). Las PWA requieren HTTPS o localhost; abrir el archivo directamente no activa el service worker.
4. Revisa el menú, agrega productos, cambia cantidades y confirma el pedido simulado.

INSTALACIÓN EN CELULARES
- Android: publica la carpeta en un hosting HTTPS y abre el sitio en Chrome. Usa el menú del navegador y selecciona "Instalar aplicación" o "Añadir a pantalla de inicio".
- iPhone: publica la carpeta en un hosting HTTPS, abre el sitio en Safari, pulsa Compartir y selecciona "Añadir a pantalla de inicio".

IMPORTANTE
- Los productos, precios y pedidos son de ejemplo.
- No hay pagos reales, pasarela de pago ni envío real de pedidos.
- El carrito, puntos y mensajes se guardan localmente en el navegador mediante localStorage. No se envían a un negocio ni se sincronizan entre dispositivos.
- Las fotografías del catálogo son ilustrativas y se cargan desde Unsplash; requieren conexión a internet.
- El correo usa el dominio reservado .example y no recibe mensajes.
- Para convertirlo en servicio real se necesitarían backend, base de datos, gestión segura de pedidos y un proveedor de pagos. No guardar datos de tarjetas en esta página.
