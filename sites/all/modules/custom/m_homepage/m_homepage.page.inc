<?php
		
	function show_homepage(){
		$build=array();
		$c=variable_get_value('m_homepage_letter',array('value' => ''));
		$build['#content']=$c['value'];
		$build['#theme']='homepage_content';
		return $build;	
	}
	
	