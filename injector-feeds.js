function hideTabs() {
    $('.nav-tabs a.nav-link').removeClass('active');
    $('.tab-body').hide();
}

function showTab(name) {
    $('.nav-tabs a.nav-link[href="#' + name + '"]').addClass('active');
    $('#' + name).show();
}

function updateTabs() {
    if (window.location.hash) {
        tabName = window.location.hash.slice(1);
        outerTabName = tabName.split('-')[0];

        hideTabs();
        showTab(outerTabName);
        showTab(tabName);
    } else {
        window.location.hash = '#featured';
    }
}

$(window).bind('hashchange', updateTabs);
$(function() { updateTabs(); });