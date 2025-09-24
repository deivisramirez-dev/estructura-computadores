# Guía de Estudiante: Ejercicios Prácticos con el Simulador de Redes de Interconexión

## 📚 Información General

**Tema:** Redes de Interconexión (Tema 11)  
**Herramienta:** Simulador Interactivo de Redes  
**Duración estimada:** 50 minutos  
**Nivel:** Universitario - Estructura de Computadores  

---

## 🎯 Objetivos de Aprendizaje

Al completar estos ejercicios, serás capaz de:

- **Analizar** el impacto de diferentes topologías en el rendimiento de redes
- **Comparar** técnicas de conmutación y su efecto en latencia y throughput
- **Evaluar** algoritmos de encaminamiento en diferentes escenarios
- **Optimizar** configuraciones de red para aplicaciones específicas
- **Interpretar** métricas de rendimiento y tomar decisiones de diseño

---

## 📚 Conceptos Fundamentales para el Simulador

### 🔧 Configuración de Red

#### **Topologías de Red**
- **Malla 2D:** Red rectangular donde cada nodo se conecta con sus vecinos inmediatos (arriba, abajo, izquierda, derecha)
- **Toro 2D:** Similar a malla 2D pero con conexiones que "envuelven" los bordes, creando una estructura toroidal
- **Hipercubo:** Red donde cada nodo se conecta con otros nodos que difieren en exactamente un bit de su dirección
- **Árbol:** Estructura jerárquica con un nodo raíz y nodos hijos conectados en niveles

#### **Técnicas de Conmutación**
- **Store & Forward:** Almacena el paquete completo antes de reenviarlo al siguiente nodo
- **Wormhole:** Divide el paquete en flits y los envía secuencialmente por el camino
- **Virtual Cut-Through:** Combina características de Store & Forward y Wormhole
- **Circuit Switching:** Establece una conexión dedicada antes de enviar datos

#### **Algoritmos de Encaminamiento**
- **XY:** En mallas, primero se mueve en X, luego en Y (determinístico)
- **Dimension Order:** En hipercubos, cambia una dimensión a la vez
- **Adaptive:** Puede elegir entre múltiples rutas según el estado de la red
- **Source Routing:** El nodo origen especifica toda la ruta

### 📊 Parámetros de Simulación

#### **Tamaño de Red**
- **4 nodos:** Red pequeña para pruebas básicas
- **8 nodos:** Red mediana para análisis de escalabilidad
- **16 nodos:** Red estándar para la mayoría de ejercicios
- **32 nodos:** Red grande para análisis de escalabilidad avanzada

#### **Patrones de Tráfico**
- **Uniforme:** Cada nodo envía datos a todos los demás con igual probabilidad
- **Hotspot:** 80% del tráfico se dirige a un nodo específico (simula congestión)
- **Transpose:** Nodos en posición (i,j) envían a (j,i)
- **Bit-reverse:** Nodos envían a otros con direcciones en orden bit-reverso

### 📈 Métricas de Rendimiento

#### **Latencia**
- **Definición:** Tiempo promedio que tarda un paquete en llegar de origen a destino
- **Unidad:** Ciclos de reloj
- **Factores que la afectan:** Distancia, técnica de conmutación, congestión

#### **Ancho de Banda**
- **Definición:** Cantidad máxima de datos que puede transmitir la red por unidad de tiempo
- **Unidad:** Bits por ciclo
- **Factores que la afectan:** Número de enlaces, ancho de cada enlace

#### **Throughput**
- **Definición:** Número de paquetes que la red puede procesar por unidad de tiempo
- **Unidad:** Paquetes por ciclo
- **Factores que la afectan:** Patrón de tráfico, algoritmo de encaminamiento

#### **Utilización**
- **Definición:** Porcentaje de capacidad de la red que se está usando
- **Unidad:** Porcentaje (0-100%)
- **Factores que la afectan:** Carga de tráfico, eficiencia del encaminamiento

### 🛠️ Herramientas del Simulador

