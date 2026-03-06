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
const weekdaysEN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function updateTime() {
    const now = new Date();
    
    document.getElementById('hours').textContent = String(now.getHours()).padStart(2, '0');
    document.getElementById('minutes').textContent = String(now.getMinutes()).padStart(2, '0');
    
    document.getElementById('weekday').textContent = weekdaysEN[now.getDay()];
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    document.getElementById('date').textContent = `${month}.${day}`;
}

function updateBattery() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            const level = Math.round(battery.level * 100);
            document.getElementById('battery-level').textContent = level + '%';
            
            const batteryBar = document.getElementById('battery-bar');
            batteryBar.style.width = level + '%';
            
            if (battery.charging) {
                batteryBar.style.background = '#00FFFF'; 
            } else if (level <= 20) {
                batteryBar.style.background = '#FF0055'; 
            } else {
                batteryBar.style.background = '#CCFF00'; 
            }
        });
    }
}

function onTimeTick() {
    updateTime();
}

function onNotificationStateChanged(hasNotifications) {
    const dot = document.getElementById('notification-dot');
    if (hasNotifications) {
        dot.classList.add('active'); 
    } else {
        dot.classList.remove('active');
    }
}

function init() {
    updateTime();
    updateBattery();
    setInterval(updateTime, 1000);
    
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            battery.addEventListener('levelchange', updateBattery);
            battery.addEventListener('chargingchange', updateBattery);
        });
    }
}

document.addEventListener('DOMContentLoaded', init);