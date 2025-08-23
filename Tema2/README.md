# Lienzo Didáctico - Evaluación de Prestaciones de Computadores

## 📋 Descripción

Este lienzo didáctico interactivo es una herramienta educativa diseñada para facilitar la enseñanza de la **Evaluación de Prestaciones de Computadores** en el contexto del curso de Estructura de Computadores de la UNIR.

## 🎯 Objetivos

- **Comprender las métricas** fundamentales de rendimiento de computadores
- **Aplicar fórmulas** para calcular tiempo de CPU, MIPS y MFLOPS
- **Analizar la Ley de Amdahl** y sus implicaciones en el paralelismo
- **Evaluar benchmarks** y su importancia en la comparación de sistemas
- **Entender los factores** que afectan el coste de los computadores

## 🚀 Características Principales

### ✨ Interactividad
- **Calculadoras en tiempo real** para métricas de rendimiento
- **Gráficos dinámicos** de la Ley de Amdahl
- **Simuladores interactivos** de benchmarks
- **Controles deslizantes** para experimentar con parámetros

### 📱 Diseño Responsivo
- **Adaptable a cualquier dispositivo** (desktop, tablet, móvil)
- **Interfaz moderna** con gradientes y efectos visuales
- **Tipografía clara** y legible
- **Colores contrastantes** para mejor accesibilidad

### 🎓 Contenido Educativo
- **7 secciones principales** organizadas lógicamente
- **Fórmulas interactivas** con explicaciones detalladas
- **Ejemplos prácticos** y casos de uso
- **Visualizaciones dinámicas** de conceptos complejos

## 📂 Estructura del Proyecto

```
Tema2/
├── index.html          # Archivo principal del lienzo
├── styles.css          # Estilos y diseño visual
├── script.js           # Funcionalidades interactivas
├── README.md           # Documentación (este archivo)
└── tema2.pdf           # Documento original de referencia
```

## 🎮 Cómo Usar el Lienzo

### 1. **Navegación Principal**
- Utiliza los botones de navegación en la parte superior
- Cada botón corresponde a una sección temática específica
- Las secciones se cargan dinámicamente con animaciones suaves

### 2. **Secciones Disponibles**

#### 🔍 **Introducción**
- Definición de evaluación de prestaciones
- Parámetros clave de rendimiento
- Importancia de la evaluación en la industria

#### 📏 **Medidas de Prestaciones**
- Medidas principales (tiempo de respuesta, productividad, etc.)
- Medidas específicas (Tiempo de CPU, CPI, número de instrucciones)
- Componentes críticos (memoria, procesador)

#### ⏱️ **Tiempo de CPU**
- Fórmula fundamental: TCPU = NI × CPI × Tciclo
- Calculadora interactiva con validación
- CPI promedio ponderado para diferentes tipos de instrucciones

#### 🧮 **MIPS y MFLOPS**
- Cálculo de MIPS (Millones de Instrucciones Por Segundo)
- Cálculo de MFLOPS (Millones de Operaciones en Coma Flotante Por Segundo)
- Comparación entre ambas métricas

#### 🧪 **Benchmarks**
- Clasificación de programas de prueba
- Organizaciones estandarizadoras (SPEC, TPC, EEMBC)
- Proceso de benchmarking paso a paso

#### 📈 **Ley de Amdahl**
- Fórmula de ganancia de velocidad
- Calculadora interactiva con controles deslizantes
- Gráfico dinámico de aceleración vs número de procesadores
- Implicaciones prácticas de la ley

#### 💰 **Coste**
- Factores que afectan el coste de un computador
- Curva de aprendizaje en fabricación
- Análisis de costes por componentes

### 3. **Elementos Interactivos**

#### 🧮 **Calculadoras**
- **Tiempo de CPU**: Ingresa NI, CPI y tiempo de ciclo
- **MIPS**: Calcula millones de instrucciones por segundo
- **MFLOPS**: Calcula millones de operaciones en coma flotante por segundo
- **Ley de Amdahl**: Ajusta fracción sin mejora y mejora introducida

#### 📊 **Gráficos Dinámicos**
- **Gráfico de Amdahl**: Visualiza la aceleración vs número de procesadores
- **Gráfico de Costes**: Muestra la evolución de costes en el tiempo
- **Controles interactivos**: Actualiza gráficos en tiempo real

#### 🎛️ **Controles Deslizantes**
- **Fracción sin mejora**: Ajusta de 0 a 1
- **Mejora introducida**: Ajusta de 1x a 100x
- **Actualización en tiempo real** de cálculos y gráficos

### 4. **Controles de Teclado**
- **Flechas**: Navegar entre secciones
- **F11**: Activar modo presentación
- **Enter/Espacio**: Activar elementos interactivos

## 🎨 Características de Diseño

