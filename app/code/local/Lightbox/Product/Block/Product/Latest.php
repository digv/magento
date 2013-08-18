<?php

class Lightbox_Product_Block_Product_Latest extends Lightbox_Product_Block_Product_Abstract {
	protected $_title = 'Latest';
    protected $_priceSuffix = '-latest';
    protected $_className = 'bmproducts-latest';
    protected $_defaultColumnCount = 6;
    protected function _beforeToHtml() {
		$collection = $this->getCollection ( 'reports/product_collection' )
						-> addAttributeToSelect ( 'updated_at' )
						->setOrder ( 'updated_at', 'desc' );
		
						//var_dump((string) $collection -> getSelect());
		$this->setProductCollection ( $collection );
		
		return parent::_beforeToHtml ();
	} 
}