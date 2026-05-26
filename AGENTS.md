# Pandora Mall — Roadmap del Proyecto

## Stack Tecnológico

- **React 18** + **Vite 6** + **JavaScript (JSX)**
- **React Three Fiber** + **Three.js** + **Drei** + **Rapier**
- **Redux Toolkit** + **React Router v7**
- **Bootstrap 5** + **SASS** (Dart Sass)
- **Axios** para API
- **Vitest** + **React Testing Library**
- **CSS Modules** (`.module.scss`)

---

## Fase 1 — Fundación + Mall 3D básico

### Setup y Configuración
- [x] Inicializar proyecto Vite + React 18
- [x] Estructura de carpetas feature-based
- [x] Configurar SASS (Dart Sass) con Vite
- [x] Configurar path alias `@/`
- [x] Crear `.env` con `VITE_API_URL`
- [x] Configurar ESLint
- [x] Crear `.gitignore`

### Sistema de Estilos Bootstrap + SASS
- [x] `_variables.scss` con overrides de Bootstrap (paleta dark/neón)
- [x] `_mixins.scss` — mixins personalizados
- [x] `_functions.scss` — funciones SASS útiles
- [x] `_reset.scss` — reset básico
- [x] `_typography.scss` — tipografía global
- [x] `_bootstrap-overrides.scss` — overrides de componentes Bootstrap
- [x] `main.scss` — entry point que importa todo + Bootstrap

### API Client
- [x] `axiosInstance.js` — instancia configurada con interceptors
- [x] `authApi.js` — endpoints de autenticación
- [x] `productsApi.js` — endpoints de productos
- [x] `storesApi.js` — endpoints de tiendas

### Redux Store
- [x] `store/index.js` — configuración del store
- [x] `uiSlice.js` — modo oscuro, loading, modals
- [x] `mallSlice.js` — posición avatar, escena, tiendas
- [x] `authSlice.js` — autenticación (estructura básica)
- [x] `cartSlice.js` — carrito de compras

### Componentes UI
- [x] `Button` — botón reutilizable con variantes
- [x] `Card` — contenedor con header/body/footer
- [x] `Spinner` — indicador de carga
- [x] `Modal` — ventana modal

### Layout
- [x] `Header` — barra de navegación superior
- [x] `Footer` — pie de página
- [x] `MainLayout` — layout principal con Header/Footer/Outlet

### Router
- [x] `AppRouter` — configuración de rutas con lazy loading
- [x] Ruta `/` → HomePage
- [x] Ruta `/mall` → VirtualMallPage (escena 3D)
- [x] Ruta `/catalog` → CatalogPage
- [x] Ruta `/cart` → CartPage
- [x] Ruta `/auth` → AuthPage
- [x] Ruta `*` → NotFoundPage

### Escena 3D (R3F)
- [x] `Scene` — Canvas + luces + cámara
- [x] `Ground` — piso con grid
- [x] `MallStructure` — estructura básica del mall (paredes, pasillos)
- [x] `StoreBox` — tienda como caja 3D interactiva
- [x] `Avatar` — figura básica del jugador (capsule/cube)
- [x] `Controls` — movimiento WASD + rotación
- [x] Colisiones básicas con Rapier

### Páginas
- [x] `HomePage` — landing con llamado a entrar al mall
- [x] `VirtualMallPage` — escena 3D completa con HUD
- [x] `CatalogPage` — listado de productos con filtros
- [x] `CartPage` — resumen del carrito

### Testing
- [x] Configurar Vitest con jsdom + React Testing Library
- [x] Test de `uiSlice`
- [x] Test de `Button` component
- [x] Test de `cartSlice`

---

## Fase 2 — Usuarios y Avatares

- [ ] Autenticación (login/registro) con API real
- [ ] Formularios con validación
- [ ] Protección de rutas
- [ ] Selección de avatar (color, forma, accesorios)
- [ ] Perfil de usuario
- [ ] Persistencia de sesión (localStorage + Redux persist)
- [ ] Tests de auth flow

---

## Fase 3 — Tiendas y Productos

- [ ] Modelos 3D reales (.glb/.gltf) para tiendas
- [ ] Animaciones (puertas abriéndose, luces)
- [ ] Vista detalle de producto con imágenes
- [ ] Carrito completo (añadir, quitar, cantidades)
- [ ] Checkout paso a paso
- [ ] Confirmación de orden
- [ ] Tests de flujo de compra

---

## Fase 4 — Interacción Multiusuario

- [ ] Socket.io — conexión en tiempo real
- [ ] Presencia de usuarios en el mall
- [ ] Avatares de otros usuarios visibles en 3D
- [ ] Movimiento sincronizado de avatares
- [ ] Chat básico por proximidad
- [ ] Salas por tienda (usuarios en misma tienda)

---

## Fase 5 — Escalado y Producción

- [ ] Múltiples tiendas configurables
- [ ] Dashboard para administradores de tienda
- [ ] Pasarela de pago real (Stripe/PayPal)
- [ ] Optimización de rendimiento 3D (instancing, LOD)
- [ ] PWA (offline, service workers)
- [ ] Despliegue (Docker + CI/CD)
- [ ] Tests E2E (Playwright/Cypress)

---

## Convenciones del Proyecto

| Regla | Estándar |
|-------|----------|
| Nombrado componentes | PascalCase |
| Nombrado funciones/vars | camelCase |
| Nombrado archivos | PascalCase para componentes, camelCase para utils |
| Estilos | CSS Modules (`.module.scss`) |
| Tests | `Nombre.test.jsx` junto al componente |
| API | Axios instance con interceptors |
| Bootstrap overrides | Solo vía `_variables.scss`, nunca modificar source |
| Estado global | Redux Toolkit slices en `store/slices/` |
| Commits | Conventional commits |
| Imports | 1: React/librerías, 2: locales, 3: estilos |

### Paleta de Color (Dark/Neón — Futuristic Mall)

```scss
// Definida en _variables.scss
$primary:   #6c5ce7;   // Púrpura neón
$secondary: #00cec9;   // Cian/Turquesa
$accent:    #fd79a8;   // Rosa neón
$dark:      #0a0a1a;   // Fondo oscuro
$surface:   #1a1a2e;   // Superficie de tarjetas
$text:      #dfe6e9;   // Texto claro
$success:   #00b894;
$warning:   #fdcb6e;
$danger:    #d63031;
$info:      #74b9ff;
```
