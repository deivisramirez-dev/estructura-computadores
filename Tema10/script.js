// Variables globales
let currentTheme = localStorage.getItem('theme') || 'light';
let isFullscreen = false;
let networkChart = null;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    applyTheme();
    initializeCalculators();
});

// Inicialización de la aplicación
function initializeApp() {
    console.log('🚀 Tema 10: Sistemas de Comunicación iniciado');
    
    // Aplicar animaciones de entrada
    animateElements();
    
    // Configurar atajos de teclado
    setupKeyboardShortcuts();
    
    // Inicializar calculadoras
    initializeCalculators();
}

// Configurar event listeners
function setupEventListeners() {
    // Event listeners para navegación
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });
    
    // Event listeners para simulador
    const simLatencyInput = document.getElementById('sim-latency');
    const simBandwidthInput = document.getElementById('sim-bandwidth');
    
    if (simLatencyInput) {
        simLatencyInput.addEventListener('input', updateSimulatorDisplay);
    }
    
    if (simBandwidthInput) {
        simBandwidthInput.addEventListener('input', updateSimulatorDisplay);
    }
}

// Navegación entre secciones
function switchSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Actualizar botones de navegación
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-section') === sectionId) {
            button.classList.add('active');
        }
    });
    
    // Inicializar gráficos si es necesario
    if (sectionId === 'prestaciones' || sectionId === 'ejemplos') {
        setTimeout(() => {
            initializeCharts();
        }, 100);
    }
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
    
    showNotification(
        'Tema cambiado',
        `Cambiado a tema ${currentTheme === 'dark' ? 'oscuro' : 'claro'}`,
        'success'
    );
}

// Aplicar tema
function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Actualizar texto del botón
    const themeButton = document.querySelector('.btn-secondary');
    if (themeButton) {
        const icon = themeButton.querySelector('i');
        const text = themeButton.querySelector('span');
        
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
            text.textContent = 'Tema Claro';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Tema Oscuro';
        }
    }
}

// Pantalla completa
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            isFullscreen = true;
            showNotification('Pantalla completa', 'Activado modo pantalla completa', 'info');
        }).catch(err => {
            console.error('Error al activar pantalla completa:', err);
        });
    } else {
        document.exitFullscreen().then(() => {
            isFullscreen = false;
            showNotification('Pantalla completa', 'Desactivado modo pantalla completa', 'info');
        }).catch(err => {
            console.error('Error al desactivar pantalla completa:', err);
        });
    }
}

// Navegación al portal principal
function goToMainPortal() {
    window.location.href = '../index.html';
}

// Inicializar calculadoras
function initializeCalculators() {
    updateSimulatorDisplay();
}

// Actualizar display del simulador
function updateSimulatorDisplay() {
    const latency = parseFloat(document.getElementById('sim-latency').value);
    const bandwidth = parseInt(document.getElementById('sim-bandwidth').value);
    
    // Actualizar valores mostrados
    document.getElementById('sim-latency-display').textContent = latency.toFixed(1);
    document.getElementById('sim-bandwidth-display').textContent = bandwidth;
}

// Calcular prestaciones de red
function calculatePerformance() {
    const latency = parseFloat(document.getElementById('latency').value);
    const bandwidth = parseFloat(document.getElementById('bandwidth').value);
    const messageSize = parseFloat(document.getElementById('message-size').value);
    
    // Calcular tiempo total usando la fórmula T(m) = L + m/B
    const totalTime = latency + (messageSize / bandwidth);
    
    // Calcular productividad P(m) = m/T(m)
    const productivity = messageSize / totalTime;
    
    // Calcular eficiencia (productividad / ancho de banda teórico)
    const efficiency = (productivity / bandwidth) * 100;
    
    // Actualizar resultados
    document.getElementById('total-time').textContent = totalTime.toFixed(2);
    document.getElementById('productivity').textContent = productivity.toFixed(2);
    document.getElementById('efficiency').textContent = efficiency.toFixed(1);
    
    showNotification(
        'Cálculo completado',
        `Tiempo total: ${totalTime.toFixed(2)} μs, Productividad: ${productivity.toFixed(2)} MB/s`,
        'success'
    );
}

