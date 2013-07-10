<?php
$list = node_load_multiple($nodes);
$listterm = taxonomy_term_load($term);
?>
<div class="news-page page">
    <h2 class="page-title1">
        <span class="inner-title">
            <span><?php echo $listterm->name;?>
            </span>
        </span>
    </h2>
	<div class="news-content">
		<?php if(!empty($list)){?>
		<ul>
			<?php foreach($list as $item){
				$image = '';
				if(!empty($item->field_image['und'])) {
					$src = image_style_url('image_news', $item->field_image['und'][0]['uri']);
					$image = '<img src="'.$src.'" alt="'.news_teaser($item->title,4).'"  />';
				}
				?>
				<li>
					<div class="outter-news">
						<div class="inner-news">
							<a href="<?php echo url('node/'.$item->nid);?>" title="<?php echo news_teaser($item->title,4)?>" class="feature"><?php echo $image?></a>
							<h3><?php echo news_teaser($item->title,4)?> </h3>
							<div class="desc"><?php echo news_teaser($item->body['und'][0]['summary'],30)?></div>
							<a href="<?php echo url('node/'.$item->nid);?>" title="<?php echo t('Read more')?>"><img src="<?php echo $image_path?>/transparent.png" class="ui-bullet init-bullet-1" alt="<?php echo t('Read more')?>"/></a>
							</div>
						</div>
					</li>
					<?php
				}
				?>
			</ul>
			<?php
		}
		?>
	</div><!-- end news-content-->
	<?php
	$p =news_pager($page,6);
	if(!empty($p)) {?>
		<div class="paging-1">
			<?php print news_pager($page,6); ?>
		</div>
		<?php
	}?>
</div>
