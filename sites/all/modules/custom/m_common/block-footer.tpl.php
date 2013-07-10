
<ul class="nav-footer">
	<li class="width-type-02">
		<h3><?php print l(t('Home'),'');?></h3>
	</li>
	<li>
		<h3><?php print l(t('Pasteur Insitute'),'pasteur-institute');?></h3>
		<?php print render($element['menu_pasteur_insitute']);?>
	</li>
	<li>
		<h3><?php print l(t('Training'),'');?></h3>
		
	</li>
	<li>
		<h3><?php print l(t('News'),'news/term');?></h3>
		<?php print render($element['menu_news']);?>
	</li>
	<li class="width-type-01">
		<h3><?php print l(t('Recruitment'),'recruitment');?></h3>
		
	</li>
	<li class="width-type-02">
		<h3><?php print l(t('Contact'),'contact-us');?></h3>
	</li>
	<li>
		<h3><?php print t('Visitors');?></h3>
		<?php print $element['vistors'];?>
	</li>
	
</ul>
<?php print $element['footer_content']['value'];?>
