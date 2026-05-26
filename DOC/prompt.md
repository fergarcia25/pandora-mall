# Pandora Mall — Instrucciones del Proyecto

## Requerimientos Generales

Crear una aplicación web escalable y flexible, utilizando React JS y aplicando buenas prácticas
de código con sus test correspondientes.

## Stack Técnico

- **React JS** — Última versión estable (React 18)
- **SASS** — Para JS y archivos .scss
- **Bootstrap 5** — Última versión, modificando su apariencia por defecto con un archivo
  `_variables.scss` donde tengamos todas las variables root y generales para darle una
  apariencia customizada sin modificar ni una línea de los archivos de Bootstrap,
  permitiendo actualizar a futuras versiones sin problema.
- **Misma metodología** con todas las herramientas y frameworks que utilice el proyecto.

## Proyecto

- **Nombre:** Pandora Mall
- **Tipo:** Plataforma interactiva — shopping mall virtual
- **API:** Independiente del código del proyecto, a través de la cual se obtendrán todos
  los datos requeridos.

## Funcionalidades Principales

1. **Espacio Virtual 3D** — Los usuarios podrán ingresar a un mall virtual con un avatar
   para recorrer e interactuar con todo lo que esté dentro del espacio.
2. **Interacción entre usuarios** — Los usuarios podrán interactuar entre sí dentro del
   espacio virtual.
3. **Tiendas** — Los usuarios podrán ingresar a las tiendas existentes en el proyecto
   (mini-ecommerce) y realizar compras.
4. **Motor Visual:** React Three Fiber (R3F) + Three.js
5. **Estado Global:** Redux Toolkit
6. **Testing:** Vitest + React Testing Library

## Metodología de Estilos

- Bootstrap se personaliza exclusivamente vía variables SASS en `_variables.scss`.
- Nunca se modifican los archivos fuente de Bootstrap en `node_modules`.
- Los componentes usan CSS Modules con `.module.scss`.
- Los estilos globales se manejan desde `src/styles/main.scss`.

## Fases de Desarrollo

1. **Fase 1:** Fundación + Mall 3D básico (estructura, estilos, escena 3D, catálogo simple)
2. **Fase 2:** Usuarios y avatares (autenticación, personalización)
3. **Fase 3:** Tiendas y productos (modelos 3D reales, carrito completo, checkout)
4. **Fase 4:** Interacción multiusuario (Socket.io, chat)
5. **Fase 5:** Escalado (múltiples tiendas, dashboard, PWA)

## Convenciones

- Arquitectura feature-based: `src/features/<nombre>/`
- Componentes atómicos reutilizables en `src/components/ui/`
- Tests junto al componente: `Componente.test.jsx`
- API organizada por dominio en `src/api/`
