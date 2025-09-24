# Guía Docente: Ejercicios Prácticos con el Simulador de Redes de Interconexión

## 📚 Información General

**Tema:** Redes de Interconexión (Tema 11)  
**Herramienta:** Simulador Interactivo de Redes  
**Duración estimada:** 90 minutos  
**Nivel:** Universitario - Estructura de Computadores  

---

## 🎯 Objetivos de Aprendizaje

Al completar estos ejercicios, los estudiantes serán capaces de:

- **Analizar** el impacto de diferentes topologías en el rendimiento de redes
- **Comparar** técnicas de conmutación y su efecto en latencia y throughput
- **Evaluar** algoritmos de encaminamiento en diferentes escenarios
- **Optimizar** configuraciones de red para aplicaciones específicas
- **Interpretar** métricas de rendimiento y tomar decisiones de diseño

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

### 📈 Resultados Esperados

| Topología | Latencia | Ancho de Banda | Throughput | Escalabilidad |
|-----------|----------|----------------|------------|---------------|
| Malla 2D  | Alta     | Media          | Media      | Limitada      |
| Toro 2D   | Media    | Alta           | Alta       | Buena         |
| Hipercubo | Baja     | Alta           | Alta       | Excelente     |

### 💡 Análisis y Discusión

**Preguntas para reflexión:**
- ¿Por qué el hipercubo tiene mejor escalabilidad?
- ¿Cuándo sería preferible usar una malla 2D sobre un toro 2D?
- ¿Cómo afecta el tamaño de red al rendimiento de cada topología?

### ✅ Solución y Explicación

**Malla 2D:** 
- **Ventajas:** Simplicidad, bajo costo, fácil implementación
- **Desventajas:** Alta latencia, escalabilidad limitada
- **Aplicación:** Sistemas pequeños con presupuesto limitado

**Toro 2D:**
- **Ventajas:** Mejor latencia que malla, buena escalabilidad
- **Desventajas:** Mayor complejidad de encaminamiento
- **Aplicación:** Sistemas de tamaño medio que requieren balance

**Hipercubo:**
- **Ventajas:** Excelente escalabilidad, baja latencia, tolerancia a fallos
- **Desventajas:** Alto costo, complejidad de implementación
- **Aplicación:** Sistemas de alto rendimiento y gran escala

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

### 📈 Resultados Esperados

| Técnica | Latencia | Throughput | Utilización | Comportamiento bajo Carga |
|---------|----------|-------------|-------------|---------------------------|
| Store & Forward | Alta | Bajo | Media | Degradación gradual |
| Wormhole | Baja | Alto | Alta | Bloqueos posibles |
| VCT | Media | Alto | Alta | Balance óptimo |
| Circuit | Variable | Medio | Baja | Reserva de recursos |

### 💡 Análisis y Discusión

**Preguntas para reflexión:**
- ¿Por qué wormhole puede sufrir bloqueos en tráfico hotspot?
- ¿Cuándo es ventajoso usar circuit switching?
- ¿Cómo afecta el tamaño de buffer al rendimiento de cada técnica?

### ✅ Solución y Explicación

**Store & Forward:**
- **Ventajas:** Simplicidad, control de errores por paquete
- **Desventajas:** Alta latencia, uso ineficiente de buffers
- **Mejor para:** Redes con alta probabilidad de errores

**Wormhole:**
- **Ventajas:** Baja latencia, alto throughput
- **Desventajas:** Posibles bloqueos, complejidad de control
- **Mejor para:** Aplicaciones con mensajes largos y baja contención

**Virtual Cut-Through:**
- **Ventajas:** Balance entre latencia y complejidad
- **Desventajas:** Requiere buffers más grandes
- **Mejor para:** Aplicaciones generales con tráfico mixto

**Circuit Switching:**
- **Ventajas:** Garantía de ancho de banda, latencia predecible
- **Desventajas:** Alta latencia de establecimiento, uso ineficiente
- **Mejor para:** Aplicaciones con requisitos estrictos de QoS

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

#### Opciones de Diseño:
1. **Malla 2D con Wormhole**
2. **Toro 2D con Virtual Cut-Through**
3. **Hipercubo con Store & Forward**
4. **Configuración personalizada**

### 📊 Pasos del Ejercicio

1. **Analizar requisitos** y restricciones del sistema
2. **Probar configuraciones** predefinidas
3. **Optimizar parámetros** (tamaño de red, algoritmo de encaminamiento)
4. **Evaluar bajo diferentes** patrones de tráfico
5. **Probar escalabilidad** con tamaños de red crecientes
6. **Seleccionar configuración óptima** y justificar la decisión

### 📈 Criterios de Evaluación

| Criterio | Peso | Descripción |
|----------|------|-------------|
| Latencia | 30% | Debe cumplir requisito de 10 ciclos |
| Throughput | 25% | Debe superar 0.8 paquetes/ciclo |
| Tolerancia a Fallos | 20% | Funcionamiento con 1 enlace fallido |
| Costo | 15% | Minimizar número de enlaces |
| Escalabilidad | 10% | Rendimiento con crecimiento |

### 💡 Análisis y Discusión

**Preguntas para reflexión:**
- ¿Cómo priorizar los criterios de diseño?
- ¿Qué trade-offs son aceptables?
- ¿Cómo validar la solución propuesta?






*Esta guía docente está diseñada para maximizar el aprendizaje práctico de los conceptos de redes de interconexión a través de la experimentación interactiva con el simulador.*
