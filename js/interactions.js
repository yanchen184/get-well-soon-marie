// Interactive features for Marie's comfort website

// Global variables
let surpriseShown = false;
let selectedMood = null;
let pillsTaken = 0;
const totalPills = 10;

// Initialize interactions when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePillTracker();
    loadUserData();
    setupEventListeners();
});

/**
 * Initialize pill tracker with 10 pills
 */
function initializePillTracker() {
    const pillTracker = document.getElementById('pillTracker');
    if (!pillTracker) return;
    
    pillTracker.innerHTML = '';
    
    for (let i = 1; i <= totalPills; i++) {
        const pill = document.createElement('div');
        pill.className = 'pill';
        pill.textContent = i;
        pill.onclick = () => togglePill(pill, i);
        pill.setAttribute('data-pill', i);
        pillTracker.appendChild(pill);
    }
    
    updatePillProgress();
}

/**
 * Toggle pill taken status
 */
function togglePill(pillElement, pillNumber) {
    const wasTaken = pillElement.classList.contains('taken');
    
    if (wasTaken) {
        pillElement.classList.remove('taken');
        pillsTaken--;
    } else {
        pillElement.classList.add('taken');
        pillsTaken++;
        
        // Add sparkle effect when pill is taken
        if (window.AnimationController) {
            window.AnimationController.addSparkleEffect(pillElement);
        }
        
        // Show encouragement when reaching milestones
        showPillEncouragement(pillsTaken);
    }
    
    updatePillProgress();
    saveUserData();
}

/**
 * Show encouragement messages for pill milestones
 */
function showPillEncouragement(takenCount) {
    let message = '';
    
    switch(takenCount) {
        case 3:
            message = '很棒！已經吃了3顆藥了 💪';
            break;
        case 5:
            message = '太厲害了！已經一半了！🌟';
            break;
        case 8:
            message = '快完成了！加油！🎉';
            break;
        case 10:
            message = '完美！今天的藥都吃完了！你真的很棒！🏆✨';
            break;
    }
    
    if (message) {
        showTemporaryMessage(message, 'success');
    }
}

/**
 * Update pill progress display
 */
function updatePillProgress() {
    const progressText = `${pillsTaken}/${totalPills} 顆藥物`;
    const pillText = document.querySelector('.pill-text');
    if (pillText) {
        pillText.textContent = `今天的藥物進度：${progressText}`;
    }
}

/**
 * Reset all pills
 */
function resetPills() {
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.classList.remove('taken');
    });
    pillsTaken = 0;
    updatePillProgress();
    saveUserData();
    showTemporaryMessage('已重置藥物記錄', 'info');
}

/**
 * Show surprise content
 */
function showSurprise() {
    const surpriseContent = document.getElementById('surpriseContent');
    const surpriseBtn = document.querySelector('.surprise-btn');
    
    // Array of surprise messages
    const surpriseMessages = [
        '你是最棒的！康復後我們一起去吃好吃的！🌟',
        '每一天都在變好，你做得很好！💖',
        '雖然現在辛苦，但很快就會好起來的！🌈',
        '你的堅強讓人感動，加油！💪',
        '想念和你一起聊天的時光，快點好起來！🥰',
        '你的笑容是最美的風景，期待再次見到！😊',
        '休息是為了走更遠的路，慢慢來不著急！🌸',
        '你的勇敢讓所有人都很感動！💝',
        '健康是最重要的財富，你正在努力找回它！🌺',
        '每一次的呼吸都是進步，你做得很好！🌿'
    ];
    
    if (!surpriseShown) {
        // First time showing surprise
        surpriseContent.classList.add('show');
        surpriseBtn.textContent = '再來一個驚喜！';
        surpriseShown = true;
        
        // Add sparkle effect to surprise area
        if (window.AnimationController) {
            setTimeout(() => {
                window.AnimationController.addSparkleEffect(surpriseContent);
            }, 300);
        }
    } else {
        // Already shown, generate new surprise message
        // Add a little animation to show the change
        surpriseContent.style.opacity = '0.5';
        surpriseContent.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
            document.querySelector('.surprise-message').textContent = randomMessage;
            
            // Restore animation
            surpriseContent.style.opacity = '1';
            surpriseContent.style.transform = 'scale(1)';
            
            // Add sparkle effect for new surprise
            if (window.AnimationController) {
                window.AnimationController.addSparkleEffect(surpriseContent);
            }
        }, 200);
    }
}

