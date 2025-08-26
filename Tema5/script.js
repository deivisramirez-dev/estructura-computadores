// Variables globales
let currentTheme = 'light';
let isFullscreen = false;
let pipelineTimingChart = null;
let superscalarPerformanceChart = null;
let simulationChart = null;

// Configuraciones de pipeline
const pipelineConfigs = {
    3: {
        name: 'Pipeline de 3 etapas',
        stages: ['Fetch', 'Execute', 'Writeback'],
        latency: 3,
        throughput: 0.33
    },
    5: {
        name: 'Pipeline clásico de 5 etapas',
        stages: ['Fetch', 'Decode', 'Execute', 'Memory', 'Writeback'],
        latency: 5,
        throughput: 0.2
    },
    7: {
        name: 'Pipeline de 7 etapas',
        stages: ['Fetch', 'Decode', 'Execute', 'Memory', 'Writeback', 'Commit', 'Retire'],
        latency: 7,
        throughput: 0.14
    },
    10: {
        name: 'Pipeline profundo de 10 etapas',
        stages: ['Fetch1', 'Fetch2', 'Decode1', 'Decode2', 'Execute1', 'Execute2', 'Memory1', 'Memory2', 'Writeback', 'Commit'],
        latency: 10,
        throughput: 0.1
    }
};

// Configuraciones de riesgos
const hazardConfigs = {
    none: {
        name: 'Sin riesgos',
        penalty: 0,
        description: 'Pipeline ideal sin conflictos'
    },
    data: {
        name: 'Riesgos de datos',
        penalty: 2,
        description: 'Dependencias entre instrucciones'
    },
    control: {
        name: 'Riesgos de control',
        penalty: 3,
        description: 'Saltos y cambios de flujo'
    },
    structural: {
        name: 'Riesgos estructurales',
        penalty: 1,
        description: 'Conflictos de recursos'
    }
};

// Configuraciones de optimización
const optimizationConfigs = {
    none: {
        name: 'Sin optimización',
        improvement: 1.0,
        description: 'Pipeline básico'
    },
    forwarding: {
        name: 'Forwarding',
        improvement: 1.3,
        description: 'Bypass de datos'
    },
    prediction: {
        name: 'Predicción de saltos',
        improvement: 1.5,
        description: 'Predicción estática y dinámica'
    },
    superscalar: {
        name: 'Superscalar',
        improvement: 2.0,
        description: 'Múltiples instrucciones por ciclo'
    }
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeCharts();
    initializeSimulator();
    initializeControls();
});

// Inicialización del tema
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
}

// Establecer tema
function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const icon = document.querySelector('#theme-toggle i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    // Actualizar gráficos si existen
    updateChartsTheme();
}

// Inicialización de navegación
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            
            // Actualizar botones activos
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Mostrar sección
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Inicialización de controles
function initializeControls() {
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    
    fullscreenToggle.addEventListener('click', function() {
        toggleFullscreen();
    });
    
    // Control de número de instrucciones
    const instructionCountSlider = document.getElementById('instruction-count');
    const instructionCountValue = document.getElementById('instruction-count-value');
    
    if (instructionCountSlider && instructionCountValue) {
        instructionCountSlider.addEventListener('input', function() {
            instructionCountValue.textContent = this.value;
        });
    }
}

// Alternar pantalla completa
function toggleFullscreen() {
    const icon = document.querySelector('#fullscreen-toggle i');
    
    if (!isFullscreen) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
        icon.className = 'fas fa-compress';
        isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        icon.className = 'fas fa-expand';
        isFullscreen = false;
    }
}

// Inicialización de gráficos
function initializeCharts() {
    createPipelineTimingChart();
    createSuperscalarPerformanceChart();
}