// Ejecutar simulación de red
function runNetworkSimulation() {
    const latency = parseFloat(document.getElementById('sim-latency').value);
    const bandwidth = parseInt(document.getElementById('sim-bandwidth').value);
    
    // Generar datos para el gráfico
    const data = generateNetworkData(latency, bandwidth);
    
    // Crear o actualizar gráfico
    createNetworkChart(data);
    
    // Calcular métricas
    const maxProductivity = Math.max(...data.map(d => d.productivity));
    const avgLatency = data.reduce((sum, d) => sum + d.latency, 0) / data.length;
    
    // Actualizar estadísticas
    document.getElementById('sim-total-latency').textContent = avgLatency.toFixed(2);
    document.getElementById('sim-productivity').textContent = maxProductivity.toFixed(2);
    
    showNotification(
        'Simulación completada',
        `Latencia promedio: ${avgLatency.toFixed(2)} μs, Productividad máxima: ${maxProductivity.toFixed(2)} MB/s`,
        'success'
    );
}

// Generar datos de red
function generateNetworkData(latency, bandwidth) {
    const data = [];
    const messageSizes = [64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768];
    
    messageSizes.forEach(size => {
        const totalLatency = latency + (size / bandwidth);
        const productivity = size / totalLatency;
        
        data.push({
            messageSize: size,
            latency: totalLatency,
            productivity: productivity
        });
    });
    
    return data;
}

// Crear gráfico de red
function createNetworkChart(data) {
    const ctx = document.getElementById('networkChart');
    if (!ctx) return;
    
    // Destruir gráfico existente si existe
    if (networkChart) {
        networkChart.destroy();
    }
    
    networkChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.messageSize),
            datasets: [
                {
                    label: 'Latencia Total (μs)',
                    data: data.map(d => d.latency),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Productividad (MB/s)',
                    data: data.map(d => d.productivity),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Latencia y Productividad vs Tamaño de Mensaje'
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
                        text: 'Tamaño de Mensaje (bytes)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Latencia (μs)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Productividad (MB/s)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

// Inicializar gráficos
function initializeCharts() {
    // Inicializar gráfico de red si está en la sección de ejemplos
    const currentSection = document.querySelector('.content-section.active');
    if (currentSection && currentSection.id === 'ejemplos') {
        runNetworkSimulation();
    }
}

// Configurar atajos de teclado
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + D para cambiar tema
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleTheme();
        }
        
        // F11 para pantalla completa
        if (e.key === 'F11') {
            e.preventDefault();
            toggleFullscreen();
        }
        
        // Números para navegación rápida
        if (e.key >= '1' && e.key <= '9') {
            const sectionIndex = parseInt(e.key) - 1;
            const sections = ['introduccion', 'clasificacion', 'estructura', 'interfaz', 'conmutadores', 'enlaces', 'prestaciones', 'topologias', 'ejemplos'];
            
            if (sections[sectionIndex]) {
                switchSection(sections[sectionIndex]);
            }
        }
    });
}

