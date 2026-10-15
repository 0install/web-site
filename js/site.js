// Follow the OS color scheme
(function () {
    var query = matchMedia('(prefers-color-scheme: dark)');
    function apply() { document.documentElement.setAttribute('data-bs-theme', query.matches ? 'dark' : 'light'); }
    apply();
    query.addEventListener('change', apply);
})();

(function () {
    function tabsOf(tablist) {
        return Array.from(tablist.querySelectorAll('[role=tab]'));
    }

    // Selects a tab within its own tablist only
    function activate(tab) {
        var tablist = tab.closest('[role=tablist]');
        tabsOf(tablist).forEach(function (other) {
            var selected = other === tab;
            other.classList.toggle('active', selected);
            other.setAttribute('aria-selected', selected);
            other.tabIndex = selected ? 0 : -1;
            document.getElementById(other.getAttribute('aria-controls')).hidden = !selected;
        });

        // Keep the selected tab visible in tablists that scroll sideways
        if (tablist.scrollWidth > tablist.clientWidth) {
            var tabRect = tab.getBoundingClientRect(), listRect = tablist.getBoundingClientRect();
            tablist.scrollLeft += tabRect.left - listRect.left - (listRect.width - tabRect.width) / 2;
        }
    }

    // Selects a tab and, for nested tablists, the tabs leading to it
    window.selectTab = function (tab) {
        var panel = tab.closest('[role=tablist]').closest('[role=tabpanel]');
        var parent = panel && document.querySelector('[role=tab][aria-controls="' + panel.id + '"]');
        if (parent) { selectTab(parent); }
        activate(tab);
    };

    function selectFromHash() {
        var tab = location.hash && document.querySelector('[role=tab][href="' + CSS.escape(location.hash) + '"]');
        if (tab) { selectTab(tab); }
    }

    function onKeyDown(event) {
        var tabs = tabsOf(event.currentTarget);
        var index = tabs.indexOf(document.activeElement);
        if (index < 0) { return; }
        switch (event.key) {
            case 'ArrowLeft': index = (index + tabs.length - 1) % tabs.length; break;
            case 'ArrowRight': index = (index + 1) % tabs.length; break;
            case 'Home': index = 0; break;
            case 'End': index = tabs.length - 1; break;
            default: return;
        }
        event.preventDefault();
        var tab = tabs[index];
        selectTab(tab);
        tab.focus();
        if (tab.hash) { history.replaceState(null, '', tab.hash); }
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[role=tablist]').forEach(function (tablist) {
            var tabs = tabsOf(tablist);
            activate(tabs.find(function (tab) { return tab.getAttribute('aria-selected') === 'true'; }) || tabs[0]);
            tabs.forEach(function (tab) {
                tab.addEventListener('click', function () { selectTab(tab); });
            });
            tablist.addEventListener('keydown', onKeyDown);
        });
        selectFromHash();
    });
    addEventListener('hashchange', selectFromHash);
})();

document.addEventListener('click', function (event) {
    var button = event.target.closest('.terminal-copy');
    if (!button) { return; }
    navigator.clipboard.writeText(button.parentElement.querySelector('.form-control-plaintext').value).then(function () {
        var icon = button.querySelector('i');
        icon.className = 'fas fa-check';
        setTimeout(function () { icon.className = 'far fa-copy'; }, 1500);
    });
});