// Crear gráfico de timing del pipeline
function createPipelineTimingChart() {
    const ctx = document.getElementById('pipelineTimingChart');
    if (!ctx) return;
    
    const timingData = {
        labels: ['3 etapas', '5 etapas', '7 etapas', '10 etapas'],
        datasets: [{
            label: 'Latencia (ciclos)',
            data: [3, 5, 7, 10],
            backgroundColor: 'rgba(52, 152, 219, 0.6)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 2,
            yAxisID: 'y'
        }, {
            label: 'Throughput (inst/ciclo)',
            data: [0.33, 0.2, 0.14, 0.1],
            backgroundColor: 'rgba(231, 76, 60, 0.6)',
            borderColor: 'rgba(231, 76, 60, 1)',
            borderWidth: 2,
            yAxisID: 'y1'
        }]
    };
    
    pipelineTimingChart = new Chart(ctx, {
        type: 'bar',
        data: timingData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación de Latencia y Throughput por Configuración de Pipeline',
                    color: getChartTextColor()
                },
                legend: {
                    labels: {
                        color: getChartTextColor()
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Latencia (ciclos)',
                        color: getChartTextColor()
                    },
                    ticks: {
                        color: getChartTextColor()
                    },
                    grid: {
                        color: getChartGridColor()
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Throughput (inst/ciclo)',
                        color: getChartTextColor()
                    },
                    ticks: {
                        color: getChartTextColor()
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                x: {
                    ticks: {
                        color: getChartTextColor()
                    },
                    grid: {
                        color: getChartGridColor()
                    }
                }
            }
        }
    });
}

// Crear gráfico de rendimiento superscalar
function createSuperscalarPerformanceChart() {
    const ctx = document.getElementById('superscalarPerformanceChart');
    if (!ctx) return;
    
    const superscalarData = {
        labels: ['1-way', '2-way', '4-way', '8-way'],
        datasets: [{
            label: 'IPC Teórico',
            data: [1, 2, 4, 8],
            backgroundColor: 'rgba(39, 174, 96, 0.6)',
            borderColor: 'rgba(39, 174, 96, 1)',
            borderWidth: 2
        }, {
            label: 'IPC Real (con dependencias)',
            data: [1, 1.6, 2.8, 4.2],
            backgroundColor: 'rgba(243, 156, 18, 0.6)',
            borderColor: 'rgba(243, 156, 18, 1)',
            borderWidth: 2
        }]
    };
    
    superscalarPerformanceChart = new Chart(ctx, {
        type: 'line',
        data: superscalarData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Rendimiento Superscalar: Teórico vs Real',
                    color: getChartTextColor()
                },
                legend: {
                    labels: {
                        color: getChartTextColor()
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'IPC (Instructions Per Cycle)',
                        color: getChartTextColor()
                    },
                    ticks: {
                        color: getChartTextColor()
                    },
                    grid: {
                        color: getChartGridColor()
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Ancho de Issue',
                        color: getChartTextColor()
                    },
                    ticks: {
                        color: getChartTextColor()
                    },
                    grid: {
                        color: getChartGridColor()
                    }
                }
            }
        }
    });
}

// Obtener color de texto para gráficos
function getChartTextColor() {
    return currentTheme === 'dark' ? '#ecf0f1' : '#333';
}

// Obtener color de grid para gráficos
function getChartGridColor() {
    return currentTheme === 'dark' ? '#4a5568' : '#dee2e6';
}

