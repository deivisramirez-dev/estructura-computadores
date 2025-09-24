# Tema 11: Redes de Interconexión

## 📚 Descripción

Este lienzo didáctico interactivo presenta el **Tema 11: Redes de Interconexión** del curso de Estructura de Computadores de la Universidad Internacional de La Rioja (UNIR). El tema se centra en los fundamentos del diseño de redes de interconexión para sistemas paralelos, cubriendo topología, conmutación, control de flujo y encaminamiento.

## 🎯 Objetivos de Aprendizaje

Al finalizar este tema, el estudiante será capaz de:

- **Comprender** los conceptos fundamentales de las redes de interconexión
- **Clasificar** diferentes topologías de red según sus características
- **Analizar** técnicas de conmutación y su impacto en el rendimiento
- **Evaluar** mecanismos de control de flujo en diferentes niveles
- **Diseñar** algoritmos de encaminamiento para diferentes topologías
- **Comparar** prestaciones de diferentes configuraciones de red

## 📖 Contenido del Tema

### 1. Introducción y Espacio de Diseño
- **Niveles de servicio**: API, Mensaje, Encaminamiento, Conmutación, Físico
- **Unidades de transferencia**: Mensajes, Paquetes, Flits, Phits
- **Facetas de diseño**: Topología, Encaminamiento, Conmutación, Control de flujo
- **Componentes del sistema**: Interfaces, conmutadores, controladores

### 2. Topología de Redes
- **Clasificación por patrón**:
  - Regulares: Malla, Toro, Hipercubo
  - Irregulares: Topologías asimétricas
- **Clasificación por conexión**:
  - **Redes Estáticas (Directas)**: Conexiones fijas
    - Ortogonales: Malla, Toro, Hipercubo
    - No Ortogonales: Árbol, Anillo
  - **Redes Dinámicas**: Conexiones variables
    - Medio Compartido: Bus
    - Indirectas: Barras cruzadas, MIN
- **Parámetros de prestaciones**: Grado, diámetro, ancho de bisección

### 3. Técnicas de Conmutación
- **Almacenamiento y Reenvío (Store and Forward)**:
  - Buffer de tamaño múltiplo de paquete
  - Unidad de transferencia: paquete
  - Aplicación en redes WAN y primeros multicomputadores
- **Conmutación Vermiforme (Wormhole)**:
  - Segmentación del camino
  - Buffer múltiplo de flit
  - Origen en multicomputadores
- **Virtual Cut-Through (VCT)**:
  - Combinación de segmentación y buffering
  - Propuesto para redes de computadores
- **Conmutación de Circuitos**:
  - Reserva del camino completo
  - Origen en redes telefónicas
- **Canales virtuales**: Multiplexación temporal de enlaces

### 4. Control de Flujo
- **Niveles de aplicación**:
  - **Físico (Phit)**: Transferencia sin solapamiento
  - **Conmutación (Flit)**: Arbitraje y almacenamiento garantizado
  - **Extremo a extremo (Paquete)**: Control de congestión
- **Protocolos**:
  - Basados en señales: Petición/reconocimiento
  - Basados en créditos: Optimista/crédito
- **Implementaciones**:
  - Síncrono: Gobernado por reloj
  - Asíncrono: Señales de control

### 5. Encaminamiento
- **Funciones**:
  - **Función de encaminamiento**: Determina caminos candidatos
  - **Función de selección**: Elige camino específico
- **Propiedades requeridas**:
  - Evitar interbloqueos y livelock
  - Garantizar conectividad
  - Mantener baja latencia
  - Distribución equilibrada de carga
  - Tolerancia a fallos
- **Facetas de diseño**:
  - **Funcionalidad**: Un destino vs múltiples destinos
  - **Selección**: Determinísticos, inconscientes, adaptativos
  - **Decisión**: Centralizada, en fuente, distribuida, multifase
  - **Implementación**: Tablas vs algoritmos
  - **Caminos**: Progresivo vs retroceso, mínimo vs no mínimo

### 6. Simulador de Redes (En desarrollo)
- **Configuración de topología**: Diferentes tipos de red
- **Simulación de tráfico**: Patrones de comunicación
- **Análisis de prestaciones**: Latencia, ancho de banda, escalabilidad
- **Comparación de técnicas**: Conmutación y encaminamiento

## 🛠️ Características Técnicas

