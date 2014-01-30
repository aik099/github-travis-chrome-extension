// ==UserScript==
// @name       github-travis-chrome-extension
// @version    0.4
// @match      https://github.com/*/*/pulls*
// @copyright  2014 Adrien Brault
// ==/UserScript==

$(insertStatusesIfPullList);

// Will not work in the chrome extension, only as a user script
$(document).on('pjax:end', insertStatusesIfPullList);

function insertStatusesIfPullList() {
    $('.pulls-list-group').each(function () {
        insertStatuses(this);
    });
}

function insertStatuses(el) {
    var $el = $(el);

    $el.find('.list-group-item').each(function () {
        var $this = $(this);

        var pullRequestPath = $this.find('a.js-navigation-open').attr('href');
        var pullRequestStatusPath = pullRequestPath + '/show_partial?partial=branch_status';

        $.ajax({
            url: pullRequestStatusPath,
            success: function (data) {
                $this.append(data);
            }
        });
    });
}
