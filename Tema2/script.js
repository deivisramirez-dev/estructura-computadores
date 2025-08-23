// Variables globales
let amdahlChart = null;
let costChart = null;
let currentTheme = localStorage.getItem('theme') || 'light';

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    applyTheme(); // Aplicar tema guardado
    initializeNavigation();
    initializeCalculators();
    initializeCharts();
    initializeSliders();
    initializeAnimations();
});

// Navegación entre secciones
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remover clase active de todos los botones y secciones
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Agregar clase active al botón clickeado y su sección correspondiente
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Actualizar gráficos si es necesario
            if (targetSection === 'ley-amdahl' && amdahlChart) {
                amdahlChart.resize();
            }
            if (targetSection === 'coste' && costChart) {
                costChart.resize();
            }
        });
    });

    // Navegación por teclado
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.nav-btn.active');
        const buttons = Array.from(document.querySelectorAll('.nav-btn'));
        const currentIndex = buttons.indexOf(activeButton);
        
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % buttons.length;
                buttons[nextIndex].click();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? buttons.length - 1 : currentIndex - 1;
                buttons[prevIndex].click();
                break;
            case 'F11':
                e.preventDefault();
                toggleFullscreen();
                break;
        }
    });
}

// Calculadoras interactivas
function initializeCalculators() {
    // Calculadora de Tiempo de CPU
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCPUTime);
    }

    // Calculadora de MIPS
    const calculateMipsBtn = document.getElementById('calculate-mips-btn');
    if (calculateMipsBtn) {
        calculateMipsBtn.addEventListener('click', calculateMIPS);
    }

    // Calculadora de MFLOPS
    const calculateMflopsBtn = document.getElementById('calculate-mflops-btn');
    if (calculateMflopsBtn) {
        calculateMflopsBtn.addEventListener('click', calculateMFLOPS);
    }
}

// Cálculo del tiempo de CPU
function calculateCPUTime() {
    const ni = parseFloat(document.getElementById('ni-input').value);
    const cpi = parseFloat(document.getElementById('cpi-input').value);
    const tcycle = parseFloat(document.getElementById('tcycle-input').value);
    
    if (isNaN(ni) || isNaN(cpi) || isNaN(tcycle)) {
        showNotification('Por favor, ingresa valores válidos', 'error');
        return;
    }
    
    const cpuTime = ni * cpi * tcycle; // en nanosegundos
    const cpuTimeMs = cpuTime / 1000000; // convertir a milisegundos
    
    document.getElementById('cpu-time').textContent = `${cpuTimeMs.toFixed(3)} ms`;
    
    // Animación del resultado
    const resultElement = document.getElementById('cpu-result');
    resultElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        resultElement.style.transform = 'scale(1)';
    }, 200);
}

// Cálculo de MIPS
function calculateMIPS() {
    const ni = parseFloat(document.getElementById('mips-ni').value);
    const time = parseFloat(document.getElementById('mips-time').value);
    
    if (isNaN(ni) || isNaN(time) || time === 0) {
        showNotification('Por favor, ingresa valores válidos', 'error');
        return;
    }
    
    const mips = (ni / time) / 1000000; // Convertir a millones
    document.getElementById('mips-value').textContent = `${mips.toFixed(1)} MIPS`;
    
    // Animación del resultado
    const resultElement = document.getElementById('mips-result');
    resultElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        resultElement.style.transform = 'scale(1)';
    }, 200);
}

// Cálculo de MFLOPS
function calculateMFLOPS() {
    const ops = parseFloat(document.getElementById('mflops-ops').value);
    const time = parseFloat(document.getElementById('mflops-time').value);
    
    if (isNaN(ops) || isNaN(time) || time === 0) {
        showNotification('Por favor, ingresa valores válidos', 'error');
        return;
    }
    
    const mflops = (ops / time) / 1000000; // Convertir a millones
    document.getElementById('mflops-value').textContent = `${mflops.toFixed(1)} MFLOPS`;
    
    // Animación del resultado
    const resultElement = document.getElementById('mflops-result');
    resultElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        resultElement.style.transform = 'scale(1)';
    }, 200);
}

