<?php
/**
 * Add body classes if certain regions have content.
 */

function pasteur_preprocess(&$variables,$hook){
		#tuyen add variable more
		#may be use variable_set , variable_get to make the variable global
    $variables['theme_path']=base_path().drupal_get_path('theme','pasteur');
    $variables['image_path']=$variables['theme_path'].'/images';
}

function pasteur_preprocess_html(&$variables) {
	global $language;

  if (!empty($variables['page']['featured'])) {
    $variables['classes_array'][] = 'featured';
  }



  drupal_add_css(path_to_theme().'/css/lang-'.$language->language.'.css',array('group' => 101));
	drupal_add_js(path_to_theme().'/js/l10n_'.$language->language.'.js',array('type' => 'file' , 'scope' => 'footer'));
	#drupal_add_js(path_to_theme().'/js/l10n.js',array('type' => 'file' , 'scope' => 'footer'));
  drupal_add_css(path_to_theme() . '/css/iefix.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'lte IE 9', '!IE' => FALSE), 'preprocess' => FALSE));


}

/**
 * Override or insert variables into the page template for HTML output.
 */
function pasteur_process_html(&$variables) {

  foreach ($variables['css'] as $key => $val) {
		if (preg_match('/^(sites\/all\/)?modules\/(system|node|comment|user|overlay|forum|toolbar|feedback|search|locale|date|field)\/.*/', $key) || preg_match('/jquery\.ui\.theme.css/i', $key)) {
			unset($variables['css'][$key]);
		}
	}

	unset($variables['page_top']); //Remove toolbar

	$variables['styles'] = drupal_get_css($variables['css']);


}

/**
 * Override or insert variables into the page template.
 */
function pasteur_process_page(&$variables) {

}

/**
 * Implements hook_preprocess_maintenance_page().
 */
function pasteur_preprocess_maintenance_page(&$variables) {
  // By default, site_name is set to Drupal if no db connection is available
  // or during site installation. Setting site_name to an empty string makes
  // the site and update pages look cleaner.
  // @see template_preprocess_maintenance_page
  if (!$variables['db_is_active']) {
    $variables['site_name'] = '';
  }
  drupal_add_css(drupal_get_path('theme', 'pasteur') . '/css/maintenance-page.css');
}

/**
 * Override or insert variables into the maintenance page template.
 */
function pasteur_process_maintenance_page(&$variables) {
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name']   = theme_get_setting('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));
  }
}

/**
 * Override or insert variables into the node template.
 */
function pasteur_preprocess_node(&$variables) {
  if ($variables['view_mode'] == 'full' && node_is_page($variables['node'])) {
    $variables['classes_array'][] = 'node-full';
  }
}

/**
 * Override or insert variables into the block template.
 */
function pasteur_preprocess_block(&$variables) {

  // In the header region visually hide block titles.
  if ($variables['block']->region == 'header') {
    $variables['title_attributes_array']['class'][] = 'element-invisible';
  }

  if($variables['block']->delta=='language'){
  	$settings = variable_get('link_webmail', array(
			'link' => '',
		));
		$variables['link_webmail']=$settings['link'];

  }
}

function pasteur_preprocess_region(&$variables){
	$variables['prefix_content']='';
	if($variables['region']=='sidebar_left' && !$variables['is_front'] && $_GET['q']!='contact-us'){
		$variables['prefix_content'] ='<a href="#" title="" id="expandTag" class="expand">&nbsp;</a>';
		if(isset($variables['elements']['news_menu_news'])){
			$variables['prefix_content']=$variables['elements']['news_menu_news']['#block']->m_button;
		}
	}

}

/**
 * Implements theme_menu_tree().
 */
function pasteur_menu_tree($variables) {
	return '<ul class="menu clearfix">' . $variables['tree'] . '</ul>';
}

function pasteur_menu_tree__menu_left_pasteur($variables){
	return '<ul class="sidebar-left-nav">' . $variables['tree'] . '</ul>';
}

function pasteur_menu_tree__menu_history_pasteur($variables){
	return '<ul class="tree-menu">' . $variables['tree'] . '</ul>';
}

function pasteur_menu_tree__menu_health_services($variables){
	return '<ul class="sidebar-left-nav">' . $variables['tree'] . '</ul>';
}

