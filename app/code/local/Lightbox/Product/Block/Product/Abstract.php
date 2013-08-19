<?php

class Lightbox_Product_Block_Product_Abstract extends Mage_Catalog_Block_Product_Abstract {
	public function getCollection($collection = 'catalog/catalog_product_collection') {
		if (! $collection instanceof Mage_Catalog_Model_Resource_Eav_Mysql4_Product_Collection) {
			$collection = Mage::getResourceModel ( $collection );
		}
		$collection = $this->_addProductAttributesAndPrices ($collection)
							-> addAttributeToSelect ('category');
							//$category = Mage::registry('current_category');
							//var_dump($category -> getId(), 'zjh');
		
		return $collection;
	}
}
