<?php

class Lightbox_Product_Block_Product_Latest extends Lightbox_Product_Block_Product_Abstract {
    protected function _construct()
    {
        $this->setTemplate('product/latest/latest.phtml');
    }
	public function test () {
		echo 'zjh';
	}
}