// Actualizar tema de gráficos
function updateChartsTheme() {
    if (pipelineTimingChart) {
        pipelineTimingChart.options.plugins.title.color = getChartTextColor();
        pipelineTimingChart.options.plugins.legend.labels.color = getChartTextColor();
        pipelineTimingChart.options.scales.y.ticks.color = getChartTextColor();
        pipelineTimingChart.options.scales.y1.ticks.color = getChartTextColor();
        pipelineTimingChart.options.scales.x.ticks.color = getChartTextColor();
        pipelineTimingChart.options.scales.y.grid.color = getChartGridColor();
        pipelineTimingChart.options.scales.x.grid.color = getChartGridColor();
        pipelineTimingChart.update();
    }
    
    if (superscalarPerformanceChart) {
        superscalarPerformanceChart.options.plugins.title.color = getChartTextColor();
        superscalarPerformanceChart.options.plugins.legend.labels.color = getChartTextColor();
        superscalarPerformanceChart.options.scales.y.ticks.color = getChartTextColor();
        superscalarPerformanceChart.options.scales.x.ticks.color = getChartTextColor();
        superscalarPerformanceChart.options.scales.y.grid.color = getChartGridColor();
        superscalarPerformanceChart.options.scales.x.grid.color = getChartGridColor();
        superscalarPerformanceChart.update();
    }
    
    if (simulationChart) {
        simulationChart.options.plugins.title.color = getChartTextColor();
        simulationChart.options.plugins.legend.labels.color = getChartTextColor();
        simulationChart.options.scales.y.ticks.color = getChartTextColor();
        simulationChart.options.scales.x.ticks.color = getChartTextColor();
        simulationChart.options.scales.y.grid.color = getChartGridColor();
        simulationChart.options.scales.x.grid.color = getChartGridColor();
        simulationChart.update();
    }
}

// Inicialización del simulador
function initializeSimulator() {
    const runButton = document.getElementById('run-simulation');
    if (runButton) {
        runButton.addEventListener('click', runSimulation);
    }
}

// Ejecutar simulación
function runSimulation() {
    const pipelineStages = parseInt(document.getElementById('pipeline-stages').value);
    const hazardType = document.getElementById('hazard-type').value;
    const optimization = document.getElementById('optimization').value;
    const instructionCount = parseInt(document.getElementById('instruction-count').value);
    
    // Obtener configuraciones
    const pipelineConfig = pipelineConfigs[pipelineStages];
    const hazardConfig = hazardConfigs[hazardType];
    const optimizationConfig = optimizationConfigs[optimization];
    
    // Calcular métricas
    const totalCycles = calculateTotalCycles(pipelineStages, instructionCount, hazardConfig, optimizationConfig);
    const cpi = calculateCPI(totalCycles, instructionCount);
    const ipc = calculateIPC(cpi);
    const speedup = calculateSpeedup(pipelineStages, instructionCount, totalCycles);
    
    // Mostrar resultados
    displayResults(totalCycles, cpi, ipc, speedup);
    
    // Crear visualización del pipeline
    createPipelineVisualization(pipelineStages, instructionCount, hazardType, optimization);
    
    // Crear gráfico de simulación
    createSimulationChart(pipelineStages, hazardType, optimization, totalCycles, cpi, ipc, speedup);
}

// Calcular ciclos totales
function calculateTotalCycles(stages, instructionCount, hazardConfig, optimizationConfig) {
    const baseCycles = stages + instructionCount - 1; // Fórmula básica del pipeline
    const hazardPenalty = hazardConfig.penalty * Math.floor(instructionCount / 3); // Penalización por riesgos
    const optimizationBenefit = Math.floor(hazardPenalty * (1 - optimizationConfig.improvement));
    
    return baseCycles + hazardPenalty - optimizationBenefit;
}

// Calcular CPI
function calculateCPI(totalCycles, instructionCount) {
    return totalCycles / instructionCount;
}

// Calcular IPC
function calculateIPC(cpi) {
    return 1 / cpi;
}

// Calcular Speedup
function calculateSpeedup(stages, instructionCount, totalCycles) {
    const nonPipelineCycles = instructionCount * stages;
    return nonPipelineCycles / totalCycles;
}

// Mostrar resultados
function displayResults(totalCycles, cpi, ipc, speedup) {
    document.getElementById('total-cycles').textContent = totalCycles;
    document.getElementById('cpi').textContent = cpi.toFixed(2);
    document.getElementById('ipc').textContent = ipc.toFixed(2);
    document.getElementById('speedup').textContent = speedup.toFixed(2) + 'x';
}

