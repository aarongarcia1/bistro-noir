# Bistro Noir

**Proyecto conceptual del portfolio de VELORA Creative Studio: web para un restaurante ficticio de alta cocina.**

🔗 Web publicada: <https://aarongarcia1.github.io/bistro-noir/>

> **Aviso:** Bistro Noir es un **restaurante ficticio** y **no es un cliente real**. Esta web es un **proyecto conceptual del portfolio de VELORA Creative Studio**.
> La dirección, el teléfono, el correo, los horarios, el nombre del chef y los perfiles sociales son datos de ejemplo.
> El formulario de reserva no envía información a ningún sitio.

---

## Sobre el proyecto

Bistro Noir es una web *one-page* pensada para mostrar a restaurantes, cafeterías y pequeños negocios
el nivel de diseño que VELORA Creative Studio puede ofrecer: estética editorial, fotografía grande,
tipografía cuidada y animaciones sutiles, sin plantillas ni dependencias externas de pago.

### Secciones

| Sección | Contenido |
|---|---|
| Inicio | Imagen a pantalla completa, titular animado y llamadas a la acción |
| Nosotros | Filosofía del restaurante, datos clave y composición fotográfica |
| Carta | Tres platos con foto, descripción y precio; en escritorio la foto cambia al pasar el ratón o con el teclado |
| Experiencia | Imagen panorámica con efecto parallax suave, cita y galería (barra, bodega, mesa) |
| Reservas y contacto | Dirección, contacto, horario y formulario de reserva de demostración con validación |
| Footer | Navegación secundaria, redes de ejemplo y aviso de proyecto ficticio |

### Tecnología

- **HTML5, CSS3 y JavaScript** puro: sin frameworks, sin librerías, sin pasos de compilación.
- **Google Fonts** (Cormorant Garamond y DM Sans): gratuitas, sin registro.
- Imágenes de **Unsplash** (licencia gratuita), optimizadas en **WebP** y en varios tamaños (`srcset`).

### Identidad visual

| Uso | Color |
|---|---|
| Negro carbón (fondo) | `#111111` |
| Dorado (acentos) | `#C6A66B` |
| Blanco cálido (texto) | `#F4F0E8` |
| Gris oscuro (secciones alternas) | `#191919` |
| Gris secundario (textos de apoyo) | `#AAAAAA` |

Títulos en *Cormorant Garamond*, textos en *DM Sans*. Paleta y tipografías de la identidad de VELORA Creative Studio.

### Calidad

- **Responsive**: probado a 360 px (móvil), 768 px (tablet) y 1280–1440 px (escritorio).
- **Accesibilidad**: enlace «Saltar al contenido», foco visible, navegación completa con teclado,
  menú móvil con cierre por `Esc`, textos alternativos en todas las imágenes, errores del formulario anunciados
  a lectores de pantalla y animaciones desactivadas si el usuario lo pide (`prefers-reduced-motion`).
- **Rendimiento**: carga diferida de imágenes, precarga de la imagen principal y ningún JavaScript externo.
- **SEO básico**: título y descripción, etiquetas Open Graph, HTML semántico con un único `h1`.

---

## Estructura de archivos

```
bistro-noir/
├── index.html            Página completa (estructura, contenido, SEO)
├── style.css             Estilos: colores, tipografía, componentes y responsive
├── script.js             Menú móvil, animaciones, carta interactiva y formulario
├── README.md             Este documento
├── .nojekyll             Indica a GitHub Pages que publique los archivos tal cual
└── assets/
    ├── favicon.svg       Icono de la pestaña del navegador
    └── images/           22 fotografías (WebP en varios tamaños + og-image.jpg)
```

Todas las rutas son **relativas** (`style.css`, `assets/images/...`), por lo que la web funciona
igual en tu ordenador y en GitHub Pages.

---

## Ver la web en tu ordenador (Ubuntu / Linux)

1. Abre una terminal (`Ctrl + Alt + T`).
2. Entra en la carpeta del proyecto (cambia la ruta si la tienes en otro sitio):
   ```bash
   cd ~/Documents/Dinero/bistro-noir
   ```
3. Arranca un servidor local (Python viene instalado en Ubuntu):
   ```bash
   python3 -m http.server 8000
   ```
4. Abre <http://localhost:8000> en el navegador.
5. Para pararlo, vuelve a la terminal y pulsa `Ctrl + C`.

---

## Publicar en Internet con GitHub Pages (gratis)

### Paso 1 · Crear una cuenta en GitHub

Entra en <https://github.com/signup> y crea una cuenta gratuita.
Apunta tu **nombre de usuario**: forma parte de la dirección de tu web.

### Paso 2 · Instalar y configurar Git (solo la primera vez)

```bash
sudo apt update
sudo apt install git
```

