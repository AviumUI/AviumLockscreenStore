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
function tick() {
    const date = new Date();
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    document.getElementById('h').textContent = hours.toString().padStart(2, '0');
    document.getElementById('m').textContent = date.getMinutes().toString().padStart(2, '0');
    document.getElementById('ampm').textContent = ampm;
    document.getElementById('d').textContent = date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' });
}
setInterval(tick, 1000);
tick();