// Variables globales
let currentTheme = localStorage.getItem('theme') || 'light';
let currentSection = 'introduccion';
let isFullscreen = false;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupNavigation();
    applyTheme();
});

// Inicialización de la aplicación
function initializeApp() {
    console.log('🌐 Tema 11: Redes de Interconexión iniciado');
    
    // Aplicar animaciones de entrada
    animateElements();
    
    // Configurar atajos de teclado
    setupKeyboardShortcuts();
}

// Configurar event listeners
function setupEventListeners() {
    // Event listener para tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (isFullscreen) {
                toggleFullscreen();
            }
        }
    });
    
    // Event listener para cambios de tema del sistema
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                currentTheme = e.matches ? 'dark' : 'light';
                applyTheme();
            }
        });
    }
}

// Configurar navegación entre secciones
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            navigateToSection(sectionId);
        });
    });
}

// Navegación entre secciones
function navigateToSection(sectionId) {
    // Ocultar sección actual
    const currentSectionElement = document.querySelector('.content-section.active');
    if (currentSectionElement) {
        currentSectionElement.classList.remove('active');
    }
    
    // Mostrar nueva sección
    const newSectionElement = document.getElementById(sectionId);
    if (newSectionElement) {
        newSectionElement.classList.add('active');
        currentSection = sectionId;
    }
    
    // Actualizar navegación
    updateNavigation(sectionId);
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log(`📍 Navegando a sección: ${sectionId}`);
}

// Actualizar estado de navegación
function updateNavigation(activeSection) {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        const sectionId = button.getAttribute('data-section');
        if (sectionId === activeSection) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Navegación al portal principal
function goToMainPortal() {
    console.log('🏠 Navegando al portal principal');
    window.location.href = '../index.html';
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
    
    // Actualizar meta theme-color para móviles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', currentTheme === 'dark' ? '#0f172a' : '#10b981');
    }
    
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
            updateFullscreenButton(true);
            showNotification('Pantalla completa', 'Activado modo pantalla completa', 'info');
        }).catch(err => {
            console.error('Error al activar pantalla completa:', err);
        });
    } else {
        document.exitFullscreen().then(() => {
            isFullscreen = false;
            updateFullscreenButton(false);
            showNotification('Pantalla completa', 'Desactivado modo pantalla completa', 'info');
        }).catch(err => {
            console.error('Error al desactivar pantalla completa:', err);
        });
    }
}

// Actualizar botón de pantalla completa
function updateFullscreenButton(isFullscreen) {
    const fullscreenButton = document.querySelector('.btn-primary');
    const icon = fullscreenButton.querySelector('i');
    const text = fullscreenButton.querySelector('span');
    
    if (isFullscreen) {
        icon.className = 'fas fa-compress';
        text.textContent = 'Salir de Pantalla Completa';
    } else {
        icon.className = 'fas fa-expand';
        text.textContent = 'Pantalla Completa';
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
        if (e.key >= '1' && e.key <= '6') {
            const sections = ['introduccion', 'topologia', 'conmutacion', 'control-flujo', 'encaminamiento', 'simulador'];
            const sectionIndex = parseInt(e.key) - 1;
            
            if (sections[sectionIndex]) {
                navigateToSection(sections[sectionIndex]);
            }
        }
        
        // Flechas para navegación
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const sections = ['introduccion', 'topologia', 'conmutacion', 'control-flujo', 'encaminamiento', 'simulador'];
            const currentIndex = sections.indexOf(currentSection);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                navigateToSection(sections[currentIndex - 1]);
            } else if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
                navigateToSection(sections[currentIndex + 1]);
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

// Simulador de red (función básica para futuras expansiones)
function initializeNetworkSimulator() {
    console.log('🔧 Inicializando simulador de red...');
    // Aquí se puede agregar la lógica del simulador
}

// Calculadora de prestaciones de red
function calculateNetworkPerformance(nodes, links, diameter) {
    const results = {
        latency: diameter * 10, // Latencia base por salto
        bandwidth: links * 100, // Ancho de banda total
        scalability: Math.log2(nodes), // Factor de escalabilidad
        cost: nodes * links * 0.1 // Costo estimado
    };
    
    return results;
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

// Optimizaciones para dispositivos móviles
if (isMobile()) {
    document.documentElement.style.setProperty('--transition-normal', '0.2s ease-in-out');
    document.documentElement.style.setProperty('--transition-slow', '0.3s ease-in-out');
}

// Analytics y métricas (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('📊 Evento:', eventName, eventData);
}

// Eventos de tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-btn')) {
        const navBtn = e.target.closest('.nav-btn');
        const section = navBtn.getAttribute('data-section');
        trackEvent('section_navigation', { section: section });
    }
    
    if (e.target.closest('.card')) {
        const card = e.target.closest('.card');
        const cardType = card.className.split(' ').find(cls => cls.includes('-card'));
        trackEvent('card_interaction', { cardType: cardType });
    }
});

