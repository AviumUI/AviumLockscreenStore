# Avium Lockscreen Theme

**English | [中文](README.md)**

[View Theme Preview](Preview/Preview.md)

## Quick Start

> You can download other themes from [lockscreen-product](lockscreen-product/), or create a pull request to [lockscreen-product](lockscreen-product/) to add your theme. We will review and include it if it meets the requirements.

### Theme Directory Structure

```
theme.zip
├── index.html          # Entry file (required)
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
└── fonts/
```

### Complete Example (This is just an example, related files are in src/clock-theme)

[index.html](clock-theme/index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clock Theme</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="lockscreen-container">
        <div class="clock-section">
            <div class="time-display">
                <span id="hours">12</span>
                <span class="colon">:</span>
                <span id="minutes">00</span>
            </div>
            <div class="seconds-display">
                <span id="seconds">00</span>
            </div>
            <div class="date-display">
                <span id="weekday">Monday</span>
                <span id="date">Jan 1</span>
            </div>
        </div>
        
        <div class="info-section">
            <div class="battery-info">
                <span id="battery-icon">🔋</span>
                <span id="battery-level">--%</span>
            </div>
            <div class="notification-hint" id="notification-hint">
                <span>📱</span>
                <span>No notifications</span>
            </div>
        </div>
        
        <div class="unlock-hint">
            <span>Swipe up to unlock</span>
        </div>
    </div>
    
    <script src="js/main.js"></script>
</body>
</html>
```

[style.css](clock-theme/css/style.css)
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    width: 100vw;
    height: 100vh;
    background: transparent;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lockscreen-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 60px 30px 40px;
    position: relative;
}

.clock-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
}

.time-display {
    display: flex;
    align-items: center;
    font-size: 96px;
    font-weight: 200;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.time-display .colon {
    animation: blink 2s infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

.seconds-display {
    font-size: 36px;
    margin-top: 10px;
    opacity: 0.8;
}

.date-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    font-size: 20px;
}

.info-section {
    position: absolute;
    top: 20px;
    right: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
}

.battery-info, .notification-hint {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    backdrop-filter: blur(10px);
}

.notification-hint.has-notification {
    background: rgba(0, 150, 255, 0.4);
}

.unlock-hint {
    margin-bottom: 20px;
    font-size: 14px;
    opacity: 0.6;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}
```

[main.js](clock-theme/js/main.js)
```javascript
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function updateTime() {
    const now = new Date();
    
    document.getElementById('hours').textContent = String(now.getHours()).padStart(2, '0');
    document.getElementById('minutes').textContent = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('seconds').textContent = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('weekday').textContent = weekdays[now.getDay()];
    document.getElementById('date').textContent = `${months[now.getMonth()]} ${now.getDate()}`;
}

function updateBattery() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            const level = Math.round(battery.level * 100);
            document.getElementById('battery-level').textContent = level + '%';
            document.getElementById('battery-icon').textContent = 
                battery.charging ? '⚡' : (level <= 20 ? '🪫' : '🔋');
        });
    }
}

function onTimeTick() {
    updateTime();
}

function onNotificationStateChanged(hasNotifications) {
    const hint = document.getElementById('notification-hint');
    hint.classList.toggle('has-notification', hasNotifications);
    hint.querySelector('span:last-child').textContent = hasNotifications ? 'New notifications' : 'No notifications';
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
```

## JavaScript API

### System Interface

```javascript
// Get system properties
AviumLockscreen.getSystemProperty(key, defaultValue);
AviumLockscreen.getSystemPropertyInt(key, defaultValue);
AviumLockscreen.getSystemPropertyBoolean(key, defaultValue);

// Get current timestamp
AviumLockscreen.getCurrentTime();

// Get theme name
AviumLockscreen.getThemeName();

// Log to logcat
AviumLockscreen.log(message);

// Get system locale
const locale = AviumLockscreen.getSystemProperty("persist.sys.locale", "en-US");
```

### System Callbacks

```javascript
// Triggered every minute
function onTimeTick() {
    updateClock();
}

// Triggered when notification state changes
function onNotificationStateChanged(hasNotifications) {
    // hasNotifications: boolean
}
```

## Important Guidelines

| Requirement | Description |
|-------------|-------------|
| Entry File | `index.html` must be in ZIP root directory |
| Background | Must set `background: transparent` |
| Fullscreen | Use `width: 100vw; height: 100vh;` |
| Paths | Use relative paths for all resources |
| Network | External network resources loading prohibited |
| Touch | Touch events disabled |

## Supported File Types

| Extension | MIME Type |
|-----------|-----------|
| .html, .htm | text/html |
| .css | text/css |
| .js | application/javascript |
| .png | image/png |
| .jpg, .jpeg | image/jpeg |
| .gif | image/gif |
| .svg | image/svg+xml |
| .woff, .woff2 | font/woff |
| .ttf | font/ttf |

## Packaging Theme

```bash
cd theme-directory
zip -r ../theme.zip .
```

## Debugging

```bash
adb logcat -s WebViewLockscreen:D
```

## Complete Example Project

[clock-theme/](clock-theme/) - Clock theme complete source code
