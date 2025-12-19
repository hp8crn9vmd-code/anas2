// main.js - الملف الرئيسي لتطبيق Anas2

console.log('🚀 تحميل Anas2 Lab...');

// دالة تهيئة التطبيق
function initApp() {
    console.log('✅ تهيئة التطبيق...');
    
    // تعيين سنة التحديث في الفوتر
    updateYear();
    
    // تهيئة نظام الثيمات
    initTheme();
    
    // تحميل التجارب
    loadExperiments();
    
    // مراقبة الأداء
    startPerformanceMonitoring();
}

// دالة تحديث السنة في الفوتر
function updateYear() {
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log(`📅 تم تحديث السنة إلى: ${yearElement.textContent}`);
    }
}

// دالة تهيئة نظام الثيمات (فاتح/غامق)
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const htmlElement = document.documentElement;
    
    // تطبيق الثيم المحفوظ
    htmlElement.setAttribute('data-theme', savedTheme);
    console.log(`🎨 تم تطبيق الثيم: ${savedTheme}`);
    
    // إعداد زر تبديل الثيم
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
        
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// دالة تبديل الثيم
function toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // تغيير الثيم
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // تحديث الزر
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
    
    console.log(`🔄 تم تبديل الثيم إلى: ${newTheme}`);
}

// دالة تحميل قائمة التجارب
function loadExperiments() {
    const experiments = [
        {
            id: 'canvas',
            name: 'Canvas 2D',
            icon: 'fas fa-paint-brush',
            description: 'رسم ثنائي الأبعاد باستخدام Canvas API'
        },
        {
            id: 'webgl',
            name: 'WebGL',
            icon: 'fas fa-cube',
            description: 'رسوميات ثلاثية الأبعاد منخفضة المستوى'
        },
        {
            id: 'threejs',
            name: 'Three.js',
            icon: 'fas fa-cubes',
            description: 'مكتبة رسوميات ثلاثية الأبعاد عالية المستوى'
        },
        {
            id: 'pixijs',
            name: 'PixiJS',
            icon: 'fas fa-gamepad',
            description: 'مكتبة لرسوم وألعاب 2D عالية الأداء'
        },
        {
            id: 'matterjs',
            name: 'Matter.js',
            icon: 'fas fa-atom',
            description: 'محرك فيزياء 2D للمحاكاة التفاعلية'
        },
        {
            id: 'babylonjs',
            name: 'Babylon.js',
            icon: 'fas fa-vr-cardboard',
            description: 'مكتبة 3D متقدمة مع أدوات متكاملة'
        },
        {
            id: 'd3js',
            name: 'D3.js',
            icon: 'fas fa-chart-bar',
            description: 'تصور البيانات والرسوم البيانية التفاعلية'
        }
    ];
    
    console.log(`📊 تم تحميل ${experiments.length} تجربة`);
    return experiments;
}

// دالة مراقبة الأداء
function startPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function updateFPS() {
        const currentTime = performance.now();
        frameCount++;
        
        if (currentTime >= lastTime + 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // عرض الـ FPS إذا كان هناك عنصر لعرضه
            const fpsElement = document.getElementById('fps-counter');
            if (fpsElement) {
                fpsElement.textContent = fps;
                
                // تغيير اللون حسب الأداء
                if (fps < 30) {
                    fpsElement.style.color = '#ef4444';
                } else if (fps < 50) {
                    fpsElement.style.color = '#f59e0b';
                } else {
                    fpsElement.style.color = '#10b981';
                }
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(updateFPS);
    }
    
    updateFPS();
    console.log('📈 بدء مراقبة الأداء (FPS)');
}

// دالة مساعدة لعرض رسائل التحذير
function showWarning(message) {
    console.warn(`⚠️ ${message}`);
}

// دالة مساعدة لعرض رسائل الخطأ
function showError(message) {
    console.error(`❌ ${message}`);
}

// دالة مساعدة لعرض رسائل النجاح
function showSuccess(message) {
    console.log(`✅ ${message}`);
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 تم تحميل DOM بالكامل');
    initApp();
});

