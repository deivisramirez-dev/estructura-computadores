// Variables globales
let currentTheme = localStorage.getItem('theme') || 'light';
let isFullscreen = false;
let charts = {};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    applyTheme();
    initializeCharts();
});

// Inicialización de la aplicación
function initializeApp() {
    console.log('🚀 Tema 3: Arquitectura del Procesador iniciado');
    
    // Aplicar animaciones de entrada
    animateElements();
    
    // Configurar atajos de teclado
    setupKeyboardShortcuts();
    
    // Inicializar sliders
    initializeSliders();
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

// Navegación entre secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Desactivar todos los botones
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Activar botón correspondiente
    const targetButton = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }
    
    // Actualizar gráficos si existen
    updateChartsForSection(sectionId);
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

// Inicializar sliders
function initializeSliders() {
    // Slider de tamaño de bloque
    const blockSizeSlider = document.getElementById('blockSize');
    const blockSizeValue = document.getElementById('blockSizeValue');
    if (blockSizeSlider && blockSizeValue) {
        blockSizeSlider.addEventListener('input', function() {
            blockSizeValue.textContent = this.value + ' bytes';
        });
    }
    
    // Slider de tamaño de caché
    const cacheSizeSlider = document.getElementById('cacheSize');
    const cacheSizeValue = document.getElementById('cacheSizeValue');
    if (cacheSizeSlider && cacheSizeValue) {
        cacheSizeSlider.addEventListener('input', function() {
            cacheSizeValue.textContent = this.value + ' KB';
        });
    }
    
    // Slider de líneas de caché
    const cacheLinesSlider = document.getElementById('cacheLines');
    const cacheLinesValue = document.getElementById('cacheLinesValue');
    if (cacheLinesSlider && cacheLinesValue) {
        cacheLinesSlider.addEventListener('input', function() {
            cacheLinesValue.textContent = this.value;
        });
    }
    
    // Slider de entradas TLB
    const tlbEntriesSlider = document.getElementById('tlbEntries');
    const tlbEntriesValue = document.getElementById('tlbEntriesValue');
    if (tlbEntriesSlider && tlbEntriesValue) {
        tlbEntriesSlider.addEventListener('input', function() {
            tlbEntriesValue.textContent = this.value;
        });
    }
    
    // Slider de bancos de memoria
    const bankCountSlider = document.getElementById('bankCount');
    const bankCountValue = document.getElementById('bankCountValue');
    if (bankCountSlider && bankCountValue) {
        bankCountSlider.addEventListener('input', function() {
            bankCountValue.textContent = this.value;
        });
    }
}

// Calculadora de tasa de aciertos
function calculateHitRate() {
    const hits = parseInt(document.getElementById('hits').value) || 0;
    const misses = parseInt(document.getElementById('misses').value) || 0;
    
    const total = hits + misses;
    if (total === 0) {
        showNotification('Error', 'Por favor ingresa valores válidos', 'error');
        return;
    }
    
    const hitRate = (hits / total * 100).toFixed(1);
    const missRate = (misses / total * 100).toFixed(1);
    
    document.getElementById('hitRate').textContent = hitRate + '%';
    document.getElementById('missRate').textContent = missRate + '%';
    
    showNotification(
        'Cálculo completado',
        `Tasa de aciertos: ${hitRate}%, Tasa de fallos: ${missRate}%`,
        'success'
    );
}

// Simulador de tamaño de bloque
function simulateBlockSize() {
    const blockSize = parseInt(document.getElementById('blockSize').value);
    const cacheSize = parseInt(document.getElementById('cacheSize').value);
    
    // Generar datos de simulación
    const blockSizes = [16, 32, 64, 128, 256, 512];
    const missRates = [];
    const penalties = [];
    
    blockSizes.forEach(size => {
        // Simulación de tasa de fallos (simplificada)
        const baseMissRate = 0.15;
        const sizeFactor = Math.max(0.1, 1 - (size - 64) / 512);
        const missRate = baseMissRate * sizeFactor;
        missRates.push(missRate * 100);
        
        // Penalización por fallo
        const penalty = 100 + (size / 25.6); // ns
        penalties.push(penalty);
    });
    
    // Crear gráfico
    const ctx = document.getElementById('blockSizeChart');
    if (ctx) {
        if (charts.blockSizeChart) {
            charts.blockSizeChart.destroy();
        }
        
        charts.blockSizeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: blockSizes.map(size => size + 'B'),
                datasets: [
                    {
                        label: 'Tasa de Fallos (%)',
                        data: missRates,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Penalización (ns)',
                        data: penalties,
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Tamaño de Bloque'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Tasa de Fallos (%)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Penalización (ns)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Efecto del Tamaño de Bloque en el Rendimiento'
                    }
                }
            }
        });
    }
    
    showNotification(
        'Simulación completada',
        'Gráfico de rendimiento generado',
        'success'
    );
}