#### **Configuración de Red**
- **Selector de Topología:** Elige la estructura física de la red
- **Selector de Conmutación:** Selecciona cómo se transfieren los datos
- **Selector de Encaminamiento:** Elige el algoritmo de ruteo
- **Control de Tamaño:** Ajusta el número de nodos en la red

#### **Parámetros de Simulación**
- **Patrón de Tráfico:** Define cómo se distribuye el tráfico entre nodos
- **Intensidad de Carga:** Controla cuánto tráfico hay en la red
- **Duración de Simulación:** Tiempo que dura cada experimento

#### **Herramientas de Análisis**
- **Calculadora de Prestaciones:** Calcula métricas teóricas basadas en parámetros
- **Comparación de Configuraciones:** Evalúa múltiples opciones simultáneamente
- **Visualización de Red:** Muestra la estructura y flujo de datos en tiempo real

### 💡 Consejos para Usar el Simulador

#### **Antes de Comenzar**
1. **Lee la configuración** cuidadosamente antes de ejecutar
2. **Entiende el contexto** de cada ejercicio
3. **Prepara las tablas** para registrar resultados
4. **Ten claro qué métricas** vas a medir

#### **Durante la Simulación**
1. **Ejecuta múltiples veces** para obtener resultados consistentes
2. **Observa la visualización** para entender el comportamiento
3. **Registra todos los valores** en las tablas correspondientes
4. **Toma notas** sobre observaciones importantes

#### **Después de la Simulación**
1. **Analiza los resultados** comparando con expectativas teóricas
2. **Identifica patrones** en los datos obtenidos
3. **Reflexiona sobre las diferencias** entre configuraciones
4. **Documenta tus hallazgos** para el análisis final

---

## 🛠️ Configuración del Entorno

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Acceso al Tema 11: Redes de Interconexión
- Conocimientos básicos de topologías de red y técnicas de conmutación

### Herramientas del Simulador
- **Configuración de Red:** Topología, técnica de conmutación, algoritmo de encaminamiento
- **Parámetros de Simulación:** Tamaño de red, patrón de tráfico
- **Métricas de Rendimiento:** Latencia, ancho de banda, throughput, utilización
- **Herramientas de Análisis:** Comparación de configuraciones, calculadora de prestaciones

---

## 📋 Ejercicio 1: Comparación de Topologías de Red

### 🎯 Objetivo
Analizar y comparar el rendimiento de diferentes topologías de red bajo condiciones similares.

### 📖 Contexto Teórico
Las topologías de red determinan la estructura física de interconexión entre nodos. Cada topología tiene características únicas que afectan:
- **Latencia:** Tiempo promedio de comunicación
- **Escalabilidad:** Capacidad de crecimiento
- **Costo:** Número de enlaces y complejidad
- **Tolerancia a fallos:** Capacidad de funcionar con componentes fallidos

### 🔧 Configuración del Ejercicio

#### Configuración A: Malla 2D
```
Topología: Malla 2D
Técnica de Conmutación: Store & Forward
Algoritmo de Encaminamiento: XY
Tamaño de Red: 16 nodos
Patrón de Tráfico: Uniforme
```

#### Configuración B: Toro 2D
```
Topología: Toro 2D
Técnica de Conmutación: Store & Forward
Algoritmo de Encaminamiento: XY
Tamaño de Red: 16 nodos
Patrón de Tráfico: Uniforme
```

#### Configuración C: Hipercubo
```
Topología: Hipercubo
Técnica de Conmutación: Store & Forward
Algoritmo de Encaminamiento: Dimension Order
Tamaño de Red: 16 nodos
Patrón de Tráfico: Uniforme
```

### 📊 Pasos del Ejercicio

1. **Configurar la simulación** con cada topología
2. **Ejecutar la simulación** y registrar los resultados
3. **Comparar métricas** de latencia, ancho de banda y throughput
4. **Analizar escalabilidad** probando con tamaños de red 4, 8, 16, 32 nodos
5. **Documentar observaciones** sobre ventajas y desventajas de cada topología

### 📈 Tabla de Resultados

Completa la siguiente tabla con tus resultados:

