$j(function() {

	$j('.cate-menu-out').hover(submenuMouseOver, submenuMouseOut);
	$j('.cate-menu').hover(menuMouseOver, menuMouseOut);
}

)

function menuMouseOver() {
	if ($j('.cate-menu-out:hover').length > 0) {
		if ($j(this).css('width') != '238px') {
			$j(this).css('width', '238px');
		}
		$j(this).stop(true, true).animate({
			width : '+990px'
		}, 200);

	}

}

function menuMouseOut() {
	$j(this).stop(true, true);
	$j(this).css('width', '238px');
}

function submenuMouseOver() {
	$j(this).find('em').css('display', 'inline');
	$j(this).children('.cate-menu-in').show();

}

function submenuMouseOut() {
	$j(this).find('em').css('display', 'none');
	$j(this).children('.cate-menu-in').hide();
}