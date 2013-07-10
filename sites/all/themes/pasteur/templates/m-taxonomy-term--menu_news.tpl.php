<div class="news-page page">
    <h2 class="page-title1">
        <span class="inner-title">
            <span><?php print $term_name; ?>
            </span>
        </span>
    </h2>
    <div class="news-content">

        <?php if (!empty($nodes)): ?>
            <ul>
                <?php
                foreach ($nodes as $node):
                    $node->title_head = m_common_teaser($node->title, 7);
                    $summary = field_get_items('node', $node, 'body');
                    if ($summary[0]['summary'] != '') {
                        $summary = field_view_value('node', $node, 'body', $summary[0], 'teaser');
                    } else {
                        $summary = field_view_value('node', $node, 'body', $summary[0], 'full');
                    }
                    $node->summary = m_common_teaser($summary['#markup'], 30);

                    $image = field_get_items('node', $node, 'field_image');
                    $node->image = '';
                    if ($image) {
                        $node->image = l('<img src="' . image_style_url('news_homethumb', $image[0]['uri']) . '" alt="' . check_plain($node->title) . '" />', 'node/' . $node->nid, array(
                            'html' => true,
                            'attributes' => array(
                                /* 'class' => 'feature', */
                                'title' => check_plain($node->title)
                            )
                                ));
                    }
                    ?>
                    <li>
                        <div class="outter-news">
                            <div class="inner-news">
        <?php print $node->image; ?>
                                <h3><?php print l($node->title_head, 'node/' . $node->nid, array('attributes' => array('title' => check_plain($node->title)))); ?></h3>
                                <div class="desc">
        <?php print $node->summary; ?>
                                </div>
                                <a href="<?php print url('node/' . $node->nid); ?>" title="<?php print t('Read more'); ?>">
                                    <img src="<?php print $image_path; ?>/transparent.png" class="ui-bullet init-bullet-1" alt="" />
                                </a>
                            </div>
                        </div>
                    </li>
    <?php endforeach; ?>

            </ul>
        <?php else: ?>
            <?php print render($content); ?>
<?php endif; ?>

    </div>

        <?php if (isset($content['pager'])): ?>
        <div class="paging-1">
        <?php print render($content['pager']); ?>
        </div>
<?php endif; ?>

</div>