// Crear visualización del pipeline
function createPipelineVisualization(stages, instructionCount, hazardType, optimization) {
    const container = document.getElementById('pipeline-visualization');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Crear encabezado
    const headerRow = document.createElement('div');
    headerRow.className = 'pipeline-row';
    
    const headerCell = document.createElement('div');
    headerCell.className = 'pipeline-cell';
    headerCell.textContent = 'Inst';
    headerRow.appendChild(headerCell);
    
    for (let i = 0; i < stages; i++) {
        const stageCell = document.createElement('div');
        stageCell.className = 'pipeline-cell';
        stageCell.textContent = `E${i + 1}`;
        headerRow.appendChild(stageCell);
    }
    
    container.appendChild(headerRow);
    
    // Crear filas para cada instrucción
    for (let i = 0; i < instructionCount; i++) {
        const row = document.createElement('div');
        row.className = 'pipeline-row';
        
        const instCell = document.createElement('div');
        instCell.className = 'pipeline-cell';
        instCell.textContent = `I${i + 1}`;
        row.appendChild(instCell);
        
        for (let j = 0; j < stages; j++) {
            const cell = document.createElement('div');
            cell.className = 'pipeline-cell';
            
            const cycle = i + j;
            if (cycle < stages + instructionCount - 1) {
                // Determinar el tipo de celda basado en riesgos y optimizaciones
                if (hazardType !== 'none' && shouldHaveHazard(i, j, hazardType)) {
                    cell.className += ' stall';
                    cell.textContent = 'S';
                } else if (optimization !== 'none' && shouldOptimize(i, j, optimization)) {
                    cell.className += ' instruction';
                    cell.textContent = 'O';
                } else {
                    cell.className += ' instruction';
                    cell.textContent = 'X';
                }
            } else {
                cell.textContent = '';
            }
            
            row.appendChild(cell);
        }
        
        container.appendChild(row);
    }
}

// Determinar si debe haber un riesgo
function shouldHaveHazard(instructionIndex, stageIndex, hazardType) {
    if (hazardType === 'data') {
        return instructionIndex > 0 && stageIndex === 2; // Etapa de execute
    } else if (hazardType === 'control') {
        return instructionIndex > 0 && stageIndex === 3; // Etapa de memory
    } else if (hazardType === 'structural') {
        return instructionIndex > 0 && stageIndex === 1; // Etapa de decode
    }
    return false;
}

// Determinar si debe optimizarse
function shouldOptimize(instructionIndex, stageIndex, optimization) {
    if (optimization === 'forwarding') {
        return instructionIndex > 0 && stageIndex === 2; // Forwarding en execute
    } else if (optimization === 'prediction') {
        return instructionIndex > 0 && stageIndex === 3; // Predicción en memory
    } else if (optimization === 'superscalar') {
        return instructionIndex % 2 === 0; // Instrucciones pares en superscalar
    }
    return false;
}

// Crear gráfico de simulación
function createSimulationChart(stages, hazardType, optimization, totalCycles, cpi, ipc, speedup) {
    const ctx = document.getElementById('simulationChart');
    if (!ctx) return;
    
    // Destruir gráfico anterior si existe
    if (simulationChart) {
        simulationChart.destroy();
    }
    
    const simulationData = {
        labels: ['Ciclos Totales', 'CPI', 'IPC', 'Speedup'],
        datasets: [{
            label: 'Resultados de Simulación',
            data: [totalCycles, cpi, ipc, speedup],
            backgroundColor: [
                'rgba(52, 152, 219, 0.6)',
                'rgba(231, 76, 60, 0.6)',
                'rgba(243, 156, 18, 0.6)',
                'rgba(39, 174, 96, 0.6)'
            ],
            borderColor: [
                'rgba(52, 152, 219, 1)',
                'rgba(231, 76, 60, 1)',
                'rgba(243, 156, 18, 1)',
                'rgba(39, 174, 96, 1)'
            ],
            borderWidth: 2
        }]
    };
    
    simulationChart = new Chart(ctx, {
        type: 'bar',
        data: simulationData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Resultados de la Simulación de Pipeline',
                    color: getChartTextColor()
                },
                legend: {
                    labels: {
                        color: getChartTextColor()
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: getChartTextColor()
                    },
                    grid: {
                        color: getChartGridColor()
                    }
                },
                x: {
                    ticks: {
                        color: getChartTextColor()
                    },
                    grid: {
                        color: getChartGridColor()
                    }
                }
            }
        }
    });
}

