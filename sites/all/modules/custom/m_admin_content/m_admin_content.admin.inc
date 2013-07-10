<?php

module_load_include('inc', 'node', 'node.admin');

function m_node_admin_content($form, $form_state)
{
    if (isset($form_state['values']['operation']) && $form_state['values']['operation'] == 'delete') {
        return node_multiple_delete_confirm($form, $form_state, array_filter($form_state['values']['nodes']));
    }
    $form['filter'] = node_filter_form();
    $m_exit_cat = false;
    if (isset($_SESSION['node_overview_filter'])) {
        foreach ($_SESSION['node_overview_filter'] as $k => $v) {
            list($type, $value) = $v;
            if ($type == 'type') {
                $content_type = $value;
                break;
            }
        }
        #check type exist taxonomy

        if (isset($content_type)) {
            $data_field = field_info_instances("node", $content_type);
            foreach ($data_field as $key => $field) {
                $field_info = field_info_field($key);
                if ($field_info['type'] == 'taxonomy_term_reference') {
                    $m_exit_cat = true;
                    foreach ($field_info['settings']['allowed_values'] as $kv => $vv) {
                        $vocabulary = taxonomy_vocabulary_machine_name_load($vv['vocabulary']);
                        $tree = taxonomy_get_tree($vocabulary->vid);
                        $_option_term = array(0 => t('--SELECT ALL---'));
                        foreach ($tree as $_v) {
                            $_option_term[$_v->tid] = $_v->name;
                        }
                        $form['filter']['filters']['status']['filters']['m_term']['m_term_' . $_v->tid] = array(
                            '#type' => 'select',
                            '#title' => $field['label'],
                            '#options' => $_option_term,
                            '#default_value' => isset($_SESSION['m_tid']['m_term_' . $_v->tid]) ? $_SESSION['m_tid']['m_term_' . $_v->tid] : 0,
                        );
                    }

                    if (isset($form['filter']['filters']['status']['filters']['m_term'])) {
                        $form['filter']['filters']['status']['filters']['m_term']['#tree'] = TRUE;
                    }
                }
            }
        }
    }

    $form['#submit'][] = 'node_filter_form_submit';
    $form['#submit'][] = 'm_node_filter_form_submit';
    $form['admin'] = m_admin_nodes($m_exit_cat);
    return $form;
}