| Topología | Latencia | Ancho de Banda | Throughput | Escalabilidad |
|-----------|----------|----------------|------------|---------------|
| Malla 2D  |          |                |            |               |
| Toro 2D   |          |                |            |               |
| Hipercubo |          |                |            |               |

### 💡 Preguntas para Reflexión

- ¿Por qué crees que el hipercubo tiene mejor escalabilidad?
- ¿Cuándo sería preferible usar una malla 2D sobre un toro 2D?
- ¿Cómo afecta el tamaño de red al rendimiento de cada topología?
- ¿Qué ventajas y desventajas observas en cada topología?

### 📝 Análisis Requerido

**Para cada topología, describe:**
1. **Ventajas principales** que observaste
2. **Desventajas principales** que identificaste
3. **Aplicaciones ideales** donde usarías esta topología
4. **Comportamiento bajo diferentes** tamaños de red

---

## 📋 Ejercicio 2: Análisis de Técnicas de Conmutación

### 🎯 Objetivo
Evaluar el impacto de diferentes técnicas de conmutación en el rendimiento de la red.

### 📖 Contexto Teórico
Las técnicas de conmutación determinan cómo se transfieren los datos a través de la red:
- **Store & Forward:** Almacena paquetes completos antes de reenviar
- **Wormhole:** Segmenta el camino para transferencia simultánea
- **Virtual Cut-Through:** Combinación de segmentación y buffering
- **Circuit Switching:** Reserva el camino completo antes de la transferencia

### 🔧 Configuración del Ejercicio

#### Escenario: Red de 16 nodos con tráfico hotspot
```
Topología: Toro 2D
Tamaño de Red: 16 nodos
Algoritmo de Encaminamiento: XY
Patrón de Tráfico: Hotspot (80% del tráfico hacia un nodo específico)
```

#### Técnicas a Comparar:
1. **Store & Forward**
2. **Wormhole**
3. **Virtual Cut-Through**
4. **Circuit Switching**

### 📊 Pasos del Ejercicio

1. **Configurar la red** con toro 2D de 16 nodos
2. **Seleccionar patrón hotspot** para simular congestión
3. **Probar cada técnica** de conmutación individualmente
4. **Registrar métricas** de latencia, throughput y utilización
5. **Analizar el comportamiento** bajo condiciones de alta carga
6. **Identificar la técnica óptima** para este escenario

### 📈 Tabla de Resultados

Completa la siguiente tabla con tus resultados:

| Técnica | Latencia | Throughput | Utilización | Comportamiento bajo Carga |
|---------|----------|-------------|-------------|---------------------------|
| Store & Forward | | | | |
| Wormhole | | | | |
| VCT | | | | |
| Circuit | | | | |

### 💡 Preguntas para Reflexión

- ¿Por qué crees que wormhole puede sufrir bloqueos en tráfico hotspot?
- ¿Cuándo sería ventajoso usar circuit switching?
- ¿Cómo afecta el tamaño de buffer al rendimiento de cada técnica?
- ¿Qué técnica elegirías para una aplicación con mensajes largos?

### 📝 Análisis Requerido

**Para cada técnica de conmutación, describe:**
1. **Ventajas principales** observadas en la simulación
2. **Desventajas principales** identificadas
3. **Aplicaciones ideales** para esta técnica
4. **Comportamiento bajo** diferentes patrones de tráfico

---

## 📋 Ejercicio 3: Optimización de Rendimiento

### 🎯 Objetivo
Diseñar la configuración óptima de red para una aplicación específica.

### 📖 Contexto Teórico
El diseño de redes requiere balancear múltiples factores:
- **Requisitos de Aplicación:** Latencia, throughput, tolerancia a fallos
- **Restricciones de Costo:** Número de enlaces, complejidad de hardware
- **Patrones de Tráfico:** Uniforme, hotspot, transpose, bit-reverse
- **Escalabilidad:** Capacidad de crecimiento futuro

### 🔧 Configuración del Ejercicio

