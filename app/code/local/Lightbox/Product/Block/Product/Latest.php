<?php

class Lightbox_Product_Block_Product_Latest extends Lightbox_Product_Block_Product_Abstract {
    protected function _construct()
    {
        parent::_construct();

        /*
         * In case template was passed through constructor
         * we assign it to block's property _template
         * Mainly for those cases when block created
         * not via Mage_Core_Model_Layout::addBlock()
         */
        if ($this->hasData('template')) {
            $this->setTemplate($this->getData('template'));
        }
    }
	public function test () {
		echo 'zjh';
	}
}