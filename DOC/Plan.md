# Pandora Mall — Plan de Implementación

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Build Tool | Vite | ^6.x |
| UI Framework | React | ^18.3 |
| Lenguaje | JavaScript (JSX) | ES2022+ |
| 3D Engine | React Three Fiber + Three.js | ^8.x / ^0.170 |
| 3D Helpers | @react-three/drei | ^9.x |
| Física 3D | @react-three/rapier | ^1.x |
| Estado Global | Redux Toolkit | ^2.x |
| Routing | React Router DOM | ^7.x |
| Estilos | Bootstrap + SASS | ^5.3 / ^1.80 |
| CSS Modules | .module.scss | nativo Vite |
| API Client | Axios | ^1.7 |
| Testing | Vitest + React Testing Library | ^2.x / ^16.x |
| Linter | ESLint | ^9.x |

## Estructura de Directorios

```
pandora-mall/
├── DOC/
│   ├── prompt.md              # Instrucciones originales
│   └── Plan.md                # Este documento
├── AGENTS.md                  # Roadmap del proyecto
├── public/
│   └── models/                # Modelos 3D .glb/.gltf
├── src/
│   ├── api/                   # Cliente Axios + endpoints por dominio
│   │   ├── axiosInstance.js
│   │   ├── authApi.js
│   │   ├── productsApi.js
│   │   ├── storesApi.js
│   │   └── avatarApi.js
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── ui/                # Componentes atómicos
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Spinner/
│   │   │   └── Modal/
│   │   └── layout/            # Componentes de layout
│   │       ├── Header/
│   │       ├── Footer/
│   │       └── MainLayout/
│   ├── features/              # Módulos por funcionalidad
│   │   ├── auth/              # Autenticación y perfil
│   │   ├── virtual-mall/      # Escena 3D y navegación
│   │   ├── catalog/           # Catálogo de productos
│   │   ├── store-front/       # Tienda individual
│   │   └── cart/              # Carrito de compras
│   ├── hooks/                 # Custom hooks globales
│   ├── layouts/               # Layout providers
│   ├── pages/                 # Páginas de la aplicación
│   │   ├── HomePage/
│   │   ├── VirtualMallPage/
│   │   ├── CatalogPage/
│   │   ├── CartPage/
│   │   ├── AuthPage/
│   │   └── NotFoundPage/
│   ├── routes/                # Configuración de React Router
│   │   └── AppRouter.jsx
│   ├── store/                 # Redux store
│   │   ├── index.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── cartSlice.js
│   │       ├── mallSlice.js
│   │       └── uiSlice.js
│   ├── styles/                # Estilos globales
│   │   ├── abstracts/
│   │   │   ├── _variables.scss   # Override Bootstrap vars
│   │   │   ├── _mixins.scss
│   │   │   └── _functions.scss
│   │   ├── base/
│   │   │   ├── _reset.scss
│   │   │   └── _typography.scss
│   │   ├── components/
│   │   │   └── _bootstrap-overrides.scss
│   │   └── main.scss          # Entry point
│   ├── utils/                 # Constantes, helpers
│   ├── App.jsx
│   └── main.jsx
├── tests/                     # Tests de integración
├── .env                       # Variables de entorno
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── vite.config.js
├── vitest.config.js
└── package.json
```

## Sistema de Estilos Bootstrap

### Principios
1. Bootstrap se instala como dependencia normal via npm.
2. Se crea `src/styles/abstracts/_variables.scss` con todas las variables
   personalizadas (colores, tipografía, espaciados, etc.).
3. En `main.scss` se importa Bootstrap CON LAS VARIABLES OVERRIDE aplicadas
   mediante el mecanismo `@use ... with (...)` de Dart SASS.
4. Cada componente usa CSS Modules (`Componente.module.scss`) para estilos
   encapsulados.
5. Para personalizar componentes Bootstrap se usa `_bootstrap-overrides.scss`
   con selectores de igual especificidad, sin usar `!important`.

### Flujo de compilación
```
_variables.scss (custom) → Bootstrap (usa nuestras variables) → 
_reset.scss → _typography.scss → _bootstrap-overrides.scss
```

## Arquitectura 3D (React Three Fiber)

### Componentes principales
- **Scene** — Contenedor de la escena R3F con Canvas, luces, cámara
- **Ground** — Piso del mall con grid/textura
- **MallStructure** — Paredes, pasillos, estructura del edificio
- **StoreBox** — Tienda individual (caja 3D con letrero)
- **Avatar** — Figura del jugador (inicialmente geometría básica)
- **Controls** — Movimiento WASD + rotación de cámara
- **MiniMap** — Vista superior del mall (HUD)

### Física
- @react-three/rapier para colisiones y detección de proximidad
- El avatar colisiona con paredes y tiendas
- Trigger zones al acercarse a una tienda

### Cámara
- Tercera persona, sigue al avatar
- Orbital controls limitados (rotación horizontal)
- Zoom in/out con rueda del mouse

## API Client

- Instancia única de Axios con `baseURL` desde `.env`
- Interceptor de request para añadir tokens de autenticación
- Interceptor de response para manejo centralizado de errores
- Módulos por dominio: `authApi.js`, `productsApi.js`, `storesApi.js`

## Testing (Vitest + RTL)

- `vitest.config.js` con entorno jsdom
- Tests unitarios para slices de Redux
- Tests de componentes con React Testing Library
- Tests de integración para flujos críticos
- Testing Library queries: priorizar `getByRole`, `getByLabelText`

## Gestión de Estado (Redux Toolkit)

### Slices
- **uiSlice** — Modo oscuro/claro, sidebar, modals, loading states
- **mallSlice** — Posición del avatar, tiendas cercanas, estado de la escena
- **authSlice** — Usuario actual, token, estado de autenticación
- **cartSlice** — Items del carrito, totales, checkout state

## Fases de Implementación

### Fase 1 — Fundación + Mall 3D básico (Actual)
- Setup del proyecto: Vite, React 18, SASS, Bootstrap, Redux, Router
- Sistema de estilos con overrides de Bootstrap
- Componentes UI básicos
- Layout principal
- Escena 3D con movimiento de avatar
- Catálogo simple conectado a API
- Carrito básico
- Tests iniciales

### Fase 2 — Usuarios y Avatares
- Autenticación (login/register)
- Personalización de avatar
- Perfil de usuario
- Persistencia de sesión

### Fase 3 — Tiendas y Productos
- Modelos 3D reales (.glb)
- Animaciones y efectos visuales
- Carrito completo
- Checkout
- Tests de flujo de compra

### Fase 4 — Interacción Multiusuario
- Socket.io
- Avatares de otros usuarios en tiempo real
- Chat por proximidad
- Salas por tienda

### Fase 5 — Escalado
- Múltiples tiendas con administración
- Dashboard de administradores
- Pasarela de pago
- Optimización 3D
- PWA

## Convenciones de Código

- **Nombrado:** PascalCase para componentes, camelCase para funciones/vars
- **Imports:** Primero React/librerías, luego componentes, luego estilos
- **Exports:** Named exports para componentes, default export para pages
- **Tests:** `Componente.test.jsx` en el mismo directorio del componente
- **Commits:** Conventional commits (feat:, fix:, style:, test:, docs:)
