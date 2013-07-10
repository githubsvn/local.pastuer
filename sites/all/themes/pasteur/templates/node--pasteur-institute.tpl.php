<div class="pasteur-page page">
	<h2 class="page-title1">
        <span class="inner-title">
           <span>
                <?php print $title;?>
            </span>
        </span>
            </h2>
	<div class="page-content fck">
		<div class="about-highlight">
			<?php if(isset($content['images_thumb']) && $content['images_thumb'] != ''):?>
			<div class="slide-type-01" id="image-gallery">
				<div class="slide-outer-01">
					<div class="slide-inner-01">
						<ul>
							<?php print $content['images_large'];?>
						</ul>
					</div>
				</div>
				<div class="slide-thumb"> <a class="next" title="<?php print t('Previous');?>"><?php print t('Previous');?></a>
					<div class="thumb-content">
						<ul>
							<?php print $content['images_thumb'];?>
						</ul>
					</div>
				<a class="prev" title="<?php print t('Next');?>"><?php print t('Next');?></a> </div>
			</div>
			<?php endif;?>
			<?php if(isset($content['summary']) && $content['summary'] != ''):?>
            <?php print render($content['summary']);?>
            <?php endif;?>

		</div>
			<!--end about content-->
		<div class="about-content">
				<?php
				hide($content['links']);
				print render($content);

				?>
		</div>
	</div>
		<!--end about-pasteur-->
</div>