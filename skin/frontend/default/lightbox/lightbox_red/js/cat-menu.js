$j (function () {
	
	$j('.cate-menu-out').hover (
		
			menuMouseOver,
			
			menuMouseOut
	)
	
}
		
)


function menuMouseOver () {
	$j ('.cate-menu'). css ('width:990px');
	$j(this).children ('.cate-menu-in').show ('slide');
	
}

function menuMouseOut () {
	$j ('.cate-menu'). css ('width:238px');
	$j(this).children ('.cate-menu-in').hide ();
}