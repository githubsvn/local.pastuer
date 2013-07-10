<?php

	function scientific_research_show_first(){
		$menu_tree = i18n_menu_translated_tree('menu-scientific-research');
		reset($menu_tree);
		$k=key($menu_tree);
		if($k <= 0 ){
			drupal_goto();	
		}
		if(isset($menu_tree[$k]['#original_link'])){
			if(	$menu_tree[$k]['#original_link']['router_path'] == 'node/%'){
				drupal_goto($menu_tree[$k]['#original_link']['link_path']);
			}
		}
		
		$title=check_plain($menu_tree[$k]['#title']);
		drupal_set_title($title);
		$_GET['q']='scientific-research/'.$k;
		drupal_goto($_GET['q']);
	}

	function show_sub_menu($parent_menu){
		
		$title=$parent_menu['link_title'];
		drupal_set_title($title);
		
		$build=array();
		$build['title']=$title;
	
		$build['menu_tree'] = array();
		$menu_tree = i18n_menu_translated_tree($parent_menu['menu_name']); 
		if( array_key_exists($parent_menu['mlid'], $menu_tree) ) {
			$i=0;
			$su_menu=array();
			unset($menu_tree[$parent_menu['mlid']]['#below']['#sorted']);
			unset($menu_tree[$parent_menu['mlid']]['#below']['#theme_wrappers']);
			foreach($menu_tree[$parent_menu['mlid']]['#below'] as $key => $value ){
				 $sql="SELECT link_path FROM {menu_links} 
				 			 WHERE mlid = :mlid AND language = :language ";
				 $link_path=db_query($sql,array(':mlid' => $key , ':language' => i18n_langcode()))->fetchField();
				 if($link_path=='<void1>'){
					 	$su_menu[$i]= $value['#below'];	
					 	$su_menu[$i]['#prefix']='<h4>'.$value['#title'].'</h4>';
						$su_menu[$i]['#theme_wrappers']=array('menu_tree_common');
						$build['menu_tree'] += $su_menu;
						$i++; 
				 } 
			}
			
			if( $i < count($menu_tree[$parent_menu['mlid']]['#below'])){
				
				$build['menu_tree'] = array();
				$build['menu_tree'] = $menu_tree[$parent_menu['mlid']]['#below'];	
				$build['menu_tree']['#theme_wrappers']=array('menu_tree_common');
			}
		  
		}
		$build['#theme']='m_scientific_research';
		return $build;
	}
	
	
	
