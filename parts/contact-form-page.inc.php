<style type="text/css">
    #ContactFormResponsePage{
        display:none;
    }
</style>

<article class="sections padding-size-s contact-section">
    <div class="contact-section">
        <div id="ContactFormResponsePage">
            <!-- here message will be displayed -->
        </div>

        <form id="ContactFormPage">
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <input type="hidden" name="action" value="contact_send" />
                        <label class="control-label" for="message_name"><?php echo(esc_html__( 'Navn:', 'gotomeloy' )); ?></label>
                        <input type="text" class="form-control" id="message_name" name="message_name" placeholder=" Navn" value="<?php echo esc_attr($_POST['message_name']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="message_email"><?php echo(esc_html__( 'Epost:', 'gotomeloy' )); ?></label>
                        <input type="email" class="form-control" id="message_email" name="message_email" placeholder=" Epost" value="<?php echo esc_attr($_POST['message_email']); ?>" required>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label" for="message_text"><?php echo(esc_html__( 'Din melding:', 'gotomeloy' )); ?></label>
                        <textarea class="form-control" id="message_text" name="message_text" placeholder="Melding.." required><?php echo esc_textarea($_POST['message_text']); ?></textarea>
                    </div>
                    <div class="col-xs-6">
                        <div class="form-group form-inline">
                            <label class="control-label" for="message_human"><?php echo(esc_html__( 'Menneskelig verifisering:', 'gotomeloy' )); ?></label>
                            <div class="input-group" style="width:140px;" >
                                <input type="text" class="form-control" id="message_human_page" name="message_human" required>
                                <span class="input-group-addon">+ 3 = 5</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div class="form-group float-right">
                            <label class="control-label" for="submit_div"> </label>
                            <div name="submit_div">
                                <button type="submit" class="btn btn-primary contact-submit">
                                    <i class="fa fa-paper-plane" aria-hidden="true"></i>  Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</article>

<script>
    jQuery(document).ready(function ($) {

        <?php get_template_part( 'parts/contact-form-strings.inc' ); ?>
        
        // Hide response div.
        jQuery("#ContactFormResponsePage").fadeOut();

        var is_sending = false;

        jQuery('#ContactFormPage').submit(function (e) {
            e.preventDefault(); // Prevent the default form submit

            if (is_sending || !validateInputs()) {
                // Don't let someone submit the form while it is in-progress.
                return false;
            }
            $this = jQuery(this); // Cache this

            jQuery.ajax({
                url: '<?php echo admin_url("admin-ajax.php") ?>', // Let WordPress figure this url out.
                type: 'post',
                dataType: 'JSON', // Set this so we don't need to decode the response.
                data: $this.serialize(), // One-liner form data prep.
                beforeSend: function () {
                    is_sending = true;
                    // You could do an animation here.
                },
                error: handleFormError,
                success: function (data) {
                    if (data.status === 'success') {
                        jQuery("#ContactFormResponsePage").fadeIn('slow', function(){
                            jQuery("#ContactFormResponsePage").html('<div class="alert alert-success">'+message_sent+'</div>');
                            jQuery("#ContactFormResponsePage").delay(3000).fadeOut();
                        });
                        jQuery('#ContactFormPage')[0].reset();
                        jQuery("#message_human_page").closest('div').removeClass('has-error');
                    } else {
                        // If we don't get the expected response, it's an error.
                        handleFormError();
                    }
                }
            });
        });

        function handleFormError() {
            // Reset the is_sending var so they can try again.
            is_sending = false;

            jQuery("#ContactFormResponsePage").fadeIn('slow', function(){
                jQuery("#ContactFormResponsePage").html('<div class="alert alert-danger">'+failure_message+'</div>');
            });
        }


        function validateInputs () {
            var $human = jQuery('#message_human_page').val(),
                $name = jQuery('#message_name').val(),
                $email = jQuery('#message_email').val(),
                $message = jQuery('#message_text').val();
            if ($human != "2") {
                jQuery("#ContactFormResponsePage").fadeIn('slow', function(){
                    jQuery("#ContactFormResponsePage").html('<div class="alert alert-danger">'+not_human+'</div>');
                    jQuery("#message_human_page").closest('div').addClass('has-error');
                });
                return false;
            } else if (!$name || !$email || !$message) {
                jQuery("#ContactFormResponsePage").fadeIn('slow', function(){
                    jQuery("#ContactFormResponsePage").html('<div class="alert alert-warning">'+missing_content+'</div>');
                });
                return false;
            }
            return true;
        }
    });
</script>