// Calculadora de penalización por fallo
function calculateMissPenalty() {
    const memoryAccess = parseFloat(document.getElementById('memoryAccess').value) || 0;
    const bandwidth = parseFloat(document.getElementById('bandwidth').value) || 0;
    const blockSize = parseInt(document.getElementById('blockSize').value) || 64;
    
    if (memoryAccess === 0 || bandwidth === 0) {
        showNotification('Error', 'Por favor ingresa valores válidos', 'error');
        return;
    }
    
    // Calcular tiempo de transferencia (ns)
    const transferTime = (blockSize / (bandwidth * 1000)) * 1000000; // Convertir a ns
    const totalPenalty = memoryAccess + transferTime;
    
    document.getElementById('missPenalty').textContent = totalPenalty.toFixed(1) + ' ns';
    
    showNotification(
        'Cálculo completado',
        `Penalización por fallo: ${totalPenalty.toFixed(1)} ns`,
        'success'
    );
}

// Simulador de fallos de caché
function runCacheSimulation() {
    const cacheLines = parseInt(document.getElementById('cacheLines').value);
    const associativity = parseInt(document.getElementById('associativity').value);
    
    // Generar datos de simulación
    const associativities = [1, 2, 4, 8];
    const missRates = [];
    const accessTimes = [];
    
    associativities.forEach(assoc => {
        // Simulación de tasa de fallos (simplificada)
        const baseMissRate = 0.15;
        const associativityFactor = Math.max(0.05, 1 - (assoc - 1) * 0.1);
        const missRate = baseMissRate * associativityFactor;
        missRates.push(missRate * 100);
        
        // Tiempo de acceso (ns)
        const accessTime = 2 + (assoc - 1) * 0.5;
        accessTimes.push(accessTime);
    });
    
    // Crear gráfico
    const ctx = document.getElementById('cacheSimulationChart');
    if (ctx) {
        if (charts.cacheSimulationChart) {
            charts.cacheSimulationChart.destroy();
        }
        
        charts.cacheSimulationChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: associativities.map(assoc => assoc + '-way'),
                datasets: [
                    {
                        label: 'Tasa de Fallos (%)',
                        data: missRates,
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Tiempo de Acceso (ns)',
                        data: accessTimes,
                        backgroundColor: 'rgba(37, 99, 235, 0.8)',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Asociatividad'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Tasa de Fallos (%)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Tiempo de Acceso (ns)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Efecto de la Asociatividad en el Rendimiento'
                    }
                }
            }
        });
    }
    
    showNotification(
        'Simulación completada',
        'Análisis de asociatividad generado',
        'success'
    );
}

