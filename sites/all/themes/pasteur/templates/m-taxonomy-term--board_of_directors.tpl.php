<?php
	$node_first=array_shift($nodes);

?>
<div class="directors-page page">
	<?php if(count($nodes) == 0 && count($node_first)== 0):?>
		<?php print render($content);?>
	<?php else:?>
	<h2 class="page-title1">
        <span class="inner-title">
            <span><?php print $node_first->title;?>
            </span>
        </span>
    </h2>
	<div class="page-content">
		<div class="block-type-1">
			<?php
			$content=field_get_items('node',$node_first,'body');
			print render(field_view_value('node',$node_first,'body',$content[0],'full'));

			?>
		</div>

		<?php if(count($nodes) > 0 ):?>
		<div class="block-type-2">
			<h4><?php print t('Images Of Leadership Institute Through The Period',array(),array('context' => 'custom'));?></h4>
			<ul id="ulContent">

			  <?php foreach($nodes as $node):?>
				<li>
					<div class="title">
						<span><?php print $node->title;?></span>
						<a href="javascript:void(0)" title="<?php print t('View',array(),array('context' => 'custom'));?>" class="btn-expand"><?php print t('View',array(),array('context' => 'custom'));?></a>
					</div>
					<div class="content hidden">
						<?php
							$content=field_get_items('node',$node,'body');
							print render(field_view_value('node',$node,'body',$content[0],'full'));
						?>
					</div>
				</li>
				<?php endforeach;?>
				</ul>
		</div>
		<?php endif;?>

	</div>

		<!-- end history content-->
	<?php endif;?>

</div>