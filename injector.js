function detect() {
    function is(os) {
        return navigator.userAgent.search(os) >= 0;
    }

    if (is('Debian') || is('Ubuntu')) { return 'linux-debian'; }
    if (is('Fedora')) { return 'linux-fedora'; }
    if (is('Red Hat')) { return 'linux-redhat'; }
    if (is('SUSE')) { return 'linux-suse'; }
    if (is('Linux')) { return 'linux-generic'; }
    if (is('OS X')) { return 'mac'; }
    if (is('Windows NT 6.1') || is('Windows NT 6.2') || is('Windows NT 10.0')) { return 'windows-current'; }
    return 'windows-legacy';
}

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
        window.location.hash = '#' + detect();
    }
}

$(window).bind('hashchange', updateTabs);
$(function() { updateTabs(); });