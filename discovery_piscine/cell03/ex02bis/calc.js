$(document).ready(function() {
    $('#calcForm').submit(function(e) {
        e.preventDefault();

        const leftStr = $('#left').val().trim();
        const rightStr = $('#right').val().trim();
        const op = $('#op').val();

        const isPositiveInteger = (str) => /^\d+$/.test(str);

        if (!isPositiveInteger(leftStr) || !isPositiveInteger(rightStr)) {
            alert('Error :(');
            return;
        }

        const left = parseInt(leftStr, 10);
        const right = parseInt(rightStr, 10);

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

    setInterval(function() {
        alert('Please, use me...');
    }, 30000);
});