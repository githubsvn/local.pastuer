<?php

	function health_education_show_first(){
		$menu_tree = i18n_menu_translated_tree('menu-health-education');
		reset($menu_tree);
		$k=key($menu_tree);
		if($k == 0 ){
			drupal_goto();	
		}
		
		if(isset($menu_tree[$k]['#original_link'])){
			if(	$menu_tree[$k]['#original_link']['router_path'] == 'node/%'){
				drupal_goto($menu_tree[$k]['#original_link']['link_path']);
			}
		}
		
		$title=check_plain($menu_tree[$k]['#title']);
		drupal_set_title($title);
		$_GET['q']='health-education/'.$k;
		$build=array();
		$build['title']=$title;
		$build['menu_tree'] = $menu_tree[$k]['#below'];
		$build['menu_tree']['#theme_wrappers']=array('menu_tree_common');
		
		$build['#theme']='m_health_education';
		return $build;
	}

	function show_sub_menu($parent_menu){
		$title=$parent_menu['link_title'];
		drupal_set_title($title);
		
 	  menu_tree_set_path($parent_menu['menu_name'], 'health-education/'.$parent_menu['mlid']);
		
		$build=array();
		$build['title']=$title;
		
		$build['menu_tree'] = FALSE;
		$menu_tree = i18n_menu_translated_tree($parent_menu['menu_name']); 
		if( array_key_exists($parent_menu['mlid'], $menu_tree) ) {
		
		  $build['menu_tree'] = $menu_tree[$parent_menu['mlid']]['#below'];	
			$build['menu_tree']['#theme_wrappers']=array('menu_tree_common');
		}
		
		$build['#theme']='m_health_education';
		return $build;
	}
	