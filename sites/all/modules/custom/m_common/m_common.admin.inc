<?php

function common_setting_form($form,$form_state){
	$form['common_settings'] = array(
		'#type' => 'vertical_tabs',
		'#weight' => 99,
	);

	$settings = variable_get('email_settings', array(
		'email_contact' => '',
		'email_recive_cv' => '',
	));

	$form['email_settings'] = array(
		'#type' => 'fieldset',
		'#title' => t('Email settings'),
		'#collapsible' => TRUE,
		'#collapsed' => FALSE,
		'#group' => 'common_settings',
		'#tree' => TRUE,
		'#weight' => - 6,
	);

	$form['email_settings']['email_contact'] = array(
		'#type' => 'textfield',
		'#title' => t('Email contact'),
		'#description' => t('Email contact to mail'),
		'#size' => 20,
		'#default_value' => $settings['email_contact'],
		'#attributes' => array(
			'style' => 'width:250px;'
		),
	);
	
	$form['email_settings']['email_recive_cv'] = array(
		'#type' => 'textfield',
		'#title' => t('Email Recevice CV'),
		'#description' => t('Config recevice cv to email'),
		'#size' => 20,
		'#default_value' => $settings['email_recive_cv'],
		'#attributes' => array(
			'style' => 'width:250px;'
		),
	);
	
	
	#-----------------
	$settings = variable_get('map_setting', array(
		'address' => '',
		'latitude' => '',
		'longtitude' => '',
	));
	
	
	$form['map_setting'] = array(
		'#type' => 'fieldset',
		'#title' => t('Map settings'),
		'#collapsible' => TRUE,
		'#collapsed' => FALSE,
		'#group' => 'common_settings',
		'#tree' => TRUE,
		'#weight' => - 6,
	);
	
	$form['map_setting']['address'] = array(
		'#type' => 'textfield',
		'#title' => t('Address'),
		'#description' => t('Address of the map'),
		'#size' => 20,
		'#default_value' => $settings['address'],
		'#attributes' => array(
			'style' => 'width:250px;'
		),
	);
	
	$form['map_setting']['latitude'] = array(
		'#type' => 'textfield',
		'#title' => t('Latitude'),
		'#description' => t('Latitude for the map'),
		'#size' => 20,
		'#default_value' => $settings['latitude'],
		'#attributes' => array(
			'style' => 'width:250px;'
		),
	);
	
	$form['map_setting']['longtitude'] = array(
		'#type' => 'textfield',
		'#title' => t('Longtitude'),
		'#description' => t('Longtitude for the map'),
		'#size' => 20,
		'#default_value' => $settings['longtitude'],
		'#attributes' => array(
			'style' => 'width:250px;'
		),
	);
	
	#-----------------------------
	
	$settings = variable_get('link_webmail', array(
		'link' => '',
	));
	
	
	$form['link_webmail'] = array(
		'#type' => 'fieldset',
		'#title' => t('Link webmail settings'),
		'#collapsible' => TRUE,
		'#collapsed' => FALSE,
		'#group' => 'common_settings',
		'#tree' => TRUE,
		'#weight' => - 5,
	);
	
	$form['link_webmail']['link'] = array(
		'#type' => 'textfield',
		'#title' => t('Link'),
		'#description' => t('Examp: http://webmail.pasteur.com '),
		'#default_value' => $settings['link'],
		'#attributes' => array(
			'style' => 'width:250px;'
		),
	
	);


	return system_settings_form($form);
}