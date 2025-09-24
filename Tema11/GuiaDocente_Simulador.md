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

### ✅ Solución y Explicación

**Configuración Óptima Recomendada:**
```
Topología: Toro 2D
Técnica de Conmutación: Virtual Cut-Through
Algoritmo de Encaminamiento: XY
Tamaño de Red: 16 nodos
Patrón de Tráfico: Uniforme
```

**Justificación:**
- **Latencia:** 8 ciclos (cumple requisito de 10)
- **Throughput:** 0.9 paquetes/ciclo (supera requisito de 0.8)
- **Tolerancia a fallos:** Toro 2D mantiene conectividad con 1 enlace fallido
- **Costo:** 32 enlaces (balance óptimo)
- **Escalabilidad:** Buena escalabilidad hasta 64 nodos

**Alternativas consideradas:**
- **Hipercubo:** Excelente rendimiento pero alto costo (64 enlaces)
- **Malla 2D:** Bajo costo pero latencia alta (12 ciclos)
- **Wormhole:** Baja latencia pero posible bloqueo en congestión

---

## 📊 Herramientas de Análisis Adicionales

### 🔍 Calculadora de Prestaciones
Utilizar la calculadora integrada para:
- **Calcular latencia total** basada en diámetro y latencia por salto
- **Estimar ancho de banda** considerando número de nodos
- **Evaluar escalabilidad** con diferentes tamaños de red
- **Comparar costos** de diferentes configuraciones

### 📈 Comparación de Configuraciones
Usar la herramienta de comparación para:
- **Evaluar múltiples opciones** simultáneamente
- **Identificar la mejor configuración** para cada criterio
- **Documentar trade-offs** entre diferentes soluciones
- **Justificar decisiones** de diseño

### 🎮 Visualización de Red
Aprovechar la visualización para:
- **Entender la estructura** de diferentes topologías
- **Observar el flujo de datos** en tiempo real
- **Identificar cuellos de botella** en la red
- **Validar configuraciones** antes de la implementación

---

## 📝 Evaluación y Seguimiento

### 🎯 Criterios de Evaluación

#### Ejercicio 1 (25 puntos)
- **Configuración correcta** (5 puntos)
- **Análisis de resultados** (10 puntos)
- **Comparación de topologías** (10 puntos)

#### Ejercicio 2 (25 puntos)
- **Comprensión de técnicas** (8 puntos)
- **Análisis de métricas** (10 puntos)
- **Selección de técnica óptima** (7 puntos)

#### Ejercicio 3 (25 puntos)
- **Análisis de requisitos** (8 puntos)
- **Configuración óptima** (10 puntos)
- **Justificación de decisiones** (7 puntos)

#### Participación y Colaboración (25 puntos)
- **Participación activa** (10 puntos)
- **Colaboración en equipo** (8 puntos)
- **Preguntas y discusión** (7 puntos)

### 📋 Rúbrica de Evaluación

| Nivel | Descripción | Puntos |
|-------|-------------|--------|
| Excelente | Análisis completo, justificación sólida, conclusiones acertadas | 90-100% |
| Bueno | Análisis adecuado, algunas limitaciones en justificación | 80-89% |
| Satisfactorio | Análisis básico, justificación limitada | 70-79% |
| Necesita Mejora | Análisis incompleto, justificación insuficiente | <70% |

---

## 🚀 Extensión y Actividades Adicionales

### 🔬 Investigación Avanzada
- **Análisis de tolerancia a fallos** con múltiples enlaces fallidos
- **Estudio de escalabilidad** con redes de 64+ nodos
- **Optimización de algoritmos** de encaminamiento personalizados
- **Análisis de costos** detallado incluyendo hardware

### 🛠️ Proyectos Prácticos
- **Diseño de red** para centro de datos específico
- **Comparación con redes reales** (InfiniBand, Ethernet)
- **Implementación de algoritmos** de encaminamiento
- **Simulación de aplicaciones** reales (MPI, MapReduce)

### 📚 Recursos Adicionales
- **Papers académicos** sobre redes de interconexión
- **Estudios de caso** de supercomputadores reales
- **Herramientas de simulación** avanzadas (NS-3, OMNeT++)
- **Estándares de la industria** (InfiniBand, PCIe, NVLink)

---

## 📞 Soporte y Contacto

Para dudas sobre el simulador o los ejercicios:
- **Documentación técnica:** Revisar README.md del Tema 11
- **Problemas técnicos:** Verificar configuración del navegador
- **Conceptos teóricos:** Consultar material de clase
- **Extensiones:** Proponer nuevos ejercicios y escenarios

---

*Esta guía docente está diseñada para maximizar el aprendizaje práctico de los conceptos de redes de interconexión a través de la experimentación interactiva con el simulador.*
