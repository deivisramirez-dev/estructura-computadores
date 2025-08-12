// Lienzo Didáctico - Arquitectura de Computadores
// Funcionalidades interactivas

document.addEventListener('DOMContentLoaded', function() {
    // Navegación entre secciones
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remover clase active de todos los botones y secciones
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Añadir clase active al botón clickeado y su sección correspondiente
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Scroll suave hacia la sección
            document.getElementById(targetSection).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Interactividad en los modelos de niveles
    const modelItems = document.querySelectorAll('.model-item');
    modelItems.forEach(item => {
        item.addEventListener('click', function() {
            const modelType = this.getAttribute('data-model');
            showModelInfo(modelType);
        });
    });

    // Interactividad en el modelo de siete niveles
    const sevenLevels = document.querySelectorAll('.seven-levels-model .level');
    sevenLevels.forEach(level => {
        level.addEventListener('click', function() {
            const levelNumber = this.getAttribute('data-level');
            showSevenLevelInfo(levelNumber);
        });
    });

    // Interactividad en la evolución histórica de la definición
    const evolutionItems = document.querySelectorAll('.evolution-item');
    evolutionItems.forEach(item => {
        item.addEventListener('click', function() {
            const year = this.querySelector('.year').textContent;
            const title = this.querySelector('h5').textContent;
            showEvolutionInfo(year, title);
        });
    });

    // Interactividad en los conceptos del modelo
    const conceptItems = document.querySelectorAll('.concept-item');
    conceptItems.forEach(item => {
        item.addEventListener('click', function() {
            const conceptTitle = this.querySelector('h5').textContent;
            const conceptDesc = this.querySelector('p').textContent;
            showConceptInfo(conceptTitle, conceptDesc);
        });
    });

    // Interactividad en los tipos de paralelismo Flynn
    const parallelismTypes = document.querySelectorAll('.parallelism-type');
    parallelismTypes.forEach(type => {
        type.addEventListener('click', function() {
            const typeTitle = this.querySelector('h4').textContent;
            const typeDesc = this.querySelector('p').textContent;
            showParallelismTypeInfo(typeTitle, typeDesc);
        });
    });

    // Interactividad en los niveles de granularidad
    const granularityLevels = document.querySelectorAll('.granularity-level');
    granularityLevels.forEach(level => {
        level.addEventListener('click', function() {
            const levelName = this.querySelector('.level-name').textContent;
            const granularity = this.querySelector('.granularity').textContent;
            const description = this.querySelector('p').textContent;
            showGranularityInfo(levelName, granularity, description);
        });
    });

    // Interactividad en la matriz de Flynn
    const matrixCells = document.querySelectorAll('.matrix-cell');
    matrixCells.forEach(cell => {
        cell.addEventListener('click', function() {
            const flynnType = this.getAttribute('data-type');
            highlightFlynnType(flynnType);
        });
    });

    // Interactividad en los tipos Flynn
    const flynnTypes = document.querySelectorAll('.flynn-type');
    flynnTypes.forEach(type => {
        type.addEventListener('click', function() {
            const flynnType = this.getAttribute('data-type');
            highlightMatrixCell(flynnType);
        });
    });

    // Animaciones de entrada para las tarjetas
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // Animación de las barras de progreso
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Tooltips informativos
    addTooltips();

    // Simulación de pipeline
    initializePipelineSimulation();

    // Contador de transistores animado
    initializeTransistorCounter();
});

