const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

function updateTime() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const weekday = weekdays[now.getDay()];
    
    document.getElementById('weekday').textContent = weekday;
    document.getElementById('date').textContent = `${month}月${date}日`;
}

function updateBattery() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            const level = Math.round(battery.level * 100);
            document.getElementById('battery-level').textContent = level + '%';
            
            let icon = '🔋';
            if (battery.charging) {
                icon = '⚡';
            } else if (level <= 20) {
                icon = '🪫';
            }
            document.getElementById('battery-icon').textContent = icon;
        });
    } else {
        document.getElementById('battery-level').textContent = '--%';
    }
}

function onTimeTick() {
    updateTime();
}

function onNotificationStateChanged(hasNotifications) {
    const hint = document.getElementById('notification-hint');
    if (hasNotifications) {
        hint.classList.add('has-notification');
        hint.querySelector('span:last-child').textContent = '有新通知';
    } else {
        hint.classList.remove('has-notification');
        hint.querySelector('span:last-child').textContent = '无通知';
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
    
    if (typeof AviumLockscreen !== 'undefined') {
        AviumLockscreen.log('Clock theme initialized');
    }
}

document.addEventListener('DOMContentLoaded', init);
