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
const dNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function t() {
    const d = new Date();
    document.getElementById('hours').textContent = String(d.getHours()).padStart(2, '0');
    document.getElementById('minutes').textContent = String(d.getMinutes()).padStart(2, '0');
    
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dt = String(d.getDate()).padStart(2, '0');
    document.getElementById('date').textContent = `${dNames[d.getDay()]} ${m}/${dt}`;
}

function b() {
    if (navigator.getBattery) {
        navigator.getBattery().then(bat => {
            const ub = () => {
                const p = Math.round(bat.level * 100);
                document.getElementById('bat-text').textContent = p + '%';
                
                const j = document.getElementById('juice');
                j.style.width = p + '%';
                
                if (bat.charging) {
                    j.style.background = '#FFE66D';
                } else if (p <= 20) {
                    j.style.background = '#FF6B6B';
                } else {
                    j.style.background = '#4ECDC4';
                }
            };
            ub();
            bat.onlevelchange = ub;
            bat.onchargingchange = ub;
        });
    }
}

function onTimeTick() {
    t();
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
    t();
    b();
    setInterval(t, 1000);
});