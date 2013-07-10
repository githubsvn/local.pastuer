<?php
	$image='<img src="'.$element['#image_path'].'/menu_scientific_research.png" />';
	$collapsible_image_handle=t('Hình ảnh hướng dẫn 1');
  $collapsible_image_content= theme('ctools_collapsible', array('handle' => $collapsible_image_handle, 'content' => $image , 'collapsed' => TRUE));
  
  $image='<img src="'.$element['#image_path'].'/menu_scientific_research_1.png" />';
	$collapsible_image_handle=t('Hình ảnh hướng dẫn 2');
  $collapsible_image_content1= theme('ctools_collapsible', array('handle' => $collapsible_image_handle, 'content' => $image , 'collapsed' => TRUE));

	
?>
<h3>Hướng dẫn phần add menu "Nghiên cứu khoa học"</h3>
<div style="padding-left:5px">
	Path : <b><?php print check_plain('<scientific_research>');?></b> <br />
	Path :  <b><?php print check_plain('<void1>');?></b> <br />
	Path :  <b><?php print check_plain('<void>');?></b> <br />
	<br />
	
	Xem hướng dẫn ở hai hình dưới đây
		

</div>
<div style="padding-top:10px;">
	<?php print $collapsible_image_content;?>
</div>

<div style="padding-top:10px;">
	<?php print $collapsible_image_content1;?>
</div>