// Comparador de políticas de escritura
function comparePolicies(metric) {
    const policies = ['Write-Through', 'Write-Back', 'Write-Buffer'];
    let data = [];
    let label = '';
    let color = '';
    
    switch(metric) {
        case 'throughput':
            data = [60, 85, 75]; // Porcentaje de rendimiento
            label = 'Rendimiento (%)';
            color = 'rgba(16, 185, 129, 0.8)';
            break;
        case 'complexity':
            data = [20, 80, 60]; // Nivel de complejidad
            label = 'Complejidad (%)';
            color = 'rgba(245, 158, 11, 0.8)';
            break;
        case 'coherence':
            data = [95, 70, 85]; // Nivel de coherencia
            label = 'Coherencia (%)';
            color = 'rgba(37, 99, 235, 0.8)';
            break;
    }
    
    const ctx = document.getElementById('policyComparisonChart');
    if (ctx) {
        if (charts.policyComparisonChart) {
            charts.policyComparisonChart.destroy();
        }
        
        charts.policyComparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: policies,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: color
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: label
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Comparación de Políticas: ${metric.charAt(0).toUpperCase() + metric.slice(1)}`
                    }
                }
            }
        });
    }
}

// Simulador de políticas de escritura
function simulateWritePolicies() {
    const writePattern = document.getElementById('writePattern').value;
    const writeCount = parseInt(document.getElementById('writeCount').value);
    
    // Simular resultados
    const results = [
        {
            policy: 'Write-Through',
            time: writeCount * 2.5,
            memoryAccesses: writeCount,
            efficiency: 60
        },
        {
            policy: 'Write-Back',
            time: writeCount * 1.2,
            memoryAccesses: Math.floor(writeCount * 0.3),
            efficiency: 85
        },
        {
            policy: 'Write-Buffer',
            time: writeCount * 1.8,
            memoryAccesses: Math.floor(writeCount * 0.6),
            efficiency: 75
        }
    ];
    
    // Actualizar tabla
    const tableBody = document.getElementById('writePolicyTable');
    if (tableBody) {
        tableBody.innerHTML = '';
        results.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${result.policy}</strong></td>
                <td>${result.time.toFixed(0)} ns</td>
                <td>${result.memoryAccesses}</td>
                <td>${result.efficiency}%</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    showNotification(
        'Simulación completada',
        'Resultados de políticas de escritura generados',
        'success'
    );
}

// Calculadora de ancho de banda
function calculateBandwidth() {
    const memoryType = document.getElementById('memoryType').value;
    const memorySpeed = parseInt(document.getElementById('memorySpeed').value);
    const busWidth = parseInt(document.getElementById('busWidth').value);
    
    if (memorySpeed === 0 || busWidth === 0) {
        showNotification('Error', 'Por favor ingresa valores válidos', 'error');
        return;
    }
    
    // Calcular ancho de banda teórico (GB/s)
    let multiplier = 1;
    switch(memoryType) {
        case 'ddr4':
            multiplier = 2;
            break;
        case 'ddr5':
            multiplier = 2;
            break;
        case 'qdr':
            multiplier = 4;
            break;
    }
    
    const theoreticalBandwidth = (memorySpeed * busWidth * multiplier) / 8 / 1000;
    const effectiveBandwidth = theoreticalBandwidth * 0.8; // 80% de eficiencia
    
    document.getElementById('theoreticalBandwidth').textContent = theoreticalBandwidth.toFixed(1) + ' GB/s';
    document.getElementById('effectiveBandwidth').textContent = effectiveBandwidth.toFixed(1) + ' GB/s';
    
    showNotification(
        'Cálculo completado',
        `Ancho de banda efectivo: ${effectiveBandwidth.toFixed(1)} GB/s`,
        'success'
    );
}

// Visualizador de organización de memoria
function visualizeMemoryAccess() {
    const bankCount = parseInt(document.getElementById('bankCount').value);
    const accessPattern = document.getElementById('accessPattern').value;
    
    const ctx = document.getElementById('memoryVisualization');
    if (ctx) {
        const canvas = ctx.getContext('2d');
        canvas.clearRect(0, 0, ctx.width, ctx.height);
        
        // Configurar canvas
        canvas.fillStyle = currentTheme === 'dark' ? '#1e293b' : '#f8fafc';
        canvas.fillRect(0, 0, ctx.width, ctx.height);
        
        // Dibujar bancos de memoria
        const bankWidth = ctx.width / bankCount;
        const bankHeight = ctx.height - 40;
        
        for (let i = 0; i < bankCount; i++) {
            const x = i * bankWidth;
            const y = 20;
            
            // Color del banco
            canvas.fillStyle = currentTheme === 'dark' ? '#334155' : '#e2e8f0';
            canvas.fillRect(x + 2, y, bankWidth - 4, bankHeight);
            
            // Borde del banco
            canvas.strokeStyle = currentTheme === 'dark' ? '#475569' : '#cbd5e1';
            canvas.lineWidth = 2;
            canvas.strokeRect(x + 2, y, bankWidth - 4, bankHeight);
            
            // Etiqueta del banco
            canvas.fillStyle = currentTheme === 'dark' ? '#f8fafc' : '#1e293b';
            canvas.font = '12px Inter';
            canvas.textAlign = 'center';
            canvas.fillText(`Banco ${i}`, x + bankWidth / 2, y + bankHeight + 15);
        }
        
        // Simular accesos
        canvas.fillStyle = '#2563eb';
        for (let i = 0; i < 10; i++) {
            let bankIndex;
            switch(accessPattern) {
                case 'sequential':
                    bankIndex = i % bankCount;
                    break;
                case 'random':
                    bankIndex = Math.floor(Math.random() * bankCount);
                    break;
                case 'strided':
                    bankIndex = (i * 2) % bankCount;
                    break;
            }
            
            const x = bankIndex * bankWidth + bankWidth / 2;
            const y = 20 + Math.random() * (bankHeight - 20);
            
            canvas.beginPath();
            canvas.arc(x, y, 4, 0, 2 * Math.PI);
            canvas.fill();
        }
    }
    
    showNotification(
        'Visualización completada',
        'Patrón de acceso a memoria generado',
        'success'
    );
}

// Calculadora AMAT
function calculateAMAT() {
    const hitTime = parseFloat(document.getElementById('hitTime').value) || 0;
    const missRate = parseFloat(document.getElementById('missRateInput').value) || 0;
    const missPenalty = parseFloat(document.getElementById('missPenaltyInput').value) || 0;
    
    if (hitTime === 0 || missRate === 0 || missPenalty === 0) {
        showNotification('Error', 'Por favor ingresa valores válidos', 'error');
        return;
    }
    
    const amat = hitTime + (missRate / 100) * missPenalty;
    
    document.getElementById('amatResult').textContent = amat.toFixed(1) + ' ns';
    
    showNotification(
        'Cálculo completado',
        `AMAT: ${amat.toFixed(1)} ns`,
        'success'
    );
}

// Análisis de rendimiento
function analyzePerformance(metric) {
    let labels = [];
    let data = [];
    let label = '';
    
    switch(metric) {
        case 'capacity':
            labels = ['1KB', '2KB', '4KB', '8KB', '16KB'];
            data = [15, 12, 8, 5, 3]; // Tasa de fallos (%)
            label = 'Tasa de Fallos (%)';
            break;
        case 'associativity':
            labels = ['1-way', '2-way', '4-way', '8-way'];
            data = [15, 10, 7, 5]; // Tasa de fallos (%)
            label = 'Tasa de Fallos (%)';
            break;
        case 'blockSize':
            labels = ['16B', '32B', '64B', '128B', '256B'];
            data = [12, 8, 5, 6, 8]; // Tasa de fallos (%)
            label = 'Tasa de Fallos (%)';
            break;
    }
    
    const ctx = document.getElementById('performanceChart');
    if (ctx) {
        if (charts.performanceChart) {
            charts.performanceChart.destroy();
        }
        
        charts.performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: label
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Análisis de ${metric.charAt(0).toUpperCase() + metric.slice(1)}`
                    }
                }
            }
        });
    }
}

