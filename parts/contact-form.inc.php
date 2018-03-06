<style type="text/css">
    #ContactFormResponse{
        display:none;
    }
</style>

<article id="post-<?php the_ID(); ?>">
    <div class="text-center">
        <h4 class="section-header"><?php the_title(); ?></h4>
        <h5><?php the_content(); ?></h5>
    </div>
    <div class="contact-section">
        <div id="ContactFormResponse">
            <!-- here message will be displayed -->
        </div>

        <form id="ContactForm">
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <input type="hidden" name="action" value="contact_send" />
                        <label class="control-label" for="message_name">Navn:</label>
                        <input type="text" class="form-control" id="message_name" name="message_name" placeholder=" Navn" value="<?php echo esc_attr($_POST['message_name']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="message_email">Epost:</label>
                        <input type="email" class="form-control" id="message_email" name="message_email" placeholder=" Epost" value="<?php echo esc_attr($_POST['message_email']); ?>" required>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label" for="message_text">Din melding:</label>
                        <textarea class="form-control" id="message_text" name="message_text" placeholder="Melding.." required><?php echo esc_textarea($_POST['message_text']); ?></textarea>
                    </div>
                    <div class="col-xs-6">
                        <div class="form-group form-inline">
                            <label class="control-label" for="message_human">Menneskelig verifisering</label>
                            <div class="input-group" style="width:140px;" >
                                <input type="text" class="form-control" id="message_human" name="message_human" required>
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

        <?php
            if ( ICL_LANGUAGE_CODE == "en") {
        ?>
                var not_human       = "Human verification incorrect.",
                    missing_content = "Please supply all information.",
                    email_invalid   = "Email Address Invalid.",
                    message_unsent  = "Message was not sent. Try Again.",
                    message_sent    = "Thanks! Your message has been sent.",
                    message_empty   = "Empty message.",
                    failure_message = 'Whoops, looks like there was a problem. Please try again later.';
        <?php
            } elseif ( ICL_LANGUAGE_CODE == "nb" ) {
        ?>
                var not_human       = "Menneskelig verifisering feilet.",
                    missing_content = "Vennligst fyll ut alle felt.",
                    email_invalid   = "Epost-addresse er feil utfyllt",
                    message_unsent  = "Din medling ble ikke sendt, prøv igjen.",
                    message_sent    = "Takk, din melding ble sendt. Vi kontakter deg så snart som mulig.",
                    message_empty   = "Tom meldingsboks.",
                    failure_message = 'Opps, Et problem har oppstått. Vennligst prøv igjen senere.';
        <?php
            }
        ?>

        // Hide response div.
        jQuery("#ContactFormResponse").fadeOut();

        var is_sending = false;

        jQuery('#ContactForm').submit(function (e) {
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
                        jQuery("#ContactFormResponse").fadeIn('slow', function(){
                            jQuery("#ContactFormResponse").html('<div class="alert alert-success">'+message_sent+'</div>');
                            jQuery("#ContactFormResponse").delay(3000).fadeOut();
                        });
                        jQuery('#ContactForm')[0].reset();
                        jQuery("#message_human").closest('div').removeClass('has-error');
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

            jQuery("#ContactFormResponse").fadeIn('slow', function(){
                jQuery("#ContactFormResponse").html('<div class="alert alert-danger">!'+failure_message+'!</div>');
            });
        }


        function validateInputs () {
            var $human = jQuery('#message_human').val(),
                $name = jQuery('#message_name').val(),
                $email = jQuery('#message_email').val(),
                $message = jQuery('#message_text').val();
            if ($human != "2") {
                jQuery("#ContactFormResponse").fadeIn('slow', function(){
                    jQuery("#ContactFormResponse").html('<div class="alert alert-danger">'+not_human+'</div>');
                    jQuery("#message_human").closest('div').addClass('has-error');
                });
                return false;
            } else if (!$name || !$email || !$message) {
                jQuery("#ContactFormResponse").fadeIn('slow', function(){
                    jQuery("#ContactFormResponse").html('<div class="alert alert-warning">'+missing_content+'</div>');
                });
                return false;
            }
            return true;
        }
    });
</script>