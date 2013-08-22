<?php

class Lightbox_Product_Block_Product_Latest extends Lightbox_Product_Block_Product_Abstract {
	protected $_title = 'Latest';
    protected $_priceSuffix = '-latest';
    protected $_className = 'bmproducts-latest';
    protected $_defaultColumnCount = 6;
    protected function _beforeToHtml() {
		$collection = $this->getCollection ( 'catalog/product_collection' )
						-> addAttributeToSelect ( 'rating_summary' )
						->setOrder ( 'created_at', 'desc' )
						-> setPageSize('10')
						-> setCurPage('1');
		Mage::getModel('review/review')->appendSummary($collection);
						var_dump($collection -> getSelect()->__toString());
		$this->setProductCollection ( $collection );
		
		return parent::_beforeToHtml ();
	} 
}