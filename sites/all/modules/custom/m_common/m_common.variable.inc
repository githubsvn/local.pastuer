<?php
	function m_common_variable_info($options) {
		
		 $variables['m_homepage_letter'] = array(
	    'type' => 'text_format',
	    'title' => t('Content of homepage', array(), $options),
	    'default' => '',
	    'description' => t('Content letter at the homepage.', array(), $options),
	    'required' => TRUE,
	    'group' => 'm_common',
	  );
	  
	  $variables['m_footer'] = array(
	    'type' => 'text_format',
	    'title' => t('Content of footer', array(), $options),
	    'default' => '',
	    'description' => t('Content footer at the page.', array(), $options),
	    'required' => TRUE,
	    'group' => 'm_common_footer',
	  );
	  
	   $variables['m_recruitment'] = array(
	    'type' => 'text_format',
	    'title' => t('Content of Recruiment', array(), $options),
	    'default' => '',
	    'description' => t('Content Recruiment at the page.', array(), $options),
	    'required' => TRUE,
	    'group' => 'm_content_recruitment',
	  );
	 
	  return $variables;
	}
	
	
	function m_common_variable_group_info() {
		
	  $groups['m_common'] = array(
	  	'title' => t('Homepage static'),
	    'description' => t('Variable of different types.'),
	    'access' => 'administer site configuration',
	  );
	  
	  $groups['m_common_footer'] = array(
	  	'title' => t('Footer static'),
	    'description' => t('Variable of different types.'),
	    'access' => 'administer site configuration',
	  );
	  
	  $groups['m_content_recruitment'] = array(
	  	'title' => t('Recruitment static'),
	    'description' => t('Variable of different types.'),
	    'access' => 'administer site configuration',
	  );
	  
	  return $groups;
	}
	
		