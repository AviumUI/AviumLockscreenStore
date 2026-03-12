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
let isAod = false;

function tick() {
    const d = new Date();
    document.getElementById('h').textContent = d.getHours().toString().padStart(2, '0');
    document.getElementById('m').textContent = d.getMinutes().toString().padStart(2, '0');
    if (!isAod) {
        document.getElementById('s').textContent = d.getSeconds().toString().padStart(2, '0');
    }
    document.getElementById('d').textContent = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function onAodStateChanged(aod) {
    isAod = aod;
    if (!aod) {
        tick();
    }
}

setInterval(tick, 1000);
tick();