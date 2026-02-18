
GUÍA DE PUESTA EN PRODUCCIÓN - MENTE EN JUEGO
============================================

Este documento contiene los pasos esenciales para configurar y desplegar la aplicación Next.js + Supabase en un entorno de producción real.

### 1. CONFIGURACIÓN DEL PROYECTO SUPABASE

Tu proyecto actual probablemente utiliza las claves de un proyecto de desarrollo. Para producción, necesitas un proyecto nuevo y dedicado.

1.  **Crear un Nuevo Proyecto en Supabase:**
    *   Ve a [https://database.new](https://database.new).
    *   Crea un nuevo proyecto. Elige una región de base de datos cercana a la mayoría de tus usuarios.
    *   **IMPORTANTE:** Genera y guarda en un lugar seguro la contraseña de la base de datos. La necesitarás para cualquier acceso directo.

2.  **Ejecutar el Esquema SQL:**
    *   Dentro de tu nuevo proyecto de Supabase, ve al "SQL Editor".
    *   Copia y pega **TODO** el código SQL proporcionado en el prompt (la sección `CREATE TABLE` y la sección `ROW LEVEL SECURITY`).
    *   Haz clic en "RUN". Esto creará todas tus tablas y aplicará las políticas de seguridad.

3.  **Verificar RLS (Row Level Security):**
    *   Ve a "Authentication" -> "Policies".
    *   Asegúrate de que para cada tabla (profiles, checkins, etc.) aparezcan las políticas que has creado. Esto es CRÍTICO para la privacidad de los datos. Si no están, vuelve a ejecutar la parte de RLS del script SQL.

### 2. GESTIÓN DE VARIABLES DE ENTORNO (CLAVES SECRETAS)

NUNCA debes subir tus claves de producción a un repositorio de Git. Se configuran directamente en tu proveedor de hosting (Vercel, Netlify, etc.).

Necesitarás las siguientes variables:

*   `NEXT_PUBLIC_SUPABASE_URL`:
    *   **Dónde encontrarla:** En tu proyecto Supabase -> "Project Settings" -> "API".
    *   **Uso:** Es la URL de tu API de Supabase. Es pública y segura de exponer en el navegador.

*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`:
    *   **Dónde encontrarla:** En tu proyecto Supabase -> "Project Settings" -> "API". Es la clave "anon" (pública).
    *   **Uso:** Permite al navegador del usuario realizar peticiones a Supabase. Las políticas RLS se encargan de la seguridad.

*   `GEMINI_API_KEY` (Si vas a implementar la funcionalidad de IA):
    *   **Dónde encontrarla:** En tu dashboard de Google AI Studio.
    *   **Uso:** Es una clave **SECRETA**. Se utiliza en las Server Actions de Next.js para hacer llamadas a la API de Gemini. **NUNCA** debe tener el prefijo `NEXT_PUBLIC_`.
    *   **Configuración:** Añádela solo en las variables de entorno de tu hosting. No la expongas al cliente.

### 3. AJUSTES DE AUTENTICACIÓN EN SUPABASE

Para que el registro y login funcionen correctamente en tu dominio de producción:

1.  **Configurar la URL del Sitio:**
    *   En tu proyecto Supabase -> "Authentication" -> "URL Configuration".
    *   En el campo "Site URL", introduce la URL de tu aplicación en producción (ej: `https://www.menteenjuego.com`).
    *   **¿Por qué es importante?** Cuando Supabase envía un email de confirmación, usará esta URL para construir el enlace de vuelta a tu aplicación. Si no la configuras, los usuarios no podrán confirmar sus cuentas.

2.  **Configurar Redirect URLs:**
    *   En la misma sección, puedes añadir URLs adicionales si tienes varios entornos (ej: una para desarrollo `http://localhost:3000` y otra para producción).

3.  **Desactivar "Enable email confirmations" (Opcional, para pruebas):**
    *   Durante las primeras pruebas, puede ser útil desactivar la confirmación por email para agilizar el registro.
    *   **IMPORTANTE:** Vuelve a activarla antes del lanzamiento oficial para asegurar que los usuarios registran emails válidos.

### 4. DESPLIEGUE DE LA APLICACIÓN (RECOMENDADO: VERCEL)

Vercel es el creador de Next.js y ofrece la mejor integración.

1.  **Crear una cuenta en Vercel:** Ve a [https://vercel.com](https://vercel.com) y regístrate con tu cuenta de GitHub, GitLab o Bitbucket.

2.  **Importar el Proyecto:**
    *   Desde tu dashboard de Vercel, haz clic en "Add New..." -> "Project".
    *   Selecciona el repositorio de Git donde tienes el código de la aplicación.
    *   Vercel detectará automáticamente que es un proyecto Next.js y aplicará la configuración por defecto, que es correcta.

3.  **Configurar las Variables de Entorno:**
    *   En el paso de configuración del proyecto, busca la sección "Environment Variables".
    *   Añade las claves que mencionamos en el punto 2:
        *   `NEXT_PUBLIC_SUPABASE_URL`
        *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
        *   `GEMINI_API_KEY` (si aplica)
    *   Verifica que las claves no tengan espacios extra y que estén correctamente copiadas.

4.  **Desplegar:**
    *   Haz clic en el botón "Deploy".
    *   Vercel construirá y desplegará tu aplicación. En unos minutos, te dará una URL pública donde podrás acceder a ella.

5.  **Configurar Dominio Personalizado (Opcional):**
    *   Una vez desplegado, puedes ir a la pestaña "Domains" en la configuración de tu proyecto en Vercel para añadir tu propio dominio (ej: `www.menteenjuego.com`).

### RESUMEN DE SEGURIDAD

*   Tus variables de entorno **secretas** (como `GEMINI_API_KEY`) solo deben existir en el dashboard de tu proveedor de hosting, NUNCA en el código.
*   La seguridad de los datos de los usuarios depende de que las políticas de **RLS** estén activas en TODAS tus tablas.
*   La URL del sitio en la configuración de Auth de Supabase es **crucial** para el flujo de registro.

¡Siguiendo estos pasos, tendrás tu aplicación funcionando en producción de forma segura y escalable!
