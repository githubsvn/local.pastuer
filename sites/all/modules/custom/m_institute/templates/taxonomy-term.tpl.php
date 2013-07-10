<div class="directors-page page">
	<?php if(isset($element['no_content'])):?>
		<?php print render($element['no_content']);?>
	<?php else:?>
	   <h2 class="page-title1">
            <span class="inner-title">
            <span><?php print check_plain($element['nodes'][0]->title);?>
            </span>
          </span>
      </h2>
	<div class="page-content">

		<div class="block-type-1">
			<?php
			$content=field_get_items('node',$element['nodes'][0],'body');
			print $content[0]['safe_value'];
			?>
		</div>



		<?php if(($count=count($element['nodes'])) > 1):?>
		<div class="block-type-2">
			<h4><?php print t('Images Of Leadership Institute Through The Period',array(),array('context' => 'custom'));?></h4>
			<ul id="ulContent">

			  <?php for($i=1; $i < $count ; $i++):?>
				<li>
					<div class="title">
						<span><?php print check_plain($element['nodes'][$i]->title);?></span>
						<a href="javascript:void(0)" title="<?php print t('View',array(),array('context' => 'custom'));?>" class="btn-expand"><?php print t('View',array(),array('context' => 'custom'));?></a>
					</div>
					<div class="content hidden">
						<?php
							$content=field_get_items('node',$element['nodes'][$i],'body');
							print $content[0]['safe_value'];
						?>
					</div>
				</li>
				<?php endfor;?>
				</ul>
		</div>
		<?php endif;?>

	</div>

		<!-- end history content-->
	<?php endif;?>

</div>