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
    console.log('🚀 Tema 2: Evaluación de Prestaciones iniciado');
    
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
    const contentSections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remover clase active de todos los botones y secciones
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar sección correspondiente
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Scroll suave a la sección
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
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
    const cards = document.querySelectorAll('.card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Animar tarjetas
    cards.forEach((card, index) => {
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
        
        // Números 1-7 para navegar entre secciones
        const sectionKeys = ['1', '2', '3', '4', '5', '6', '7'];
        if (sectionKeys.includes(e.key)) {
            const sectionIndex = parseInt(e.key) - 1;
            const navButtons = document.querySelectorAll('.nav-btn');
            if (navButtons[sectionIndex]) {
                navButtons[sectionIndex].click();
            }
        }
    });
}

// Función para ir al portal principal
function goToMainPortal() {
    console.log('🚀 Navegando al portal principal...');
    try {
        window.location.href = '../index.html';
    } catch (error) {
        console.error('❌ Error al navegar al portal principal:', error);
        // Fallback: mostrar mensaje de error
        showNotification('Error al navegar al portal principal', 'error');
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

console.log('✅ Tema 2 JavaScript cargado correctamente');