// Simulador de memoria virtual
function runVirtualMemorySimulation() {
    const pageSize = parseInt(document.getElementById('pageSize').value);
    const tlbEntries = parseInt(document.getElementById('tlbEntries').value);
    const physicalMemory = parseInt(document.getElementById('physicalMemory').value);
    
    // Simular resultados
    const pageSizes = [4, 8, 16];
    const tlbHitRates = [];
    const pageFaultRates = [];
    
    pageSizes.forEach(size => {
        // Tasa de aciertos TLB (simplificada)
        const tlbHitRate = Math.min(95, 80 + (tlbEntries / 64) * 10);
        tlbHitRates.push(tlbHitRate);
        
        // Tasa de fallos de página (simplificada)
        const pageFaultRate = Math.max(1, 5 - (size / 4));
        pageFaultRates.push(pageFaultRate);
    });
    
    // Crear gráfico
    const ctx = document.getElementById('virtualMemoryChart');
    if (ctx) {
        if (charts.virtualMemoryChart) {
            charts.virtualMemoryChart.destroy();
        }
        
        charts.virtualMemoryChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: pageSizes.map(size => size + 'KB'),
                datasets: [
                    {
                        label: 'Tasa de Aciertos TLB (%)',
                        data: tlbHitRates,
                        backgroundColor: 'rgba(16, 185, 129, 0.8)',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Tasa de Fallos de Página (%)',
                        data: pageFaultRates,
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Tamaño de Página'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Tasa de Aciertos TLB (%)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Tasa de Fallos de Página (%)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Rendimiento de Memoria Virtual'
                    }
                }
            }
        });
    }
    
    showNotification(
        'Simulación completada',
        'Análisis de memoria virtual generado',
        'success'
    );
}

// Inicializar gráficos
function initializeCharts() {
    // Configuración global de Chart.js
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.color = currentTheme === 'dark' ? '#f8fafc' : '#1e293b';
    
    // Crear visualización de caché inicial
    createCacheVisualization();
}

