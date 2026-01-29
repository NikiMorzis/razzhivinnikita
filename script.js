// script.js - ФИНАЛЬНАЯ ВЕРСИЯ с крутой пасхалкой!
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // КОНФИГУРАЦИЯ И СЕКРЕТЫ
    // ====================
    const config = {
        jokes: [
            {
                text: "Почему программисты всегда путают Хэллоуин и Рождество? Потому что 31 OCT = 25 DEC.",
                category: "Программирование"
            },
            {
                text: "Разница между программистом и политиком? Программисты хотя бы иногда признают свои ошибки.",
                category: "Программирование"
            },
            {
                text: "Студент открывает холодильник, а там свет горит. Он думает: 'О, мой код наконец-то заработал!'",
                category: "Студенческая жизнь"
            },
            {
                text: "Моя мотивация как переменная JavaScript: объявлена, но undefined.",
                category: "Мотивация"
            },
            {
                text: "План на сегодня: 1. Проснуться. 2. Сделать вид, что работаю. 3. Лечь спать. ✓✓✓",
                category: "Продуктивность"
            },
            {
                text: "Отладка - это как быть детективом в фильме, где ты же и убийца.",
                category: "Программирование"
            },
            {
                text: "Кофе - это мой личный npm install для мозга.",
                category: "Кофе"
            },
            {
                text: "Гит коммит: 'фикс' (что сломал - неизвестно).",
                category: "Git"
            },
            {
                text: "Если бы программирование было спортом, то компилятор был бы судьей, а баги - моими противниками.",
                category: "Программирование"
            }
        ],
        moods: [
            "Кодит 🤓", "Спит 💤", "Пьет кофе ☕", "Гуглит ошибки 🔍",
            "Делает вид, что работает 🎭", "Прокрастинирует 🕐", "Ищет пасхалки 🥚"
        ],
        coffeeStatuses: [
            "Готовлю первую чашку", "Пью вторую", "На третьей уже кодит",
            "Кофе-перерыв", "Без кофе я не человек", "Кофе закончился 😱",
            "Секретный кофе-режим 🔒"
        ],
        // Секретные достижения
        achievements: [
            "Нашел пасхалку! 🥚",
            "Мастер кликов! 🎯",
            "Искатель секретов 🔍",
            "Легенда этого сайта 🏆",
            "Кофе-гуру ☕"
        ]
    };

    // ====================
    // ПЕРЕМЕННЫЕ И СОСТОЯНИЕ
    // ====================
    let currentTheme = localStorage.getItem('theme') || 'light';
    let visitorCount = localStorage.getItem('visitorCount') || 1;
    let coffeeCount = 0;
    let jokeIndex = 0;
    
    // СЕКРЕТНЫЕ ПЕРЕМЕННЫЕ ДЛЯ ПАСХАЛКИ
    let secretClickCount = 0;
    let secretProgress = 0;
    let isEasterEggActive = false;
    let secretSequence = '';
    let achievements = JSON.parse(localStorage.getItem('achievements')) || [];

    // ====================
    // ЭЛЕМЕНТЫ DOM
    // ====================
    const elements = {
        // Прелоадер
        preloader: document.querySelector('.preloader'),
        
        // Навигация
        navbar: document.querySelector('.navbar'),
        menuToggle: document.querySelector('.menu-toggle'),
        navLinks: document.querySelector('.nav-links'),
        navItems: document.querySelectorAll('.nav-link'),
        themeToggle: document.querySelector('.theme-toggle'),
        secretLink: document.getElementById('secretLink'),
        
        // Герой
        statNumbers: document.querySelectorAll('.stat-number[data-count]'),
        heroSection: document.querySelector('.hero'),
        
        // Навыки
        progressBars: document.querySelectorAll('.progress-fill'),
        skillsSection: document.querySelector('.skills'),
        skillCards: document.querySelectorAll('.skill-card'),
        
        // Кнопки
        scrollTopBtn: document.querySelector('.scroll-top'),
        jokeBtn: document.getElementById('jokeBtn'),
        copyBtn: document.querySelector('.copy-btn'),
        clearFormBtn: document.getElementById('clearForm'),
        secretBtn: document.getElementById('secretBtn'),
        
        // Пасхалка
        easterEgg: document.getElementById('easterEgg'),
        closeEgg: document.getElementById('closeEgg'),
        secretCode: document.getElementById('secretCode'),
        secretProgressBar: document.getElementById('secretProgress'),
        secretCount: document.getElementById('secretCount'),
        secretProgressContainer: document.querySelector('.secret-progress'),
        
        // Модалки
        jokeModal: document.getElementById('jokeModal'),
        modalClose: document.querySelector('.modal-close'),
        nextJokeBtn: document.getElementById('nextJoke'),
        shareJokeBtn: document.getElementById('shareJoke'),
        
        // Уведомления
        notification: document.getElementById('notification'),
        notificationText: document.getElementById('notificationText'),
        
        // Форма
        messageForm: document.getElementById('messageForm'),
        
        // Динамические элементы
        moodBadge: document.getElementById('moodBadge'),
        currentMood: document.getElementById('currentMood'),
        sleepHours: document.getElementById('sleepHours'),
        statusMood: document.getElementById('statusMood'),
        visitorCountEl: document.getElementById('visitorCount'),
        currentTimeEl: document.getElementById('currentTime'),
        coffeeCountEl: document.getElementById('coffeeCount'),
        coffeeStatusEl: document.getElementById('coffeeStatus'),
        jokeText: document.getElementById('jokeText'),
        jokeCategory: document.getElementById('jokeCategory'),
        
        // Кофе статус
        coffeeStatus: document.querySelector('.coffee-status'),
        
        // Фейковые кнопки
        fakePhone: document.getElementById('fakePhone'),
        fakeGithub: document.getElementById('fakeGithub'),
        fakeVk: document.getElementById('fakeVk')
    };

    // ====================
    // УТИЛИТЫ
    // ====================
    const utils = {
        // Throttle для оптимизации
        throttle: (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Показать уведомление
        showNotification: (message, type = 'success') => {
            elements.notificationText.textContent = message;
            elements.notification.className = 'notification';
            elements.notification.classList.add('show', type);
            
            // Добавляем анимацию
            setTimeout(() => {
                elements.notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                elements.notification.classList.remove('show');
            }, 3000);
        },

        // Обновить время
        updateTime: () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            if (elements.currentTimeEl) {
                elements.currentTimeEl.textContent = timeString;
            }
            
            // Обновлять каждую минуту
            setTimeout(utils.updateTime, 60000);
        },

        // Случайный элемент из массива
        getRandomItem: (arr) => arr[Math.floor(Math.random() * arr.length)],

        // Форматирование числа
        formatNumber: (num) => num.toLocaleString('ru-RU'),

        // Воспроизвести звук (виртуальный)
        playSound: (type) => {
            // В реальном проекте здесь был бы Audio API
            console.log(`🔊 Воспроизводим звук: ${type}`);
        },

        // Создать конфетти
        createConfetti: () => {
            // Создаем виртуальное конфетти
            const confettiCount = 50;
            const colors = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
            
            for (let i = 0; i < confettiCount; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.cssText = `
                        position: fixed;
                        width: 10px;
                        height: 10px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        border-radius: 50%;
                        top: -20px;
                        left: ${Math.random() * 100}%;
                        z-index: 10002;
                        pointer-events: none;
                    `;
                    document.body.appendChild(confetti);
                    
                    // Анимация падения
                    const animation = confetti.animate([
                        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                        { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                    ], {
                        duration: 2000 + Math.random() * 2000,
                        easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
                    });
                    
                    animation.onfinish = () => confetti.remove();
                }, i * 30);
            }
        },

        // Добавить достижение
        addAchievement: (title) => {
            if (!achievements.includes(title)) {
                achievements.push(title);
                localStorage.setItem('achievements', JSON.stringify(achievements));
                
                // Показываем уведомление о достижении
                utils.showNotification(`🎉 Новое достижение: ${title}`, 'secret');
                
                // Создаем конфетти
                utils.createConfetti();
                
                return true;
            }
            return false;
        }
    };

    // ====================
    // СЕКРЕТНАЯ ПАСХАЛКА
    // ====================
    function initEasterEgg() {
        // Секретная кнопка (нажать 5 раз)
        if (elements.secretBtn) {
            elements.secretBtn.addEventListener('click', () => {
                secretClickCount++;
                secretProgress = Math.min(secretClickCount * 20, 100);
                
                // Обновляем прогресс-бар
                if (elements.secretProgressBar) {
                    elements.secretProgressBar.style.width = `${secretProgress}%`;
                }
                
                if (elements.secretCount) {
                    elements.secretCount.textContent = `${secretClickCount}/5`;
                }
                
                // Показываем прогресс-бар
                if (secretClickCount === 1) {
                    elements.secretProgressContainer.classList.add('active');
                }
                
                // Анимация кнопки
                elements.secretBtn.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    elements.secretBtn.style.transform = '';
                }, 300);
                
                // Звук клика
                utils.playSound('click');
                
                // Сообщения при кликах
                const messages = [
                    "Так, уже 1...",
                    "Второй клик!",
                    "Третий, продолжай!",
                    "Четвертый, почти!",
                    "ПЯТЫЙ! 🎉 Пасхалка активирована!"
                ];
                
                if (secretClickCount <= 5) {
                    utils.showNotification(messages[secretClickCount - 1], 'info');
                }
                
                // Активация пасхалки на 5-й клик
                if (secretClickCount === 5 && !isEasterEggActive) {
                    activateEasterEgg();
                }
                
                // Если кликнули больше 5 раз
                if (secretClickCount > 5) {
                    const extraMessages = [
                        "Ты уже нашел пасхалку!",
                        "Можно остановиться 😄",
                        "Окей, окей, я понял!",
                        "Ты чемпион по кликам!",
                        "Секретный рекорд! 🏆"
                    ];
                    const msg = extraMessages[(secretClickCount - 6) % extraMessages.length];
                    utils.showNotification(msg, 'info');
                    
                    // Добавляем достижение
                    if (secretClickCount === 10) {
                        utils.addAchievement("Мастер кликов! 🎯");
                    }
                }
            });
        }
        
        // Секретная ссылка в навигации
        if (elements.secretLink) {
            elements.secretLink.addEventListener('click', (e) => {
                e.preventDefault();
                utils.showNotification("🤫 Это секретная ссылка! Ищи пасхалку на сайте!", 'secret');
                utils.addAchievement("Искатель секретов 🔍");
            });
        }
        
        // Секретная комбинация клавиш
        document.addEventListener('keydown', (e) => {
            // Добавляем нажатую клавишу к последовательности (только буквы)
            if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                secretSequence += e.key.toLowerCase();
                
                // Ограничиваем длину последовательности
                if (secretSequence.length > 20) {
                    secretSequence = secretSequence.slice(-20);
                }
                
                // Проверяем секретные слова
                const secretWords = ['nikita', 'secret', 'easteregg', 'coffee', 'developer'];
                for (const word of secretWords) {
                    if (secretSequence.includes(word)) {
                        activateEasterEgg();
                        secretSequence = ''; // Сбрасываем последовательность
                        utils.addAchievement(`Нашел слово: ${word.toUpperCase()} 🎯`);
                        break;
                    }
                }
                
                // Специальная комбинация: "1337" (leet speak)
                if (secretSequence.includes('1337')) {
                    utils.showNotification("🎮 1337 H4X0R MODE ACTIVATED!", 'secret');
                    document.body.style.filter = 'hue-rotate(180deg)';
                    setTimeout(() => {
                        document.body.style.filter = '';
                    }, 3000);
                    secretSequence = '';
                    utils.addAchievement("1337 H4X0R 🎮");
                }
            }
        });
        
        // Секретный клик по аватарке
        const avatar = document.querySelector('.profile-image');
        if (avatar) {
            let avatarClickCount = 0;
            avatar.addEventListener('click', () => {
                avatarClickCount++;
                
                if (avatarClickCount === 3) {
                    utils.showNotification("👋 Привет! Это я, Никита!", 'info');
                    avatar.style.transform = 'scale(1.1) rotate(10deg)';
                    setTimeout(() => {
                        avatar.style.transform = '';
                    }, 500);
                    utils.addAchievement("Познакомились! 👋");
                }
                
                if (avatarClickCount === 7) {
                    utils.showNotification("🎭 Ты нашел мой секретный режим!", 'secret');
                    avatar.style.filter = 'sepia(1) hue-rotate(180deg)';
                    setTimeout(() => {
                        avatar.style.filter = '';
                    }, 2000);
                }
            });
        }
        
        // Клик по кофе-статусу
        if (elements.coffeeStatus) {
            elements.coffeeStatus.addEventListener('click', () => {
                utils.showNotification("☕ Секрет: я пью кофе даже во сне!", 'info');
                coffeeCount += 10;
                updateCoffeeCount();
                utils.addAchievement("Кофе-гуру ☕");
            });
        }
        
        // Закрытие пасхалки
        if (elements.closeEgg) {
            elements.closeEgg.addEventListener('click', () => {
                deactivateEasterEgg();
                utils.showNotification("🎁 Поздравляю! Ты получил награду!", 'success');
                utils.addAchievement("Легенда этого сайта 🏆");
            });
        }
    }
    
    function activateEasterEgg() {
        if (isEasterEggActive) return;
        
        isEasterEggActive = true;
        
        // Показываем пасхалку
        if (elements.easterEgg) {
            elements.easterEgg.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Генерируем случайный секретный код
            const codes = [
                "N1K1T4_2024", 
                "SECRET_CODE_42", 
                "EASTER_EGG_FOUND",
                "COFFEE_POWER",
                "DEV_MODE_ON"
            ];
            if (elements.secretCode) {
                elements.secretCode.textContent = utils.getRandomItem(codes);
            }
        }
        
        // Создаем конфетти
        utils.createConfetti();
        
        // Добавляем достижение
        utils.addAchievement("Нашел пасхалку! 🥚");
        
        // Проигрываем звук победы
        utils.playSound('victory');
        
        // Анимация для всего сайта
        document.querySelectorAll('.skill-card, .project-card, .info-card').forEach(card => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'bounce 0.5s ease';
            }, 100);
        });
        
        // Сохраняем в localStorage
        localStorage.setItem('easterEggFound', 'true');
        localStorage.setItem('easterEggDate', new Date().toISOString());
    }
    
    function deactivateEasterEgg() {
        isEasterEggActive = false;
        
        if (elements.easterEgg) {
            elements.easterEgg.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Сбрасываем счетчики
        secretClickCount = 0;
        secretProgress = 0;
        
        if (elements.secretProgressBar) {
            elements.secretProgressBar.style.width = '0%';
        }
        
        if (elements.secretCount) {
            elements.secretCount.textContent = '0/5';
        }
        
        elements.secretProgressContainer.classList.remove('active');
    }
    
    function checkPreviousEasterEgg() {
        const wasFound = localStorage.getItem('easterEggFound');
        if (wasFound === 'true') {
            const foundDate = localStorage.getItem('easterEggDate');
            utils.showNotification(`🎉 Ты уже находил пасхалку ${foundDate ? new Date(foundDate).toLocaleDateString('ru-RU') : 'ранее'}!`, 'info');
        }
    }

    // ====================
    // ПРЕЛОАДЕР
    // ====================
    function initPreloader() {
        if (!elements.preloader) return;

        // Минимальное время показа прелоадера
        const minLoadTime = 1500;
        const startTime = Date.now();

        window.addEventListener('load', () => {
            const loadTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - loadTime);

            setTimeout(() => {
                elements.preloader.classList.add('fade-out');
                
                setTimeout(() => {
                    elements.preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                    
                    // Показать кофе-статус после загрузки
                    setTimeout(() => {
                        elements.coffeeStatus.classList.add('show');
                    }, 1000);
                    
                    // Проверяем, находил ли пользователь пасхалку ранее
                    checkPreviousEasterEgg();
                }, 500);
            }, remainingTime);
        });

        // На всякий случай - скрыть через 5 секунд
        setTimeout(() => {
            if (!elements.preloader.classList.contains('fade-out')) {
                elements.preloader.classList.add('fade-out');
                setTimeout(() => {
                    elements.preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                }, 500);
            }
        }, 5000);
    }

    // ====================
    // ТЕМА
    // ====================
    function initTheme() {
        if (!elements.themeToggle) return;

        // Установить начальную тему
        document.documentElement.setAttribute('data-theme', currentTheme);

        // Обработчик переключения темы
        elements.themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            
            // Анимация переключения
            elements.themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                elements.themeToggle.style.transform = '';
            }, 500);
        });
    }

    // ====================
    // НАВИГАЦИЯ
    // ====================
    function initNavigation() {
        if (!elements.menuToggle || !elements.navLinks) return;

        // Мобильное меню
        elements.menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            elements.navLinks.classList.toggle('active');
            document.body.style.overflow = elements.navLinks.classList.contains('active') ? 'hidden' : '';
            
            // Обновить aria-атрибут
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Закрыть меню при клике на ссылку
        elements.navItems.forEach(item => {
            item.addEventListener('click', () => {
                elements.menuToggle.classList.remove('active');
                elements.navLinks.classList.remove('active');
                document.body.style.overflow = '';
                elements.menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Анимация навигации при скролле
        window.addEventListener('scroll', utils.throttle(() => {
            if (window.scrollY > 100) {
                elements.navbar.classList.add('scrolled');
            } else {
                elements.navbar.classList.remove('scrolled');
            }
        }, 100));
    }

    // ====================
    // АНИМАЦИЯ ЧИСЕЛ
    // ====================
    function initNumberAnimation() {
        if (!elements.statNumbers.length) return;

        const animateNumbers = () => {
            elements.statNumbers.forEach(stat => {
                const value = stat.getAttribute('data-count');
                if (!value) return;

                let target;
                let suffix = '';
                
                if (value.includes('%')) {
                    target = parseInt(value);
                    suffix = '%';
                } else if (value === '∞') {
                    stat.textContent = '∞';
                    return;
                } else {
                    target = parseInt(value);
                }

                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 16);
            });
        };

        // Запуск при попадании в область видимости
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        if (elements.heroSection) {
            observer.observe(elements.heroSection);
        }
    }

    // ====================
    // ПРОГРЕСС-БАРЫ
    // ====================
    function initProgressBars() {
        if (!elements.progressBars.length) return;

        const animateProgressBars = () => {
            elements.progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 300);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                }
            });
        }, { threshold: 0.3 });

        if (elements.skillsSection) {
            observer.observe(elements.skillsSection);
        }
    }

    // ====================
    // АНИМАЦИЯ ПОЯВЛЕНИЯ
    // ====================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.skill-card, .info-card, .project-card, .contact-card, ' +
            '.contact-visual, .timeline-item, .goal, .superpower'
        );

        // Инициализация стилей
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        const animateOnScroll = utils.throttle(() => {
            animatedElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.1;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }, 100);

        // Анимация при наведении на карточки навыков
        elements.skillCards?.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                if (this.getBoundingClientRect().top < window.innerHeight / 1.1) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        });

        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
    }

    // ====================
    // КНОПКА "НАВЕРХ"
    // ====================
    function initScrollTop() {
        if (!elements.scrollTopBtn) return;

        window.addEventListener('scroll', utils.throttle(() => {
            if (window.pageYOffset > 500) {
                elements.scrollTopBtn.classList.add('visible');
            } else {
                elements.scrollTopBtn.classList.remove('visible');
            }
        }, 100));

        elements.scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ====================
    // КОПИРОВАНИЕ EMAIL
    // ====================
    function initCopyEmail() {
        if (!elements.copyBtn) return;

        elements.copyBtn.addEventListener('click', async function() {
            const email = document.getElementById('email').textContent;
            
            try {
                await navigator.clipboard.writeText(email);
                
                // Визуальная обратная связь
                this.classList.add('copied');
                this.innerHTML = '<i class="fas fa-check"></i><span>Скопировано</span>';
                
                utils.showNotification('Email скопирован в буфер обмена!');
                
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerHTML = '<i class="far fa-copy"></i><span>Копировать</span>';
                }, 2000);
                
            } catch (err) {
                console.error('Ошибка копирования:', err);
                
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                utils.showNotification('Email скопирован (старый метод)');
            }
        });
    }

    // ====================
    // ПЛАВНАЯ ПРОКРУТКА
    // ====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Закрыть меню на мобильных
                    if (window.innerWidth <= 768) {
                        elements.menuToggle?.classList.remove('active');
                        elements.navLinks?.classList.remove('active');
                        document.body.style.overflow = '';
                        elements.menuToggle?.setAttribute('aria-expanded', 'false');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ====================
    // ШУТКИ
    // ====================
    function initJokes() {
        if (!elements.jokeBtn) return;

        // Функция показа шутки
        const showJoke = () => {
            const joke = config.jokes[jokeIndex];
            elements.jokeText.textContent = joke.text;
            elements.jokeCategory.textContent = joke.category;
            
            // Следующая шутка
            jokeIndex = (jokeIndex + 1) % config.jokes.length;
        };

        // Открыть модалку с шуткой
        elements.jokeBtn.addEventListener('click', () => {
            showJoke();
            elements.jokeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Закрыть модалку
        elements.modalClose?.addEventListener('click', () => {
            elements.jokeModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Следующая шутка
        elements.nextJokeBtn?.addEventListener('click', showJoke);

        // Поделиться шуткой
        elements.shareJokeBtn?.addEventListener('click', () => {
            const joke = config.jokes[(jokeIndex - 1 + config.jokes.length) % config.jokes.length];
            const shareText = `Шутка от Никиты: ${joke.text} #студент #программист`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Шутка дня',
                    text: shareText,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(shareText);
                utils.showNotification('Шутка скопирована для отправки!');
            }
        });

        // Закрыть по клику на фон
        elements.jokeModal?.addEventListener('click', (e) => {
            if (e.target === elements.jokeModal) {
                elements.jokeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Закрыть по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.jokeModal.classList.contains('active')) {
                elements.jokeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ====================
    // ФОРМА ОБРАТНОЙ СВЯЗИ
    // ====================
    function initContactForm() {
        if (!elements.messageForm) return;

        // Очистка формы
        elements.clearFormBtn?.addEventListener('click', () => {
            elements.messageForm.reset();
            utils.showNotification('Форма очищена!');
        });

        // Отправка формы
        elements.messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('emailInput').value;
            const message = document.getElementById('message').value;
            
            // Простая валидация
            if (message.length < 10) {
                utils.showNotification('Сообщение должно быть не менее 10 символов', 'error');
                return;
            }
            
            // Эмуляция отправки
            const submitBtn = elements.messageForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Отправка...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // В реальном приложении здесь был бы fetch запрос
                utils.showNotification(`Спасибо, ${name || 'аноним'}! Сообщение отправлено (в мою память)`);
                elements.messageForm.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Увеличиваем счетчик посетителей
                visitorCount = parseInt(visitorCount) + 1;
                localStorage.setItem('visitorCount', visitorCount);
                updateVisitorCount();
                
                // Добавляем достижение за отправку сообщения
                if (name && name.toLowerCase().includes('ник')) {
                    utils.addAchievement("Особое сообщение! ✉️");
                }
            }, 1500);
        });
    }

    // ====================
    // ДИНАМИЧЕСКИЕ ЭЛЕМЕНТЫ
    // ====================
    function initDynamicElements() {
        // Обновление настроения
        const updateMood = () => {
            const mood = utils.getRandomItem(config.moods);
            if (elements.currentMood) elements.currentMood.textContent = mood;
            if (elements.statusMood) elements.statusMood.textContent = mood;
            
            // Анимация
            if (elements.moodBadge) {
                elements.moodBadge.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    elements.moodBadge.style.transform = '';
                }, 300);
            }
        };

        // Часы сна (рандомные)
        if (elements.sleepHours) {
            const sleepHours = Math.floor(Math.random() * 4) + 4; // 4-7 часов
            elements.sleepHours.textContent = sleepHours;
        }

        // Обновление счетчика посетителей
        const updateVisitorCount = () => {
            if (elements.visitorCountEl) {
                elements.visitorCountEl.textContent = utils.formatNumber(visitorCount);
            }
        };

        // Обновление кофе-статуса
        const updateCoffeeCount = () => {
            if (elements.coffeeCountEl) {
                elements.coffeeCountEl.textContent = coffeeCount > 99 ? '∞' : coffeeCount;
            }
            
            if (elements.coffeeStatusEl) {
                const status = config.coffeeStatuses[coffeeCount % config.coffeeStatuses.length];
                elements.coffeeStatusEl.textContent = status;
            }
            
            // Анимация
            if (elements.coffeeStatus) {
                elements.coffeeStatus.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    elements.coffeeStatus.style.transform = '';
                }, 300);
            }
        };

        // Кофе-статус клик
        if (elements.coffeeStatus) {
            elements.coffeeStatus.addEventListener('click', () => {
                coffeeCount++;
                updateCoffeeCount();
            });
        }

        // Инициализация
        updateMood();
        updateVisitorCount();
        updateCoffeeCount();
        
        // Обновлять настроение каждые 30 секунд
        setInterval(updateMood, 30000);
        
        // Обновлять кофе статус каждые 2 минуты
        setInterval(() => {
            coffeeCount++;
            updateCoffeeCount();
        }, 120000);
        
        // Клик по бейджу настроения
        if (elements.moodBadge) {
            elements.moodBadge.addEventListener('click', updateMood);
        }
    }

    // ====================
    // ФЕЙКОВЫЕ КНОПКИ
    // ====================
    function initFakeButtons() {
        // Фейковый телефон
        elements.fakePhone?.addEventListener('click', () => {
            utils.showNotification('Телефон скрыт для защиты от спама (и ленивых звонков)');
        });

        // Фейковый GitHub
        elements.fakeGithub?.addEventListener('click', () => {
            utils.showNotification('GitHub пуст. Как и моя мотивация иногда.');
        });

        // Фейковый VK
        elements.fakeVk?.addEventListener('click', () => {
            utils.showNotification('VK неактивен. Я в телеграме! @nikimorzis');
        });
    }

    // ====================
    // КОНСОЛЬНЫЙ ПРИВЕТ И СЕКРЕТЫ
    // ====================
    function initConsoleGreeting() {
        const styles = [
            'color: #6366f1',
            'font-size: 14px',
            'font-family: monospace',
            'padding: 10px',
            'background: #0f172a',
            'border-radius: 4px',
            'border: 2px solid #8b5cf6'
        ].join(';');

        const secretStyles = [
            'color: #f59e0b',
            'font-size: 12px',
            'font-weight: bold',
            'text-shadow: 0 0 5px #f59e0b'
        ].join(';');

        const message = `
        🎮 ИГРОВОЙ РЕЖИМ АКТИВИРОВАН!
        
        👋 Привет, разработчик!
        
        Ты нашел консоль моего сайта!
        
        🔓 СЕКРЕТЫ:
        1. Нажми секретную кнопку 5 раз
        2. Введи "nikita" на клавиатуре
        3. Кликни 3 раза на аватарку
        4. Попробуй комбинацию "1337"
        
        🏆 ТВОИ ДОСТИЖЕНИЯ: ${achievements.length > 0 ? achievements.join(', ') : 'пока нет'}
        
        P.S. Если нашел все секреты - ты легенда! 😉
        `;

        console.log(`%c${message}`, styles);
        console.log('%c✨ Ищи пасхалки! ✨', secretStyles);
        
        // Секретная команда в консоли
        const originalLog = console.log;
        console.log = function(...args) {
            originalLog.apply(console, args);
            
            // Проверяем, не ввели ли секретную команду
            if (args[0] && typeof args[0] === 'string') {
                const message = args[0].toLowerCase();
                if (message.includes('секрет') || message.includes('пасхалка')) {
                    utils.showNotification('🔍 Ты близко к разгадке!', 'secret');
                }
                if (message.includes('nikita') || message.includes('никита')) {
                    utils.showNotification('👋 Да, это я!', 'info');
                }
            }
        };
    }

    // ====================
    // ИНИЦИАЛИЗАЦИЯ ВСЕГО
    // ====================
    function initAll() {
        initPreloader();
        initTheme();
        initNavigation();
        initNumberAnimation();
        initProgressBars();
        initScrollAnimations();
        initScrollTop();
        initCopyEmail();
        initSmoothScroll();
        initJokes();
        initContactForm();
        initDynamicElements();
        initFakeButtons();
        initEasterEgg();
        initConsoleGreeting();
        
        // Обновить время
        utils.updateTime();
        
        // Добавляем CSS анимацию для bounce
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                30% { transform: translateY(-20px); }
                50% { transform: translateY(10px); }
                70% { transform: translateY(-10px); }
            }
            @keyframes confetti-fall {
                from { transform: translateY(-100px) rotate(0deg); }
                to { transform: translateY(100vh) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Инициализация завершена
        console.log('🚀 Сайт Никиты Разживина инициализирован! Готов к поиску пасхалок!');
        
        // Тайное сообщение через 10 секунд
        setTimeout(() => {
            if (!isEasterEggActive && secretClickCount === 0) {
                utils.showNotification('🔍 На этом сайте есть секреты... Найдешь?', 'info');
            }
        }, 10000);
    }

    // Запуск
    initAll();
});