// Función para calcular métricas de rendimiento
function calculatePerformanceMetrics(stages, instructionCount, hazardType, optimization) {
    const pipelineConfig = pipelineConfigs[stages];
    const hazardConfig = hazardConfigs[hazardType];
    const optimizationConfig = optimizationConfigs[optimization];
    
    return {
        latency: pipelineConfig.latency,
        throughput: pipelineConfig.throughput * optimizationConfig.improvement,
        hazardPenalty: hazardConfig.penalty,
        efficiency: optimizationConfig.improvement
    };
}

// Función para comparar configuraciones
function compareConfigurations(configs) {
    const results = [];
    
    configs.forEach(config => {
        const metrics = calculatePerformanceMetrics(
            config.stages,
            config.instructionCount,
            config.hazardType,
            config.optimization
        );
        
        results.push({
            name: `${pipelineConfigs[config.stages].name} + ${hazardConfigs[config.hazardType].name} + ${optimizationConfigs[config.optimization].name}`,
            metrics: metrics
        });
    });
    
    return results;
}

// Función para generar reporte de rendimiento
function generatePerformanceReport() {
    const stages = parseInt(document.getElementById('pipeline-stages').value);
    const hazardType = document.getElementById('hazard-type').value;
    const optimization = document.getElementById('optimization').value;
    const instructionCount = parseInt(document.getElementById('instruction-count').value);
    
    const metrics = calculatePerformanceMetrics(stages, instructionCount, hazardType, optimization);
    
    return {
        timestamp: new Date().toISOString(),
        configuration: {
            stages: pipelineConfigs[stages].name,
            hazard: hazardConfigs[hazardType].name,
            optimization: optimizationConfigs[optimization].name,
            instructionCount: instructionCount
        },
        metrics: metrics,
        recommendations: generateRecommendations(metrics)
    };
}

// Función para generar recomendaciones
function generateRecommendations(metrics) {
    const recommendations = [];
    
    if (metrics.hazardPenalty > 2) {
        recommendations.push('Considerar técnicas de forwarding para reducir riesgos de datos');
    }
    
    if (metrics.efficiency < 1.5) {
        recommendations.push('Implementar predicción de saltos para mejorar rendimiento');
    }
    
    if (metrics.throughput < 0.3) {
        recommendations.push('Evaluar arquitectura superscalar para mayor throughput');
    }
    
    return recommendations;
}

// Función para exportar datos
function exportSimulationData() {
    const report = generatePerformanceReport();
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'simulacion-pipeline.json';
    link.click();
}

// Función para importar datos
function importSimulationData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            // Aplicar configuración importada
            applyImportedConfiguration(data.configuration);
        } catch (error) {
            console.error('Error al importar datos:', error);
            alert('Error al importar el archivo de configuración');
        }
    };
    reader.readAsText(file);
}

// Función para aplicar configuración importada
function applyImportedConfiguration(config) {
    // Buscar y seleccionar el número de etapas
    const stagesSelect = document.getElementById('pipeline-stages');
    for (let option of stagesSelect.options) {
        if (pipelineConfigs[option.value].name === config.stages) {
            stagesSelect.value = option.value;
            break;
        }
    }
    
    // Buscar y seleccionar el tipo de riesgo
    const hazardSelect = document.getElementById('hazard-type');
    for (let option of hazardSelect.options) {
        if (hazardConfigs[option.value].name === config.hazard) {
            hazardSelect.value = option.value;
            break;
        }
    }
    
    // Buscar y seleccionar la optimización
    const optimizationSelect = document.getElementById('optimization');
    for (let option of optimizationSelect.options) {
        if (optimizationConfigs[option.value].name === config.optimization) {
            optimizationSelect.value = option.value;
            break;
        }
    }
    
    // Establecer número de instrucciones
    const instructionCountSlider = document.getElementById('instruction-count');
    const instructionCountValue = document.getElementById('instruction-count-value');
    instructionCountSlider.value = config.instructionCount;
    instructionCountValue.textContent = config.instructionCount;
    
    // Ejecutar simulación automáticamente
    runSimulation();
}

