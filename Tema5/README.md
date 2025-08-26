# Tema 5: Procesadores segmentados

## Descripción

Este canvas didáctico interactivo está diseñado para el estudio de los procesadores segmentados (pipeline) en la asignatura de Estructura de Computadores. Proporciona una experiencia de aprendizaje inmersiva con simuladores, visualizaciones dinámicas y herramientas interactivas para comprender la arquitectura de pipeline y sus técnicas de optimización.

## Objetivos de Aprendizaje

- **Comprender el concepto de pipeline** y su funcionamiento básico
- **Analizar las etapas del pipeline** y sus funciones específicas
- **Identificar y resolver riesgos** (hazards) del pipeline
- **Explorar técnicas de optimización** como forwarding y predicción de saltos
- **Estudiar arquitecturas superscalares** y su impacto en el rendimiento
- **Comparar rendimiento** entre procesadores secuenciales y segmentados
- **Simular configuraciones de pipeline** y medir su rendimiento

## Características Principales

### 📚 Contenido Educativo
- **Introducción conceptual** con diagramas interactivos del pipeline
- **Arquitectura de pipeline** con descripción detallada de cada etapa
- **Clasificación de riesgos** (datos, control, estructurales)
- **Técnicas de optimización** (forwarding, predicción, especulación)
- **Arquitectura superscalar** con múltiples unidades de ejecución
- **Análisis de rendimiento** con métricas clave (CPI, IPC, Speedup)

### 🎮 Simulador Interactivo
- **Configuración de pipeline**: 3, 5, 7, 10 etapas
- **Tipos de riesgos**: Sin riesgos, datos, control, estructurales
- **Optimizaciones**: Sin optimización, forwarding, predicción, superscalar
- **Cálculo de métricas**: Ciclos totales, CPI, IPC, Speedup
- **Visualización del pipeline** con representación gráfica de la ejecución

### ⚖️ Comparación Secuencial vs Segmentado
- **Análisis comparativo** basado en datos del archivo `Comparacion.xlsx`
- **Configuración de parámetros**: lotes, duración de tareas, número de tareas
- **Visualizaciones múltiples**: Gantt, línea de tiempo, rendimiento
- **Tabla de comparación detallada** con tiempos por lote
- **Cálculo automático** de speedup y eficiencia

### 📊 Visualizaciones
- **Gráficos de timing** del pipeline por configuración
- **Diagramas de riesgos** y técnicas de resolución
- **Comparaciones de rendimiento** superscalar
- **Métricas en tiempo real** durante las simulaciones

### 🎨 Interfaz de Usuario
- **Diseño responsivo** para diferentes dispositivos
- **Tema claro/oscuro** con transiciones suaves
- **Navegación intuitiva** entre secciones
- **Controles interactivos** para personalización

## Estructura del Contenido

### 1. Introducción a Procesadores Segmentados
- Concepto de pipeline y paralelismo a nivel de instrucción
- Arquitectura segmentada con etapas bien definidas
- Diagrama interactivo del pipeline clásico de 5 etapas

### 2. Arquitectura de Pipeline
- **Etapas del pipeline**:
  - **Fetch (IF)**: Obtención de instrucción de memoria
  - **Decode (ID)**: Decodificación y lectura de registros
  - **Execute (EX)**: Ejecución de la operación
  - **Memory (MEM)**: Acceso a memoria (si es necesario)
  - **Writeback (WB)**: Escritura de resultados
- **Timing del pipeline** con gráficos comparativos

### 3. Riesgos del Pipeline
- **Riesgos de Datos**:
  - Dependencias entre instrucciones
  - Ejemplos de código con dependencias
  - Soluciones: Forwarding, Stalling, Reordering
- **Riesgos de Control**:
  - Saltos y cambios de flujo
  - Ejemplos de instrucciones de salto
  - Soluciones: Predicción estática/dinámica, Delay slots
- **Riesgos Estructurales**:
  - Conflictos de recursos hardware
  - Ejemplos de uso simultáneo
  - Soluciones: Múltiples unidades, Pipeline separado

### 4. Técnicas de Optimización
- **Predicción de Saltos**:
  - Predicción estática (Always Taken, Always Not Taken)
  - Predicción dinámica (1-bit, 2-bit, Correlated)
- **Especulación**:
  - Control Speculation (ejecución después de saltos)
  - Data Speculation (valores predichos)
- **Pipeline Superescalar**:
  - Múltiples unidades de ejecución
  - Issue múltiple de instrucciones
- **Pipeline Profundo**:
  - Más etapas para mayor frecuencia
  - Trade-offs entre latencia y throughput

### 5. Arquitectura Superscalar
- **Conceptos Fundamentales**:
  - Múltiples unidades de ejecución (ALU, FPU, Load/Store, Branch)
  - Issue múltiple (en orden, fuera de orden)
- **Técnicas Superscalares**:
  - Renombrado de registros
  - Reordenamiento dinámico
  - Buffer de reordenamiento
  - Algoritmo de Tomasulo

### 6. Comparación Secuencial vs Segmentado
- **Análisis comparativo** entre procesador secuencial y segmentado
- **Configuración de parámetros**:
  - Número de lotes (1-8)
  - Duración por tarea (10-60 minutos)
  - Número de tareas (3-6)