function m_admin_nodes($m_exit_cat)
{
    $admin_access = user_access('administer nodes');
    // Build the 'Update options' form.
    $form['options'] = array(
        '#type' => 'fieldset',
        '#title' => t('Update options'),
        '#attributes' => array('class' => array('container-inline')),
        '#access' => $admin_access,
    );

    $options = array();
    foreach (module_invoke_all('node_operations') as $operation => $array) {
        $options[$operation] = $array['label'];
    }

    $form['options']['operation'] = array(
        '#type' => 'select',
        '#title' => t('Operation'),
        '#title_display' => 'invisible',
        '#options' => $options,
        '#default_value' => 'approve',
    );
    $form['options']['submit'] = array(
        '#type' => 'submit',
        '#value' => t('Update'),
        '#validate' => array('node_admin_nodes_validate'),
        '#submit' => array('node_admin_nodes_submit'),
    );

    // Enable language column if translation module is enabled or if we have any
    // node with language.
    $multilanguage = (module_exists('translation') || db_query_range("SELECT 1 FROM {node} WHERE language <> :language", 0, 1, array(':language' => LANGUAGE_NONE))->fetchField());

    // Build the sortable table header.
    $header = array(
        'title' => array('data' => t('Title'), 'field' => 'n.title'),
        'type' => array('data' => t('Type'), 'field' => 'n.type'),
        'author' => t('Author'),
        'status' => array('data' => t('Status'), 'field' => 'n.status'),
        'changed' => array('data' => t('Updated'), 'field' => 'n.changed', 'sort' => 'desc')
    );
    if ($multilanguage) {
        $header['language'] = array('data' => t('Language'), 'field' => 'n.language');
    }
    $header['operations'] = array('data' => t('Operations'));

    $query = db_select('node', 'n')->extend('PagerDefault')->extend('TableSort');

    node_build_filter_query($query);

    if (!user_access('bypass node access')) {
        // If the user is able to view their own unpublished nodes, allow them
        // to see these in addition to published nodes. Check that they actually
        // have some unpublished nodes to view before adding the condition.
        if (user_access('view own unpublished content') && $own_unpublished = db_query('SELECT nid FROM {node} WHERE uid = :uid AND status = :status', array(':uid' => $GLOBALS['user']->uid, ':status' => 0))->fetchCol()) {
            $query->condition(db_or()
                            ->condition('n.status', 1)
                            ->condition('n.nid', $own_unpublished, 'IN')
            );
        } else {
            // If not, restrict the query to published nodes.
            $query->condition('n.status', 1);
        }
    }

    #Tuyen add them check category

    if ($m_exit_cat == true) {

        if (isset($_SESSION['m_tid']) && count($_SESSION['m_tid']) > 0) {
            $query->innerjoin('taxonomy_index', 't', 't.nid = n.nid');
            foreach ($_SESSION['m_tid'] as $tid) {
                if ($tid > 0) {
                    $query->condition('t.tid', $tid);
                }
            }
        }
    }


    $nids = $query
            ->fields('n', array('nid'))
            ->limit(50)
            ->orderByHeader($header)
            ->addTag('node_access')
            ->execute()
            ->fetchCol();
    $nodes = node_load_multiple($nids);

    // Prepare the list of nodes.
    $languages = language_list();
    $destination = drupal_get_destination();
    $options = array();
    foreach ($nodes as $node) {
        $l_options = $node->language != LANGUAGE_NONE && isset($languages[$node->language]) ? array('language' => $languages[$node->language]) : array();
        $options[$node->nid] = array(
            'title' => array(
                'data' => array(
                    '#type' => 'link',
                    '#title' => $node->title,
                    '#href' => 'node/' . $node->nid,
                    '#options' => $l_options,
                    '#suffix' => ' ' . theme('mark', array('type' => node_mark($node->nid, $node->changed))),
                ),
            ),
            'type' => check_plain(node_type_get_name($node)),
            'author' => theme('username', array('account' => $node)),
            'status' => $node->status ? t('published') : t('not published'),
            'changed' => format_date($node->changed, 'custom', 'h:i | d/m/Y'),
        );
        if ($multilanguage) {
            if ($node->language == LANGUAGE_NONE || isset($languages[$node->language])) {
                $options[$node->nid]['language'] = $node->language == LANGUAGE_NONE ? t('Language neutral') : t($languages[$node->language]->name);
            } else {
                $options[$node->nid]['language'] = t('Undefined language (@langcode)', array('@langcode' => $node->language));
            }
        }
        // Build a list of all the accessible operations for the current node.
        $operations = array();
        if (node_access('update', $node)) {
            $operations['edit'] = array(
                'title' => t('edit'),
                'href' => 'node/' . $node->nid . '/edit',
                'query' => $destination,
            );
        }
        if (node_access('delete', $node)) {
            $operations['delete'] = array(
                'title' => t('delete'),
                'href' => 'node/' . $node->nid . '/delete',
                'query' => $destination,
            );
        }
        $options[$node->nid]['operations'] = array();
        if (count($operations) > 1) {
            // Render an unordered list of operations links.
            $options[$node->nid]['operations'] = array(
                'data' => array(
                    '#theme' => 'links__node_operations',
                    '#links' => $operations,
                    '#attributes' => array('class' => array('links', 'inline')),
                ),
            );
        } elseif (!empty($operations)) {
            // Render the first and only operation as a link.
            $link = reset($operations);
            $options[$node->nid]['operations'] = array(
                'data' => array(
                    '#type' => 'link',
                    '#title' => $link['title'],
                    '#href' => $link['href'],
                    '#options' => array('query' => $link['query']),
                ),
            );
        }
    }

    // Only use a tableselect when the current user is able to perform any
    // operations.
    if ($admin_access) {
        $form['nodes'] = array(
            '#type' => 'tableselect',
            '#header' => $header,
            '#options' => $options,
            '#empty' => t('No content available.'),
        );
    }
    // Otherwise, use a simple table.
    else {
        $form['nodes'] = array(
            '#theme' => 'table',
            '#header' => $header,
            '#rows' => $options,
            '#empty' => t('No content available.'),
        );
    }
    $form['pager'] = array('#markup' => theme('pager'));
    $form['#action'] = '?destination=' . $destination;
    return $form;
}

function m_node_filter_form_submit($form, &$form_state)
{
    $filters = node_filters();
    switch ($form_state['values']['op']) {
        case t('Filter'):
        case t('Refine'):

            if (isset($form_state['values']['m_term'])) {
                $_SESSION['m_tid'] = $form_state['values']['m_term'];
            }
            break;
        case t('Reset'):
            $_SESSION['m_tid'] = array();
            break;
    }
}