// Event listeners adicionales
document.addEventListener('keydown', function(e) {
    // Navegación con teclado
    if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
    }
    
    // Atajos de teclado para secciones
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                showSection('introduction');
                break;
            case '2':
                e.preventDefault();
                showSection('pipeline');
                break;
            case '3':
                e.preventDefault();
                showSection('hazards');
                break;
            case '4':
                e.preventDefault();
                showSection('optimization');
                break;
            case '5':
                e.preventDefault();
                showSection('superscalar');
                break;
            case '6':
                e.preventDefault();
                showSection('comparison');
                break;
            case '7':
                e.preventDefault();
                showSection('simulator');
                break;
        }
    }
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Colores según tipo
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f39c12';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Agregar estilos CSS para animaciones de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== COMPARACIÓN SECUENCIAL VS SEGMENTADO =====

// Variables globales para la comparación
let comparisonCharts = {
    gantt: null,
    timeline: null,
    performance: null
};

// Datos del archivo Excel (ejemplo de lavado de ropa)
const defaultComparisonData = {
    tasks: [
        { name: 'Tarea 1: Lavar', duration: 30 },
        { name: 'Tarea 2: Secar', duration: 30 },
        { name: 'Tarea 3: Planchar', duration: 30 },
        { name: 'Tarea 4: Colocar', duration: 30 }
    ],
    batches: 4
};

// Inicializar controles de comparación
function initializeComparisonControls() {
    const batchCount = document.getElementById('batch-count');
    const taskDuration = document.getElementById('task-duration');
    const taskCount = document.getElementById('task-count');
    const batchCountValue = document.getElementById('batch-count-value');
    const taskDurationValue = document.getElementById('task-duration-value');
    const taskCountValue = document.getElementById('task-count-value');
    const runComparisonBtn = document.getElementById('run-comparison');

    if (batchCount) {
        batchCount.addEventListener('input', function() {
            batchCountValue.textContent = this.value;
        });
    }

    if (taskDuration) {
        taskDuration.addEventListener('input', function() {
            taskDurationValue.textContent = this.value + ' min';
        });
    }

    if (taskCount) {
        taskCount.addEventListener('input', function() {
            taskCountValue.textContent = this.value;
        });
    }

    if (runComparisonBtn) {
        runComparisonBtn.addEventListener('click', runComparison);
    }

    // Inicializar pestañas de comparación
    initializeComparisonTabs();
}

// Inicializar pestañas de comparación
function initializeComparisonTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remover clase active de todos los botones y paneles
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Agregar clase active al botón y panel seleccionado
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });
}

// Ejecutar comparación
function runComparison() {
    const batchCount = parseInt(document.getElementById('batch-count').value);
    const taskDuration = parseInt(document.getElementById('task-duration').value);
    const taskCount = parseInt(document.getElementById('task-count').value);

    // Generar datos de comparación
    const comparisonData = generateComparisonData(batchCount, taskDuration, taskCount);
    
    // Actualizar resultados
    updateComparisonResults(comparisonData);
    
    // Actualizar visualizaciones
    updateComparisonVisualizations(comparisonData);
    
    // Actualizar tabla
    updateComparisonTable(comparisonData);
    
    showNotification('Comparación ejecutada exitosamente', 'success');
}

