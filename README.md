# Estructura de Computadores - UNIR

## 📚 Descripción

Este repositorio contiene el material didáctico interactivo para el curso de **Estructura de Computadores** de la Universidad Internacional de La Rioja (UNIR). El proyecto incluye un lienzo didáctico digital y herramientas interactivas para facilitar el aprendizaje de los fundamentos de la arquitectura de computadores.

## 🎯 Contenido del Repositorio

### 📖 Tema 1: Fundamentos del Diseño y Evolución de la Arquitectura
- **Lienzo Didáctico Interactivo**: Herramienta educativa completa con 5 secciones temáticas
- **Dashboard Ley de Moore**: Visualización interactiva de la evolución de transistores
- **Material de Referencia**: Documentación y recursos adicionales

## 🚀 Características Principales

### ✨ Lienzo Didáctico
- **5 secciones interactivas**: Fundamentos, Evolución, Paralelismo, Taxonomía Flynn, Prestaciones
- **Navegación fluida** con animaciones suaves
- **Elementos clickeables** con información detallada
- **Diseño responsivo** para todos los dispositivos
- **Modo presentación** para uso en clase

### 📊 Dashboard Ley de Moore
- **Gráficos interactivos** con Chart.js
- **Línea de tiempo histórica** (1965-2024)
- **Predicciones futuras** con escenarios múltiples
- **Comparaciones entre fabricantes** (Intel, AMD, Apple, Samsung)
- **Métricas en tiempo real** con contadores animados

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Librerías**: Chart.js, Font Awesome
- **Fuentes**: Inter (Google Fonts)
- **Diseño**: CSS Grid, Flexbox, Gradientes
- **Responsividad**: Media queries

## 📁 Estructura del Proyecto

```
EstrucuturaComputadores/
├── Tema1/                    # Lienzo didáctico principal
│   ├── index.html           # Interfaz principal
│   ├── styles.css           # Estilos y diseño
│   ├── script.js            # Funcionalidades interactivas
│   ├── README.md            # Documentación del lienzo
│   ├── package.json         # Configuración del proyecto
│   ├── tema1.pdf            # Documento de referencia
│   └── Moore/               # Dashboard Ley de Moore
│       ├── index.html       # Dashboard principal
│       ├── styles.css       # Estilos del dashboard
│       ├── script.js        # Funcionalidades del dashboard
│       └── README.md        # Documentación del dashboard
├── .gitignore               # Archivos a excluir
└── README.md                # Este archivo
```

## 🎮 Cómo Usar

### Instalación Local
1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/EstrucuturaComputadores.git
   cd EstrucuturaComputadores
   ```

2. Abre el lienzo principal:
   ```bash
   cd Tema1
   # Abre index.html en tu navegador
   ```

3. O abre el dashboard de Moore:
   ```bash
   cd Tema1/Moore
   # Abre index.html en tu navegador
   ```

### Uso con Servidor Local (Opcional)
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js
npx http-server -p 8000

# Usando Live Server (VS Code)
# Instala la extensión Live Server y haz clic en "Go Live"
```

## 📚 Secciones del Lienzo

### 🔧 Fundamentos
- Definición de arquitectura de computadores
- Evolución histórica de la definición
- Niveles de descripción del computador
- Modelo integrador de siete niveles
- Tipos de arquitectura

### 📈 Evolución
- Factores que influyen en la evolución
- Métricas de rendimiento
- Ley de Moore y su impacto

### 🔗 Paralelismo
- Definición y beneficios del paralelismo
- Técnicas fundamentales
- Niveles de paralelismo

### 🏗️ Taxonomía Flynn
- Clasificación Flynn (SISD, SIMD, MISD, MIMD)
- Tipos de paralelismo
- Niveles de paralelismo funcional
- Configuraciones MIMD

### ⚡ Prestaciones
- Factores tecnológicos
- Limitaciones tecnológicas
- Evolución de aplicaciones y mercado

## 🎯 Casos de Uso


### Para Estudiantes
- **Aprendizaje autónomo**: Explorar conceptos a su ritmo
- **Repaso**: Reforzar conocimientos
- **Comprensión visual**: Mejorar entendimiento
- **Preparación de exámenes**: Herramienta de estudio

## 🎨 Características de Diseño

- **Paleta de colores**: Azul (#667eea) y púrpura (#764ba2)
- **Tipografía**: Inter con diferentes pesos
- **Efectos visuales**: Gradientes, sombras, transiciones suaves
- **Responsividad**: Adaptable a desktop, tablet y móvil
- **Accesibilidad**: Navegación por teclado y atributos ARIA

## ⌨️ Controles de Teclado

- **Flechas**: Navegar entre secciones
- **F11**: Activar modo presentación
- **Enter/Espacio**: Activar elementos interactivos
- **Tab**: Navegar por elementos

## 🤝 Contribuciones

Para contribuir al proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios
4. Haz commit de tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
5. Push a la rama (`git push origin feature/nueva-funcionalidad`)git 
6. Crea un Pull Request

## 📄 Licencia

Este proyecto está diseñado para uso educativo en el contexto de la UNIR.

## 📞 Soporte

Para preguntas o sugerencias:
- Revisa la documentación en los README de cada sección
- Consulta el código fuente para entender la implementación
- Contacta al equipo docente del curso


**Desarrollado para el curso de Estructura de Computadores - UNIR**

*Última actualización: Agosto 2025*
