// Variables globales
let currentTheme = localStorage.getItem('theme') || 'light';
let isFullscreen = false;
let mooreChart = null;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    applyTheme();
});

// Inicialización de la aplicación
function initializeApp() {
    console.log('🚀 Dashboard Ley de Moore iniciado');
    
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
    
    // Actualizar colores del gráfico
    if (mooreChart) {
        updateChartColors();
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

// Toggle pantalla completa
function toggleFullscreen() {
    if (!isFullscreen) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Event listeners para pantalla completa
document.addEventListener('fullscreenchange', updateFullscreenState);
document.addEventListener('webkitfullscreenchange', updateFullscreenState);
document.addEventListener('msfullscreenchange', updateFullscreenState);

function updateFullscreenState() {
    isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    
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

// Animar elementos de entrada
function animateElements() {
    const statCards = document.querySelectorAll('.stat-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const predictionCards = document.querySelectorAll('.prediction-card');
    
    // Animar tarjetas de estadísticas
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animar elementos de timeline
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
    });
    
    // Animar tarjetas de predicción
    predictionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, (index + 3) * 100);
    });
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
        
        // H para ir al portal principal
        if (e.key === 'h' || e.key === 'H') {
            goToMainPortal();
        }
        
        // T para ir al tema 1
        if (e.key === 't' || e.key === 'T') {
            goToTema1();
        }
    });
}

// Función para ir al portal principal
function goToMainPortal() {
    console.log('🚀 Navegando al portal principal...');
    try {
        window.location.href = '../../index.html';
    } catch (error) {
        console.error('❌ Error al navegar al portal principal:', error);
        // Fallback: mostrar mensaje de error
        showNotification('Error al navegar al portal principal', 'error');
    }
}

// Función para ir al tema 1
function goToTema1() {
    console.log('🚀 Navegando al tema 1...');
    try {
        window.location.href = '../index.html';
    } catch (error) {
        console.error('❌ Error al navegar al tema 1:', error);
        // Fallback: mostrar mensaje de error
        showNotification('Error al navegar al tema 1', 'error');
    }
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar estilos CSS inline para las notificaciones
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                padding: var(--spacing-md);
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: var(--spacing-xs);
                border-radius: var(--border-radius);
                transition: all var(--transition-fast);
            }
            
            .notification-close:hover {
                background: var(--bg-tertiary);
                color: var(--text-primary);
            }
            
            .notification-info {
                border-left: 4px solid var(--primary-color);
            }
            
            .notification-success {
                border-left: 4px solid var(--success-color);
            }
            
            .notification-warning {
                border-left: 4px solid var(--warning-color);
            }
            
            .notification-error {
                border-left: 4px solid var(--error-color);
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
        document.head.appendChild(style);
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

function getNotificationIcon(type) {
    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'times-circle'
    };
    return icons[type] || 'info-circle';
}

console.log('✅ Dashboard Ley de Moore JavaScript cargado correctamente');