Dile a Git quién eres (usa el mismo correo que en GitHub):

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
```

### Paso 3 · Crear el repositorio en GitHub

1. En GitHub, arriba a la derecha, pulsa **+ → New repository**.
2. **Repository name**: `bistro-noir`
3. Marca **Public** (GitHub Pages gratuito necesita un repositorio público).
4. **No** marques «Add a README file» (ya tenemos uno).
5. Pulsa **Create repository**.

### Paso 4 · Crear un token de acceso

GitHub ya no acepta tu contraseña normal desde la terminal. Necesitas un *token*:

1. En GitHub: foto de perfil → **Settings → Developer settings → Personal access tokens → Tokens (classic)**.
2. **Generate new token (classic)**. Ponle un nombre (por ejemplo «Ubuntu»), una caducidad y marca la casilla **repo**.
3. Pulsa **Generate token** y **copia el token** (solo se muestra una vez).
   Trátalo como una contraseña: no lo compartas ni lo guardes dentro del proyecto.

### Paso 5 · Subir los archivos

Desde la terminal, dentro de la carpeta del proyecto
(cambia `TU-USUARIO` por tu nombre de usuario de GitHub):

```bash
cd ~/Documents/Dinero/bistro-noir
git init
git add .
git commit -m "Primera versión de Bistro Noir"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/bistro-noir.git
git push -u origin main
```

Cuando pida credenciales:
- **Username**: tu nombre de usuario de GitHub.
- **Password**: pega el **token** del paso 4 (no se ve nada mientras lo pegas; es normal).

Recarga la página del repositorio en GitHub: deberías ver todos los archivos.

> **Alternativa sin terminal:** en el repositorio vacío pulsa **uploading an existing file**,
> arrastra **el contenido** de la carpeta `bistro-noir` (no la carpeta en sí) y pulsa **Commit changes**.

### Paso 6 · Activar GitHub Pages

1. En el repositorio, pulsa **Settings** (pestaña superior).
2. En el menú de la izquierda, pulsa **Pages**.
3. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. En **Branch**, elige `main` y la carpeta `/ (root)`. Pulsa **Save**.
5. Espera 1–2 minutos y recarga la página: aparecerá «Your site is live at…».

### Paso 7 · Tu dirección

```
https://TU-USUARIO.github.io/bistro-noir/
```

Este proyecto está publicado en <https://aarongarcia1.github.io/bistro-noir/>.

> Si quisieras la web en la raíz (`https://TU-USUARIO.github.io/`), el repositorio tendría que llamarse
> exactamente `TU-USUARIO.github.io`. Para una demo de portfolio es mejor `bistro-noir`,
> así puedes tener una carpeta por proyecto.

### Actualizar la web más adelante

Cada vez que cambies algo:

```bash
cd ~/Documents/Dinero/bistro-noir
git add .
git commit -m "Describe aquí el cambio"
git push
```

GitHub Pages se actualiza solo en uno o dos minutos. Si no ves el cambio, recarga con `Ctrl + Shift + R`.

---

## Comprobaciones antes de publicar

- [x] Todas las rutas de CSS, JS e imágenes son relativas y respetan mayúsculas/minúsculas
      (GitHub Pages distingue `Foto.webp` de `foto.webp`).
- [x] Probado servido desde una subcarpeta (`/bistro-noir/`), igual que en GitHub Pages.
- [x] Sin errores en la consola del navegador.
- [x] Sin datos personales, contraseñas ni claves API en el código.
- [x] Las imágenes no contienen metadatos (EXIF/GPS).
- [x] Sin servicios de pago ni dependencias que requieran registro.

### Mejoras opcionales tras publicar

- **Vista previa en redes (WhatsApp, LinkedIn…)**: estas plataformas necesitan una URL completa para la imagen.
  Cuando conozcas tu dirección, cambia en `index.html`:
  ```html
  <meta property="og:image" content="assets/images/og-image.jpg">
  ```
  por:
  ```html
  <meta property="og:image" content="https://TU-USUARIO.github.io/bistro-noir/assets/images/og-image.jpg">
  ```
- **Evitar que Google lo muestre como restaurante real**: si prefieres que la demo no aparezca en buscadores,
  añade en el `<head>`: `<meta name="robots" content="noindex">`.

---

## Convertirla en la web de un cliente real

1. Sustituir textos, precios, fotografías y datos de contacto por los del restaurante.
2. Eliminar los avisos de demostración (bloque `.demo-notice` en Contacto y la línea de demo del footer).
3. Conectar el formulario a un sistema de reservas real (hoy `script.js` solo muestra un mensaje).
4. Enlazar los perfiles sociales reales y añadir un dominio propio si el cliente lo tiene.

---

## Créditos

- Diseño y desarrollo: **VELORA Creative Studio** © 2026. Bistro Noir es un proyecto conceptual, no un cliente real.
- Fotografías: [Unsplash](https://unsplash.com) (licencia Unsplash: uso gratuito, comercial y no comercial).
- Tipografías: [Google Fonts](https://fonts.google.com) (SIL Open Font License).