#### Escenario: Sistema de Supercomputación
**Requisitos:**
- **Latencia máxima:** 10 ciclos
- **Throughput mínimo:** 0.8 paquetes/ciclo
- **Tolerancia a fallos:** Debe funcionar con 1 enlace fallido
- **Presupuesto:** Minimizar número de enlaces
- **Aplicación:** Cálculos científicos con comunicación intensiva

#### Opciones de Diseño a Evaluar:
1. **Malla 2D con Wormhole**
2. **Toro 2D con Virtual Cut-Through**
3. **Hipercubo con Store & Forward**
4. **Tu propia configuración personalizada**

### 📊 Pasos del Ejercicio

1. **Analizar requisitos** y restricciones del sistema
2. **Probar configuraciones** predefinidas
3. **Optimizar parámetros** (tamaño de red, algoritmo de encaminamiento)
4. **Evaluar bajo diferentes** patrones de tráfico
5. **Probar escalabilidad** con tamaños de red crecientes
6. **Seleccionar configuración óptima** y justificar la decisión

### 📈 Criterios de Evaluación

| Criterio | Peso | Tu Evaluación | Justificación |
|----------|------|---------------|---------------|
| Latencia | 30% | | |
| Throughput | 25% | | |
| Tolerancia a Fallos | 20% | | |
| Costo | 15% | | |
| Escalabilidad | 10% | | |

### 📊 Tabla de Configuraciones Evaluadas

| Configuración | Latencia | Throughput | Tolerancia | Costo | Escalabilidad | Puntuación Total |
|---------------|----------|------------|------------|-------|---------------|------------------|
| Malla 2D + Wormhole | | | | | | |
| Toro 2D + VCT | | | | | | |
| Hipercubo + Store&Forward | | | | | | |
| Tu Configuración | | | | | | |

### 💡 Preguntas para Reflexión

- ¿Cómo priorizarías los criterios de diseño?
- ¿Qué trade-offs serían aceptables?
- ¿Cómo validarías tu solución propuesta?
- ¿Qué factores adicionales considerarías en un sistema real?

### 📝 Análisis Requerido

**Documenta tu proceso de diseño:**
1. **Análisis de requisitos:** ¿Qué es lo más importante?
2. **Configuraciones probadas:** ¿Qué opciones evaluaste?
3. **Configuración seleccionada:** ¿Cuál elegiste y por qué?
4. **Justificación técnica:** ¿Por qué es la mejor opción?
5. **Limitaciones identificadas:** ¿Qué problemas podrías enfrentar?

---

## 🛠️ Herramientas de Análisis Adicionales

### 🔍 Calculadora de Prestaciones
Utiliza la calculadora integrada para:
- **Calcular latencia total** basada en diámetro y latencia por salto
- **Estimar ancho de banda** considerando número de nodos
- **Evaluar escalabilidad** con diferentes tamaños de red
- **Comparar costos** de diferentes configuraciones

### 📈 Comparación de Configuraciones
Usa la herramienta de comparación para:
- **Evaluar múltiples opciones** simultáneamente
- **Identificar la mejor configuración** para cada criterio
- **Documentar trade-offs** entre diferentes soluciones
- **Justificar decisiones** de diseño

### 🎮 Visualización de Red
Aprovecha la visualización para:
- **Entender la estructura** de diferentes topologías
- **Observar el flujo de datos** en tiempo real
- **Identificar cuellos de botella** en la red
- **Validar configuraciones** antes de la implementación

---

## 📝 Guía de Entrega

### 📋 Formato de Entrega
Presenta tus resultados en un documento que incluya:

1. **Resumen Ejecutivo** (1 página)
   - Objetivos alcanzados
   - Principales hallazgos
   - Conclusiones generales

2. **Resultados por Ejercicio**
   - Tablas completadas
   - Gráficos y visualizaciones
   - Análisis detallado

3. **Reflexión Personal**
   - Lo que aprendiste
   - Conceptos que te resultaron difíciles
   - Aplicaciones prácticas identificadas




*¡Disfruta explorando el fascinante mundo de las redes de interconexión! Esta guía te ayudará a comprender los conceptos fundamentales a través de la experimentación práctica.*
