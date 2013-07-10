<div class="highlight-home">
	<div class="highlight-home-inner">

		<?php if(count($element['#content']) > 0):?>
		<div class="slide">

			<ul class="wrapper-slide" id="slider">
				<?php foreach($element['#content'] as $value):?>
				<li> <img src="<?php print $value['image'];?>" alt="<?php print $value['title'];?>" width="689" height="277" /></li>
				<?php endforeach;?>
			</ul>

			<ul class="slide-control" id="slider-control">
				<?php foreach($element['#content'] as $k => $value):?>
				<li <?php print $k==0 ? 'class="current"' : NULL;?>><span class="ui-icon init-icon-4"></span></li>
				<?php endforeach;?>
			</ul>
			<div class="decription" id="slider-description">
				<div class="decription-inner">
					<?php foreach($element['#content'] as $k => $value):?>
					<p <?php print $k > 0 ? 'class="hidden"' : NULL;?>><?php print $value['desc'];?></p>
					<?php endforeach;?>
				</div>
			</div>
		</div>
		<div class="news">
			<h3><?php echo t('Event highlights')?></h3>
			<ul class="list-news">
				<?php foreach($element['#content'] as $k => $value):?>
				<li><a href="<?php print url('node/'.$value['nid']);?>" title="<?php print $value['title_full'];?>"><?php print $value['title'];?></a></li>
				<?php endforeach;?>
			</ul>
		</div>
		<?php endif;?>

	</div>
</div>