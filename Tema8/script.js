// Variables globales
let currentTheme = localStorage.getItem('theme') || 'light';
let isFullscreen = false;
let performanceChart = null;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    applyTheme();
    initializeCalculators();
});

// Inicialización de la aplicación
function initializeApp() {
    console.log('🚀 Tema 8: Procesadores Vectoriales iniciado');
    
    // Aplicar animaciones de entrada
    animateElements();
    
    // Configurar atajos de teclado
    setupKeyboardShortcuts();
    
    // Inicializar calculadoras
    setupCalculators();
}

// Configurar event listeners
function setupEventListeners() {
    // Event listeners para navegación entre secciones
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });
    
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
    
    // Event listeners para calculadoras
    setupCalculatorEventListeners();
}

// Navegación entre secciones
function switchSection(sectionId) {
    // Remover clase active de todos los botones y secciones
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    
    // Activar el botón y sección seleccionados
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    document.getElementById(sectionId).classList.add('active');
    
    // Scroll suave hacia la sección
    document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Actualizar URL sin recargar la página
    history.pushState(null, null, `#${sectionId}`);
    
    // Trackear evento
    trackEvent('section_switched', { section: sectionId });
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
        metaThemeColor.setAttribute('content', currentTheme === 'dark' ? '#0f172a' : '#2563eb');
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
            const sectionIndex = parseInt(e.key) - 1;
            const sections = ['introduccion', 'arquitectura', 'memoria', 'rendimiento', 'eficiencia', 'ejemplos'];
            
            if (sections[sectionIndex]) {
                switchSection(sections[sectionIndex]);
            }
        }
        
        // Flechas para navegación
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            navigateWithArrows(e.key === 'ArrowRight');
        }
    });
}

// Navegación con flechas
function navigateWithArrows(forward) {
    const sections = ['introduccion', 'arquitectura', 'memoria', 'rendimiento', 'eficiencia', 'ejemplos'];
    const currentSection = document.querySelector('.content-section.active').id;
    const currentIndex = sections.indexOf(currentSection);
    
    let nextIndex;
    if (forward) {
        nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
    } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    }
    
    switchSection(sections[nextIndex]);
}

// Configurar calculadoras
function setupCalculators() {
    // Configurar calculadora de rendimiento
    setupPerformanceCalculator();
    
    // Configurar simulador
    setupSimulator();
}

// Configurar calculadora de rendimiento
function setupPerformanceCalculator() {
    const inputs = ['tli', 'tpc', 'vector-length'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calculatePerformance);
        }
    });
}

// Calcular rendimiento
function calculatePerformance() {
    const tli = parseFloat(document.getElementById('tli').value) || 0;
    const tpc = parseFloat(document.getElementById('tpc').value) || 0;
    const vectorLength = parseInt(document.getElementById('vector-length').value) || 0;
    
    if (tli <= 0 || tpc <= 0 || vectorLength <= 0) {
        return;
    }
    
    // Calcular tiempo total
    const totalTime = tli + vectorLength * tpc;
    
    // Calcular rendimiento (operaciones por ciclo)
    const performance = vectorLength / totalTime;
    
    // Calcular eficiencia (asumiendo rendimiento máximo teórico)
    const maxPerformance = 1 / tpc; // Rendimiento asintótico
    const efficiency = (performance / maxPerformance) * 100;
    
    // Actualizar resultados
    document.getElementById('total-time').textContent = totalTime.toFixed(2);
    document.getElementById('performance').textContent = performance.toFixed(4);
    document.getElementById('efficiency').textContent = efficiency.toFixed(1);
    
    // Trackear evento
    trackEvent('performance_calculated', {
        tli: tli,
        tpc: tpc,
        vectorLength: vectorLength,
        totalTime: totalTime,
        performance: performance,
        efficiency: efficiency
    });
}

