<?php 


if( get_field('ikon_enable') ):
	
?>
<div class="row">
	<div class="col-xs-12">
    	<div class="single-header-icons">
<?php

for ($x = 1; $x <= 10; $x++) {

	if ( get_field('ikon_' . $x) ): 
		$ikon_ikon = get_field('ikon_' . $x . '_ikon');
		$ikon_tittel = get_field('ikon_' . $x . '_tittel');
		$ikon_tekst = get_field('ikon_' . $x . '_tekst');
	?>
    		<div class="icon-div-portfolio">
        		<div class="icon-icon"><i class="<?php echo $ikon_ikon; ?>"></i></div>
        		<div class="icon-text">
        			<div class="icon-title"><?php echo $ikon_tittel; ?></div>
        			<p><?php echo $ikon_tekst; ?></p>
        		</div>
    		</div>
<?php endif; 
    
} ?>

 		</div><!-- end icons -->
	</div>
</div>

<?php endif; ?>
