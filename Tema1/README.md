# Lienzo Didáctico - Arquitectura de Computadores

## 📋 Descripción

Este lienzo didáctico interactivo es una herramienta educativa diseñada para facilitar la enseñanza de los **Fundamentos de la Arquitectura de Computadores** en el contexto del curso de Estructura de Computadores de la UNIR.

## 🎯 Objetivos

- **Visualizar conceptos complejos** de arquitectura de computadores de forma clara y atractiva
- **Facilitar la comprensión** de la taxonomía de Flynn y los niveles de paralelismo
- **Mostrar la evolución** de las arquitecturas y su relación con la tecnología
- **Proporcionar una herramienta interactiva** para el aprendizaje activo

## 🚀 Características Principales

### ✨ Interactividad
- **Navegación fluida** entre secciones temáticas
- **Elementos clickeables** con información detallada
- **Animaciones suaves** y transiciones visuales
- **Simulaciones dinámicas** (pipeline, contadores)

### 📱 Diseño Responsivo
- **Adaptable a cualquier dispositivo** (desktop, tablet, móvil)
- **Interfaz moderna** con gradientes y efectos visuales
- **Tipografía clara** y legible
- **Colores contrastantes** para mejor accesibilidad

### 🎓 Contenido Educativo
- **5 secciones principales** organizadas lógicamente
- **Diagramas interactivos** y visualizaciones
- **Ejemplos prácticos** y casos de uso
- **Información contextual** con tooltips y notificaciones

## 📂 Estructura del Proyecto

```
Tema1_Lienzo/
├── index.html          # Archivo principal del lienzo
├── styles.css          # Estilos y diseño visual
├── script.js           # Funcionalidades interactivas
├── README.md           # Documentación (este archivo)
└── tema1.pdf           # Documento original de referencia
```

## 🎮 Cómo Usar el Lienzo

### 1. **Navegación Principal**
- Utiliza los botones de navegación en la parte superior
- Cada botón corresponde a una sección temática específica
- Las secciones se cargan dinámicamente con animaciones suaves

### 2. **Secciones Disponibles**

#### 🔧 **Fundamentos**
- Definición de arquitectura de computadores
- Evolución histórica de la definición (1964-2024)
- Niveles de descripción del computador (Blaaw, Bell & Newell, Levy, Tanenbaum)
- Modelo integrador de siete niveles (Figura 1)
- Conceptos para interpretar el modelo (Estructura, Organización, Descripción Funcional)
- Tipos de arquitectura (concreta vs abstracta)

#### 📈 **Evolución**
- Factores que influyen en la evolución
- Métricas de rendimiento (NI × CPI × T)
- Ley de Moore y su impacto

#### 🔗 **Paralelismo**
- Definición y beneficios del paralelismo
- Técnicas fundamentales (replicación y pipeline)
- Niveles de paralelismo

#### 🏗️ **Taxonomía Flynn**
- Clasificación Flynn (SISD, SIMD, MISD, MIMD)
- Tipos de paralelismo (Datos vs Funcional)
- Niveles de paralelismo funcional (Instrucción, Bucle/Hebra, Procedimiento, Programa)
- Configuraciones MIMD (multiprocesadores, multicomputadores)

#### ⚡ **Prestaciones**
- Factores tecnológicos (densidad, almacenamiento, frecuencia)
- Limitaciones tecnológicas (calor, energía, límites físicos)
- Evolución de aplicaciones y mercado (científica, comunicación, móviles)
- Evolución histórica del mercado

### 3. **Elementos Interactivos**

#### 🎯 **Modelos de Niveles**
- Haz clic en cualquier modelo para ver información detallada
- Aparecerá una notificación con explicación específica de cada autor
- **Modelo de Siete Niveles**: Haz clic en cada nivel para ver su descripción detallada

#### 📊 **Matriz de Flynn**
- Interactúa con cada tipo de arquitectura
- Información detallada de cada clasificación
- **Tipos de Paralelismo**: Haz clic para ver diferencias entre paralelismo de datos y funcional
- **Niveles de Granularidad**: Explora los diferentes niveles de paralelismo funcional

#### 📈 **Evolución Histórica**
- **Definición de Arquitectura**: Haz clic en cada período para ver detalles históricos
- **Conceptos del Modelo**: Interactúa con Estructura, Organización y Descripción Funcional

#### 🔧 **Factores Tecnológicos**
- Información detallada sobre cada factor de rendimiento
- Explicaciones de limitaciones tecnológicas
- Impacto de aplicaciones y mercado en la evolución

### 4. **Controles de Teclado**
- **Flechas**: Navegar entre secciones
- **F11**: Activar modo presentación
- **Enter/Espacio**: Activar elementos interactivos

## 🎨 Características de Diseño