function pasteur_menu_link__menu_history_pasteur(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

	$element['#localized_options']['attributes']['class'][] = 'type-0' . $element['#original_link']['depth'];
  if ($element['#below']) {
  	$element['#below']['#theme_wrappers']=array('menu_tree_history');
    $sub_menu = drupal_render($element['#below']);
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Implements theme_field__field_type().
 */
function pasteur_field__taxonomy_term_reference($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h3 class="field-label">' . $variables['label'] . ': </h3>';
  }

  // Render the items.
  $output .= ($variables['element']['#label_display'] == 'inline') ? '<ul class="links inline">' : '<ul class="links">';
  foreach ($variables['items'] as $delta => $item) {
    $output .= '<li class="taxonomy-term-reference-' . $delta . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . (!in_array('clearfix', $variables['classes_array']) ? ' clearfix' : '') . '">' . $output . '</div>';

  return $output;
}


/*** CUSTOMIZE THEME ***/

function pasteur_links__menu_common($variables) {
  $links = $variables['links'];
  $attributes = $variables['attributes'];
  $heading = $variables['heading'];
  global $language_url;
  $output = '';

  if (count($links) > 0) {
    $output = '';

    // Treat the heading first if it is present to prepend it to the
    // list of links.
    if (!empty($heading)) {
      if (is_string($heading)) {
        // Prepare the array that will be used when the passed heading
        // is a string.
        $heading = array(
          'text' => $heading,
          // Set the default level of the heading.
          'level' => 'h2',
        );
      }
      $output .= '<' . $heading['level'];
      if (!empty($heading['class'])) {
        $output .= drupal_attributes(array('class' => $heading['class']));
      }
      $output .= '>' . check_plain($heading['text']) . '</' . $heading['level'] . '>';
    }

    $output .= '<ul' . drupal_attributes($attributes) . '>';

    $num_links = count($links);
    $i = 1;

		#Tuyen add pattern for custome menu active , why can user menu_tree_set_path()
		$m_link_active=NULL;
		$m_alias=drupal_get_path_alias($_GET['q'],$language_url->language);
		$m_patter=preg_split('/\//i',$m_alias);
		if(is_array($m_patter)){
			$m_link_active=$m_patter[0];
		}

    foreach ($links as $key => $link) {
      $class = array($key);

      // Add first, last and active classes to the list of links to help out themers.
      if ($i == 1) {
        $class[] = 'first';
      }
      if ($i == $num_links) {
        $class[] = 'last';
      }

   	  $m_path_alias=drupal_get_path_alias($link['href'],$language_url->language);

      if (isset($link['href']) && ($link['href'] == $_GET['q'] || ($link['href'] == '<front>' && drupal_is_front_page()))
           && (empty($link['language']) || $link['language']->language == $language_url->language)
           || (isset($link['attributes']['class'][0]) && $link['attributes']['class'][0]=='active')
      		 || ($link['href'] == $m_link_active)   || ($m_path_alias == $m_link_active )
      ) {

        $class[] = 'active';

      }
      $output .= '<li' . drupal_attributes(array('class' => $class)) . '>';

      if (isset($link['href'])) {
      	$link['attributes']['title']=check_plain($link['title']);

        if(preg_match('/^(http|https):\/\//i',$link['href'])){
        	$link['attributes']['target']='_blank';
        }

        $output .= l($link['title'], $link['href'], $link);
      }
      elseif (!empty($link['title'])) {
        // Some links are actually not links, but we wrap these in <span> for adding title and class attributes.
        if (empty($link['html'])) {
          $link['title'] = check_plain($link['title']);
        }
        $span_attributes = '';
        if (isset($link['attributes'])) {
          $span_attributes = drupal_attributes($link['attributes']);
        }
        $output .= '<span' . $span_attributes . '>' . $link['title'] . '</span>';
      }

      $i++;
      $output .= "</li>\n";
    }

    $output .= '</ul>';
  }


  return $output;
}
# BEGIN : custom links language switcher
function pasteur_links__locale_block($variables){
	$links = $variables['links'];
  $attributes = $variables['attributes'];
  $heading = $variables['heading'];
  global $language_url;
  $output = '';

	/*
  if (count($links) > 0) {

    $num_links = count($links);
    $i = 1;
    foreach ($links as $key => $link) {
      $class = array($key);
			$mclass=array();

      // Add first, last and active classes to the list of links to help out themers.
      if ($i == 1) {
        $class[] = 'first';
      }
      if ($i == $num_links) {
        $class[] = 'last';
      }
      if (isset($link['href']) && ($link['href'] == $_GET['q'] || ($link['href'] == '<front>' && drupal_is_front_page()))
          && (empty($link['language']) || $link['language']->language == $language_url->language)) {
        $mclass[] = 'active';
      }

      $output .= '<li>';

			if($link['language']->language=='en'){
				$link['title']='<img src="'.base_path().drupal_get_path('theme','pasteur').'/images/transparent.png" alt="Image" class="ui-icon init-icon-2" />';
     		$title='English';
			}else{
				$link['title']='<img src="'.base_path().drupal_get_path('theme','pasteur').'/images/transparent.png" alt="Image" class="ui-icon init-icon-3" />';
     		$title='VietNamese';
			}



      if (isset($link['href'])) {
      	$link['attributes']=array('class' => $mclass ,'title' => $title );
      	$link['html'] = true;
        $output .= l($link['title'], $link['href'], $link);


      }
      elseif (!empty($link['title'])) {
        // Some links are actually not links, but we wrap these in <span> for adding title and class attributes.
        if (empty($link['html'])) {
          #$link['title'] = check_plain($link['title']);
        }
        $span_attributes = '';
        if (isset($link['attributes'])) {
          $span_attributes = drupal_attributes($link['attributes']);
          $link_attributes = drupal_attributes(array('class' => $mclass ,'href' => 'javascript:void(0);'));
        }
        $output .= '<a' . $link_attributes . '>' . $link['title'] . '</a>';
        #$link['html'] = true;
        #$output .= l($link['title'], $link['href'], $link);
      }

      $i++;
      $output .= "</li>\n";
    }
  }*/

	$output.='<li><a href="'.base_path().'en" title="'.t('English').'"><img src="'.base_path().drupal_get_path('theme','pasteur').'/images/transparent.png" alt="'.t('English').'" class="ui-icon init-icon-2" /></a></li>';
	$output.='<li><a href="'.base_path().'vi" title="'.t('Vietnam').'"><img src="'.base_path().drupal_get_path('theme','pasteur').'/images/transparent.png" alt="'.t('Vietnam').'" class="ui-icon init-icon-3" /></a></li>';
	return $output;

}
# END : custom links language switcher