### Funcionalidades Interactivas
- **Navegación fluida**: Entre secciones del tema
- **Visualizaciones dinámicas**: Diagramas de topologías
- **Ejemplos interactivos**: Casos de uso prácticos
- **Comparaciones**: Diferentes técnicas y configuraciones

### Herramientas de Aprendizaje
- **Diagramas de niveles**: Visualización de la arquitectura
- **Tablas comparativas**: Técnicas de conmutación y control
- **Ejemplos de código**: Algoritmos de encaminamiento
- **Casos de estudio**: Redes reales y aplicaciones

## 🎮 Cómo Usar

### Navegación
- **Secciones**: Utiliza los botones de navegación para moverte entre temas
- **Atajos de teclado**:
  - `1-6`: Navegación rápida entre secciones
  - `←/→`: Navegación con flechas
  - `Ctrl+D`: Cambiar tema
  - `F11`: Pantalla completa

### Exploración de Contenido
- **Introducción**: Visión general y objetivos del tema
- **Topología**: Clasificaciones y características de redes
- **Conmutación**: Técnicas de transferencia de datos
- **Control de Flujo**: Mecanismos de gestión de tráfico
- **Encaminamiento**: Algoritmos de selección de rutas

## 📊 Conceptos Clave

### Unidades de Transferencia
- **Mensaje**: Unidad completa de información de aplicación
- **Paquete**: Unidad de encaminamiento en la red
- **Flit**: Unidad mínima de control de flujo en conmutación
- **Phit**: Unidad física mínima de transferencia

### Parámetros de Prestaciones
- **Grado**: Número de enlaces por conmutador
- **Diámetro**: Distancia máxima entre nodos
- **Ancho de bisección**: Mínimo número de enlaces a cortar
- **Latencia**: Tiempo de transferencia de extremo a extremo
- **Ancho de banda**: Capacidad de transferencia de datos

### Técnicas de Optimización
- **Canales virtuales**: Multiplexación de enlaces físicos
- **Encaminamiento adaptativo**: Selección dinámica de rutas
- **Control de flujo por créditos**: Gestión eficiente de buffers
- **Segmentación de caminos**: Paralelización de transferencias

## 🔧 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexión a internet (para librerías CDN)

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/unir/estructura-computadores.git

# Navegar al tema
cd estructura-computadores/Tema11

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

- **Ortega, J., Anguita, M. y Prieto, A. (2005)**. Arquitectura de computadores. Madrid: Thomson.
- **Culler, D., Singh, J. P., & Gupta, A. (1999)**. Parallel computer architecture: a hardware/software approach. Morgan Kaufmann.
- **Hennessy, J. L., & Patterson, D. A. (2019)**. Computer architecture: a quantitative approach. Morgan Kaufmann.

## 🎯 Casos de Uso

### Para Estudiantes
- **Aprendizaje conceptual**: Comprensión de fundamentos teóricos
- **Análisis comparativo**: Evaluación de diferentes técnicas
- **Resolución de problemas**: Aplicación de conceptos a casos prácticos
- **Preparación de exámenes**: Repaso estructurado del contenido

### Para Docentes
- **Presentaciones**: Material visual para clases magistrales
- **Ejemplos prácticos**: Casos de estudio para discusión
- **Evaluación**: Herramientas para verificar comprensión
- **Investigación**: Base para estudios avanzados

## 🎨 Características de Diseño

- **Paleta de colores**: Verde (#10b981) como color principal para redes
- **Tipografía**: Inter con diferentes pesos para jerarquía visual
- **Iconografía**: Font Awesome para consistencia visual
- **Responsividad**: Adaptable a diferentes dispositivos
- **Accesibilidad**: Navegación por teclado y semántica HTML

## 🔮 Futuras Mejoras

- **Simulador completo**: Herramienta de simulación de redes
- **Visualizaciones 3D**: Representación tridimensional de topologías
- **Calculadoras avanzadas**: Métricas de prestaciones en tiempo real
- **Ejercicios interactivos**: Problemas prácticos con soluciones
- **Laboratorios virtuales**: Experimentación con configuraciones reales

## 📞 Soporte

Para preguntas o sugerencias sobre este tema:
- Revisa la documentación en este README
- Consulta el código fuente para entender la implementación
- Contacta al equipo docente del curso

---

**Desarrollado por el equipo docente de UNIR para el curso de Estructura de Computadores**

*Última actualización: Diciembre 2024*