// Crear visualización de caché
function createCacheVisualization() {
    const ctx = document.getElementById('cacheVisualization');
    if (ctx) {
        const canvas = ctx.getContext('2d');
        canvas.clearRect(0, 0, ctx.width, ctx.height);
        
        // Configurar canvas
        canvas.fillStyle = currentTheme === 'dark' ? '#1e293b' : '#f8fafc';
        canvas.fillRect(0, 0, ctx.width, ctx.height);
        
        // Dibujar estructura de caché
        const lineHeight = 25;
        const startY = 20;
        
        for (let i = 0; i < 8; i++) {
            const y = startY + i * lineHeight;
            
            // Línea de caché
            canvas.fillStyle = currentTheme === 'dark' ? '#334155' : '#e2e8f0';
            canvas.fillRect(10, y, ctx.width - 20, lineHeight - 2);
            
            // Borde
            canvas.strokeStyle = currentTheme === 'dark' ? '#475569' : '#cbd5e1';
            canvas.lineWidth = 1;
            canvas.strokeRect(10, y, ctx.width - 20, lineHeight - 2);
            
            // Etiquetas
            canvas.fillStyle = currentTheme === 'dark' ? '#f8fafc' : '#1e293b';
            canvas.font = '10px Inter';
            canvas.fillText(`Línea ${i}:`, 15, y + 15);
            canvas.fillText('V=1, Tag=0x123, Data=...', 80, y + 15);
        }
        
        // Título
        canvas.fillStyle = currentTheme === 'dark' ? '#f8fafc' : '#1e293b';
        canvas.font = 'bold 12px Inter';
        canvas.textAlign = 'center';
        canvas.fillText('Caché de Correspondencia Directa (4KB)', ctx.width / 2, 10);
    }
}

// Actualizar gráficos para sección
function updateChartsForSection(sectionId) {
    switch(sectionId) {
        case 'fundamentos':
            createCacheVisualization();
            break;
        case 'tamano-bloque':
            simulateBlockSize();
            break;
        case 'fallos-cache':
            runCacheSimulation();
            break;
        case 'politicas-escritura':
            comparePolicies('throughput');
            break;
        case 'diseno-memoria':
            visualizeMemoryAccess();
            break;
        case 'evaluacion-cache':
            analyzePerformance('capacity');
            break;
        case 'memoria-virtual':
            runVirtualMemorySimulation();
            break;
    }
}

// Actualizar tema de gráficos
function updateChartsTheme() {
    // Actualizar colores de Chart.js
    Chart.defaults.color = currentTheme === 'dark' ? '#f8fafc' : '#1e293b';
    
    // Recrear gráficos existentes
    Object.keys(charts).forEach(chartKey => {
        if (charts[chartKey]) {
            charts[chartKey].destroy();
            charts[chartKey] = null;
        }
    });
    
    // Recrear visualizaciones
    createCacheVisualization();
    visualizeMemoryAccess();
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
        if (e.key >= '1' && e.key <= '7') {
            const sections = ['fundamentos', 'tamano-bloque', 'fallos-cache', 'politicas-escritura', 'diseno-memoria', 'evaluacion-cache', 'memoria-virtual'];
            const sectionIndex = parseInt(e.key) - 1;
            if (sections[sectionIndex]) {
                showSection(sections[sectionIndex]);
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
    const animatedElements = document.querySelectorAll('.content-card, .concept-item, .policy-item');
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

// Optimizaciones para dispositivos móviles
if (isMobile()) {
    // Reducir animaciones en móviles
    document.documentElement.style.setProperty('--transition-normal', '0.2s ease-in-out');
    document.documentElement.style.setProperty('--transition-slow', '0.3s ease-in-out');
}

// Analytics y métricas (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('📊 Evento:', eventName, eventData);
    // Aquí se integraría Google Analytics, Mixpanel, etc.
}

// Eventos de tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-btn')) {
        const button = e.target.closest('.nav-btn');
        const sectionName = button.querySelector('span')?.textContent;
        trackEvent('section_navigation', { section: sectionName });
    }
    
    if (e.target.closest('.btn')) {
        const button = e.target.closest('.btn');
        const buttonText = button.textContent.trim();
        trackEvent('button_click', { button: buttonText });
    }
});

// Función para navegar al portal principal
function goToMainPortal() {
    window.location.href = '../index.html';
}

// Exportar funciones para uso global
window.showSection = showSection;
window.toggleTheme = toggleTheme;
window.toggleFullscreen = toggleFullscreen;
window.goToMainPortal = goToMainPortal;
window.showNotification = showNotification;
window.calculateHitRate = calculateHitRate;
window.simulateBlockSize = simulateBlockSize;
window.calculateMissPenalty = calculateMissPenalty;
window.runCacheSimulation = runCacheSimulation;
window.comparePolicies = comparePolicies;
window.simulateWritePolicies = simulateWritePolicies;
window.calculateBandwidth = calculateBandwidth;
window.visualizeMemoryAccess = visualizeMemoryAccess;
window.calculateAMAT = calculateAMAT;
window.analyzePerformance = analyzePerformance;
window.runVirtualMemorySimulation = runVirtualMemorySimulation;
