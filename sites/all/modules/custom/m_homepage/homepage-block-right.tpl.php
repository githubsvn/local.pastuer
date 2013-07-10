<?php
	$count=count($element['#content']);
?>
<?php if($count > 0):?>
<h3><span><?php print t('Counsellings');?></span></h3>
<div class="list-items">
	<?php foreach($element['#content'] as $k => $value):?>
	<dl <?php if(($k+1) == $count):?>class='last'<?php endif;?>>
		<dt>
			<a href="<?php print url('node/'.$value['nid']);?>" title="<?php print $value['title_full'];?>">
				<img src="<?php print $value['image'];?>" alt="<?php print $value['title_full'];?>" width="86" height="86" />
			</a>
		</dt>
		<dd>
			<h4><a href="<?php print url('node/'.$value['nid']);?>" title="<?php print $value['title_full'];?>"><?php print $value['title'];?></a></h4>
			<p class="date"><?php print t('Date').': '. format_date($value['created'],'custom','h:i | d/m/Y');?></p>
			<p><?php print $value['desc'];?><a href="<?php print url('node/'.$value['nid']);?>" title="<?php print t('Detail');?>"><?php print t('Detail');?></a></p>
		</dd>
	</dl>

	<?php endforeach;?>
</div>
<?php endif;?>