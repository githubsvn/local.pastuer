<?php
	$image='<img src="'.$element['#image_path'].'/menu_heal_education_1.png" />';
	$collapsible_image_handle=t('Hình ảnh hướng dẫn 1');
  $collapsible_image_content1= theme('ctools_collapsible', array('handle' => $collapsible_image_handle, 'content' => $image , 'collapsed' => TRUE));
  
  $image='<img src="'.$element['#image_path'].'/menu_heal_education_2.png" />';
	$collapsible_image_handle=t('Hình ảnh hướng dẫn 2');
  $collapsible_image_content2= theme('ctools_collapsible', array('handle' => $collapsible_image_handle, 'content' => $image , 'collapsed' => TRUE));

	$image='<img src="'.$element['#image_path'].'/menu_heal_education_3.png" />';
	$collapsible_image_handle=t('Hình ảnh hướng dẫn 3');
  $collapsible_image_content3= theme('ctools_collapsible', array('handle' => $collapsible_image_handle, 'content' => $image , 'collapsed' => TRUE));

	
?>
<h3>Hướng dẫn phần add menu "Giáo dục sức khỏe"</h3>
<div style="padding-left:5px">
	Path : <b><?php print check_plain('<public_health>');?></b> <br />
	Path :  <b><?php print check_plain('<void>');?></b> <br />
	<br />
	
	Xem hướng dẫn ở hai hình dưới đây
		

</div>
<div style="padding-top:10px;">
	<?php print $collapsible_image_content1;?>
</div>

<div style="padding-top:10px;">
	<?php print $collapsible_image_content2;?>
</div>

<div style="padding-top:10px;">
	<?php print $collapsible_image_content3;?>
</div>
<br /><br />