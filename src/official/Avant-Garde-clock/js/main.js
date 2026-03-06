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
const days =['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function rT() {
    const d = new Date();
    document.getElementById('hr').textContent = String(d.getHours()).padStart(2, '0');
    document.getElementById('min').textContent = String(d.getMinutes()).padStart(2, '0');
    
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dt = String(d.getDate()).padStart(2, '0');
    document.getElementById('date-display').textContent = `${m}.${dt} — ${days[d.getDay()]}`;
}

function rB() {
    if (navigator.getBattery) {
        navigator.getBattery().then(b => {
            const uB = () => {
                const p = Math.round(b.level * 100);
                const f = document.getElementById('bat-fill');
                f.style.width = p + '%';
                
                if (b.charging) {
                    f.style.background = '#00FFCC';
                } else if (p <= 20) {
                    f.style.background = '#FF007F';
                } else {
                    f.style.background = 'linear-gradient(90deg, #FF007F, #00E5FF)';
                }
            };
            uB();
            b.onlevelchange = uB;
            b.onchargingchange = uB;
        });
    }
}

function onTimeTick() {
    rT();
}

function onNotificationStateChanged(s) {
    const o = document.getElementById('noti');
    if (s) {
        o.classList.add('active');
    } else {
        o.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    rT();
    rB();
    setInterval(rT, 1000);
});