// Generar datos de comparación
function generateComparisonData(batchCount, taskDuration, taskCount) {
    const tasks = [];
    const taskNames = ['Lavar', 'Secar', 'Planchar', 'Colocar', 'Empacar', 'Enviar'];
    
    for (let i = 0; i < taskCount; i++) {
        tasks.push({
            name: `Tarea ${i + 1}: ${taskNames[i] || `Tarea ${i + 1}`}`,
            duration: taskDuration
        });
    }

    // Calcular tiempos secuenciales
    const sequentialTimes = [];
    for (let batch = 0; batch < batchCount; batch++) {
        const batchStart = batch * taskCount * taskDuration;
        const batchEnd = batchStart + taskCount * taskDuration;
        sequentialTimes.push({
            batch: batch + 1,
            start: batchStart,
            end: batchEnd,
            duration: taskCount * taskDuration
        });
    }

    // Calcular tiempos segmentados
    const pipelinedTimes = [];
    const totalPipelinedTime = (batchCount + taskCount - 1) * taskDuration;
    
    for (let batch = 0; batch < batchCount; batch++) {
        const batchStart = batch * taskDuration;
        const batchEnd = batchStart + taskCount * taskDuration;
        pipelinedTimes.push({
            batch: batch + 1,
            start: batchStart,
            end: batchEnd,
            duration: taskCount * taskDuration
        });
    }

    return {
        tasks,
        batchCount,
        taskDuration,
        sequentialTimes,
        pipelinedTimes,
        totalSequentialTime: batchCount * taskCount * taskDuration,
        totalPipelinedTime,
        speedup: (batchCount * taskCount * taskDuration) / totalPipelinedTime,
        efficiency: totalPipelinedTime / (taskCount * totalPipelinedTime)
    };
}

// Actualizar resultados de comparación
function updateComparisonResults(data) {
    document.getElementById('sequential-time').textContent = `${data.totalSequentialTime} min`;
    document.getElementById('pipelined-time').textContent = `${data.totalPipelinedTime} min`;
    document.getElementById('comparison-speedup').textContent = data.speedup.toFixed(2) + 'x';
    document.getElementById('efficiency').textContent = (data.efficiency * 100).toFixed(1) + '%';
}

// Actualizar visualizaciones de comparación
function updateComparisonVisualizations(data) {
    updateGanttChart(data);
    updateTimelineChart(data);
    updatePerformanceChart(data);
}

// Actualizar gráfico de Gantt
function updateGanttChart(data) {
    const ctx = document.getElementById('ganttChart');
    if (!ctx) return;

    if (comparisonCharts.gantt) {
        comparisonCharts.gantt.destroy();
    }

    const datasets = [];
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

    // Datos secuenciales
    data.sequentialTimes.forEach((batch, index) => {
        datasets.push({
            label: `Secuencial - Lote ${batch.batch}`,
            data: [{
                x: batch.start,
                y: `Lote ${batch.batch}`,
                width: batch.duration
            }],
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length],
            borderWidth: 1
        });
    });

    // Datos segmentados
    data.pipelinedTimes.forEach((batch, index) => {
        datasets.push({
            label: `Segmentado - Lote ${batch.batch}`,
            data: [{
                x: batch.start,
                y: `Lote ${batch.batch}`,
                width: batch.duration
            }],
            backgroundColor: colors[(index + 3) % colors.length],
            borderColor: colors[(index + 3) % colors.length],
            borderWidth: 1
        });
    });

    comparisonCharts.gantt = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Tiempo (minutos)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Lotes'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Diagrama de Gantt - Comparación Secuencial vs Segmentado'
                },
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Actualizar gráfico de línea de tiempo
function updateTimelineChart(data) {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) return;

    if (comparisonCharts.timeline) {
        comparisonCharts.timeline.destroy();
    }

    const labels = [];
    const sequentialData = [];
    const pipelinedData = [];

    for (let i = 0; i <= data.totalSequentialTime; i += data.taskDuration) {
        labels.push(`${i} min`);
        
        // Calcular progreso secuencial
        let sequentialProgress = 0;
        data.sequentialTimes.forEach(batch => {
            if (i >= batch.start && i < batch.end) {
                sequentialProgress = ((i - batch.start) / batch.duration) * 100;
            }
        });
        sequentialData.push(sequentialProgress);
        
        // Calcular progreso segmentado
        let pipelinedProgress = 0;
        if (i <= data.totalPipelinedTime) {
            pipelinedProgress = (i / data.totalPipelinedTime) * 100;
        }
        pipelinedData.push(pipelinedProgress);
    }

    comparisonCharts.timeline = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Procesador Secuencial',
                    data: sequentialData,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Procesador Segmentado',
                    data: pipelinedData,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Progreso (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Línea de Tiempo - Progreso de Ejecución'
                }
            }
        }
    });
}

