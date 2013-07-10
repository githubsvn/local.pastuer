<?php

function pasteur_institute_first_show()
{
    $menu_tree = i18n_menu_translated_tree('menu-left-pasteur');
    reset($menu_tree);
    $k = key($menu_tree);
    if ($k <= 0) {
        drupal_goto();
    }
    if (isset($menu_tree[$k]['#original_link'])) {
        drupal_goto($menu_tree[$k]['#original_link']['link_path']);
    }
}

function show_history()
{

    $build = array();
    $build['menu_tree'] = i18n_menu_translated_tree('menu-history-pasteur');
    $build['#theme'] = 'history';
    return $build;
}

function show_taxonomy_term($term)
{
    $build = array();
    drupal_set_title($term->name);

    if ($nids = taxonomy_select_nodes($term->tid, FALSE, FALSE, $order = array('t.sticky' => 'DESC', 't.created' => 'ASC'))) {
        $build['nodes'] = array_values(node_load_multiple($nids));
    } else {
        $build['no_content'] = array(
            '#prefix' => '<p>',
            '#markup' => t('There is currently no content classified with this term.'),
            '#suffix' => '</p>',
        );
    }

    $build['#theme'] = 'term_board_of_director';
    return $build;
}