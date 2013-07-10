<?php if(count($element['#content']) > 0):?>
<?php $value=$element['#content'];?>
<h3><span><?php print t('Notice',array(),array('context' => 'block'));?></span></h3>
<div class="info-certify">
	<p class="txt-align-c"><img src="<?php print $value[0]['image'];?>" alt="<?php print $value[0]['title_full'];?>" width="90" height="120" /></p>
	<h4><a href="<?php print url('node/'.$value[0]['nid']);?>" title="<?php print $value[0]['title_full'];?>"><?php print $value[0]['title'];?></a></h4>
	<p class="date"><?php print t('Date').': '.format_date($value[0]['created'],'custom','h:i | d/m/Y');?></p>
	<p><?php print $value[0]['desc'];?></p>
</div>
<?php endif;?>
