// Dashboard Ley de Moore - Funcionalidades Interactivas
// Evolución Histórica de Transistores en Computación

document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let mooreChart, predictionChart, comparisonChart;
    let isLogScale = true;
    let currentYear = 2024;
    
    // Datos históricos de transistores (basados en datos reales de la industria)
    const historicalData = [
        { year: 1965, transistors: 2300, processor: 'Intel 4004', node: '10 μm' },
        { year: 1971, transistors: 2300, processor: 'Intel 4004', node: '10 μm' },
        { year: 1974, transistors: 4500, processor: 'Intel 8080', node: '6 μm' },
        { year: 1978, transistors: 29000, processor: 'Intel 8086', node: '3 μm' },
        { year: 1982, transistors: 134000, processor: 'Intel 80286', node: '1.5 μm' },
        { year: 1985, transistors: 275000, processor: 'Intel 80386', node: '1.5 μm' },
        { year: 1989, transistors: 1200000, processor: 'Intel 80486', node: '1 μm' },
        { year: 1993, transistors: 3100000, processor: 'Intel Pentium', node: '0.8 μm' },
        { year: 1997, transistors: 7500000, processor: 'Intel Pentium II', node: '0.35 μm' },
        { year: 1999, transistors: 9500000, processor: 'Intel Pentium III', node: '0.25 μm' },
        { year: 2000, transistors: 42000000, processor: 'Intel Pentium 4', node: '180 nm' },
        { year: 2002, transistors: 55000000, processor: 'Intel Pentium 4', node: '130 nm' },
        { year: 2004, transistors: 125000000, processor: 'Intel Pentium 4', node: '90 nm' },
        { year: 2006, transistors: 291000000, processor: 'Intel Core 2', node: '65 nm' },
        { year: 2008, transistors: 410000000, processor: 'Intel Core 2', node: '45 nm' },
        { year: 2010, transistors: 774000000, processor: 'Intel Core i7', node: '45 nm' },
        { year: 2012, transistors: 1400000000, processor: 'Intel Core i7', node: '22 nm' },
        { year: 2014, transistors: 1400000000, processor: 'Intel Core i7', node: '14 nm' },
        { year: 2016, transistors: 1750000000, processor: 'Intel Core i7', node: '14 nm' },
        { year: 2018, transistors: 2000000000, processor: 'Intel Core i9', node: '14 nm' },
        { year: 2020, transistors: 16000000000, processor: 'Apple M1', node: '5 nm' },
        { year: 2022, transistors: 20000000000, processor: 'Apple M2', node: '5 nm' },
        { year: 2024, transistors: 26000000000, processor: 'Apple M3', node: '3 nm' }
    ];

    // Datos de fabricantes para comparación
    const manufacturerData = {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Intel',
                data: [2000, 2200, 2400, 2600, 2800, 3000, 3200],
                borderColor: '#0071c5',
                backgroundColor: 'rgba(0, 113, 197, 0.1)',
                tension: 0.4
            },
            {
                label: 'AMD',
                data: [1800, 2000, 2200, 2400, 2600, 2800, 3000],
                borderColor: '#ed1c24',
                backgroundColor: 'rgba(237, 28, 36, 0.1)',
                tension: 0.4
            },
            {
                label: 'Apple',
                data: [16000, 16000, 16000, 18000, 20000, 22000, 26000],
                borderColor: '#555555',
                backgroundColor: 'rgba(85, 85, 85, 0.1)',
                tension: 0.4
            },
            {
                label: 'Samsung',
                data: [1500, 1700, 1900, 2100, 2300, 2500, 2700],
                borderColor: '#1428a0',
                backgroundColor: 'rgba(20, 40, 160, 0.1)',
                tension: 0.4
            }
        ]
    };

    // Inicialización
    initializeNavigation();
    initializeCharts();
    initializeTimeline();
    initializePredictionControls();
    initializeMetrics();
    initializeAnimations();

    // Navegación entre secciones
    function initializeNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const contentSections = document.querySelectorAll('.content-section');

        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                
                // Remover clase active de todos los botones y secciones
                navButtons.forEach(btn => btn.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Añadir clase active al botón clickeado y su sección correspondiente
                this.classList.add('active');
                document.getElementById(targetSection).classList.add('active');
                
                // Scroll suave hacia la sección
                document.getElementById(targetSection).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    // Inicialización de gráficos
    function initializeCharts() {
        initializeMooreChart();
        initializePredictionChart();
        initializeComparisonChart();
    }

    // Gráfico principal de la Ley de Moore
    function initializeMooreChart() {
        const ctx = document.getElementById('mooreChart').getContext('2d');
        
        const chartData = {
            labels: historicalData.map(item => item.year),
            datasets: [{
                label: 'Transistores',
                data: historicalData.map(item => item.transistors),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        };

        const config = {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                return `Transistores: ${formatNumber(value)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Año',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Número de Transistores',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return formatNumber(value);
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        };

        mooreChart = new Chart(ctx, config);
    }

    // Gráfico de predicciones
    function initializePredictionChart() {
        const ctx = document.getElementById('predictionChart').getContext('2d');
        
        // Generar datos de predicción
        const predictionData = generatePredictionData();
        
        const chartData = {
            labels: predictionData.labels,
            datasets: [
                {
                    label: 'Datos Históricos',
                    data: predictionData.historical,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Predicción Optimista',
                    data: predictionData.optimistic,
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Predicción Conservadora',
                    data: predictionData.conservative,
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    borderWidth: 2,
                    borderDash: [10, 5],
                    fill: false,
                    tension: 0.4
                }
            ]
        };

        const config = {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                return `${context.dataset.label}: ${formatNumber(value)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Año',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Transistores',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            callback: function(value) {
                                return formatNumber(value);
                            }
                        }
                    }
                }
            }
        };

        predictionChart = new Chart(ctx, config);
    }

    // Gráfico de comparación de fabricantes
    function initializeComparisonChart() {
        const ctx = document.getElementById('comparisonChart').getContext('2d');
        
        const config = {
            type: 'line',
            data: manufacturerData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${formatNumber(context.parsed.y * 1000000)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Año',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Transistores (millones)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            callback: function(value) {
                                return value + 'M';
                            }
                        }
                    }
                }
            }
        };

        comparisonChart = new Chart(ctx, config);
    }

    // Generar datos de predicción
    function generatePredictionData() {
        const labels = [];
        const historical = [];
        const optimistic = [];
        const conservative = [];
        
        const baseYear = 2024;
        const baseTransistors = 26000000000;
        
        for (let year = 1965; year <= 2050; year++) {
            labels.push(year);
            
            if (year <= 2024) {
                // Datos históricos
                const historicalItem = historicalData.find(item => item.year === year);
                historical.push(historicalItem ? historicalItem.transistors : null);
                optimistic.push(null);
                conservative.push(null);
            } else {
                // Predicciones
                historical.push(null);
                
                // Predicción optimista (duplicación cada 18 meses)
                const yearsDiff = year - baseYear;
                const doublingPeriods = (yearsDiff * 12) / 18;
                const optimisticValue = baseTransistors * Math.pow(2, doublingPeriods);
                optimistic.push(optimisticValue);
                
                // Predicción conservadora (duplicación cada 24 meses)
                const conservativeDoublingPeriods = (yearsDiff * 12) / 24;
                const conservativeValue = baseTransistors * Math.pow(2, conservativeDoublingPeriods);
                conservative.push(conservativeValue);
            }
        }
        
        return { labels, historical, optimistic, conservative };
    }

    // Inicializar controles de predicción
    function initializePredictionControls() {
        const yearSlider = document.getElementById('predictionYear');
        const yearDisplay = document.getElementById('yearDisplay');
        
        yearSlider.addEventListener('input', function() {
            const year = this.value;
            yearDisplay.textContent = year;
            updatePredictionChart(year);
        });
    }

    // Actualizar gráfico de predicción
    function updatePredictionChart(targetYear) {
        const predictionData = generatePredictionData();
        
        // Filtrar datos hasta el año objetivo
        const filteredLabels = predictionData.labels.filter((_, index) => 
            predictionData.labels[index] <= targetYear
        );
        const filteredHistorical = predictionData.historical.filter((_, index) => 
            predictionData.labels[index] <= targetYear
        );
        const filteredOptimistic = predictionData.optimistic.filter((_, index) => 
            predictionData.labels[index] <= targetYear
        );
        const filteredConservative = predictionData.conservative.filter((_, index) => 
            predictionData.labels[index] <= targetYear
        );
        
        predictionChart.data.labels = filteredLabels;
        predictionChart.data.datasets[0].data = filteredHistorical;
        predictionChart.data.datasets[1].data = filteredOptimistic;
        predictionChart.data.datasets[2].data = filteredConservative;
        
        predictionChart.update('active');
    }

    // Inicializar línea de tiempo
    function initializeTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('click', function() {
                const year = this.getAttribute('data-year');
                showTimelineDetails(year);
            });
        });
    }

    // Mostrar detalles de la línea de tiempo
    function showTimelineDetails(year) {
        const data = historicalData.find(item => item.year == year);
        if (data) {
            const message = `
                <strong>${year} - ${data.processor}</strong><br>
                Transistores: ${formatNumber(data.transistors)}<br>
                Nodo de proceso: ${data.node}
            `;
            showNotification(message, 'info');
        }
    }

    // Inicializar métricas
    function initializeMetrics() {
        // Animar contadores de métricas
        animateCounter('current-transistors', 0, 26000000000, 2000);
        animateCounter('doubling-time', 0, 18, 1500);
        animateCounter('growth-rate', 0, 41.4, 1500);
        animateCounter('years-active', 0, 60, 1500);
    }

    // Animar contadores
    function animateCounter(elementId, start, end, duration) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Función de easing
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            if (elementId === 'current-transistors') {
                element.textContent = formatNumber(current);
            } else if (elementId === 'doubling-time') {
                element.textContent = current + '-24';
            } else if (elementId === 'growth-rate') {
                element.textContent = current.toFixed(1) + '%';
            } else {
                element.textContent = current;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Inicializar animaciones
    function initializeAnimations() {
        // Controles del gráfico principal
        const logScaleBtn = document.getElementById('logScale');
        const linearScaleBtn = document.getElementById('linearScale');
        const animateBtn = document.getElementById('animateChart');
        
        logScaleBtn.addEventListener('click', function() {
            if (!isLogScale) {
                mooreChart.options.scales.y.type = 'logarithmic';
                mooreChart.update();
                isLogScale = true;
                this.style.background = '#5a6fd8';
                linearScaleBtn.style.background = '#667eea';
            }
        });
        
        linearScaleBtn.addEventListener('click', function() {
            if (isLogScale) {
                mooreChart.options.scales.y.type = 'linear';
                mooreChart.update();
                isLogScale = false;
                this.style.background = '#5a6fd8';
                logScaleBtn.style.background = '#667eea';
            }
        });
        
        animateBtn.addEventListener('click', function() {
            animateChartData();
        });
    }

    // Animar datos del gráfico
    function animateChartData() {
        const originalData = historicalData.map(item => item.transistors);
        const animatedData = new Array(originalData.length).fill(0);
        
        let currentIndex = 0;
        const animationDuration = 100; // ms por punto
        
        function animatePoint() {
            if (currentIndex < originalData.length) {
                animatedData[currentIndex] = originalData[currentIndex];
                mooreChart.data.datasets[0].data = [...animatedData];
                mooreChart.update('active');
                currentIndex++;
                setTimeout(animatePoint, animationDuration);
            }
        }
        
        // Resetear datos
        mooreChart.data.datasets[0].data = new Array(originalData.length).fill(0);
        mooreChart.update('active');
        
        // Iniciar animación
        setTimeout(animatePoint, 500);
    }

    // Funciones de utilidad
    function formatNumber(num) {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(1) + 'B';
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    }

    function showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'info' ? 'info-circle' : 'exclamation-triangle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'info' ? '#667eea' : '#dc3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Cerrar notificación
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Añadir estilos CSS para animaciones de notificaciones
    const style = document.createElement('style');
    style.textContent = `
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
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);

    // Navegación por teclado
    document.addEventListener('keydown', function(e) {
        const navButtons = document.querySelectorAll('.nav-btn');
        const activeButton = document.querySelector('.nav-btn.active');
        const currentIndex = Array.from(navButtons).indexOf(activeButton);
        
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % navButtons.length;
                navButtons[nextIndex].click();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? navButtons.length - 1 : currentIndex - 1;
                navButtons[prevIndex].click();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (document.activeElement.classList.contains('nav-btn')) {
                    document.activeElement.click();
                }
                break;
        }
    });

    // Modo presentación (F11)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F11') {
            e.preventDefault();
            togglePresentationMode();
        }
    });

    function togglePresentationMode() {
        const body = document.body;
        const isFullscreen = document.fullscreenElement;
        
        if (!isFullscreen) {
            body.requestFullscreen().then(() => {
                body.classList.add('presentation-mode');
            });
        } else {
            document.exitFullscreen().then(() => {
                body.classList.remove('presentation-mode');
            });
        }
    }

    // Estilos para modo presentación
    const presentationStyle = document.createElement('style');
    presentationStyle.textContent = `
        .presentation-mode .navigation {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            background: rgba(0,0,0,0.8);
            padding: 10px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
        }
        
        .presentation-mode .header {
            margin-top: 80px;
        }
    `;
    document.head.appendChild(presentationStyle);

    // Inicializar tooltips
    initializeTooltips();
});

// Función para inicializar tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            showTooltip(this, tooltipText);
        });
        
        element.addEventListener('mouseleave', hideTooltip);
    });
}

// Función para mostrar tooltip
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.9rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    element.tooltip = tooltip;
}

// Función para ocultar tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }
}