// Función para mostrar información detallada de modelos
function showModelInfo(modelType) {
    const modelInfo = {
        'blaaw': {
            title: "Niveles Conceptuales de Blaaw (1970)",
            description: "Este modelo establece una estructura conceptual que organiza los diferentes niveles de abstracción en el diseño de computadores, facilitando la comprensión de la arquitectura desde una perspectiva teórica y conceptual.",
            details: "• Enfoque en la abstracción conceptual\n• Organización por niveles de complejidad\n• Base para otros modelos posteriores"
        },
        'bell-newell': {
            title: "Niveles Estructurales de Bell y Newell (1971)",
            description: "Modelo que describe la organización estructural de los componentes del computador en diferentes niveles, enfocándose en la arquitectura física y la interconexión de elementos.",
            details: "• Estructura física de componentes\n• Organización jerárquica\n• Interconexión de elementos"
        },
        'levy': {
            title: "Niveles de Interpretación de Levy (1978)",
            description: "Sistema de niveles que describe cómo se interpretan y ejecutan las instrucciones en diferentes capas, desde el lenguaje de alto nivel hasta la ejecución en hardware.",
            details: "• Interpretación de instrucciones\n• Ejecución por capas\n• Traducción entre niveles"
        },
        'tanenbaum': {
            title: "Niveles Funcionales de Tanenbaum (1986)",
            description: "Arquitectura funcional que organiza los niveles según las funciones que realizan en el sistema, proporcionando una visión clara de las responsabilidades de cada capa.",
            details: "• Organización por funciones\n• Responsabilidades claras\n• Interfaz entre capas"
        }
    };

    const info = modelInfo[modelType];
    if (info) {
        const message = `${info.title}\n\n${info.description}\n\n${info.details}`;
        showNotification(message, 'info');
    }
}

// Función para mostrar información detallada del modelo de siete niveles
function showSevenLevelInfo(levelNumber) {
    const levelInfo = {
        1: {
            title: "Nivel 1: Componentes Físicos",
            description: "Nivel más básico que incluye los componentes físicos reales del computador como transistores, resistencias, condensadores y otros elementos electrónicos fundamentales.",
            details: "• Transistores y componentes electrónicos básicos\n• Circuitos integrados físicos\n• Materiales y propiedades físicas\n• Nivel de implementación hardware real"
        },
        2: {
            title: "Nivel 2: Circuito Electrónico",
            description: "Organización de componentes físicos en circuitos electrónicos funcionales que realizan operaciones lógicas básicas.",
            details: "• Compuertas lógicas (AND, OR, NOT)\n• Circuitos combinacionales\n• Circuitos secuenciales\n• Interconexión de componentes"
        },
        3: {
            title: "Nivel 3: Lógica Digital",
            description: "Sistema de lógica digital que implementa operaciones aritméticas y lógicas mediante la combinación de circuitos electrónicos.",
            details: "• Unidad Aritmético-Lógica (ALU)\n• Registros y memoria básica\n• Control de flujo de datos\n• Operaciones lógicas y aritméticas"
        },
        4: {
            title: "Nivel 4: Transferencia entre Registros",
            description: "Nivel que maneja la transferencia de datos entre registros y la ejecución de microinstrucciones que controlan el flujo de datos.",
            details: "• Microinstrucciones\n• Transferencia de datos entre registros\n• Control de secuencia\n• Microarquitectura del procesador"
        },
        5: {
            title: "Nivel 5: Sistema Computador",
            description: "Nivel que integra todos los componentes del computador incluyendo CPU, memoria, E/S y buses de comunicación.",
            details: "• Arquitectura del conjunto de instrucciones (ISA)\n• Organización de memoria\n• Sistema de entrada/salida\n• Buses de comunicación"
        },
        6: {
            title: "Nivel 6: Sistema Operativo",
            description: "Software que gestiona los recursos del hardware y proporciona servicios a las aplicaciones de usuario.",
            details: "• Gestión de procesos y memoria\n• Sistema de archivos\n• Control de acceso y seguridad\n• Interfaz entre hardware y software"
        },
        7: {
            title: "Nivel 7: Software Superiores",
            description: "Aplicaciones y software de alto nivel que utilizan los servicios del sistema operativo para realizar tareas específicas.",
            details: "• Aplicaciones de usuario\n• Software de desarrollo\n• Bases de datos y sistemas de información\n• Interfaces gráficas y servicios"
        }
    };

    const info = levelInfo[levelNumber];
    if (info) {
        const message = `${info.title}\n\n${info.description}\n\n${info.details}`;
        showNotification(message, 'info');
    }
}

// Función para mostrar información de la evolución histórica
function showEvolutionInfo(year, title) {
    const evolutionDetails = {
        "1964": {
            details: "IBM presenta el sistema S/360, marcando el primer uso formal del término 'arquitectura de computadores' en el contexto de diseño de sistemas informáticos."
        },
        "1964-1980s": {
            details: "Definición estricta desde la perspectiva del programador de lenguaje de máquina. Se enfoca en elementos visibles al programador como registros, memoria y conjunto de instrucciones."
        },
        "Actualidad": {
            details: "Definición ampliada que incluye niveles jerárquicos de abstracción, integración de arquitectura y tecnología, y considera aspectos como el sistema operativo y evaluación de prestaciones."
        }
    };

    const info = evolutionDetails[year];
    if (info) {
        const message = `${title} (${year})\n\n${info.details}`;
        showNotification(message, 'info');
    }
}

