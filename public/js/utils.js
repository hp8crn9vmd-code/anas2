// utils.js - أدوات مساعدة لتطبيق Anas2 Lab

/**
 * مكتبة الأدوات المساعدة لـ Anas2 Lab
 * تحتوي على دوال عامة لمعالجة البيانات، التحقق، وغيرها
 */

const Utils = {
    // ======================
    // 1. دوال التحقق والتحويل
    // ======================
    
    /**
     * التحقق إذا كانت القيمة غير فارغة
     * @param {*} value - القيمة المراد التحقق منها
     * @returns {boolean} - true إذا كانت القيمة غير فارغة
     */
    isNotEmpty: function(value) {
        return value !== null && value !== undefined && value !== '';
    },
    
    /**
     * التحقق إذا كانت القيمة رقم
     * @param {*} value - القيمة المراد التحقق منها
     * @returns {boolean} - true إذا كانت القيمة رقم
     */
    isNumber: function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    
    /**
     * تحويل القيمة إلى رقم بأمان
     * @param {*} value - القيمة المراد تحويلها
     * @param {number} defaultValue - القيمة الافتراضية
     * @returns {number} - القيمة الرقمية
     */
    toNumber: function(value, defaultValue = 0) {
        const num = parseFloat(value);
        return !isNaN(num) && isFinite(num) ? num : defaultValue;
    },
    
    /**
     * تقييد الرقم بين حدين
     * @param {number} value - القيمة المراد تقييدها
     * @param {number} min - الحد الأدنى
     * @param {number} max - الحد الأقصى
     * @returns {number} - القيمة المقيدة
     */
    clamp: function(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },


    // ======================
    // 2. دوال التاريخ والوقت
    // ======================
    
    /**
     * الحصول على التاريخ الحالي بصيغة مقروءة
     * @returns {string} - التاريخ الحالي
     */
    getCurrentDate: function() {
        const now = new Date();
        return now.toLocaleDateString('ar-EG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    /**
     * تنسيق الوقت (تحويل الثواني إلى صيغة mm:ss)
     * @param {number} seconds - عدد الثواني
     * @returns {string} - الوقت المنسق
     */
    formatTime: function(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    /**
     * حساب الفرق بين تاريخين بالأيام
     * @param {Date} date1 - التاريخ الأول
     * @param {Date} date2 - التاريخ الثاني
     * @returns {number} - عدد الأيام
     */
    daysBetween: function(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000; // ساعة * دقيقة * ثانية * ميلي ثانية
        return Math.round(Math.abs((date1 - date2) / oneDay));
    },


    // ======================
    // 3. دوال التعامل مع النصوص
    // ======================
    
    /**
     * تقصير النص وإضافة نقاط
     * @param {string} text - النص الأصلي
     * @param {number} maxLength - الطول الأقصى
     * @returns {string} - النص المقصوص
     */
    truncateText: function(text, maxLength = 100) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    /**
     * تحويل النص إلى حالة العنوان (كل كلمة تبدأ بحرف كبير)
     * @param {string} text - النص المراد تحويله
     * @returns {string} - النص المحول
     */
    toTitleCase: function(text) {
        if (!text) return '';
        return text.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },
    
    /**
     * إزالة المسافات الزائدة من النص
     * @param {string} text - النص المراد تنظيفه
     * @returns {string} - النص النظيف
     */
    cleanSpaces: function(text) {
        if (!text) return '';
        return text.replace(/\s+/g, ' ').trim();
    },


    // ======================
    // 4. دوال التعامل مع المصفوفات
    // ======================
    
    /**
     * خلط عناصر المصفوفة عشوائياً
     * @param {Array} array - المصفوفة الأصلية
     * @returns {Array} - المصفوفة المخلوطة
     */
    shuffleArray: function(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    /**
     * إزالة التكرارات من المصفوفة
     * @param {Array} array - المصفوفة الأصلية
     * @returns {Array} - المصفوفة بدون تكرارات
     */
    removeDuplicates: function(array) {
        return [...new Set(array)];
    },
    
    /**
     * تجميع عناصر المصفوفة بناءً على خاصية
     * @param {Array} array - المصفوفة الأصلية
     * @param {string} key - الخاصية للتجميع
     * @returns {Object} - الكائن المجمع
     */
    groupBy: function(array, key) {
        return array.reduce((result, item) => {
            const groupKey = item[key];
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(item);
            return result;
        }, {});
    },


    // ======================
    // 5. دوال التعامل مع الكائنات
    // ======================
    
    /**
     * دمج كائنين مع الحفاظ على الخصائص
     * @param {Object} target - الكائن الهدف
     * @param {Object} source - الكائن المصدر
     * @returns {Object} - الكائن المدمج
     */
    deepMerge: function(target, source) {
        const output = Object.assign({}, target);
        
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = this.deepMerge(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    },
    
    /**
     * التحقق إذا كانت القيمة كائن
     * @param {*} item - القيمة المراد التحقق منها
     * @returns {boolean} - true إذا كانت القيمة كائن
     */
    isObject: function(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    },
    
    /**
     * نسخ كائن بشكل عميق
     * @param {Object} obj - الكائن المراد نسخه
     * @returns {Object} - نسخة عميقة من الكائن
     */
    deepCopy: function(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepCopy(item));
        }
        
        if (typeof obj === 'object') {
            const copiedObj = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    copiedObj[key] = this.deepCopy(obj[key]);
                }
            }
            return copiedObj;
        }
    },


    // ======================
    // 6. دوال التعامل مع DOM
    // ======================
    
    /**
     * إنشاء عنصر DOM جديد
     * @param {string} tag - اسم الوسم
     * @param {Object} attributes - السمات
     * @param {Array|string} children - العناصر الفرعية
     * @returns {HTMLElement} - العنصر المنشأ
     */
    createElement: function(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        // إضافة السمات
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        
        // إضافة العناصر الفرعية
        if (typeof children === 'string') {
            element.textContent = children;
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else if (child instanceof HTMLElement) {
                    element.appendChild(child);
                }
            });
        }
        
        return element;
    },
    
    /**
     * إضافة أو إزالة صنف من عنصر
     * @param {HTMLElement} element - العنصر المستهدف
     * @param {string} className - اسم الصنف
     * @param {boolean} add - true للإضافة، false للإزالة
     */
    toggleClass: function(element, className, add) {
        if (add) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    },
    
    /**
     * إظهار أو إخفاء عنصر
     * @param {HTMLElement} element - العنصر المستهدف
     * @param {boolean} show - true للإظهار، false للإخفاء
     */
    toggleVisibility: function(element, show) {
        element.style.display = show ? 'block' : 'none';
    },


    // ======================
    // 7. دوال الأداء والمفيدة
    // ======================
    
    /**
     * إضافة تأخير
     * @param {number} ms - عدد المللي ثواني
     * @returns {Promise} - Promise يحل بعد التأخير
     */
    delay: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * تنفيذ دالة مع منع التكرار (Debounce)
     * @param {Function} func - الدالة المراد تنفيذها
     * @param {number} wait - وقت الانتظار بالمللي ثانية
     * @returns {Function} - الدالة المدمجة
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * تنفيذ دالة مع تحديد معدل التنفيذ (Throttle)
     * @param {Function} func - الدالة المراد تنفيذها
     * @param {number} limit - الحد الزمني بالمللي ثانية
     * @returns {Function} - الدالة المدمجة
     */
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * توليد معرف فريد
     * @param {number} length - طول المعرف
     * @returns {string} - المعرف الفريد
     */
    generateId: function(length = 8) {
        return Math.random().toString(36).substr(2, length);
    },


    // ======================
    // 8. دوال التخزين المحلي
    // ======================
    
    /**
     * حفظ البيانات في التخزين المحلي
     * @param {string} key - المفتاح
     * @param {*} value - القيمة
     */
    saveToStorage: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('خطأ في حفظ البيانات:', error);
            return false;
        }
    },
    
    /**
     * جلب البيانات من التخزين المحلي
     * @param {string} key - المفتاح
     * @param {*} defaultValue - القيمة الافتراضية
     * @returns {*} - البيانات المسترجعة
     */
    loadFromStorage: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('خطأ في جلب البيانات:', error);
            return defaultValue;
        }
    },
    
    /**
     * حذف البيانات من التخزين المحلي
     * @param {string} key - المفتاح
     */
    removeFromStorage: function(key) {
        localStorage.removeItem(key);
    },
    
    /**
     * مسح جميع البيانات من التخزين المحلي
     */
    clearStorage: function() {
        localStorage.clear();
    }
};

// تصدير المكتبة للاستخدام العالمي
if (typeof window !== 'undefined') {
    window.Utils = Utils;
}

// تصدير للاستخدام في وحدات ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}

console.log('✅ مكتبة Utils تم تحميلها بنجاح!');
