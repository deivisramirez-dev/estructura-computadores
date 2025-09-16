# Tema 8: Procesadores Vectoriales

## 📚 Descripción

Este lienzo didáctico interactivo presenta el **Tema 8: Procesadores Vectoriales** del curso de Estructura de Computadores de la Universidad Internacional de La Rioja (UNIR). El tema se centra en las arquitecturas SIMD (Single Instruction, Multiple Data) y el procesamiento paralelo de datos vectoriales.

## 🎯 Objetivos de Aprendizaje

Al finalizar este tema, el estudiante será capaz de:

- **Comprender** los conceptos fundamentales de los procesadores vectoriales
- **Identificar** las ventajas del procesamiento vectorial sobre el escalar
- **Analizar** la arquitectura de un procesador vectorial básico
- **Evaluar** el rendimiento de procesadores vectoriales
- **Aplicar** técnicas de optimización vectorial

## 📖 Contenido del Tema

### 1. Introducción a los Procesadores Vectoriales
- **Definición**: Arquitecturas SIMD para procesamiento paralelo
- **Motivación**: Ventajas del procesamiento vectorial
- **Evolución histórica**: Desde CRAY-1 hasta procesadores modernos
- **Ejemplos prácticos**: Operaciones vectoriales básicas

### 2. Arquitectura Vectorial y Prestaciones
- **Componentes principales**:
  - Unidad escalar
  - Unidad vectorial
  - Unidad LOAD/STORE
- **Procesador DLXV**: Modelo didáctico de Hennessy & Patterson
- **Parámetros característicos**: MVL, registros, unidades funcionales
- **Conjunto de instrucciones**: Operaciones aritméticas y de memoria

### 3. Sistema de Memoria en Procesadores Vectoriales
- **Entrelazado de memoria**: Tipos superior e inferior
- **Organizaciones de memoria**: Tipo S (simultáneo) y Tipo C (concurrente)
- **Efecto del stride**: Impacto en el rendimiento
- **Optimización de accesos**: Configuraciones eficientes

### 4. Medidas de Rendimiento
- **Fórmula básica**: Tₖ = TLI + k × TPC
- **Técnicas de optimización**:
  - Solapamiento de cauces
  - Encadenamiento de cauces
- **Métricas de prestaciones**:
  - Rₖ (Rendimiento)
  - R∞ (Rendimiento asintótico)
  - N₁/₂ (Punto de eficiencia)
  - E (Eficiencia vectorial)

### 5. Eficiencia del Procesamiento Vectorial
- **Troceado de vectores (Strip Mining)**: Solución para k > MVL
- **Vector máscara (VM)**: Selección condicional de componentes
- **Gather-Scatter**: Acceso a arrays con índices no consecutivos
- **Análisis de sobrecarga**: Fórmula completa de tiempo de ejecución

### 6. Ejemplos Prácticos
- **Suma de vectores**: Comparación escalar vs vectorial
- **Producto escalar**: Implementación vectorial
- **Simulador de rendimiento**: Herramienta interactiva
- **Aplicaciones típicas**: Cálculo científico, procesamiento de imágenes

## 🛠️ Características Técnicas

### Funcionalidades Interactivas
- **Calculadora de rendimiento**: Cálculo automático de métricas
- **Simulador vectorial**: Visualización de eficiencia por strips
- **Gráficos dinámicos**: Chart.js para visualizaciones
- **Navegación fluida**: Entre secciones del tema

### Herramientas de Aprendizaje
- **Ejemplos de código**: Comparaciones escalar vs vectorial
- **Fórmulas interactivas**: Cálculos en tiempo real
- **Visualizaciones**: Diagramas y gráficos explicativos
- **Casos de uso**: Aplicaciones reales

## 🎮 Cómo Usar

### Navegación
- **Secciones**: Utiliza los botones de navegación para moverte entre temas
- **Atajos de teclado**:
  - `1-6`: Navegación rápida entre secciones
  - `←/→`: Navegación con flechas
  - `Ctrl+D`: Cambiar tema
  - `F11`: Pantalla completa

### Calculadoras
- **Calculadora de rendimiento**: Ajusta los parámetros TLI, TPC y longitud del vector
- **Simulador**: Modifica la longitud del vector y MVL para ver el impacto

### Ejemplos Interactivos
- **Código vectorial**: Compara implementaciones escalares y vectoriales
- **Métricas**: Observa cómo cambian las métricas con diferentes parámetros

## 📊 Métricas y Fórmulas

### Tiempo de Ejecución
```
Tₖ = TLI + k × TPC
```
- **TLI**: Tiempo de latencia (arranque)
- **k**: Número de componentes del vector
- **TPC**: Tiempo por componente

### Rendimiento
```
Rₖ = (Operaciones × k) / Tₖ
```

### Eficiencia Vectorial
```
E = Rₖ / R∞
```

### Fórmula Completa (con sobrecarga)
```
Tₖ = Tₘₐₑ + ⌈k/MVL⌉ × (Tₘᵤₑₗₑ + TLI) + k × TPC
```

## 🔧 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexión a internet (para Chart.js y Font Awesome)

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/unir/estructura-computadores-lienzo.git

# Navegar al tema
cd estructura-computadores-lienzo/Tema8

# Servir localmente
python -m http.server 8000
# o
npx http-server -p 8000
```

### Uso con Live Server (VS Code)
1. Instala la extensión "Live Server"
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

## 📚 Referencias Bibliográficas

- **Hennessy, J. y Patterson, D. (2002)**. Arquitectura de Computadores: Un enfoque cuantitativo. Madrid: McGraw-Hill.
- **Ortega, J., Anguita, M. y Prieto, A. (2005)**. Arquitectura de computadores. Madrid: Thomson.

## 🎯 Casos de Uso

### Para Estudiantes
- **Aprendizaje autónomo**: Explorar conceptos a su ritmo
- **Refuerzo**: Reforzar conocimientos teóricos
- **Comprensión visual**: Mejorar entendimiento con ejemplos interactivos
- **Preparación de exámenes**: Herramienta de estudio y repaso

### Para Docentes
- **Presentaciones**: Modo pantalla completa para clases
- **Ejemplos en vivo**: Demostrar conceptos con calculadoras
- **Evaluación**: Verificar comprensión con simuladores

## 🎨 Características de Diseño

- **Paleta de colores**: Azul (#2563eb) y púrpura (#7c3aed)
- **Tipografía**: Inter con diferentes pesos
- **Efectos visuales**: Gradientes, sombras, transiciones suaves
- **Responsividad**: Adaptable a desktop, tablet y móvil
- **Accesibilidad**: Navegación por teclado y atributos ARIA

## 🔮 Futuras Mejoras

- **Más simulaciones**: Ejemplos adicionales de procesamiento vectorial
- **Gamificación**: Elementos de juego para engagement
- **Ejercicios interactivos**: Problemas para resolver
- **Integración con laboratorios**: Conexión con herramientas de simulación

## 📞 Soporte

Para preguntas o sugerencias sobre este tema:
- Revisa la documentación en este README
- Consulta el código fuente para entender la implementación
- Contacta al equipo docente del curso

---

**Desarrollado por el equipo docente de UNIR para el curso de Estructura de Computadores**

*Última actualización: Diciembre 2024*