// Inicialización de sliders para la Ley de Amdahl
function initializeSliders() {
    const fractionSlider = document.getElementById('fraction-input');
    const improvementSlider = document.getElementById('improvement-input');
    
    if (fractionSlider && improvementSlider) {
        fractionSlider.addEventListener('input', updateAmdahlCalculation);
        improvementSlider.addEventListener('input', updateAmdahlCalculation);
        
        // Inicializar cálculo
        updateAmdahlCalculation();
    }
}

// Actualizar cálculo de la Ley de Amdahl
function updateAmdahlCalculation() {
    const fraction = parseFloat(document.getElementById('fraction-input').value);
    const improvement = parseFloat(document.getElementById('improvement-input').value);
    
    document.getElementById('fraction-value').textContent = fraction.toFixed(2);
    document.getElementById('improvement-value').textContent = `${improvement}x`;
    
    // Calcular aceleración según la Ley de Amdahl
    const speedup = 1 / (fraction + (1 - fraction) / improvement);
    document.getElementById('speedup-value').textContent = `${speedup.toFixed(2)}x`;
    
    // Actualizar gráfico si existe
    if (amdahlChart) {
        updateAmdahlChart(fraction, improvement);
    }
}

// Inicialización de gráficos
function initializeCharts() {
    // Gráfico de la Ley de Amdahl
    const amdahlCanvas = document.getElementById('amdahlChart');
    if (amdahlCanvas) {
        createAmdahlChart();
    }
    
    // Gráfico de costes
    const costCanvas = document.getElementById('costChart');
    if (costCanvas) {
        createCostChart();
    }
}

