$j (function () {
	
	$j('.cate-menu').hover (
		
			menuMouseOver,
			
			menuMouseOut
	)
	
	$j('.cate-menu-out').hover (submenuMouseOver, submenuMouseOut);
	
}
		
)


function menuMouseOver () {
	if($j (this).css('width') != '238px') {
		$j (this). css ('width', '238px');
	}
	$j (this). animate({width:'+=752px'}, 200);
}

function menuMouseOut () {
	$j (this). css ('width', '238px');
}

function submenuMouseOver () {
	$j(this).find('em').css('display', 'inline');
	$j(this).children ('.cate-menu-in').show ();
	
}

function submenuMouseOut () {
	$j(this).find('em').css('display', 'none');
	$j(this).children ('.cate-menu-in').hide();
}