<?php
$image = '<img src="' . $element['#image_path'] . '/menu_pasteur_history.png" />';
$collapsible_image_handle = t('Hình ảnh hướng dẫn');
$collapsible_image_content = theme('ctools_collapsible', array('handle' => $collapsible_image_handle, 'content' => $image, 'collapsed' => TRUE));
?>
<h3>Hướng dẫn phần add menu "Lịch sử hình thành"</h3>
<div style="padding-left:5px">
    <b>Bước 1 </b> : <b>Tạo menu cha</b> cho phần lịch sử hình thành  <br />
    Những menu nào là menu cha thì có Path : <b><?php print check_plain('<void>'); ?></b> <br />
    <b>Bước 2 </b> : Tạo content cho phần "Lịch sủ hình thành". Vui lòng <a href="<?php echo url('node/add/pasteur-history'); ?>" target="_blank">click vào đây </a> để thêm nội dung của phần "Lịch sử hình thành"
    <br />
    <br />

    Link "Lịch sử hình thành" : <a href="<?php print url('pasteur-institute/history'); ?>" target="_blank">click vào đây</a>

</div>
<div style="padding-top:10px;">
    <?php print $collapsible_image_content; ?>
</div>