// ===== FUNCIONES DEL SIMULADOR =====

// Función principal del simulador
function runSimulation() {
    console.log('🚀 Ejecutando simulación de red...');
    
    // Obtener configuración
    const topology = document.getElementById('topology-select').value;
    const switching = document.getElementById('switching-select').value;
    const routing = document.getElementById('routing-select').value;
    const size = document.getElementById('network-size').value;
    
    // Simular resultados (en una implementación real, esto sería un cálculo complejo)
    const results = simulateNetwork(topology, switching, routing, parseInt(size));
    
    // Mostrar resultados
    document.getElementById('avg-latency').textContent = results.latency;
    document.getElementById('bandwidth').textContent = results.bandwidth;
    document.getElementById('throughput').textContent = results.throughput;
    document.getElementById('utilization').textContent = results.utilization;
    
    // Mostrar mensaje de éxito
    showNotification('Simulación completada exitosamente', 'success');
}

// Función de simulación de red
function simulateNetwork(topology, switching, routing, size) {
    // Simulación básica basada en parámetros
    let latency, bandwidth, throughput, utilization;
    
    // Calcular latencia basada en topología y técnica
    const baseLatency = getBaseLatency(topology, size);
    const switchingLatency = getSwitchingLatency(switching);
    latency = Math.round(baseLatency + switchingLatency);
    
    // Calcular ancho de banda
    bandwidth = getBandwidth(topology, switching, size);
    
    // Calcular throughput
    throughput = getThroughput(topology, routing, size);
    
    // Calcular utilización
    utilization = getUtilization(topology, switching, routing);
    
    return { latency, bandwidth, throughput, utilization };
}

// Función para calcular latencia base
function getBaseLatency(topology, size) {
    const latencies = {
        'mesh': Math.sqrt(size) * 2,
        'torus': Math.sqrt(size) * 1.5,
        'hypercube': Math.log2(size),
        'tree': Math.log2(size) * 2,
        'bus': 1
    };
    return latencies[topology] || 5;
}

// Función para calcular latencia de conmutación
function getSwitchingLatency(switching) {
    const latencies = {
        'store-forward': 3,
        'wormhole': 1,
        'vct': 2,
        'circuit': 0.5
    };
    return latencies[switching] || 2;
}

// Función para calcular ancho de banda
function getBandwidth(topology, switching, size) {
    let baseBandwidth = 1;
    
    // Ajustar por topología
    if (topology === 'bus') baseBandwidth = 0.5;
    else if (topology === 'hypercube') baseBandwidth = 1.5;
    
    // Ajustar por técnica de conmutación
    if (switching === 'wormhole') baseBandwidth *= 1.2;
    else if (switching === 'circuit') baseBandwidth *= 0.8;
    
    return Math.round(baseBandwidth * 100) / 100;
}

// Función para calcular throughput
function getThroughput(topology, routing, size) {
    let baseThroughput = 0.8;
    
    // Ajustar por topología
    if (topology === 'mesh') baseThroughput = 0.7;
    else if (topology === 'torus') baseThroughput = 0.9;
    else if (topology === 'hypercube') baseThroughput = 0.85;
    
    // Ajustar por algoritmo de encaminamiento
    if (routing === 'adaptive') baseThroughput *= 1.1;
    else if (routing === 'random') baseThroughput *= 0.9;
    
    return Math.round(baseThroughput * 100) / 100;
}

