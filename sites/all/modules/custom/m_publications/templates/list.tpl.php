<?php

$listterm = taxonomy_term_load($term);
?>
<div class="publications-page">
    <h2 class="page-title1">
        <span class="inner-title">
            <span><?php echo !empty($listterm) ? $listterm->name : '' ?>
            </span>
        </span>
    </h2>
    <?php
if (!empty($nodes)) {
    $list = node_load_multiple($nodes);
    if (!empty($list)) {
?>
    <ul class="news-infomation">
    <?php
        $html = '';
        $k=0;
        foreach ($list as $item) {
        		$file_pdf = field_get_items('node',$item,'field_file_pdf');
        		$path_pdf='';
        		if($file_pdf){
        			$path_pdf=file_create_url($file_pdf[0]['uri']);
        		}

            $html .= '<li'.($k++ == 0 ? ' class="first"' : NULL).'>';
            $html .= '<a href="'.url('node/'.$item->nid).'" class="title1" title="'.$item->title.'">';
            $html .= $item->title;
            $html .= '</a>';
            if ($path_pdf != '') {
                $html .= '<a href="'.$path_pdf.'" class="float-r" title="'.t('Download').'">'.t('Download').'</a>';
            }
            $html .= '</li>';
?>
   <?php
        }
        echo $html;
?>
    </ul>
    <?php
    }
}
?>

</div>
