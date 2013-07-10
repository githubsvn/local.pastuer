<div class="pasteur-page page">
	<h2 class="page-title1">
        <span class="inner-title">
           <span><?php print $title;?>
           </span>
        </span>
     </h2>
	<div class="page-content">
		<div class="about-content">
				<?php
				hide($content['links']);
				print render($content);

				?>
		</div>
	</div>
		<!--end about-pasteur-->
</div>