# Tema 4: Almacenamiento y otros aspectos de entrada/salida

## Descripción

Este canvas didáctico interactivo está diseñado para el estudio de los sistemas de almacenamiento y los dispositivos de entrada/salida en la asignatura de Estructura de Computadores. Proporciona una experiencia de aprendizaje inmersiva con simuladores, visualizaciones dinámicas y herramientas interactivas.

## Objetivos de Aprendizaje

- **Comprender la jerarquía de almacenamiento** y las características de cada nivel
- **Analizar los tipos de dispositivos de entrada/salida** y sus aplicaciones
- **Estudiar la arquitectura de buses** y su impacto en el rendimiento
- **Explorar los controladores I/O** y sus funciones principales
- **Evaluar protocolos de comunicación** y sus características
- **Simular configuraciones de almacenamiento** y medir su rendimiento

## Características Principales

### 📚 Contenido Educativo
- **Introducción conceptual** con diagramas interactivos
- **Jerarquía de almacenamiento** con métricas detalladas
- **Clasificación de dispositivos I/O** por categorías
- **Arquitectura de buses** con comparaciones de rendimiento
- **Funciones de controladores** y tipos específicos
- **Protocolos de comunicación** con especificaciones técnicas

### 🎮 Simulador Interactivo
- **Configuración de almacenamiento**: HDD, SSD, NVMe, RAM
- **Selección de buses**: SATA I/II/III, PCIe 3.0/4.0
- **Modos de transferencia**: Polling, Interrupciones, DMA
- **Cálculo de métricas**: Tiempo de transferencia, velocidad, uso de CPU
- **Visualización de resultados** con gráficos dinámicos

### 📊 Visualizaciones
- **Gráficos de rendimiento** de buses y protocolos
- **Diagramas de arquitectura** de almacenamiento e I/O
- **Comparaciones interactivas** entre diferentes tecnologías
- **Métricas en tiempo real** durante las simulaciones

### 🎨 Interfaz de Usuario
- **Diseño responsivo** para diferentes dispositivos
- **Tema claro/oscuro** con transiciones suaves
- **Navegación intuitiva** entre secciones
- **Controles interactivos** para personalización

## Estructura del Contenido

### 1. Introducción a Almacenamiento e I/O
- Sistemas de almacenamiento (primario, secundario, terciario)
- Dispositivos de entrada/salida (entrada, salida, almacenamiento)
- Arquitectura general del sistema

### 2. Sistemas de Almacenamiento
- **Jerarquía de almacenamiento**:
  - Registros (1ns, KB, costo muy alto)
  - Caché (10ns, MB, costo alto)
  - Memoria principal (100ns, GB, costo medio)
  - Almacenamiento secundario (10ms, TB, costo bajo)
- **Tipos de almacenamiento**:
  - Volátil (RAM, DRAM, SRAM)
  - No volátil (ROM, Flash, HDD)
- **Métricas de rendimiento**: Latencia, ancho de banda, capacidad, costo

### 3. Dispositivos de Entrada/Salida
- **Categorías de dispositivos**:
  - Entrada: Teclado, ratón, escáner, micrófono, cámara
  - Salida: Monitor, impresora, altavoces, proyector, actuadores
  - Almacenamiento: Disco duro, SSD, memoria USB, tarjeta SD, cinta
- **Modos de transferencia**:
  - Polling: Simple pero ineficiente
  - Interrupciones: Eficiente con overhead de contexto
  - DMA: Máxima eficiencia, CPU libre

### 4. Buses del Sistema
- **Jerarquía de buses**:
  - Bus del procesador
  - Bus de memoria
  - Bus del sistema
  - Bus de I/O
- **Tipos de buses**:
  - Paralelos vs Seriales
  - Síncronos vs Asíncronos
- **Rendimiento comparativo** con gráficos interactivos

### 5. Controladores I/O
- **Funciones principales**:
  - Interfaz de protocolo
  - Buffering
  - Control de dispositivo
  - Manejo de errores
- **Tipos de controladores**:
  - Disco (IDE, SATA, SCSI, NVMe)
  - Red (Ethernet, WiFi, Bluetooth, Fibra)
  - Video (VGA, DVI, HDMI, DisplayPort)

### 6. Protocolos de Comunicación
- **USB**: Universal Serial Bus (1.1-4.0)
- **SATA**: Serial ATA (I-III)
- **PCIe**: PCI Express (1.0-6.0)
- **WiFi**: IEEE 802.11 (a/b/g/n/ac/ax)
- **Comparación de velocidades** y características

### 7. Simulador de Almacenamiento e I/O
- **Configuración del sistema**:
  - Tipo de almacenamiento
  - Tipo de bus
  - Tamaño de datos
  - Modo de transferencia
- **Resultados de simulación**:
  - Tiempo de transferencia
  - Velocidad de transferencia
  - Uso de CPU
  - Eficiencia del sistema

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
1. **Seleccionar tipo de almacenamiento**:
   - HDD: Alta capacidad, menor velocidad
   - SSD: Balance entre velocidad y capacidad
   - NVMe: Máxima velocidad, menor capacidad
   - RAM: Velocidad extrema, capacidad limitada

2. **Elegir tipo de bus**:
   - SATA I/II/III: Para almacenamiento tradicional
   - PCIe 3.0/4.0: Para alta velocidad

3. **Ajustar tamaño de datos**: Deslizador de 1MB a 1000MB

4. **Seleccionar modo de transferencia**:
   - Polling: Para entender el concepto básico
   - Interrupciones: Para eficiencia media
   - DMA: Para máxima eficiencia

### Interpretación de Resultados
- **Tiempo de transferencia**: Tiempo total en milisegundos
- **Velocidad de transferencia**: MB/s alcanzados
- **Uso de CPU**: Porcentaje de utilización del procesador
- **Eficiencia**: Porcentaje de eficiencia del sistema

### Experimentación
- **Comparar configuraciones**: Probar diferentes combinaciones
- **Analizar cuellos de botella**: Identificar limitaciones
- **Optimizar rendimiento**: Encontrar la mejor configuración

## Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para librerías CDN)

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/usuario/estructura-computadores.git

# Navegar al directorio del tema
cd estructura-computadores/Tema4

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
- **Introducción** (Ctrl+1): Visión general del tema
- **Almacenamiento** (Ctrl+2): Sistemas y jerarquía
- **Dispositivos I/O** (Ctrl+3): Tipos y modos de transferencia
- **Buses** (Ctrl+4): Arquitectura y rendimiento
- **Controladores** (Ctrl+5): Funciones y tipos
- **Protocolos** (Ctrl+6): Comunicación y estándares
- **Simulador** (Ctrl+7): Herramienta interactiva

### Controles
- **Tema**: Botón de luna/sol para cambiar tema
- **Pantalla completa**: Botón de expandir/comprimir
- **Inicio**: Botón de casa para volver al portal principal

## Contribuciones

### Mejoras Sugeridas
- Agregar más tipos de dispositivos de almacenamiento
- Incluir simulaciones de RAID
- Implementar comparaciones de costos
- Añadir ejemplos de casos de uso reales
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

**Nota**: Este canvas didáctico es parte del proyecto "Estructura de Computadores" y está diseñado para complementar el aprendizaje teórico con experiencias prácticas e interactivas.
