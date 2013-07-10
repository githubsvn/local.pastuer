<?php
	function m_common_taxonomy_term_page($term) {
		global $pager_page_array, $pager_total,$language_content;
		$term = i18n_taxonomy_localize_terms($term);

		if($term->language != $language_content->language){
			$build['content']=array(
				'#markup' => t('Sorry, we are updating content ..')
			);
			return $build;
		}
		drupal_set_title($term->name);
		$current = (object) array(
			'tid' => $term->tid,
		);
		$build = array();
		$build['#term']=$term;
		$limit=6;
		$pager=TRUE;
		if($term->vocabulary_machine_name != 'menu_news'){
			$limit=100;
			$pager=FALSE;
		}
		if ($nids = taxonomy_select_nodes($term->tid, $pager , $limit )) {
			$nodes = node_load_multiple($nids);
			$build['#nodes']=$nodes;
			$page = '';
			if ($pager_total[0] > 1) {
				$page = array(
					'curr_p' => $pager_page_array,
					'total_p' => $pager_total,
					'link' => 'news/term/collaspe/'.$term->tid,
					'query' => (array())
				);

				$build['pager'] = array(
					'#markup' => news_pager($page,6) ,
					'#weight' => 5,
				);
			}
		}
		else {
			$build['no_content'] = array(
				'#prefix' => '<p>',
				'#markup' => t('There is currently no content classified with this term.'),
				'#suffix' => '</p>',
			);
		}

		$build['#theme']='m_taxonomy_term';
		return $build;
	}



