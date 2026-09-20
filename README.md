# Buenas Prácticas Pastelería

Aplicación externa e independiente de Cusachs Hub.

## Publicación
1. Sube todos estos archivos al repositorio `buenas-practicas-pasteleria`.
2. En GitHub: Settings → Pages.
3. En Source selecciona **GitHub Actions**.
4. La acción `Deploy GitHub Pages` compilará y publicará la aplicación.

## Importante
Esta primera versión independiente NO está conectada a Cusachs Hub ni a su Supabase.
Los registros se guardan localmente en el navegador del dispositivo mediante localStorage.
Así se mantiene la separación total solicitada.

## Siguiente fase
Crear un Supabase nuevo exclusivo para esta aplicación y migrar allí documentos/registros
que deban compartirse entre dispositivos o conservarse centralmente.
