// Variables globales
let currentTheme = 'light';
let isFullscreen = false;
let busPerformanceChart = null;
let protocolComparisonChart = null;
let simulationChart = null;

// Configuraciones de almacenamiento
const storageConfigs = {
    hdd: {
        name: 'Disco Duro (HDD)',
        latency: 10, // ms
        bandwidth: 150, // MB/s
        cost: 0.03 // $/GB
    },
    ssd: {
        name: 'SSD',
        latency: 0.1, // ms
        bandwidth: 550, // MB/s
        cost: 0.1 // $/GB
    },
    nvme: {
        name: 'NVMe SSD',
        latency: 0.02, // ms
        bandwidth: 3500, // MB/s
        cost: 0.15 // $/GB
    },
    ram: {
        name: 'RAM',
        latency: 0.0001, // ms
        bandwidth: 25000, // MB/s
        cost: 10 // $/GB
    }
};

// Configuraciones de buses
const busConfigs = {
    sata1: {
        name: 'SATA I',
        bandwidth: 150, // MB/s
        cost: 1
    },
    sata2: {
        name: 'SATA II',
        bandwidth: 300, // MB/s
        cost: 1.2
    },
    sata3: {
        name: 'SATA III',
        bandwidth: 600, // MB/s
        cost: 1.5
    },
    pcie3: {
        name: 'PCIe 3.0',
        bandwidth: 1000, // MB/s
        cost: 2
    },
    pcie4: {
        name: 'PCIe 4.0',
        bandwidth: 2000, // MB/s
        cost: 2.5
    }
};

