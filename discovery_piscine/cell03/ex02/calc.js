document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calcForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const leftStr = document.getElementById('left').value.trim();
        const rightStr = document.getElementById('right').value.trim();
        const op = document.getElementById('op').value;

        // ตรวจสอบว่าเป็นจำนวนเต็มบวกหรือศูนย์เท่านั้น (เฉพาะตัวเลข 0-9)
        const isPositiveInteger = (str) => /^\d+$/.test(str);

        if (!isPositiveInteger(leftStr) || !isPositiveInteger(rightStr)) {
            alert('Error :(');
            return;
        }

        const left = parseInt(leftStr, 10);
        const right = parseInt(rightStr, 10);

        // ตรวจสอบการหาร/เทคเศษด้วย 0
        if ((op === '/' || op === '%') && right === 0) {
            alert("It's over 9000!");
            console.log("It's over 9000!");
            return;
        }

        let result;
        switch (op) {
            case '+': result = left + right; break;
            case '-': result = left - right; break;
            case '*': result = left * right; break;
            case '/': result = left / right; break;
            case '%': result = left % right; break;
        }

        alert(result);
        console.log(result);
    });

    // เด้งแจ้งเตือนทุกๆ 30 วินาที
    setInterval(() => {
        alert('Please, use me...');
    }, 30000);
});