// Función para mostrar información de los conceptos del modelo
function showConceptInfo(title, description) {
    const conceptDetails = {
        "Estructura": {
            details: "Se refiere a los componentes físicos y lógicos que forman cada nivel. Cada nivel inferior proporciona los componentes necesarios para construir el nivel superior."
        },
        "Organización": {
            details: "Describe cómo se conectan y comunican los componentes entre sí. Incluye buses, señales de control, y flujos de datos que permiten la operación del sistema."
        },
        "Descripción Funcional": {
            details: "Define el comportamiento esperado de cada nivel. Especifica qué hace cada componente y cómo responde a diferentes entradas y condiciones."
        }
    };

    const info = conceptDetails[title];
    if (info) {
        const message = `${title}\n\n${description}\n\n${info.details}`;
        showNotification(message, 'info');
    }
}

// Función para mostrar información de tipos de paralelismo
function showParallelismTypeInfo(title, description) {
    const parallelismDetails = {
        "Paralelismo de Datos": {
            details: "Ideal para aplicaciones que procesan grandes volúmenes de datos con la misma operación. Muy eficiente en procesamiento de imágenes, simulaciones científicas y análisis de datos."
        },
        "Paralelismo Funcional": {
            details: "Más flexible y general. Permite ejecutar diferentes algoritmos en paralelo, ideal para sistemas multitarea, servidores web y aplicaciones con múltiples componentes independientes."
        }
    };

    const info = parallelismDetails[title];
    if (info) {
        const message = `${title}\n\n${description}\n\n${info.details}`;
        showNotification(message, 'info');
    }
}

// Función para mostrar información de niveles de granularidad
function showGranularityInfo(levelName, granularity, description) {
    const granularityDetails = {
        "Nivel de Instrucción": {
            details: "El paralelismo más fino, donde se ejecutan múltiples instrucciones simultáneamente dentro de un solo procesador. Requiere hardware especializado para detectar y explotar el paralelismo."
        },
        "Nivel de Bucle o Hebra": {
            details: "Paralelismo a nivel de hilos de ejecución. Permite que múltiples hilos compartan recursos del procesador, mejorando la utilización del hardware."
        },
        "Nivel de Procedimiento": {
            details: "Paralelismo a nivel de procesos independientes. Cada proceso tiene su propio espacio de memoria y recursos, proporcionando mayor aislamiento y estabilidad."
        },
        "Nivel de Programa": {
            details: "El paralelismo más grueso, donde programas completos se ejecutan en diferentes máquinas o nodos. Ideal para aplicaciones distribuidas y computación en la nube."
        }
    };

    const info = granularityDetails[levelName];
    if (info) {
        const message = `${levelName} (${granularity})\n\n${description}\n\n${info.details}`;
        showNotification(message, 'info');
    }
}

// Función para resaltar tipos Flynn en la matriz
function highlightFlynnType(flynnType) {
    // Remover resaltado previo
    document.querySelectorAll('.flynn-type').forEach(type => {
        type.style.borderColor = '#e9ecef';
        type.style.transform = 'translateY(0)';
    });

    // Resaltar el tipo seleccionado
    const selectedType = document.querySelector(`.flynn-type[data-type="${flynnType}"]`);
    if (selectedType) {
        selectedType.style.borderColor = '#667eea';
        selectedType.style.transform = 'translateY(-5px)';
        selectedType.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    }

    // Resaltar celda correspondiente en la matriz
    document.querySelectorAll('.matrix-cell').forEach(cell => {
        cell.style.background = '#f8f9fa';
        cell.style.color = '#333';
    });

    const selectedCell = document.querySelector(`.matrix-cell[data-type="${flynnType}"]`);
    if (selectedCell) {
        selectedCell.style.background = '#667eea';
        selectedCell.style.color = 'white';
    }
}

