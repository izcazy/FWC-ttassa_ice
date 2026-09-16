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
    const list = document.getElementById('ft_list');
    if (!list) return;
    
    const items = [];
    list.querySelectorAll('.todo-item').forEach(item => {
        items.push(item.textContent);
    });
    setCookie('todos', JSON.stringify(items));
}

function addTodo(text, save = true) {
    if (!text || text.trim() === '') return;

    const ftList = document.getElementById('ft_list');
    if (!ftList) return;

    const todo = document.createElement('div');
    todo.className = 'todo-item';
    todo.textContent = text.trim();

    todo.addEventListener('click', () => {
        if (confirm('Do you want to remove this TO DO?')) {
            todo.remove();
            saveTodos();
        }
    });

    ftList.insertBefore(todo, ftList.firstChild);
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

document.addEventListener('DOMContentLoaded', () => {
    loadTodos();

    const newBtn = document.getElementById('newBtn');
    if (newBtn) {
        newBtn.addEventListener('click', () => {
            const text = prompt('Enter a new TO DO:');
            if (text && text.trim() !== '') {
                addTodo(text.trim());
            }
        });
    }
});