// Mostrar notificaciones
function showNotification(title, message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-header">
            <h4>${title}</h4>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <p>${message}</p>
    `;
    
    // Agregar estilos si no existen
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: var(--spacing-lg);
                box-shadow: var(--shadow-xl);
                z-index: 10000;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-info {
                border-left: 4px solid var(--info-color);
            }
            
            .notification-success {
                border-left: 4px solid var(--success-color);
            }
            
            .notification-warning {
                border-left: 4px solid var(--warning-color);
            }
            
            .notification-error {
                border-left: 4px solid var(--danger-color);
            }
            
            .notification-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--spacing-sm);
            }
            
            .notification-header h4 {
                margin: 0;
                font-size: 1rem;
                font-weight: 600;
                color: var(--text-primary);
            }
            
            .notification-header button {
                background: none;
                border: none;
                color: var(--text-muted);
                cursor: pointer;
                padding: var(--spacing-xs);
                border-radius: var(--radius-sm);
                transition: all var(--transition-fast);
            }
            
            .notification-header button:hover {
                background: var(--bg-tertiary);
                color: var(--text-primary);
            }
            
            .notification p {
                margin: 0;
                color: var(--text-secondary);
                font-size: 0.875rem;
                line-height: 1.5;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Animaciones de elementos
function animateElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.card, .nav-btn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Utilidades
function formatNumber(num) {
    return new Intl.NumberFormat('es-ES').format(num);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Detectar dispositivo móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Detectar conexión lenta
function isSlowConnection() {
    return navigator.connection && 
           (navigator.connection.effectiveType === 'slow-2g' || 
            navigator.connection.effectiveType === '2g');
}

// Optimizaciones para dispositivos móviles
if (isMobile()) {
    // Reducir animaciones en móviles
    document.documentElement.style.setProperty('--transition-normal', '0.2s ease-in-out');
    document.documentElement.style.setProperty('--transition-slow', '0.3s ease-in-out');
}

// Optimizaciones para conexiones lentas
if (isSlowConnection()) {
    // Deshabilitar animaciones en conexiones lentas
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// Simulador de Topologías
function runTopologySimulation() {
    const topologyType = document.getElementById('topology-type').value;
    const networkSize = parseInt(document.getElementById('network-size').value);
    
    // Calcular métricas según el tipo de topología
    const metrics = calculateTopologyMetrics(topologyType, networkSize);
    
    // Crear o actualizar gráfico
    createTopologyChart(metrics);
    
    // Actualizar estadísticas
    document.getElementById('diameter-result').textContent = metrics.diameter;
    document.getElementById('degree-result').textContent = metrics.degree;
    document.getElementById('bisection-result').textContent = metrics.bisection;
    
    showNotification(
        'Simulación completada',
        `Topología ${topologyType} con ${networkSize} nodos simulada`,
        'success'
    );
}

// Calcular métricas de topología
function calculateTopologyMetrics(type, size) {
    let metrics = {};
    
    switch(type) {
        case 'mesh':
            metrics.diameter = Math.ceil(2 * Math.sqrt(size));
            metrics.degree = 4;
            metrics.bisection = Math.floor(Math.sqrt(size));
            break;
        case 'torus':
            metrics.diameter = Math.ceil(Math.sqrt(size));
            metrics.degree = 4;
            metrics.bisection = Math.floor(2 * Math.sqrt(size));
            break;
        case 'hypercube':
            const dim = Math.log2(size);
            metrics.diameter = Math.floor(dim);
            metrics.degree = Math.floor(dim);
            metrics.bisection = Math.floor(size / 2);
            break;
        case 'fat-tree':
            const levels = Math.ceil(Math.log2(size));
            metrics.diameter = 2 * levels;
            metrics.degree = 'Variable';
            metrics.bisection = Math.floor(size / 2);
            break;
        default:
            metrics.diameter = 0;
            metrics.degree = 0;
            metrics.bisection = 0;
    }
    
    return metrics;
}

// Crear gráfico de topología
function createTopologyChart(metrics) {
    const ctx = document.getElementById('topologyChart');
    if (!ctx) return;
    
    // Destruir gráfico existente si existe
    if (networkChart) {
        networkChart.destroy();
    }
    
    const data = {
        labels: ['Diámetro', 'Grado', 'Bisection Width'],
        datasets: [{
            label: 'Métricas de Topología',
            data: [metrics.diameter, metrics.degree, metrics.bisection],
            backgroundColor: [
                'rgba(37, 99, 235, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)'
            ],
            borderColor: [
                'rgb(37, 99, 235)',
                'rgb(16, 185, 129)',
                'rgb(245, 158, 11)'
            ],
            borderWidth: 2
        }]
    };
    
    networkChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Métricas de Topología de Red'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Métrica'
                    }
                }
            }
        }
    });
}

// Actualizar display del simulador de topologías
function updateTopologyDisplay() {
    const networkSize = parseInt(document.getElementById('network-size').value);
    document.getElementById('network-size-display').textContent = networkSize;
}

// Event listeners para simulador de topologías
document.addEventListener('DOMContentLoaded', function() {
    const networkSizeInput = document.getElementById('network-size');
    if (networkSizeInput) {
        networkSizeInput.addEventListener('input', updateTopologyDisplay);
    }
});

// Exportar funciones para uso global
window.switchSection = switchSection;
window.toggleTheme = toggleTheme;
window.toggleFullscreen = toggleFullscreen;
window.goToMainPortal = goToMainPortal;
window.runNetworkSimulation = runNetworkSimulation;
window.updateSimulatorDisplay = updateSimulatorDisplay;
window.calculatePerformance = calculatePerformance;
window.runTopologySimulation = runTopologySimulation;
window.updateTopologyDisplay = updateTopologyDisplay;