// Crear gráfico de la Ley de Amdahl
function createAmdahlChart() {
    const ctx = document.getElementById('amdahlChart').getContext('2d');
    
    const fraction = parseFloat(document.getElementById('fraction-input').value);
    const improvement = parseFloat(document.getElementById('improvement-input').value);
    
    const data = generateAmdahlData(fraction, improvement);
    
    amdahlChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Aceleración',
                data: data.speedup,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Ley de Amdahl - Aceleración vs Número de Procesadores',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Número de Procesadores'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Aceleración'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Generar datos para el gráfico de Amdahl
function generateAmdahlData(fraction, improvement) {
    const labels = [];
    const speedup = [];
    
    for (let i = 1; i <= 50; i++) {
        labels.push(i);
        const s = 1 / (fraction + (1 - fraction) / i);
        speedup.push(s);
    }
    
    return { labels, speedup };
}

// Actualizar gráfico de Amdahl
function updateAmdahlChart(fraction, improvement) {
    if (!amdahlChart) return;
    
    const data = generateAmdahlData(fraction, improvement);
    
    amdahlChart.data.labels = data.labels;
    amdahlChart.data.datasets[0].data = data.speedup;
    amdahlChart.update();
}

// Crear gráfico de costes
function createCostChart() {
    const ctx = document.getElementById('costChart').getContext('2d');
    
    costChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Año 1', 'Año 2', 'Año 3', 'Año 4', 'Año 5'],
            datasets: [{
                label: 'Coste de Fabricación',
                data: [100, 85, 72, 61, 52],
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Coste de Desarrollo',
                data: [100, 95, 90, 85, 80],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Curva de Aprendizaje - Evolución de Costes',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Coste Relativo (%)'
                    },
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Inicialización de animaciones
function initializeAnimations() {
    // Animación de contadores
    animateCounters();
    
    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Animación de contadores
function animateCounters() {
    const counters = document.querySelectorAll('.metric-item');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// Gestión del tema oscuro/claro
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
    
    // Actualizar texto del botón
    const themeButton = document.querySelector('.btn-secondary');
    const icon = themeButton.querySelector('i');
    const text = themeButton.querySelector('span');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        text.textContent = 'Tema Claro';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Tema Oscuro';
    }
    
    // Actualizar gráficos con nuevo tema
    updateChartsTheme();
    
    showNotification(
        'Tema cambiado',
        `Cambiado a tema ${currentTheme === 'dark' ? 'oscuro' : 'claro'}`,
        'success'
    );
}

// Aplicar tema
function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Actualizar meta theme-color para móviles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', currentTheme === 'dark' ? '#0f172a' : '#2563eb');
    }
}

// Actualizar tema de gráficos
function updateChartsTheme() {
    if (amdahlChart) {
        amdahlChart.options.plugins.legend.labels.color = currentTheme === 'dark' ? '#e2e8f0' : '#1e293b';
        amdahlChart.update();
    }
    if (costChart) {
        costChart.options.plugins.legend.labels.color = currentTheme === 'dark' ? '#e2e8f0' : '#1e293b';
        costChart.update();
    }
}

// Función para navegar al portal principal
function goToMainPortal() {
    window.location.href = '../index.html';
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Colores según el tipo
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            notification.style.color = '#212529';
            break;
        default:
            notification.style.backgroundColor = '#17a2b8';
    }
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para alternar pantalla completa
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error al entrar en pantalla completa:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Función para actualizar gráficos
function updateCharts() {
    if (amdahlChart) {
        amdahlChart.resize();
    }
    if (costChart) {
        costChart.resize();
    }
}

// Event listener para el botón de actualizar gráfico
document.addEventListener('DOMContentLoaded', function() {
    const updateChartBtn = document.getElementById('update-chart');
    if (updateChartBtn) {
        updateChartBtn.addEventListener('click', function() {
            updateCharts();
            showNotification('Gráficos actualizados', 'success');
        });
    }
});

// Función para formatear números grandes
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Función para calcular el tiempo de ejecución
function calculateExecutionTime(instructions, cpi, clockSpeed) {
    const cycles = instructions * cpi;
    const timeSeconds = cycles / clockSpeed;
    return timeSeconds;
}

// Función para calcular la eficiencia
function calculateEfficiency(actualSpeedup, theoreticalSpeedup) {
    return (actualSpeedup / theoreticalSpeedup) * 100;
}

// Función para simular el rendimiento de un pipeline
function simulatePipeline(stages, instructions) {
    const cycles = stages + instructions - 1;
    const cpi = cycles / instructions;
    return { cycles, cpi };
}

// Función para calcular el throughput
function calculateThroughput(instructions, time) {
    return instructions / time;
}

// Función para calcular la latencia
function calculateLatency(stages, clockPeriod) {
    return stages * clockPeriod;
}

// Función para generar datos de benchmark
function generateBenchmarkData() {
    return {
        cpu: {
            singleCore: Math.random() * 1000 + 500,
            multiCore: Math.random() * 3000 + 1500
        },
        memory: {
            read: Math.random() * 50000 + 25000,
            write: Math.random() * 30000 + 15000
        },
        storage: {
            sequential: Math.random() * 500 + 250,
            random: Math.random() * 100 + 50
        }
    };
}

// Función para calcular el IPC (Instructions Per Cycle)
function calculateIPC(instructions, cycles) {
    return instructions / cycles;
}

// Función para calcular el CPI (Cycles Per Instruction)
function calculateCPI(cycles, instructions) {
    return cycles / instructions;
}

// Función para calcular la frecuencia efectiva
function calculateEffectiveFrequency(instructions, time) {
    return instructions / time;
}

// Función para simular cache hit rate
function simulateCacheHitRate(cacheSize, accessPattern) {
    // Simulación simplificada del hit rate de cache
    const baseHitRate = 0.8;
    const sizeFactor = Math.min(cacheSize / 1024, 1); // Normalizar a 1MB
    const patternFactor = accessPattern === 'sequential' ? 0.9 : 0.7;
    
    return baseHitRate * sizeFactor * patternFactor;
}

// Función para calcular el ancho de banda de memoria
function calculateMemoryBandwidth(dataWidth, frequency, channels) {
    return (dataWidth * frequency * channels) / 8; // En bytes por segundo
}

// Función para calcular la potencia
function calculatePower(voltage, current) {
    return voltage * current;
}

// Función para calcular la eficiencia energética
function calculateEnergyEfficiency(performance, power) {
    return performance / power;
}

// Función para generar reporte de rendimiento
function generatePerformanceReport(data) {
    const report = {
        timestamp: new Date().toISOString(),
        metrics: data,
        summary: {
            average: Object.values(data).reduce((a, b) => a + b, 0) / Object.values(data).length,
            max: Math.max(...Object.values(data)),
            min: Math.min(...Object.values(data))
        }
    };
    
    return report;
}

// Función para exportar datos
function exportData(data, format = 'json') {
    let content;
    let filename;
    let mimeType;
    
    switch(format) {
        case 'json':
            content = JSON.stringify(data, null, 2);
            filename = 'performance_data.json';
            mimeType = 'application/json';
            break;
        case 'csv':
            content = convertToCSV(data);
            filename = 'performance_data.csv';
            mimeType = 'text/csv';
            break;
        default:
            content = JSON.stringify(data, null, 2);
            filename = 'performance_data.json';
            mimeType = 'application/json';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Función auxiliar para convertir a CSV
function convertToCSV(data) {
    if (typeof data === 'object' && !Array.isArray(data)) {
        const headers = Object.keys(data);
        const values = Object.values(data);
        return headers.join(',') + '\n' + values.join(',');
    }
    return JSON.stringify(data);
}

// Función para validar entrada numérica
function validateNumericInput(input, min = 0, max = Infinity) {
    const value = parseFloat(input);
    if (isNaN(value)) {
        return { valid: false, message: 'El valor debe ser un número' };
    }
    if (value < min) {
        return { valid: false, message: `El valor debe ser mayor o igual a ${min}` };
    }
    if (value > max) {
        return { valid: false, message: `El valor debe ser menor o igual a ${max}` };
    }
    return { valid: true, value };
}

// Función para crear tooltips
function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    element.addEventListener('mouseenter', function(e) {
        tooltip.style.opacity = '1';
        document.body.appendChild(tooltip);
    });
    
    element.addEventListener('mousemove', function(e) {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY - 10 + 'px';
    });
    
    element.addEventListener('mouseleave', function() {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    });
}

// Función para crear elementos interactivos
function createInteractiveElement(type, data) {
    const element = document.createElement('div');
    element.className = `interactive-${type}`;
    
    switch(type) {
        case 'button':
            element.innerHTML = `<button>${data.text}</button>`;
            break;
        case 'slider':
            element.innerHTML = `
                <input type="range" min="${data.min}" max="${data.max}" value="${data.value}">
                <span class="value">${data.value}</span>
            `;
            break;
        case 'input':
            element.innerHTML = `
                <label>${data.label}</label>
                <input type="number" value="${data.value}" placeholder="${data.placeholder}">
            `;
            break;
    }
    
    return element;
}

// Función para actualizar la interfaz en tiempo real
function updateInterface() {
    // Actualizar métricas en tiempo real
    const metrics = generateBenchmarkData();
    
    // Actualizar elementos de la interfaz si existen
    const metricElements = document.querySelectorAll('.metric-value');
    metricElements.forEach((element, index) => {
        const values = Object.values(metrics).flat();
        if (values[index]) {
            element.textContent = formatNumber(values[index]);
        }
    });
}

// Función para inicializar todas las funcionalidades
function initializeAll() {
    initializeNavigation();
    initializeCalculators();
    initializeCharts();
    initializeSliders();
    initializeAnimations();
    
    // Actualizar interfaz cada 5 segundos
    setInterval(updateInterface, 5000);
    
    // Crear tooltips para elementos importantes
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        createTooltip(element, element.getAttribute('data-tooltip'));
    });
}

// Llamar a la inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

// Exportar funciones para uso global
window.showSection = showSection;
window.toggleTheme = toggleTheme;
window.toggleFullscreen = toggleFullscreen;
window.goToMainPortal = goToMainPortal;
window.showNotification = showNotification;
