// Follow the OS color scheme
(function () {
    var query = matchMedia('(prefers-color-scheme: dark)');
    function apply() { document.documentElement.setAttribute('data-bs-theme', query.matches ? 'dark' : 'light'); }
    apply();
    query.addEventListener('change', apply);
})();

// Hash-based tabs
function hideTabs() {
    document.querySelectorAll('.nav .nav-link[href^="#"]').forEach(function (link) { link.classList.remove('active'); });
    document.querySelectorAll('.tab-body').forEach(function (body) { body.hidden = true; });
}

function showTab(name) {
    document.querySelectorAll('.nav .nav-link[href="#' + name + '"]').forEach(function (link) { link.classList.add('active'); });
    var body = document.getElementById(name + '-tab');
    if (body) { body.hidden = false; }
}

function copy(id) {
    navigator.clipboard.writeText(document.getElementById(id).value);
}
