# Avium Lockscreen Theme

**[English](README_EN.md) | 中文**

[查看主题预览](Preview/Preview.md)

## 快速开始

> 你可以在[lockscreen-product](lockscreen-product/)下下载其它主题，也可以创建pr到[lockscreen-product](lockscreen-product/)下，我们审核后会进行收录

### 主题目录结构

```
theme.zip
├── index.html          # 入口文件（必须）
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
└── fonts/
```

### 完整示例（仅仅是一个示例，相关文件在src/clock-theme下）

[index.html](clock-theme/index.html)
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>时钟主题</title>
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
                <span id="weekday">星期一</span>
                <span id="date">1月1日</span>
            </div>
        </div>
        
        <div class="info-section">
            <div class="battery-info">
                <span id="battery-icon">🔋</span>
                <span id="battery-level">--%</span>
            </div>
            <div class="notification-hint" id="notification-hint">
                <span>📱</span>
                <span>无通知</span>
            </div>
        </div>
        
        <div class="unlock-hint">
            <span>上滑解锁</span>
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
const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
let isAod = false;

function updateTime() {
    const now = new Date();
    
    document.getElementById('hours').textContent = String(now.getHours()).padStart(2, '0');
    document.getElementById('minutes').textContent = String(now.getMinutes()).padStart(2, '0');
    
    if (!isAod) {
        document.getElementById('seconds').textContent = String(now.getSeconds()).padStart(2, '0');
    }
    
    document.getElementById('weekday').textContent = weekdays[now.getDay()];
    document.getElementById('date').textContent = `${now.getMonth() + 1}月${now.getDate()}日`;
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
    hint.querySelector('span:last-child').textContent = hasNotifications ? '有新通知' : '无通知';
}

function onAodStateChanged(aod) {
    isAod = aod;
    if (!aod) {
        updateTime();
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
```

## JavaScript API

### 系统接口

```javascript
// 获取系统属性
AviumLockscreen.getSystemProperty(key, defaultValue);
AviumLockscreen.getSystemPropertyInt(key, defaultValue);
AviumLockscreen.getSystemPropertyBoolean(key, defaultValue);

// 获取当前时间戳
AviumLockscreen.getCurrentTime();

// 获取主题名称
AviumLockscreen.getThemeName();

// 输出日志到 logcat
AviumLockscreen.log(message);

// 获取系统语言
const locale = AviumLockscreen.getSystemProperty("persist.sys.locale", "zh-CN");

//Aod状态
AviumLockscreen.isAod();
```

### 系统回调

```javascript
// 每分钟触发
function onTimeTick() {
    updateClock();
}

// 通知状态变化时触发
function onNotificationStateChanged(hasNotifications) {
    // hasNotifications: boolean
}

// AOD 状态变化时触发
function onAodStateChanged(isAod) {
    // isAod: boolean
    // true: 进入 AOD 模式
    // false: 离开 AOD 模式
}
```

## AOD（Always On Display）支持

### AOD 功能说明

AOD（Always On Display）是熄屏显示功能，在设备锁屏但屏幕仍保持低功耗显示时使用。为了节省电量，在 AOD 模式下应该暂停不必要的动态效果和秒针更新。

```javascript
let isAod = false;

function updateClock() {
    const now = new Date();
    
    // 时和分始终更新
    document.getElementById('hours').textContent = String(now.getHours()).padStart(2, '0');
    document.getElementById('minutes').textContent = String(now.getMinutes()).padStart(2, '0');
    
    // 秒针只在非 AOD 状态下更新
    if (!isAod) {
        document.getElementById('seconds').textContent = String(now.getSeconds()).padStart(2, '0');
    }
}

// AOD 状态变化回调
function onAodStateChanged(aod) {
    isAod = aod;
    
    if (!aod) {
        // 离开 AOD 时立即更新一次，确保显示最新时间
        updateClock();
    }
}

// 定时更新时钟
setInterval(updateClock, 1000);
```

### AOD 注意事项

| 项目 | 说明 |
|------|------|
| 时和分 | 在 AOD 状态下继续正常更新 |
| 秒针 | 在 AOD 状态下暂停更新 |
| 动态效果 | 在 AOD 状态下暂停动画和动态效果 |
| 日期显示 | 在 AOD 状态下可以继续显示 |
| 电池信息 | 在 AOD 状态下可以继续显示 |

### 获取当前 AOD 状态

```javascript
// 获取当前是否处于 AOD 状态
const currentAodState = AviumLockscreen.isAod();
```

## 重要规范

| 要求 | 说明 |
|------|------|
| 入口文件 | `index.html` 必须位于 ZIP 根目录 |
| 背景 | 必须设置 `background: transparent` |
| 全屏 | 使用 `width: 100vw; height: 100vh;` |
| 路径 | 所有资源使用相对路径 |
| 网络 | 禁止外部网络资源加载 |
| 触摸 | 触摸事件被禁用 |

## 支持文件类型

| 扩展名 | MIME 类型 |
|--------|----------|
| .html, .htm | text/html |
| .css | text/css |
| .js | application/javascript |
| .png | image/png |
| .jpg, .jpeg | image/jpeg |
| .gif | image/gif |
| .svg | image/svg+xml |
| .woff, .woff2 | font/woff |
| .ttf | font/ttf |

## 打包主题

```bash
cd theme-directory
zip -r ../theme.zip .
```

## 调试

```bash
adb logcat -s WebViewLockscreen:D
```