// Actualizar gráfico de rendimiento
function updatePerformanceChart(data) {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    if (comparisonCharts.performance) {
        comparisonCharts.performance.destroy();
    }

    comparisonCharts.performance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tiempo Total', 'Speedup', 'Eficiencia (%)'],
            datasets: [
                {
                    label: 'Procesador Secuencial',
                    data: [data.totalSequentialTime, 1, 100],
                    backgroundColor: 'rgba(231, 76, 60, 0.8)',
                    borderColor: '#e74c3c',
                    borderWidth: 1
                },
                {
                    label: 'Procesador Segmentado',
                    data: [data.totalPipelinedTime, data.speedup, data.efficiency * 100],
                    backgroundColor: 'rgba(52, 152, 219, 0.8)',
                    borderColor: '#3498db',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación de Rendimiento'
                }
            }
        }
    });
}

// Actualizar tabla de comparación
function updateComparisonTable(data) {
    const tbody = document.getElementById('comparison-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Agregar filas de tareas
    data.tasks.forEach((task, taskIndex) => {
        const row = document.createElement('tr');
        
        // Nombre de la tarea
        const taskCell = document.createElement('td');
        taskCell.textContent = task.name;
        row.appendChild(taskCell);
        
        // Duración
        const durationCell = document.createElement('td');
        durationCell.textContent = `${task.duration} min`;
        row.appendChild(durationCell);
        
        // Datos secuenciales
        data.sequentialTimes.forEach(batch => {
            const cell = document.createElement('td');
            const start = batch.start + (taskIndex * task.duration);
            const end = start + task.duration;
            cell.textContent = `${start} – ${end}`;
            row.appendChild(cell);
        });
        
        // Datos segmentados
        data.pipelinedTimes.forEach(batch => {
            const cell = document.createElement('td');
            const start = batch.start + (taskIndex * task.duration);
            const end = start + task.duration;
            cell.textContent = `${start} – ${end}`;
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
    
    // Agregar fila de finalización
    const finalRow = document.createElement('tr');
    finalRow.style.fontWeight = 'bold';
    
    const finalTaskCell = document.createElement('td');
    finalTaskCell.textContent = 'Finalización Lote';
    finalRow.appendChild(finalTaskCell);
    
    const finalDurationCell = document.createElement('td');
    finalDurationCell.textContent = '—';
    finalRow.appendChild(finalDurationCell);
    
    // Finalización secuencial
    data.sequentialTimes.forEach(batch => {
        const cell = document.createElement('td');
        cell.textContent = `${batch.end} min`;
        finalRow.appendChild(cell);
    });
    
    // Finalización segmentada
    data.pipelinedTimes.forEach(batch => {
        const cell = document.createElement('td');
        cell.textContent = `${batch.end} min`;
        finalRow.appendChild(cell);
    });
    
    tbody.appendChild(finalRow);
}

// Inicializar comparación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    
    // Inicializar controles de comparación
    initializeComparisonControls();
    
    // Ejecutar comparación inicial
    setTimeout(() => {
        if (document.getElementById('run-comparison')) {
            runComparison();
        }
    }, 1000);
});