### Paleta de Colores
- **Primario**: Azul (#667eea) - Representa tecnología y confianza
- **Secundario**: Púrpura (#764ba2) - Complementa el azul
- **Éxito**: Verde (#28a745) - Para elementos positivos
- **Advertencia**: Amarillo (#ffc107) - Para elementos de atención
- **Peligro**: Rojo (#dc3545) - Para limitaciones y errores

### Tipografía
- **Fuente principal**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Jerarquía clara** con diferentes tamaños y pesos

### Efectos Visuales
- **Gradientes** para fondos y elementos destacados
- **Sombras** para profundidad y separación
- **Transiciones suaves** para mejor experiencia de usuario
- **Hover effects** para feedback visual

## 🔧 Funcionalidades Técnicas

### Calculadoras Interactivas
- **Validación de entrada**: Verifica que los valores sean numéricos y válidos
- **Cálculos en tiempo real**: Actualiza resultados instantáneamente
- **Animaciones de resultado**: Efectos visuales para feedback
- **Formateo de números**: Presentación clara de resultados

### Gráficos con Chart.js
- **Responsive**: Se adaptan a cualquier pantalla
- **Interactivos**: Tooltips y hover effects
- **Animaciones**: Transiciones suaves
- **Actualización dinámica**: Cambios en tiempo real

### JavaScript ES6+
- **Módulos modernos** y sintaxis actual
- **Event handling**: Delegación eficiente
- **Data processing**: Manipulación de datos en tiempo real
- **Error handling**: Manejo robusto de errores

## 📱 Responsividad

### **Desktop (>1200px)**
- Layout completo con todas las funcionalidades
- Gráficos de tamaño completo
- Navegación horizontal

### **Tablet (768px-1200px)**
- Ajustes de tamaño y espaciado
- Gráficos adaptados
- Navegación optimizada

### **Móvil (<768px)**
- Layout vertical
- Gráficos simplificados
- Navegación táctil

## 📚 Contenido Educativo Detallado

### Introducción a la Evaluación de Prestaciones
- **Definición**: Análisis de parámetros y benchmarks para medir rendimiento
- **Parámetros clave**: Tiempo de CPU, MIPS, MFLOPS, Ley de Amdahl
- **Importancia**: Comparación objetiva, optimización, selección de hardware

### Medidas de Prestaciones
- **Medidas principales**: Tiempo de respuesta, productividad, funcionalidad, expansibilidad, escalabilidad, eficiencia
- **Medidas específicas**: Tiempo de CPU, CPI, número de instrucciones
- **Componentes críticos**: Organización de memoria, procesador

### Cálculo del Tiempo de CPU
- **Fórmula principal**: TCPU = NI × CPI × Tciclo
- **Variables**: NI (número de instrucciones), CPI (ciclos por instrucción), Tciclo (tiempo de ciclo)
- **CPI ponderado**: Para diferentes tipos de instrucciones

### MIPS y MFLOPS
- **MIPS**: Mide velocidad de procesamiento de instrucciones
- **MFLOPS**: Específico para operaciones en coma flotante
- **Comparación**: Enfoque, aplicación, precisión, uso típico

### Benchmarks
- **Clasificación**: Aplicaciones reales, kernels, simples, sintéticos
- **Organizaciones**: SPEC, TPC, EEMBC
- **Proceso**: Selección, configuración, ejecución, análisis

### Ley de Amdahl
- **Fórmula**: Sp = 1 / (f + (1-f)/p)
- **Variables**: f (fracción sin mejora), p (mejora introducida)
- **Implicaciones**: Límite fundamental, importancia de paralelización, rendimiento decreciente

### Coste de Computadores
- **Factores**: Tecnología, estructura y organización, conjunto de instrucciones
- **Curva de aprendizaje**: Mejoras en procesos, economías de escala, innovación tecnológica
- **Análisis de costes**: Desarrollo, fabricación, marketing, otros

## 🎯 Casos de Uso

### Para Profesores
- **Presentación en clase**: Usar como material de apoyo visual
- **Explicación de conceptos**: Utilizar calculadoras interactivas
- **Evaluación**: Usar como herramienta de repaso
- **Demostración**: Mostrar efectos de la Ley de Amdahl

### Para Estudiantes
- **Aprendizaje autónomo**: Experimentar con diferentes parámetros
- **Comprensión visual**: Ver efectos de cambios en tiempo real
- **Práctica**: Usar calculadoras para resolver problemas
- **Análisis**: Comparar diferentes escenarios

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

### Añadir Nuevas Calculadoras
1. Añade el HTML para la calculadora
2. Crea la función JavaScript correspondiente
3. Conecta los eventos de entrada y salida

### Cambiar Colores
- Modifica las variables CSS en `styles.css`
- Los colores principales están definidos al inicio del archivo

## 📊 Estadísticas de Uso

El lienzo incluye funcionalidades para rastrear:
- Secciones más visitadas
- Tiempo de permanencia
- Interacciones con calculadoras
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
**Tema 2: Evaluación de Prestaciones de Computadores**
