<div class="recruitment-page-details page">
	<h2 class="page-title1">
        <span class="inner-title">
           <span>
            <?php print $title?>
            </span>
        </span>
    </h2>

	<div class="page-content fck">
		<?php
			hide($content['links']);
			hide($content['file_download']);
			hide($content['form_application']);
			hide($content['address_apply']);
			print render($content);
		?>
		<?php print render($content['file_download']);?>

		<?php print render($content['address_apply']);?>

		<?php print render($content['form_application']);?>

		<a href="<?php print url('recruitment');?>" title="<?php print t('Other job');?>" class="btn-other-recruitment"><?php print t('Other job');?></a>

	</div>
	<!-- end history content-->
</div>