// Configuraciones de modos de transferencia
const transferModeConfigs = {
    polling: {
        name: 'Polling',
        cpuOverhead: 100, // %
        efficiency: 0.3
    },
    interrupt: {
        name: 'Interrupciones',
        cpuOverhead: 20, // %
        efficiency: 0.7
    },
    dma: {
        name: 'DMA',
        cpuOverhead: 5, // %
        efficiency: 0.95
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
    
    // Control de tamaño de datos
    const dataSizeSlider = document.getElementById('data-size');
    const dataSizeValue = document.getElementById('data-size-value');
    
    if (dataSizeSlider && dataSizeValue) {
        dataSizeSlider.addEventListener('input', function() {
            dataSizeValue.textContent = this.value + ' MB';
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
    createBusPerformanceChart();
    createProtocolComparisonChart();
}

// Crear gráfico de rendimiento de buses
function createBusPerformanceChart() {
    const ctx = document.getElementById('busPerformanceChart');
    if (!ctx) return;
    
    const busData = {
        labels: ['SATA I', 'SATA II', 'SATA III', 'PCIe 3.0', 'PCIe 4.0'],
        datasets: [{
            label: 'Ancho de Banda (MB/s)',
            data: [150, 300, 600, 1000, 2000],
            backgroundColor: 'rgba(52, 152, 219, 0.6)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 2
        }]
    };
    
    busPerformanceChart = new Chart(ctx, {
        type: 'bar',
        data: busData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación de Ancho de Banda de Buses',
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

// Crear gráfico de comparación de protocolos
function createProtocolComparisonChart() {
    const ctx = document.getElementById('protocolComparisonChart');
    if (!ctx) return;
    
    const protocolData = {
        labels: ['USB 2.0', 'USB 3.0', 'SATA III', 'PCIe 3.0', 'PCIe 4.0'],
        datasets: [{
            label: 'Velocidad (Gbps)',
            data: [0.48, 5, 6, 8, 16],
            backgroundColor: 'rgba(231, 76, 60, 0.6)',
            borderColor: 'rgba(231, 76, 60, 1)',
            borderWidth: 2
        }]
    };
    
    protocolComparisonChart = new Chart(ctx, {
        type: 'line',
        data: protocolData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Velocidades de Protocolos de Comunicación',
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
    if (busPerformanceChart) {
        busPerformanceChart.options.plugins.title.color = getChartTextColor();
        busPerformanceChart.options.plugins.legend.labels.color = getChartTextColor();
        busPerformanceChart.options.scales.y.ticks.color = getChartTextColor();
        busPerformanceChart.options.scales.x.ticks.color = getChartTextColor();
        busPerformanceChart.options.scales.y.grid.color = getChartGridColor();
        busPerformanceChart.options.scales.x.grid.color = getChartGridColor();
        busPerformanceChart.update();
    }
    
    if (protocolComparisonChart) {
        protocolComparisonChart.options.plugins.title.color = getChartTextColor();
        protocolComparisonChart.options.plugins.legend.labels.color = getChartTextColor();
        protocolComparisonChart.options.scales.y.ticks.color = getChartTextColor();
        protocolComparisonChart.options.scales.x.ticks.color = getChartTextColor();
        protocolComparisonChart.options.scales.y.grid.color = getChartGridColor();
        protocolComparisonChart.options.scales.x.grid.color = getChartGridColor();
        protocolComparisonChart.update();
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
    const storageType = document.getElementById('storage-type').value;
    const busType = document.getElementById('bus-type').value;
    const dataSize = parseInt(document.getElementById('data-size').value);
    const transferMode = document.getElementById('transfer-mode').value;
    
    // Obtener configuraciones
    const storageConfig = storageConfigs[storageType];
    const busConfig = busConfigs[busType];
    const transferConfig = transferModeConfigs[transferMode];
    
    // Calcular métricas
    const transferTime = calculateTransferTime(dataSize, storageConfig, busConfig);
    const transferSpeed = calculateTransferSpeed(dataSize, transferTime);
    const cpuUsage = transferConfig.cpuOverhead;
    const efficiency = transferConfig.efficiency;
    
    // Mostrar resultados
    displayResults(transferTime, transferSpeed, cpuUsage, efficiency);
    
    // Crear gráfico de simulación
    createSimulationChart(storageType, busType, transferMode, transferTime, transferSpeed, cpuUsage, efficiency);
}

// Calcular tiempo de transferencia
function calculateTransferTime(dataSize, storageConfig, busConfig) {
    // Tiempo = Latencia + (Tamaño / Ancho de banda mínimo)
    const latency = storageConfig.latency;
    const minBandwidth = Math.min(storageConfig.bandwidth, busConfig.bandwidth);
    const transferTime = latency + (dataSize / minBandwidth) * 1000; // Convertir a ms
    
    return transferTime;
}

// Calcular velocidad de transferencia
function calculateTransferSpeed(dataSize, transferTime) {
    // Velocidad = Tamaño / Tiempo (en MB/s)
    return (dataSize / (transferTime / 1000)).toFixed(2);
}

// Mostrar resultados
function displayResults(transferTime, transferSpeed, cpuUsage, efficiency) {
    document.getElementById('transfer-time').textContent = transferTime.toFixed(2) + ' ms';
    document.getElementById('transfer-speed').textContent = transferSpeed + ' MB/s';
    document.getElementById('cpu-usage').textContent = cpuUsage + '%';
    document.getElementById('efficiency').textContent = (efficiency * 100).toFixed(0) + '%';
}

// Crear gráfico de simulación
function createSimulationChart(storageType, busType, transferMode, transferTime, transferSpeed, cpuUsage, efficiency) {
    const ctx = document.getElementById('simulationChart');
    if (!ctx) return;
    
    // Destruir gráfico anterior si existe
    if (simulationChart) {
        simulationChart.destroy();
    }
    
    const simulationData = {
        labels: ['Tiempo (ms)', 'Velocidad (MB/s)', 'CPU (%)', 'Eficiencia (%)'],
        datasets: [{
            label: 'Resultados de Simulación',
            data: [transferTime, parseFloat(transferSpeed), cpuUsage, efficiency * 100],
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
                    text: 'Resultados de la Simulación de Almacenamiento e I/O',
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
function calculatePerformanceMetrics(storageType, busType, dataSize) {
    const storageConfig = storageConfigs[storageType];
    const busConfig = busConfigs[busType];
    
    return {
        latency: storageConfig.latency,
        bandwidth: Math.min(storageConfig.bandwidth, busConfig.bandwidth),
        cost: storageConfig.cost * dataSize,
        efficiency: busConfig.bandwidth / storageConfig.bandwidth
    };
}

// Función para comparar configuraciones
function compareConfigurations(configs) {
    const results = [];
    
    configs.forEach(config => {
        const metrics = calculatePerformanceMetrics(
            config.storage,
            config.bus,
            config.dataSize
        );
        
        results.push({
            name: `${storageConfigs[config.storage].name} + ${busConfigs[config.bus].name}`,
            metrics: metrics
        });
    });
    
    return results;
}

// Función para generar reporte de rendimiento
function generatePerformanceReport() {
    const storageType = document.getElementById('storage-type').value;
    const busType = document.getElementById('bus-type').value;
    const dataSize = parseInt(document.getElementById('data-size').value);
    
    const metrics = calculatePerformanceMetrics(storageType, busType, dataSize);
    
    return {
        timestamp: new Date().toISOString(),
        configuration: {
            storage: storageConfigs[storageType].name,
            bus: busConfigs[busType].name,
            dataSize: dataSize
        },
        metrics: metrics,
        recommendations: generateRecommendations(metrics)
    };
}

// Función para generar recomendaciones
function generateRecommendations(metrics) {
    const recommendations = [];
    
    if (metrics.latency > 5) {
        recommendations.push('Considerar SSD para reducir latencia');
    }
    
    if (metrics.bandwidth < 500) {
        recommendations.push('Actualizar a bus más rápido para mayor ancho de banda');
    }
    
    if (metrics.efficiency < 0.8) {
        recommendations.push('Optimizar configuración para mejor eficiencia');
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
    link.download = 'simulacion-almacenamiento-io.json';
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
    // Buscar y seleccionar el tipo de almacenamiento
    const storageSelect = document.getElementById('storage-type');
    for (let option of storageSelect.options) {
        if (storageConfigs[option.value].name === config.storage) {
            storageSelect.value = option.value;
            break;
        }
    }
    
    // Buscar y seleccionar el tipo de bus
    const busSelect = document.getElementById('bus-type');
    for (let option of busSelect.options) {
        if (busConfigs[option.value].name === config.bus) {
            busSelect.value = option.value;
            break;
        }
    }
    
    // Establecer tamaño de datos
    const dataSizeSlider = document.getElementById('data-size');
    const dataSizeValue = document.getElementById('data-size-value');
    dataSizeSlider.value = config.dataSize;
    dataSizeValue.textContent = config.dataSize + ' MB';
    
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
                showSection('storage');
                break;
            case '3':
                e.preventDefault();
                showSection('io-devices');
                break;
            case '4':
                e.preventDefault();
                showSection('buses');
                break;
            case '5':
                e.preventDefault();
                showSection('controllers');
                break;
            case '6':
                e.preventDefault();
                showSection('protocols');
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
