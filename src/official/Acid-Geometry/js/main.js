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
const wd =['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

function uT() {
    const d = new Date();
    document.getElementById('hour').textContent = String(d.getHours()).padStart(2, '0');
    document.getElementById('minute').textContent = String(d.getMinutes()).padStart(2, '0');
    
    const y = String(d.getFullYear()).slice(-2);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dt = String(d.getDate()).padStart(2, '0');
    document.getElementById('date').textContent = `${wd[d.getDay()]} ${m}.${dt}.${y}`;
}

function uB() {
    if (navigator.getBattery) {
        navigator.getBattery().then(b => {
            const cB = () => {
                const p = Math.round(b.level * 100);
                document.getElementById('bat-text').textContent = p + '%';
                
                const f = document.getElementById('bat-fill');
                f.style.width = p + '%';
                
                if (b.charging) {
                    f.style.background = '#00FF88';
                } else if (p <= 20) {
                    f.style.background = '#FF003C';
                } else {
                    f.style.background = '#EBFF00';
                }
            };
            cB();
            b.onlevelchange = cB;
            b.onchargingchange = cB;
        });
    }
}

function onTimeTick() {
    uT();
}

function onNotificationStateChanged(s) {
    const n = document.getElementById('noti');
    if (s) {
        n.classList.add('active');
    } else {
        n.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    uT();
    uB();
    setInterval(uT, 1000);
});