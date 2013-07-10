<?php
	$count=count($element['lists']);
	$m_recruitment=variable_get_value('m_recruitment',array('value' => ''));
?>
<div class="recruitment-page1 page ">
    <h2 class="page-title1">
        <span class="inner-title">
            <span><?php print t('Recuritment');?>
            </span>
        </span>
    </h2>
	<div class="page-content">
		<?php print $m_recruitment['value'];?>
		<div class="block-type-2">
			<h4>
				<?php print t('The vacancy',array(),array('context' => 'custom'));?>

			</h4>
			<?php if($count > 0 ):?>
			<ul id="ulContent">
				<?php foreach($element['lists'] as $key => $list):?>
				<?php
					$c_nodes=count($list['nodes'])
				?>
				<li <?php print $key +1 == $count ? 'class="last"' : NULL ;?>>
					<div class="title">
						<span><?php print $list['name'];?></span>
						<?php if($c_nodes > 0 ):?>
						<span class="hiring"><?php print t('Hiring');?></span>
						<a href="javascript:void(0);" title="<?php print t('View');?>" class="btn-expand"><?php print t('View');?></a>
						<?php endif;?>

					</div>
					<?php if($c_nodes  > 0 ):?>
					<div class="content">
						<ul>
							<?php $k=0;?>
							<?php foreach($list['nodes'] as $node):?>

							<?php #$recruiting=field_get_items('node',$node,'field_recruitment_recruiting');?>
							<li <?php if((++$k) == $c_nodes):?>class='last'<?php endif;?>>
								<a href="<?php print url('node/'.$node->nid);?>" title="<?php print check_plain($node->title);?>"><?php print check_plain($node->title);?></a>
							</li>
							<?php endforeach;?>

						</ul>
					</div>

					<?php endif;?>
				</li>
			  <?php endforeach;?>

			</ul>
			<?php else:?>
			<div>
				<?php print t('No recruitment');?>
			</div>
			<?php endif;?>

		</div>
	</div>
</div>