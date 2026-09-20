# Buenas Prácticas Pastelería
Aplicación independiente de Cusachs Hub, conectada a un proyecto Supabase propio.

## Publicación
En GitHub: Settings → Pages → Source → **GitHub Actions**.

## Seguridad
La publishable key de Supabase puede estar en el frontend. No incluir nunca service_role/secret keys.
La configuración SQL inicial permite acceso anónimo temporalmente para la puesta en marcha.
Antes de uso con datos sensibles se debe activar autenticación y restringir RLS.