// عند تحميل الصفحة بالكامل
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ زمن التحميل الكامل: ${Math.round(loadTime)}ms`);
    
    // تحديث زمن التحميل إذا كان هناك عنصر لعرضه
    const loadElement = document.getElementById('load-time');
    if (loadElement) {
        loadElement.textContent = Math.round(loadTime);
    }
});

// إضافة بعض المتغيرات العامة
window.anas2Config = {
    version: '1.0.0',
    environment: 'development',
    debug: true
};

console.log('🎮 Anas2 Lab جاهز للتشغيل!');

// ============================================
// نظام مراقبة الأداء المتقدم
// ============================================

/**
 * تهيئة وتفعيل نظام مراقبة الأداء
 */
function initPerformanceSystem() {
    console.log('📊 تهيئة نظام مراقبة الأداء المتقدم...');
    
    // التحقق من توفر Performance API
    if ('performance' in window) {
        console.log('✅ Performance API متاح');
        
        // إنشاء عناصر عرض الأداء في الصفحة إذا لم تكن موجودة
        createPerformanceDashboard();
        
        // بدء مراقبة الأداء الأساسية
        startBasicPerformanceMonitoring();
        
        // تسجيل مقاييس أداء الصفحة
        logPageMetrics();
        
    } else {
        console.warn('⚠️ Performance API غير متاح في هذا المتصفح');
    }
}

/**
 * إنشاء لوحة عرض الأداء في الصفحة
 */
function createPerformanceDashboard() {
    // التحقق إذا كانت لوحة الأداء موجودة بالفعل
    if (document.getElementById('performance-dashboard')) {
        return;
    }
    
    // إنشاء عنصر لوحة الأداء
    const dashboardHTML = `
        <div id="performance-dashboard" style="
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            min-width: 200px;
            display: none;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong>📊 أداء النظام</strong>
                <button id="toggle-dashboard" style="
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                ">×</button>
            </div>
            <div id="performance-metrics">
                <div>FPS: <span id="live-fps">--</span></div>
                <div>ذاكرة: <span id="live-memory">--</span></div>
                <div>زمن التحميل: <span id="load-time-ms">--</span>ms</div>
                <div>الاتصال: <span id="connection-type">--</span></div>
            </div>
            <div style="margin-top: 10px; font-size: 10px; opacity: 0.7;">
                Anas2 Performance Monitor
            </div>
        </div>
    `;
    
    // إضافة اللوحة إلى الصفحة
    document.body.insertAdjacentHTML('beforeend', dashboardHTML);
    
    // إضافة أحداث التحكم
    const dashboard = document.getElementById('performance-dashboard');
    const toggleBtn = document.getElementById('toggle-dashboard');
    
    toggleBtn.addEventListener('click', () => {
        dashboard.style.display = 'none';
    });
    
    // إظهار اللوحة لمدة 5 ثواني ثم إخفاؤها
    dashboard.style.display = 'block';
    setTimeout(() => {
        if (dashboard.style.display === 'block') {
            dashboard.style.display = 'none';
        }
    }, 5000);
    
    // زر لعرض/إخفاء اللوحة
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '📊';
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(79, 70, 229, 0.9);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 18px;
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    toggleButton.addEventListener('click', () => {
        dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
    });
    
    document.body.appendChild(toggleButton);
}

/**
 * بدء مراقبة الأداء الأساسية
 */
function startBasicPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    let fpsHistory = [];
    
    function updateFPS() {
        const currentTime = performance.now();
        frameCount++;
        
        if (currentTime >= lastTime + 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // تحديث عرض FPS
            const fpsElement = document.getElementById('live-fps');
            if (fpsElement) {
                fpsElement.textContent = fps;
                fpsElement.style.color = fps >= 50 ? '#10b981' : fps >= 30 ? '#f59e0b' : '#ef4444';
            }
            
            // تخزين التاريخ للإحصائيات
            fpsHistory.push(fps);
            if (fpsHistory.length > 60) {
                fpsHistory.shift();
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(updateFPS);
    }
    
    // بدء مراقبة FPS
    updateFPS();
    
    // مراقبة استخدام الذاكرة إذا كان متاحاً
    if (performance.memory) {
        setInterval(() => {
            const memory = performance.memory.usedJSHeapSize;
            const memoryElement = document.getElementById('live-memory');
            if (memoryElement) {
                const mb = (memory / (1024 * 1024)).toFixed(1);
                memoryElement.textContent = `${mb} MB`;
            }
        }, 2000);
    }
    
    // مراقبة نوع الاتصال
    if (navigator.connection) {
        const updateConnectionInfo = () => {
            const connectionElement = document.getElementById('connection-type');
            if (connectionElement) {
                const conn = navigator.connection;
                connectionElement.textContent = \`\${conn.effectiveType} (\${conn.downlink} Mbps)\`;
            }
        };
        
        updateConnectionInfo();
        navigator.connection.addEventListener('change', updateConnectionInfo);
    }
}

/**
 * تسجيل مقاييس أداء الصفحة
 */
function logPageMetrics() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        
        // تحديث زمن التحميل في اللوحة
        const loadElement = document.getElementById('load-time-ms');
        if (loadElement) {
            loadElement.textContent = Math.round(loadTime);
        }
        
        // تسجيل مقاييس الأداء في الكونسول
        console.group('📈 مقاييس أداء الصفحة');
        console.log(\`⚡ زمن التحميل الكلي: \${Math.round(loadTime)}ms\`);
        
        // الحصول على توقيتات تحميل الموارد
        const resources = performance.getEntriesByType('resource');
        console.log(\`📦 عدد الموارد المحملة: \${resources.length}\`);
        
        // حساب حجم الموارد
        let totalSize = 0;
        resources.forEach(resource => {
            totalSize += resource.transferSize || 0;
        });
        console.log(\`💾 الحجم الإجمالي: \${(totalSize / 1024).toFixed(2)} KB\`);
        
        console.groupEnd();
    });
}

/**
 * الحصول على تقرير أداء مفصل
 */
function getPerformanceReport() {
    const report = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: window.devicePixelRatio
        },
        timing: {}
    };
    
    // إضافة توقيتات الأداء إذا كانت متاحة
    if (performance.timing) {
        const timing = performance.timing;
        report.timing = {
            pageLoad: timing.loadEventEnd - timing.navigationStart,
            domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
            firstPaint: timing.responseStart - timing.navigationStart
        };
    }
    
    return report;
}

// ============================================
// التهيئة النهائية مع نظام الأداء
// ============================================

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 تم تحميل DOM بالكامل');
    
    // تهيئة التطبيق الأساسي
    initApp();
    
    // تهيئة نظام مراقبة الأداء بعد تأخير قصير
    setTimeout(() => {
        initPerformanceSystem();
    }, 1000);
});

// عند تحميل الصفحة بالكامل
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(\`⚡ زمن التحميل الكامل: \${Math.round(loadTime)}ms\`);
    
    // تحديث زمن التحميل إذا كان هناك عنصر لعرضه
    const loadElement = document.getElementById('load-time');
    if (loadElement) {
        loadElement.textContent = Math.round(loadTime);
    }
    
    // إنشاء تقرير أداء أولي
    const performanceReport = getPerformanceReport();
    console.log('📊 تقرير الأداء الأولي:', performanceReport);
});

// تعريض دوال الأداء للاستخدام العام
window.anas2Performance = {
    getReport: getPerformanceReport,
    initPerformance: initPerformanceSystem
};
