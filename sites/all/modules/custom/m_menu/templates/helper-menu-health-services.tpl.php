<?php
$image = '<img src="' . $element['#image_path'] . '/menu_health_services.png" />';
$collapsible_image_handle = t('Hình ảnh hướng dẫn 1');
$collapsible_image_content = theme('ctools_collapsible', array('handle' => $collapsible_image_handle, 'content' => $image, 'collapsed' => TRUE));

$image = '<img src="' . $element['#image_path'] . '/menu_health_services_1.png" />';
$collapsible_image_handle = t('Hình ảnh hướng dẫn 2');
$collapsible_image_content1 = theme('ctools_collapsible', array('handle' => $collapsible_image_handle, 'content' => $image, 'collapsed' => TRUE));
?>
<h3>Hướng dẫn phần add menu "Dịch vụ y tế"</h3>
<div style="padding-left:5px">
    Phần menu có thể add thông qua tạo content : <a href="<?php echo url('node/add/health-services'); ?>" target="_blank">click vào đây </a> và add vào menu "Dịch vụ y tế"
    như hướng dẫn

    Xem hình minh họa ở dưới đây

</div>
<div style="padding-top:10px;">
<?php print $collapsible_image_content; ?>
</div>

<div style="padding-top:10px;">
<?php print $collapsible_image_content1; ?>
</div>