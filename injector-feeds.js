function hideTabs() {
    $('.nav-tabs a.nav-link').removeClass('active');
    $('.tab-body').hide();
}

function showTab(name) {
    $('.nav-tabs a.nav-link[href="#' + name + '"]').addClass('active');
    $('#' + name + '-tab').show();
}

function updateTabs() {
    if (window.location.hash) {
        hideTabs();
        showTab(window.location.hash.slice(1));
    } else {
        window.location.hash = '#featured';
    }
}

$(window).bind('hashchange', updateTabs);
$(function() { updateTabs(); });