// Función para resaltar celdas de la matriz
function highlightMatrixCell(flynnType) {
    // Remover resaltado previo
    document.querySelectorAll('.matrix-cell').forEach(cell => {
        cell.style.background = '#f8f9fa';
        cell.style.color = '#333';
    });

    // Resaltar celda correspondiente
    const selectedCell = document.querySelector(`.matrix-cell[data-type="${flynnType}"]`);
    if (selectedCell) {
        selectedCell.style.background = '#667eea';
        selectedCell.style.color = 'white';
        selectedCell.style.transform = 'scale(1.05)';
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'info' ? '#667eea' : '#28a745'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    // Añadir estilos para el contenido
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `;

    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Añadir al DOM
    document.body.appendChild(notification);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Función para añadir tooltips
function addTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            showTooltip(this, tooltipText);
        });

        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// Función para mostrar tooltip
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.9rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

// Función para ocultar tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Función para inicializar simulación de pipeline
function initializePipelineSimulation() {
    const pipelineStages = document.querySelectorAll('.pipeline-stage');
    if (pipelineStages.length === 0) return;

    let currentStage = 0;
    
    setInterval(() => {
        pipelineStages.forEach((stage, index) => {
            if (index === currentStage) {
                stage.style.background = '#28a745';
                stage.style.transform = 'scale(1.1)';
            } else {
                stage.style.background = '#667eea';
                stage.style.transform = 'scale(1)';
            }
        });

        currentStage = (currentStage + 1) % pipelineStages.length;
    }, 1000);
}

// Función para inicializar contador de transistores
function initializeTransistorCounter() {
    const transistorElements = document.querySelectorAll('.transistors');
    
    transistorElements.forEach(element => {
        const finalValue = element.textContent;
        const numericValue = parseInt(finalValue.replace(/,/g, ''));
        
        if (!isNaN(numericValue)) {
            animateCounter(element, 0, numericValue, 2000);
        }
    });
}

// Función para animar contador
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const startValue = start;
    const endValue = end;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Añadir estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .pipeline-stage {
        transition: all 0.3s ease;
    }
    
    .transistors {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Función para exportar el lienzo como imagen (opcional)
function exportCanvas() {
    // Esta función podría implementarse para exportar el lienzo como imagen
    console.log('Función de exportación no implementada');
}

// Función para modo de presentación
function togglePresentationMode() {
    const body = document.body;
    body.classList.toggle('presentation-mode');
    
    if (body.classList.contains('presentation-mode')) {
        // Ocultar navegación y elementos no esenciales
        document.querySelector('.navigation').style.display = 'none';
        document.querySelector('.footer').style.display = 'none';
    } else {
        // Mostrar todos los elementos
        document.querySelector('.navigation').style.display = 'flex';
        document.querySelector('.footer').style.display = 'block';
    }
}

// Event listeners adicionales
document.addEventListener('keydown', function(e) {
    // Navegación con teclado
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const activeBtn = document.querySelector('.nav-btn.active');
        const nextBtn = activeBtn.nextElementSibling;
        if (nextBtn && nextBtn.classList.contains('nav-btn')) {
            nextBtn.click();
        }
    }
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const activeBtn = document.querySelector('.nav-btn.active');
        const prevBtn = activeBtn.previousElementSibling;
        if (prevBtn && prevBtn.classList.contains('nav-btn')) {
            prevBtn.click();
        }
    }
    
    // Modo presentación con F11
    if (e.key === 'F11') {
        e.preventDefault();
        togglePresentationMode();
    }
});

// Función para hacer el lienzo más accesible
function enhanceAccessibility() {
    // Añadir atributos ARIA
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.setAttribute('role', 'region');
        card.setAttribute('aria-label', `Sección ${index + 1}`);
    });

    // Añadir navegación por teclado
    const interactiveElements = document.querySelectorAll('.level, .matrix-cell, .flynn-type');
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Inicializar mejoras de accesibilidad
enhanceAccessibility();

// Función para mostrar estadísticas de uso (opcional)
function showUsageStats() {
    const stats = {
        sectionsViewed: new Set(),
        interactions: 0,
        timeSpent: 0
    };
    
    // Esta función podría implementarse para rastrear el uso del lienzo
    console.log('Estadísticas de uso:', stats);
}

// Exportar funciones para uso externo
window.LienzoDidactico = {
    showNotification,
    togglePresentationMode,
    exportCanvas,
    showUsageStats
};