/**
 * Handle mood selection
 */
function selectMood(mood) {
    // Update button states
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    const selectedBtn = document.querySelector(`[data-mood="${mood}"]`);
    selectedBtn.classList.add('selected');
    
    // Show response based on mood
    const responses = {
        'great': '太棒了！保持這個好心情，它會幫助你更快康復！😊',
        'good': '很好！一點一點地進步，你做得很棒！👍',
        'okay': '普通也沒關係，有起有落是正常的。記得你不是一個人在戰鬥！💝',
        'tired': '累累是可以理解的，多休息一下。身體在努力修復中，辛苦了！😴💤'
    };
    
    const moodResponse = document.getElementById('moodResponse');
    moodResponse.textContent = responses[mood];
    moodResponse.classList.add('show');
    
    selectedMood = mood;
    saveUserData();
    
    // Add ripple effect to selected button
    if (window.AnimationController) {
        window.AnimationController.createRippleEffect(
            { clientX: selectedBtn.offsetLeft + selectedBtn.offsetWidth / 2,
              clientY: selectedBtn.offsetTop + selectedBtn.offsetHeight / 2 },
            selectedBtn
        );
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Add click effects to cards
    document.querySelectorAll('.message-card, .relief-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (window.AnimationController) {
                window.AnimationController.createRippleEffect(e, this);
                window.AnimationController.addSparkleEffect(this);
            }
        });
    });
    
    // Add hover effects
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Surprise button enhanced effects
    const surpriseBtn = document.querySelector('.surprise-btn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function(e) {
            if (window.AnimationController) {
                window.AnimationController.createRippleEffect(e, this);
            }
        });
    }
}

/**
 * Show temporary message
 */
function showTemporaryMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'info' ? '#d1ecf1' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : type === 'info' ? '#0c5460' : '#721c24'};
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        font-weight: 500;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

/**
 * Save user data to localStorage
 */
function saveUserData() {
    const data = {
        pillsTaken: pillsTaken,
        takenPills: Array.from(document.querySelectorAll('.pill.taken')).map(pill => 
            parseInt(pill.getAttribute('data-pill'))
        ),
        selectedMood: selectedMood,
        lastVisit: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('marieComfortData', JSON.stringify(data));
    } catch (e) {
        console.log('無法保存數據，可能是隱私模式');
    }
}

/**
 * Load user data from localStorage
 */
function loadUserData() {
    try {
        const savedData = localStorage.getItem('marieComfortData');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Restore pill status
            if (data.takenPills) {
                pillsTaken = data.pillsTaken || 0;
                data.takenPills.forEach(pillNum => {
                    const pill = document.querySelector(`[data-pill="${pillNum}"]`);
                    if (pill) {
                        pill.classList.add('taken');
                    }
                });
                updatePillProgress();
            }
            
            // Restore mood selection
            if (data.selectedMood) {
                selectMood(data.selectedMood);
            }
        }
    } catch (e) {
        console.log('無法載入保存的數據');
    }
}

/**
 * Check if it's a new day and reset daily data
 */
function checkNewDay() {
    try {
        const savedData = localStorage.getItem('marieComfortData');
        if (savedData) {
            const data = JSON.parse(savedData);
            const lastVisit = new Date(data.lastVisit);
            const today = new Date();
            
            // If it's a new day, reset pills
            if (lastVisit.toDateString() !== today.toDateString()) {
                resetPills();
                showTemporaryMessage('新的一天開始了！藥物記錄已重置 🌅', 'info');
            }
        }
    } catch (e) {
        console.log('無法檢查日期');
    }
}

// Check for new day on page load
checkNewDay();

// Export functions for global access
window.showSurprise = showSurprise;
window.selectMood = selectMood;
window.resetPills = resetPills;