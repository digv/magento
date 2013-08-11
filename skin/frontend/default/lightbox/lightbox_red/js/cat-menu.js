$j (function () {
	
	$j('.cate-menu').hover (
		
			menuMouseOver,
			
			menuMouseOut
	)
	
}
		
)


function menuMouseOver () {
	$j (this). animate({width:'+=752px'}, 200);
	$j(this).children ('.cate-menu-out').hover (submenuMouseOver, submenuMouseOut)
	
}

function menuMouseOut () {
	$j (this). css ('width', '238px');
}

function submenuMouseOver () {
	$j(this).prev('h2').find('em').css('display', 'inline');
	$j(this).children ('.cate-menu-in').show ();
	
}

function submenuMouseOut () {
	$j(this).prev('h2').find('em').css('display', 'none');
	$j(this).children ('.cate-menu-in').hide();
}