// Configurar simulador
function setupSimulator() {
    const vectorLengthSlider = document.getElementById('sim-vector-length');
    const mvlSlider = document.getElementById('sim-mvl');
    
    if (vectorLengthSlider) {
        vectorLengthSlider.addEventListener('input', function() {
            document.getElementById('sim-vector-display').textContent = this.value;
        });
    }
    
    if (mvlSlider) {
        mvlSlider.addEventListener('input', function() {
            document.getElementById('sim-mvl-display').textContent = this.value;
        });
    }
}

// Ejecutar simulación
function runSimulation() {
    const vectorLength = parseInt(document.getElementById('sim-vector-length').value);
    const mvl = parseInt(document.getElementById('sim-mvl').value);
    
    // Calcular métricas
    const strips = Math.ceil(vectorLength / mvl);
    const efficiency = Math.min(100, (vectorLength / (strips * mvl)) * 100);
    const speedup = efficiency / 100 * strips;
    
    // Actualizar resultados
    document.getElementById('sim-efficiency').textContent = efficiency.toFixed(1);
    document.getElementById('sim-speedup').textContent = speedup.toFixed(2);
    
    // Crear gráfico de rendimiento
    createPerformanceChart(vectorLength, mvl, strips);
    
    // Trackear evento
    trackEvent('simulation_run', {
        vectorLength: vectorLength,
        mvl: mvl,
        strips: strips,
        efficiency: efficiency,
        speedup: speedup
    });
}

// Crear gráfico de rendimiento
function createPerformanceChart(vectorLength, mvl, strips) {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    // Destruir gráfico anterior si existe
    if (performanceChart) {
        performanceChart.destroy();
    }
    
    // Generar datos
    const data = [];
    const labels = [];
    
    for (let i = 1; i <= strips; i++) {
        const currentLength = Math.min(mvl, vectorLength - (i - 1) * mvl);
        const efficiency = (currentLength / mvl) * 100;
        data.push(efficiency);
        labels.push(`Strip ${i}`);
    }
    
    performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Eficiencia (%)',
                data: data,
                backgroundColor: 'rgba(37, 99, 235, 0.8)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 1
            }]
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
                        text: 'Eficiencia (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Strips'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Eficiencia por Strip'
                }
            }
        }
    });
}

// Configurar event listeners de calculadoras
function setupCalculatorEventListeners() {
    // Event listeners para sliders del simulador
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            // Actualizar display inmediatamente
            const displayId = this.id.replace('sim-', 'sim-') + '-display';
            const display = document.getElementById(displayId);
            if (display) {
                display.textContent = this.value;
            }
        });
    });
}

// Inicializar calculadoras
function initializeCalculators() {
    // Ejecutar cálculo inicial si hay valores por defecto
    setTimeout(() => {
        calculatePerformance();
    }, 100);
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
    const animatedElements = document.querySelectorAll('.card, .timeline-item, .instruction-item');
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

// Analytics y métricas
function trackEvent(eventName, eventData = {}) {
    console.log('📊 Evento:', eventName, eventData);
    // Aquí se integraría Google Analytics, Mixpanel, etc.
}

// Eventos de tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-btn')) {
        const navBtn = e.target.closest('.nav-btn');
        const section = navBtn.getAttribute('data-section');
        trackEvent('navigation_clicked', { section: section });
    }
    
    if (e.target.closest('.btn')) {
        const btn = e.target.closest('.btn');
        const btnText = btn.textContent.trim();
        trackEvent('button_clicked', { button: btnText });
    }
});

// Manejar hash en URL para navegación directa
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchSection(hash);
    }
});

// Navegación inicial basada en hash
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchSection(hash);
    }
});

// Exportar funciones para uso global
window.switchSection = switchSection;
window.toggleTheme = toggleTheme;
window.toggleFullscreen = toggleFullscreen;
window.goToMainPortal = goToMainPortal;
window.calculatePerformance = calculatePerformance;
window.runSimulation = runSimulation;
