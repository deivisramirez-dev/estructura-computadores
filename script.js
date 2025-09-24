// Variables globales
let currentTheme = localStorage.getItem('theme') || 'light';
let isFullscreen = false;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    applyTheme();
});

// Inicialización de la aplicación
function initializeApp() {
    console.log('🚀 Portal de Estructura de Computadores iniciado');
    
    // Verificar estado de los temas
    checkTopicStatus();
    
    // Aplicar animaciones de entrada
    animateElements();
    
    // Configurar atajos de teclado
    setupKeyboardShortcuts();
}

// Configurar event listeners
function setupEventListeners() {
    // Event listeners para modales
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Event listener para tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
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

// Navegación a temas
function navigateToTopic(topicPath) {
    console.log(`📚 Navegando a: ${topicPath}`);
    
    // Verificar si el tema existe
    if (!topicExists(topicPath)) {
        showNotification('Tema en desarrollo', 'Este tema estará disponible próximamente.', 'warning');
        return;
    }
    
    // Mostrar indicador de carga
    showLoadingIndicator();
    
    // Simular carga (en producción sería una navegación real)
    setTimeout(() => {
        hideLoadingIndicator();
        
        // Navegar al tema
        if (topicPath === 'Tema1/Moore') {
            window.location.href = 'Tema1/Moore/index.html';
        } else {
            window.location.href = `${topicPath}/index.html`;
        }
    }, 1000);
}

// Verificar si un tema existe
function topicExists(topicPath) {
    const availableTopics = [
        'Tema1',
        'Tema1/Moore',
        'Tema2',
        'Tema3',
        'Tema4',
        'Tema5',
        'Tema6',
        'Tema7',
        'Tema8',
        'Tema9',
        'Tema10',
        'Tema11'
    ];
    
    return availableTopics.includes(topicPath);
}

// Verificar estado de los temas
function checkTopicStatus() {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        const topicPath = card.getAttribute('onclick')?.match(/navigateToTopic\('([^']+)'\)/)?.[1];
        
        if (topicPath && !topicExists(topicPath)) {
            card.classList.add('topic-disabled');
            card.onclick = null;
        }
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

// Mostrar modal de ayuda
function showHelp() {
    showModal('helpModal');
}

// Mostrar modal de progreso
function showProgress() {
    showModal('progressModal');
}

// Mostrar recursos (placeholder)
function showResources() {
    showNotification(
        'Recursos',
        'Los recursos adicionales estarán disponibles próximamente.',
        'info'
    );
}

// Mostrar información sobre el proyecto
function showAbout() {
    showNotification(
        'Acerca del Proyecto',
        'Portal de recursos interactivos para el aprendizaje de Estructura de Computadores. Desarrollado con tecnologías web modernas.',
        'info'
    );
}

// Mostrar información de contacto
function showContact() {
    showNotification(
        'Contacto',
        'Para soporte técnico o sugerencias, contacta al equipo de desarrollo.',
        'info'
    );
}

// Gestión de modales
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Enfocar el modal para accesibilidad
        const focusableElement = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElement) {
            focusableElement.focus();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
    document.body.style.overflow = '';
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
            const topicIndex = parseInt(e.key) - 1;
            const topicCards = document.querySelectorAll('.topic-card:not(.topic-disabled)');
            
            if (topicCards[topicIndex]) {
                topicCards[topicIndex].click();
            }
        }
    });
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

// Indicadores de carga
function showLoadingIndicator() {
    // Crear overlay de carga
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Cargando tema...</p>
        </div>
    `;
    
    // Agregar estilos si no existen
    if (!document.getElementById('loading-styles')) {
        const styles = document.createElement('style');
        styles.id = 'loading-styles';
        styles.textContent = `
            #loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(4px);
            }
            
            .loading-spinner {
                background: var(--bg-card);
                border-radius: var(--radius-lg);
                padding: var(--spacing-2xl);
                text-align: center;
                box-shadow: var(--shadow-xl);
            }
            
            .loading-spinner i {
                font-size: 2rem;
                color: var(--primary-color);
                margin-bottom: var(--spacing-md);
            }
            
            .loading-spinner p {
                color: var(--text-secondary);
                margin: 0;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(loadingOverlay);
}

function hideLoadingIndicator() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
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
    const animatedElements = document.querySelectorAll('.topic-card, .quick-card, .welcome-card');
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

// Service Worker para funcionalidad offline (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration);
            })
            .catch(registrationError => {
                console.log('SW registro falló:', registrationError);
            });
    });
}

// Analytics y métricas (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('📊 Evento:', eventName, eventData);
    // Aquí se integraría Google Analytics, Mixpanel, etc.
}

// Eventos de tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.topic-card')) {
        const topicCard = e.target.closest('.topic-card');
        const topicTitle = topicCard.querySelector('h3')?.textContent;
        trackEvent('topic_clicked', { topic: topicTitle });
    }
    
    if (e.target.closest('.quick-card')) {
        const quickCard = e.target.closest('.quick-card');
        const quickTitle = quickCard.querySelector('h4')?.textContent;
        trackEvent('quick_access_clicked', { feature: quickTitle });
    }
});

// Exportar funciones para uso global
window.navigateToTopic = navigateToTopic;
window.toggleTheme = toggleTheme;
window.showHelp = showHelp;
window.showProgress = showProgress;
window.showResources = showResources;
window.showAbout = showAbout;
window.showContact = showContact;
window.closeModal = closeModal;
