// performance.js - مراقبة أداء تطبيق Anas2 Lab

/**
 * نظام مراقبة أداء متقدم لتطبيق Anas2
 */

const PerformanceMonitor = {
    // إعدادات المراقبة
    config: {
        enabled: true,
        logInterval: 5000,
        warningThresholds: {
            fps: 30,
            memory: 50 * 1024 * 1024,
            loadTime: 3000
        }
    },

    // بيانات الأداء
    data: {
        fps: {
            current: 0,
            average: 0,
            samples: []
        },
        memory: {
            current: 0,
            average: 0,
            samples: []
        },
        loadTimes: []
    },

    // متغيرات التتبع
    frameCount: 0,
    lastTime: performance.now(),
    lastLogTime: performance.now(),

    /**
     * تهيئة نظام مراقبة الأداء
     */
    init: function() {
        if (!this.config.enabled) return;

        console.log('🚀 تهيئة نظام مراقبة الأداء...');
        
        this.startFPSMonitoring();
        
        if (performance.memory) {
            this.startMemoryMonitoring();
        }
        
        this.recordLoadTimings();
        this.startPeriodicLogging();
    },

    /**
     * بدء مراقبة معدل الإطارات (FPS)
     */
    startFPSMonitoring: function() {
        const updateFPS = () => {
            const currentTime = performance.now();
            this.frameCount++;

            if (currentTime >= this.lastTime + 1000) {
                this.data.fps.current = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
                
                this.updateSamples('fps', this.data.fps.current);
                this.updateStats('fps');
                this.updateFPSDisplay();
                
                this.checkWarning('fps', this.data.fps.current);
                
                this.frameCount = 0;
                this.lastTime = currentTime;
            }

            requestAnimationFrame(updateFPS);
        };

        updateFPS();
    },

    /**
     * بدء مراقبة استخدام الذاكرة
     */
    startMemoryMonitoring: function() {
        setInterval(() => {
            if (performance.memory) {
                const usedMemory = performance.memory.usedJSHeapSize;
                this.data.memory.current = usedMemory;
                
                this.updateSamples('memory', usedMemory);
                this.updateStats('memory');
                this.updateMemoryDisplay();
                
                this.checkWarning('memory', usedMemory);
            }
        }, 1000);
    },

    /**
     * تسجيل توقيتات تحميل الصفحة
     */
    recordLoadTimings: function() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.data.loadTimes.push(loadTime);
            
            const perfEntries = performance.getEntriesByType('navigation');
            if (perfEntries.length > 0) {
                const navEntry = perfEntries[0];
                this.data.timings = {
                    dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
                    tcp: navEntry.connectEnd - navEntry.connectStart,
                    request: navEntry.responseEnd - navEntry.requestStart,
                    total: loadTime
                };
            }
        });
    },

    /**
     * بدء التسجيل الدوري في الكونسول
     */
    startPeriodicLogging: function() {
        setInterval(() => {
            if (this.config.enabled) {
                this.logPerformance();
            }
        }, this.config.logInterval);
    },

    /**
     * تحديث العينات للإحصائيات
     */
    updateSamples: function(metric, value) {
        const data = this.data[metric];
        data.samples.push(value);
        
        if (data.samples.length > 60) {
            data.samples.shift();
        }
    },

    /**
     * تحديث الإحصائيات
     */
    updateStats: function(metric) {
        const data = this.data[metric];
        const samples = data.samples;
        
        if (samples.length === 0) return;
        
        const sum = samples.reduce((a, b) => a + b, 0);
        data.average = Math.round(sum / samples.length);
    },

    /**
     * التحقق من وجود تحذيرات للأداء
     */
    checkWarning: function(metric, value) {
        const threshold = this.config.warningThresholds[metric];
        
        if (threshold && value < threshold && metric === 'fps') {
            console.warn(`⚠️ تحذير أداء: ${metric} منخفض (${value})`);
        } else if (threshold && value > threshold && metric === 'memory') {
            const mb = (value / (1024 * 1024)).toFixed(2);
            console.warn(`⚠️ تحذير ذاكرة: استخدام عالي (${mb} MB)`);
        }
    },

    /**
     * تحديث عرض FPS في الصفحة
     */
    updateFPSDisplay: function() {
        const fpsElement = document.getElementById('fps-counter');
        if (!fpsElement) return;
        
        fpsElement.textContent = this.data.fps.current;
        
        // تغيير اللون بناءً على الأداء
        if (this.data.fps.current < 30) {
            fpsElement.style.color = '#ef4444';
        } else if (this.data.fps.current < 50) {
            fpsElement.style.color = '#f59e0b';
        } else {
            fpsElement.style.color = '#10b981';
        }
    },

    /**
     * تحديث عرض الذاكرة في الصفحة
     */
    updateMemoryDisplay: function() {
        const memoryElement = document.getElementById('memory-usage');
        if (!memoryElement) return;
        
        const mb = (this.data.memory.current / (1024 * 1024)).toFixed(1);
        memoryElement.textContent = `${mb} MB`;
        
        // تغيير اللون بناءً على الاستخدام
        if (this.data.memory.current > 100 * 1024 * 1024) {
            memoryElement.style.color = '#ef4444';
        } else if (this.data.memory.current > 50 * 1024 * 1024) {
            memoryElement.style.color = '#f59e0b';
        } else {
            memoryElement.style.color = '#10b981';
        }
    },

    /**
     * تسجيل تقرير الأداء في الكونسول
     */
    logPerformance: function() {
        console.group('📊 تقرير أداء Anas2 Lab');
        
        console.log('🎮 معدل الإطارات:');
        console.log(`   الحالي: ${this.data.fps.current} FPS`);
        console.log(`   المتوسط: ${this.data.fps.average} FPS`);
        
        if (performance.memory) {
            const currentMB = (this.data.memory.current / (1024 * 1024)).toFixed(2);
            const averageMB = (this.data.memory.average / (1024 * 1024)).toFixed(2);
            console.log('💾 استخدام الذاكرة:');
            console.log(`   الحالي: ${currentMB} MB`);
            console.log(`   المتوسط: ${averageMB} MB`);
        }
        
        if (this.data.loadTimes.length > 0) {
            const lastLoadTime = this.data.loadTimes[this.data.loadTimes.length - 1];
            console.log('⚡ زمن التحميل:');
            console.log(`   الأخير: ${Math.round(lastLoadTime)}ms`);
        }
        
        console.groupEnd();
    },

    /**
     * الحصول على تقرير أداء مفصل
     */
    getReport: function() {
        return {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            performance: {
                fps: this.data.fps,
                memory: this.data.memory,
                loadTimes: this.data.loadTimes
            }
        };
    }
};

// تهيئة مراقبة الأداء عند تحميل الصفحة
window.addEventListener('load', () => {
    setTimeout(() => {
        PerformanceMonitor.init();
        window.PerformanceMonitor = PerformanceMonitor;
        console.log('✅ نظام مراقبة الأداء جاهز!');
    }, 1000);
});

// تصدير الكائن للاستخدام في وحدات ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}