### Paleta de Colores
- **Primario**: Azul (#667eea) - Representa tecnología y confianza
- **Secundario**: Púrpura (#764ba2) - Complementa el azul
- **Éxito**: Verde (#28a745) - Para elementos positivos
- **Advertencia**: Rojo (#dc3545) - Para limitaciones

### Tipografía
- **Fuente principal**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Jerarquía clara** con diferentes tamaños y pesos

### Efectos Visuales
- **Gradientes** para fondos y elementos destacados
- **Sombras** para profundidad y separación
- **Transiciones suaves** para mejor experiencia de usuario
- **Hover effects** para feedback visual

## 🔧 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para fuentes y iconos)

### Instalación Local
1. Descarga todos los archivos del proyecto
2. Abre `index.html` en tu navegador
3. ¡Listo! El lienzo está listo para usar

### Uso en Clase
1. **Presentación**: Usa el modo presentación (F11) para pantalla completa
2. **Navegación**: Utiliza las flechas del teclado para cambiar secciones
3. **Interacción**: Invita a los estudiantes a hacer clic en elementos
4. **Discusión**: Usa las visualizaciones como punto de partida para debates

## 📚 Contenido Educativo Detallado

### Fundamentos de Arquitectura
- **Definición**: Estructura que un programador debe conocer
- **Evolución Histórica**: Desde 1964 (IBM S/360) hasta la definición moderna
- **Niveles**: Modelos de descripción de Blaaw (1970), Bell & Newell (1971), Levy (1978) y Tanenbaum (1986)
- **Modelo Integrador**: Siete niveles de abstracción (Figura 1) combinando perspectivas estructurales y funcionales
- **Conceptos Clave**: Estructura, Organización y Descripción Funcional
- **Tipos**: Arquitectura concreta (física) vs abstracta (funcional)

### Evolución y Prestaciones
- **Factores de Evolución**: Interacción entre arquitectura, tecnología, aplicaciones y mercado
- **Métricas de Rendimiento**: NI (instrucciones), CPI (ciclos), T (tiempo de ciclo)
- **Ley de Moore**: Duplicación de transistores cada 18-24 meses
- **Factores Tecnológicos**: Densidad de integración, capacidad de almacenamiento, frecuencia
- **Limitaciones**: Disipación de calor, consumo de energía, límites físicos
- **Impacto de Aplicaciones**: Computación científica, comunicación global, dispositivos móviles

### Paralelismo en Arquitecturas
- **Definición**: Uso simultáneo de recursos para mejorar rendimiento
- **Técnicas Fundamentales**: Replicación de elementos y segmentación de cauce (pipelining)
- **Niveles de Paralelismo**: Instrucción, datos, tarea y programa

### Taxonomía de Flynn
- **Clasificación**: SISD, SIMD, MISD, MIMD según flujos de instrucciones y datos
- **Paralelismo de Datos**: Misma función, diferentes datos (SIMD)
- **Paralelismo Funcional**: Diferentes funciones en paralelo (MIMD)
- **Niveles de Granularidad**: Instrucción (fina), Bucle/Hebra (fina-media), Procedimiento (media), Programa (gruesa)
- **Configuraciones MIMD**: Multiprocesadores (memoria compartida) y multicomputadores (memoria distribuida)

### Evaluación de Prestaciones
- **Factores**: Densidad, almacenamiento, frecuencia
- **Limitaciones**: Calor, energía, límites físicos
- **Mercado**: Evolución de aplicaciones y tecnologías

## 🎯 Casos de Uso

### Para Profesores
- **Presentación en clase**: Usar como material de apoyo visual
- **Explicación de conceptos**: Utilizar diagramas interactivos
- **Evaluación**: Usar como herramienta de repaso
- **Investigación**: Base para proyectos y trabajos

### Para Estudiantes
- **Aprendizaje autónomo**: Explorar conceptos a su ritmo
- **Repaso**: Reforzar conocimientos adquiridos
- **Comprensión visual**: Mejorar entendimiento de conceptos abstractos
- **Preparación de exámenes**: Herramienta de estudio

## 🔄 Funcionalidades Avanzadas

### Modo Presentación
- Presiona **F11** para activar modo presentación
- Oculta elementos de navegación para pantalla completa
- Ideal para proyección en clase

### Navegación por Teclado
- **Flechas**: Navegar entre secciones
- **Enter/Espacio**: Activar elementos
- **Tab**: Navegar por elementos interactivos

### Accesibilidad
- **Atributos ARIA** para lectores de pantalla
- **Navegación por teclado** completa
- **Contraste adecuado** para mejor legibilidad

## 🛠️ Personalización

### Modificar Contenido
- Edita `index.html` para cambiar texto y estructura
- Modifica `styles.css` para cambiar colores y diseño
- Ajusta `script.js` para añadir nuevas funcionalidades

### Añadir Nuevas Secciones
1. Añade el botón de navegación en el HTML
2. Crea la sección correspondiente
3. Actualiza el JavaScript para la navegación

### Cambiar Colores
- Modifica las variables CSS en `styles.css`
- Los colores principales están definidos al inicio del archivo

## 📊 Estadísticas de Uso

El lienzo incluye funcionalidades para rastrear:
- Secciones más visitadas
- Tiempo de permanencia
- Interacciones realizadas
- Elementos más utilizados

## 🤝 Contribuciones

Para mejorar el lienzo:
1. Identifica áreas de mejora
2. Propón nuevas funcionalidades
3. Sugiere mejoras en el contenido
4. Reporta errores o problemas

## 📄 Licencia

Este proyecto está diseñado para uso educativo en el contexto de la UNIR.

## 📞 Soporte

Para preguntas o sugerencias sobre el lienzo:
- Revisa la documentación en este README
- Consulta el código fuente para entender la implementación
- Contacta al equipo docente del curso

---

**Desarrollado para el curso de Estructura de Computadores - UNIR**
**Tema 1: Fundamentos del Diseño y Evolución de la Arquitectura**
