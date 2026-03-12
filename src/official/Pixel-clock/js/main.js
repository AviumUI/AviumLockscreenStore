/*
 * Copyright (C) 2026 The AviumUI Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      `http://www.apache.org/licenses/LICENSE-2.0`
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// 补零函数
const zeroPad = (num) => num.toString().padStart(2, '0');

function setNotificationHint(hasNotifications) {
    const hint = document.getElementById('notification-hint');
    if (!hint) return;

    const textNode = hint.querySelector('.text') || hint;
    if (!hasNotifications) {
        textNode.textContent = 'NO NEW MESSAGES';
        hint.classList.remove('has-notification');
        return;
    }

    textNode.textContent = 'NEW MESSAGES';
    hint.classList.add('has-notification');
}

function updateNothingClock() {
    const now = new Date();
    
    document.getElementById('hours').innerText = zeroPad(now.getHours());
    document.getElementById('minutes').innerText = zeroPad(now.getMinutes());
    
    const w = now.toString().split(' ')[0];
    const m = zeroPad(now.getMonth() + 1);
    const d = zeroPad(now.getDate());
    
    document.getElementById('weekday').innerText = w.toUpperCase();
    document.getElementById('month-day').innerText = `${m}.${d}`;
}

// Called by host when notification state changes.
function onNotificationStateChanged(hasNotifications) {
    if (typeof hasNotifications === 'number') {
        setNotificationHint(hasNotifications > 0);
        return;
    }

    if (typeof hasNotifications === 'object' && hasNotifications !== null && 'count' in hasNotifications) {
        setNotificationHint(Number(hasNotifications.count) > 0);
        return;
    }

    setNotificationHint(Boolean(hasNotifications));
}

// Optional callback for hosts that can directly provide notification count.
function onNotificationCountChanged(count) {
    setNotificationHint(Number(count) > 0);
}

// 电池电量状态展示
function initBatteryMonitor() {
    const levelFill = document.getElementById('battery-level');
    const bNum = document.getElementById('battery-pct');
    
    if (navigator.getBattery) {
        navigator.getBattery().then(bat => {
            updateBatUI(bat.level, bat.charging);
            bat.addEventListener('levelchange', () => updateBatUI(bat.level, bat.charging));
            bat.addEventListener('chargingchange', () => updateBatUI(bat.level, bat.charging));
        });
    } else {
        updateBatUI(0.42, false); // Demo Mode Fallback
    }
    
    function updateBatUI(level, isCharging) {
        const p = Math.round(level * 100);
        bNum.innerText = `${p}%`;
        levelFill.style.width = p + '%';
        
        // 极低电量时变为红色
        if(p <= 15) {
            levelFill.style.background = '#ea1b22';
            bNum.style.color = '#ea1b22';
        } else {
            levelFill.style.background = '#f4f4f4';
            bNum.style.color = '#f4f4f4';
        }

        if(isCharging) {
            bNum.innerText += '⚡';
        }
    }
}

// 每秒更新
setInterval(updateNothingClock, 1000);
updateNothingClock();
setNotificationHint(false);

window.onNotificationStateChanged = onNotificationStateChanged;
window.onNotificationCountChanged = onNotificationCountChanged;
