<div class="health-education-page page">
	<h2 class="page-title1">
	<span class="inner-title">
	   <span>
		<?php if(isset($content['term_name'])):?>
		<?php print $content['term_name'];?>11
		<?php else:?>
		<?php print $title;?>22
		<?php endif;?>
	   </span>
	   </span>
	</h2>

	<?php print $content['other_node'];?>

	<div class="page-content">

		<?php if($node->show_other_node):?>
		<h4><?php print $title;?></h4>
		<?php endif;?>

		<div class="tool-bar">
			<div class="tool-left">
				<span><?php print t('Date created',array(),array('context' => 'custom'));?>: </span>
				<span class="date"><?php print format_date($node->created,'custom','h:i | d/m/Y');?></span>
			</div>
			<ul class="tool-box">
				<?php print render($content['file_download']);?>
				<li class="print">
					<a id='m-print' href="#" title="<?php print t('Print',array(),array('context' => 'custom'));?>">
						<img src="<?php print $image_path;?>/transparent.png" alt="<?php print t('Print',array(),array('context' => 'custom'));?>" class="ui-icon init-icon-12" />
						<span><?php print t('Print',array(),array('context' => 'custom'));?></span>
					</a>
				</li>
			</ul>
		</div>

		<div class="disease-content fck">

				<?php print render($content['summary']);?>

				<?php if(isset($content['images']) && $content['images'] !=''):?>
				<div id="caption" class="block-caption">
					<h4 class="title"><?php print t('Images');?></h4>
					<div class="caption-content">
						<ul>
							<?php print $content['images'];?>
						</ul>
						<a class="next" href="#" title="<?php print t('Next');?>"></a>
						<a class="previous" href="#" title="<?php print t('Previous');?>"></a>
					</div>
				</div>
				<?php endif;?>

				<?php
					hide($content['summary']);
					hide($content['links']);
					hide($content['file_download']);
					print render($content);
				?>
		</div>

		<div class="tool-bar">
			<div class="tool-left bottom">
				<a class="ui-button button-type-2" title="<?php print t('Other articles');?>" href="javascript:history.go(-1);"><?php print t('Other articles');?></a>
			</div>
			<div class="top-page">
				<a class="" title="<?php print t('Top page');?>" href="#"><?php print t('Top page');?></a>
			</div>
		</div>

	</div>

	<!-- end history content-->
</div>