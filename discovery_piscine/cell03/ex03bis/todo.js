function setCookie(name, value, days = 7) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function saveTodos() {
    const items = [];
    $('.todo-item').each(function() {
        items.push($(this).text());
    });
    setCookie('todos', JSON.stringify(items));
}

function addTodo(text, save = true) {
    if (!text || text.trim() === '') return;

    const $todo = $('<div></div>').addClass('todo-item').text(text.trim());

    $todo.click(function() {
        if (confirm('Do you want to remove this TO DO?')) {
            $(this).remove();
            saveTodos();
        }
    });

    $('#ft_list').prepend($todo);
    if (save) saveTodos();
}

function loadTodos() {
    const cookieData = getCookie('todos');
    if (cookieData) {
        try {
            const items = JSON.parse(cookieData);
            if (Array.isArray(items)) {
                for (let i = items.length - 1; i >= 0; i--) {
                    addTodo(items[i], false);
                }
            }
        } catch (e) {
            console.error('Error parsing cookie:', e);
        }
    }
}

$(document).ready(function() {
    loadTodos();

    $('#newBtn').click(function() {
        const text = prompt('Enter a new TO DO:');
        if (text && text.trim() !== '') {
            addTodo(text.trim());
        }
    });
});