// Función para calcular utilización
function getUtilization(topology, switching, routing) {
    let baseUtilization = 75;
    
    // Ajustar por topología
    if (topology === 'bus') baseUtilization = 60;
    else if (topology === 'hypercube') baseUtilization = 85;
    
    // Ajustar por técnica de conmutación
    if (switching === 'wormhole') baseUtilization += 5;
    else if (switching === 'store-forward') baseUtilization -= 10;
    
    return Math.min(95, Math.max(30, baseUtilization));
}

// Función para reiniciar visualización
function resetVisualization() {
    console.log('🔄 Reiniciando visualización...');
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    showNotification('Visualización reiniciada', 'info');
}

// Función para paso de simulación
function stepSimulation() {
    console.log('⏭️ Ejecutando paso de simulación...');
    showNotification('Paso de simulación ejecutado', 'info');
}

// Función para play/pause de simulación
function playPauseSimulation() {
    console.log('⏯️ Alternando play/pause de simulación...');
    showNotification('Simulación pausada/reanudada', 'info');
}

// Función para comparar configuraciones
function compareConfigurations() {
    console.log('⚖️ Comparando configuraciones...');
    
    // Obtener configuraciones
    const configA = {
        topology: document.getElementById('config-a-topology').value,
        switching: document.getElementById('config-a-switching').value
    };
    
    const configB = {
        topology: document.getElementById('config-b-topology').value,
        switching: document.getElementById('config-b-switching').value
    };
    
    // Simular ambas configuraciones
    const resultsA = simulateNetwork(configA.topology, configA.switching, 'xy', 16);
    const resultsB = simulateNetwork(configB.topology, configB.switching, 'xy', 16);
    
    // Mostrar comparación
    const comparisonResults = document.getElementById('comparison-results');
    if (comparisonResults) {
        comparisonResults.innerHTML = `
            <div class="comparison-table">
                <h4>Comparación de Configuraciones</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Métrica</th>
                            <th>Config A</th>
                            <th>Config B</th>
                            <th>Mejor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Latencia</td>
                            <td>${resultsA.latency}</td>
                            <td>${resultsB.latency}</td>
                            <td>${resultsA.latency < resultsB.latency ? 'A' : 'B'}</td>
                        </tr>
                        <tr>
                            <td>Ancho de Banda</td>
                            <td>${resultsA.bandwidth}</td>
                            <td>${resultsB.bandwidth}</td>
                            <td>${resultsA.bandwidth > resultsB.bandwidth ? 'A' : 'B'}</td>
                        </tr>
                        <tr>
                            <td>Throughput</td>
                            <td>${resultsA.throughput}</td>
                            <td>${resultsB.throughput}</td>
                            <td>${resultsA.throughput > resultsB.throughput ? 'A' : 'B'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    
    showNotification('Comparación completada', 'success');
}

// Función para calcular prestaciones
function calculatePerformance() {
    console.log('🧮 Calculando prestaciones...');
    
    const nodes = parseInt(document.getElementById('calc-nodes').value);
    const diameter = parseInt(document.getElementById('calc-diameter').value);
    const bandwidth = parseFloat(document.getElementById('calc-bandwidth').value);
    const latency = parseFloat(document.getElementById('calc-latency').value);
    
    // Calcular métricas
    const totalLatency = diameter * latency;
    const totalBandwidth = nodes * bandwidth;
    const scalability = Math.log2(nodes) / diameter;
    const cost = nodes * diameter;
    
    // Mostrar resultados
    document.getElementById('calc-total-latency').textContent = totalLatency.toFixed(2);
    document.getElementById('calc-total-bandwidth').textContent = totalBandwidth.toFixed(2);
    document.getElementById('calc-scalability').textContent = scalability.toFixed(2);
    document.getElementById('calc-cost').textContent = cost;
    
    showNotification('Cálculo de prestaciones completado', 'success');
}

// Exportar funciones para uso global
window.navigateToSection = navigateToSection;
window.goToMainPortal = goToMainPortal;
window.toggleTheme = toggleTheme;
window.toggleFullscreen = toggleFullscreen;
window.calculateNetworkPerformance = calculateNetworkPerformance;
window.runSimulation = runSimulation;
window.resetVisualization = resetVisualization;
window.stepSimulation = stepSimulation;
window.playPauseSimulation = playPauseSimulation;
window.compareConfigurations = compareConfigurations;
window.calculatePerformance = calculatePerformance;
