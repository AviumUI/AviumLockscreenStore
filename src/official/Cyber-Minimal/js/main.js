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
function update() {
    const d = new Date();
    document.getElementById('hour').textContent = d.getHours().toString().padStart(2, '0');
    document.getElementById('minute').textContent = d.getMinutes().toString().padStart(2, '0');
    document.getElementById('sec').textContent = d.getSeconds().toString().padStart(2, '0');
    document.getElementById('date').textContent = d.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'}).replace(/\//g, '.');
}
setInterval(update, 1000);
update();