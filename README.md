# 🏴 Adivina la Bandera

Un juego interactivo para adivinar banderas de países de todo el mundo.

## 🚀 Características

- 🌍 Más de 250 banderas de países usando la API pública de [REST Countries](https://restcountries.com/)
- 💾 Sistema de puntuación guardado en localStorage
- 📊 Tabla de mejores puntuaciones
- 🎯 Sistema de rachas para recompensas consecutivas
- 📱 Diseño responsive y moderno
- ⚡ Construido con Vite + TypeScript

## 🛠️ Tecnologías

- **Vite** - Build tool ultra rápido
- **TypeScript** - Tipado estático para mayor robustez
- **REST Countries API** - API pública de información de países
- **LocalStorage** - Persistencia de datos en el navegador
- **CSS3** - Estilos modernos y animaciones

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

## 🎮 Cómo Jugar

1. Se muestra una bandera aleatoria
2. Selecciona el país correcto entre 4 opciones
3. Gana 10 puntos por cada respuesta correcta
4. Mantén tu racha para demostrar tus conocimientos
5. Compite contra tus mejores puntuaciones

## 📁 Estructura del Proyecto

```
adivina-la-bandera/
├── src/
│   ├── main.ts          # Punto de entrada
│   ├── game.ts          # Lógica principal del juego
│   ├── api.ts           # Integración con REST Countries API
│   ├── storage.ts       # Gestión de localStorage
│   ├── types.ts         # Tipos TypeScript
│   └── style.css        # Estilos globales
├── index.html           # HTML principal
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración TypeScript
└── vite.config.ts       # Configuración Vite
```

## 🌟 Características del Código

- **Arquitectura modular**: Separación clara de responsabilidades
- **Tipado fuerte**: Uso completo de TypeScript
- **API REST**: Integración con API externa
- **Persistencia local**: Gestión de datos con localStorage
- **Responsive**: Adaptable a cualquier tamaño de pantalla

## 📄 Licencia

MIT

---

Desarrollado con ❤️ usando Vite + TypeScript