- **Visualizaciones interactivas**:
  - **Diagrama de Gantt**: Comparación visual de tiempos de ejecución
  - **Línea de tiempo**: Progreso de ejecución en tiempo real
  - **Gráfico de rendimiento**: Métricas comparativas
- **Tabla de comparación detallada** con tiempos específicos por lote
- **Cálculo automático** de speedup y eficiencia
- **Ejemplo práctico** basado en el archivo `Comparacion.xlsx` (lavado de ropa)

### 7. Simulador de Pipeline
- **Configuración del sistema**:
  - Número de etapas del pipeline
  - Tipo de riesgo a simular
  - Técnica de optimización
  - Número de instrucciones
- **Resultados de simulación**:
  - Ciclos totales de ejecución
  - CPI (Cycles Per Instruction)
  - IPC (Instructions Per Cycle)
  - Speedup respecto al procesador no segmentado
- **Visualización del pipeline** con representación gráfica

## Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con Grid, Flexbox y variables CSS
- **JavaScript ES6+**: Funcionalidad interactiva y lógica de simulación

### Librerías
- **Chart.js**: Gráficos interactivos y responsivos
- **Font Awesome**: Iconografía consistente

### Características Técnicas
- **Diseño responsivo**: Adaptable a móviles, tablets y desktop
- **Tema oscuro/claro**: Preferencias guardadas en localStorage
- **Navegación por teclado**: Accesibilidad mejorada
- **Animaciones suaves**: Transiciones CSS para mejor UX
- **Modo pantalla completa**: Para presentaciones

## Uso del Simulador

### Configuración Inicial
1. **Seleccionar número de etapas**:
   - 3 etapas: Pipeline básico
   - 5 etapas: Pipeline clásico (recomendado)
   - 7 etapas: Pipeline extendido
   - 10 etapas: Pipeline profundo

2. **Elegir tipo de riesgo**:
   - Sin riesgos: Pipeline ideal
   - Riesgos de datos: Dependencias entre instrucciones
   - Riesgos de control: Saltos condicionales
   - Riesgos estructurales: Conflictos de recursos

3. **Seleccionar optimización**:
   - Sin optimización: Pipeline básico
   - Forwarding: Bypass de datos
   - Predicción de saltos: Predicción estática y dinámica
   - Superscalar: Múltiples instrucciones por ciclo

4. **Ajustar número de instrucciones**: Deslizador de 5 a 20 instrucciones

### Interpretación de Resultados
- **Ciclos Totales**: Número total de ciclos de reloj necesarios
- **CPI**: Promedio de ciclos por instrucción (menor es mejor)
- **IPC**: Promedio de instrucciones por ciclo (mayor es mejor)
- **Speedup**: Mejora respecto al procesador no segmentado

### Experimentación
- **Comparar configuraciones**: Probar diferentes combinaciones
- **Analizar impacto de riesgos**: Ver cómo afectan al rendimiento
- **Evaluar optimizaciones**: Medir la mejora de cada técnica

## Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para librerías CDN)

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/usuario/estructura-computadores.git

# Navegar al directorio del tema
cd estructura-computadores/Tema5

# Iniciar servidor local
python -m http.server 8000
# o
npm start
```

### Acceso
- Abrir navegador en `http://localhost:8000`
- El canvas se carga automáticamente

## Navegación

### Secciones Principales
- **Introducción** (Ctrl+1): Visión general del pipeline
- **Pipeline** (Ctrl+2): Arquitectura y etapas
- **Riesgos** (Ctrl+3): Tipos y resolución de hazards
- **Optimización** (Ctrl+4): Técnicas de mejora
- **Superscalar** (Ctrl+5): Arquitectura avanzada
- **Simulador** (Ctrl+6): Herramienta interactiva

### Controles
- **Tema**: Botón de luna/sol para cambiar tema
- **Pantalla completa**: Botón de expandir/comprimir
- **Inicio**: Botón de casa para volver al portal principal

## Conceptos Clave

### Pipeline Básico
El pipeline divide la ejecución de instrucciones en etapas secuenciales, permitiendo que múltiples instrucciones estén en ejecución simultáneamente.

### Fórmulas Importantes
- **Ciclos totales**: `etapas + instrucciones - 1`
- **CPI**: `ciclos_totales / instrucciones`
- **IPC**: `1 / CPI`
- **Speedup**: `(instrucciones * etapas) / ciclos_totales`

### Riesgos y Soluciones
- **Data Hazards**: Forwarding, Stalling, Reordering
- **Control Hazards**: Predicción, Delay slots
- **Structural Hazards**: Múltiples unidades, Pipeline separado

## Contribuciones

### Mejoras Sugeridas
- Agregar más tipos de predicción de saltos
- Incluir simulaciones de out-of-order execution
- Implementar visualización de renombrado de registros
- Añadir ejemplos de código real
- Crear ejercicios interactivos

### Reporte de Errores
- Usar el sistema de issues de GitHub
- Incluir información del navegador y sistema operativo
- Describir pasos para reproducir el problema

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

## Contacto

Para preguntas o sugerencias sobre este tema específico:
- Crear un issue en GitHub
- Contactar al autor del tema

---

**Nota**: Este canvas didáctico es parte del proyecto "Estructura de Computadores" y está diseñado para complementar el aprendizaje teórico con experiencias prácticas e interactivas sobre procesadores segmentados.
