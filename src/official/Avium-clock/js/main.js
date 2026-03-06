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
const weekDays =['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function syncTime() {
    const d = new Date();
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    document.getElementById('time').textContent = `${h}:${m}`;
    
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    const wd = weekDays[d.getDay()];
    document.getElementById('date').textContent = `${mo}.${da} ${wd}`;
}

function syncBattery() {
    if (navigator.getBattery) {
        navigator.getBattery().then(bat => {
            const updateBat = () => {
                const pct = Math.round(bat.level * 100);
                document.getElementById('battery-val').textContent = pct + '%';
                
                const bar = document.getElementById('battery-level');
                bar.style.width = pct + '%';
                
                if (bat.charging) {
                    bar.style.background = '#81F49C';
                } else if (pct <= 20) {
                    bar.style.background = '#FF85A2';
                } else {
                    bar.style.background = '#62C8FF';
                }
            };
            updateBat();
            bat.onlevelchange = updateBat;
            bat.onchargingchange = updateBat;
        });
    }
}

function onTimeTick() {
    syncTime();
}

function onNotificationStateChanged(state) {
    const badge = document.getElementById('notification-badge');
    if (state) {
        badge.classList.add('active');
    } else {
        badge.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    syncTime();
    syncBattery();
    setInterval(syncTime, 1000);
});