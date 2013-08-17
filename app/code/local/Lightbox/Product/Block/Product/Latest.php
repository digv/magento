<?php

class Lightbox_Product_Block_Product_Latest extends Lightbox_Product_Block_Product_Abstract {
	protected $_title = 'Latest';
    protected $_priceSuffix = '-latest';
    protected $_className = 'bmproducts-latest';
    
    protected function _beforeToHtml() {
		$collection = $this->getCollection ( 'catalog/reports_product_collection' )->

		addAttributeToSelect ( 'updated_at' )->setOrder ( 'updated_at', 'desc' );
		
		$this->setProductCollection ( $collection );
		
		return parent::_beforeToHtml ();
	} 
}