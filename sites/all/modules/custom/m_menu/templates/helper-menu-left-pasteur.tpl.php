<?php
$image = '<img src="' . $element['#image_path'] . '/menu_left_pasteur.png" />';
$collapsible_image_handle = t('Hình ảnh hướng dẫn');
$collapsible_image_content = theme('ctools_collapsible', array('handle' => $collapsible_image_handle, 'content' => $image, 'collapsed' => TRUE));
?>
<h3>Hướng dẫn phần add menu "Giới thiệu viện Pasteur"</h3>
<div style="padding-left:5px">

    Đây là menu nằm bên tay trái. Có 2 phần menu là : "Lịch sử hình thành" và "Ban giám đốc"  <br />
    Để add những nội dung nằm trong phần "Giới thiệu viện Pasteur" trừ 2 mục <b>"Lịch sử hình thành " và "Ban giám đốc"</b>  <br />

    Tạo content : <a href="<?php echo url('node/add/pasteur-institute'); ?>" target="_blank">click vào đây </a> để thêm nội dung <br />

    <br />
    <br />
    Link "Giới thiệu viện Pasteur" : <a href="<?php print url('pasteur-institute'); ?>" target="_blank">click vào đây</a>

</div>
<div style="padding-top:10px;">
<?php print $collapsible_image_content; ?>
</div>