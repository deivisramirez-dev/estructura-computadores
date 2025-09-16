// Variables globales
let currentTheme = localStorage.getItem('theme') || 'light';
let isFullscreen = false;
let speedupChart = null;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    applyTheme();
    initializeCalculators();
});

// Inicialización de la aplicación
function initializeApp() {
    console.log('🚀 Tema 9: Computadores Paralelos iniciado');
    
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
    
    // Event listeners para calculadoras
    const parallelFractionInput = document.getElementById('parallel-fraction');
    const processorsInput = document.getElementById('processors');
    
    if (parallelFractionInput) {
        parallelFractionInput.addEventListener('input', updateAmdahlCalculation);
    }
    
    if (processorsInput) {
        processorsInput.addEventListener('input', updateAmdahlCalculation);
    }
    
    // Event listeners para simulador
    const simParallelFractionInput = document.getElementById('sim-parallel-fraction');
    const simMaxProcessorsInput = document.getElementById('sim-max-processors');
    
    if (simParallelFractionInput) {
        simParallelFractionInput.addEventListener('input', updateSimulatorDisplay);
    }
    
    if (simMaxProcessorsInput) {
        simMaxProcessorsInput.addEventListener('input', updateSimulatorDisplay);
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
    updateAmdahlCalculation();
    updateSimulatorDisplay();
}

// Actualizar cálculo de Amdahl
function updateAmdahlCalculation() {
    const parallelFraction = parseFloat(document.getElementById('parallel-fraction').value);
    const processors = parseInt(document.getElementById('processors').value);
    
    // Actualizar valores mostrados
    document.getElementById('parallel-fraction-value').textContent = parallelFraction.toFixed(2);
    document.getElementById('processors-value').textContent = processors;
    
    // Calcular speedup usando la Ley de Amdahl
    const speedup = calculateAmdahlSpeedup(parallelFraction, processors);
    
    // Actualizar resultado
    document.getElementById('speedup-result').textContent = speedup.toFixed(2);
}

// Calcular speedup según la Ley de Amdahl
function calculateAmdahlSpeedup(parallelFraction, processors) {
    if (parallelFraction === 0) return 1;
    if (processors === 1) return 1;
    
    return 1 / ((1 - parallelFraction) + (parallelFraction / processors));
}

// Actualizar display del simulador
function updateSimulatorDisplay() {
    const parallelFraction = parseFloat(document.getElementById('sim-parallel-fraction').value);
    const maxProcessors = parseInt(document.getElementById('sim-max-processors').value);
    
    // Actualizar valores mostrados
    document.getElementById('sim-parallel-fraction-display').textContent = parallelFraction.toFixed(2);
    document.getElementById('sim-max-processors-display').textContent = maxProcessors;
}

// Ejecutar simulación de speedup
function runSpeedupSimulation() {
    const parallelFraction = parseFloat(document.getElementById('sim-parallel-fraction').value);
    const maxProcessors = parseInt(document.getElementById('sim-max-processors').value);
    
    // Generar datos para el gráfico
    const data = generateSpeedupData(parallelFraction, maxProcessors);
    
    // Crear o actualizar gráfico
    createSpeedupChart(data);
    
    // Calcular métricas
    const maxSpeedup = Math.max(...data.map(d => d.speedup));
    const maxEfficiency = (maxSpeedup / maxProcessors) * 100;
    
    // Actualizar estadísticas
    document.getElementById('max-speedup').textContent = maxSpeedup.toFixed(2);
    document.getElementById('max-efficiency').textContent = maxEfficiency.toFixed(1);
    
    showNotification(
        'Simulación completada',
        `Speedup máximo: ${maxSpeedup.toFixed(2)}x, Eficiencia máxima: ${maxEfficiency.toFixed(1)}%`,
        'success'
    );
}

// Generar datos de speedup
function generateSpeedupData(parallelFraction, maxProcessors) {
    const data = [];
    
    for (let p = 1; p <= maxProcessors; p++) {
        const speedup = calculateAmdahlSpeedup(parallelFraction, p);
        const efficiency = (speedup / p) * 100;
        
        data.push({
            processors: p,
            speedup: speedup,
            efficiency: efficiency
        });
    }
    
    return data;
}

// Crear gráfico de speedup
function createSpeedupChart(data) {
    const ctx = document.getElementById('speedupChart');
    if (!ctx) return;
    
    // Destruir gráfico existente si existe
    if (speedupChart) {
        speedupChart.destroy();
    }
    
    speedupChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.processors),
            datasets: [
                {
                    label: 'Speedup',
                    data: data.map(d => d.speedup),
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Eficiencia (%)',
                    data: data.map(d => d.efficiency),
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
                    text: 'Speedup y Eficiencia vs Número de Procesadores'
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
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Speedup'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Eficiencia (%)'
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
    // Inicializar gráfico de speedup si está en la sección de ejemplos
    const currentSection = document.querySelector('.content-section.active');
    if (currentSection && currentSection.id === 'ejemplos') {
        runSpeedupSimulation();
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
            const sections = ['introduccion', 'paralelismo', 'clasificacion', 'multiprocesadores', 'multicomputadores', 'prestaciones', 'programacion', 'optimizacion', 'ejemplos'];
            
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

// Exportar funciones para uso global
window.switchSection = switchSection;
window.toggleTheme = toggleTheme;
window.toggleFullscreen = toggleFullscreen;
window.goToMainPortal = goToMainPortal;
window.runSpeedupSimulation = runSpeedupSimulation;
window.updateAmdahlCalculation = updateAmdahlCalculation;
window.updateSimulatorDisplay = updateSimulatorDisplay;
