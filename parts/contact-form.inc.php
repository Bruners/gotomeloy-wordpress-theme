<style type="text/css">
    #contact-respone{
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

        <form method="post" id='ContactForm' action="#">
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label" for="message_name">Your Name</label>
                        <input type="text" class="form-control" id="message_name" name="message_name" placeholder=" Enter Name" value="<?php echo esc_attr($_POST['message_name']); ?>">
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="message_email">Email Address</label>
                        <input type="email" class="form-control" id="message_email" name="message_email" placeholder=" Enter Email id" value="<?php echo esc_attr($_POST['message_email']); ?>">
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label" for="message_text"> Message</label>
                        <textarea class="form-control" id="message_text" name="message_text" placeholder="Enter Your Message"><?php echo esc_textarea($_POST['message_text']); ?></textarea>
                    </div>
                    <div class="col-xs-6">
                        <div class="form-inline">
                            <input type="hidden" name="submitted" value="1">
                            <label class="control-label" for="message_human">Human Verification</label>
                            <div class="input-group" style="width:140px;" >
                                <input type="text" class="form-control" id="message_human" name="message_human">
                                <span class="input-group-addon">+ 3 = 5</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="submit"> </label>
                            <div name="submit form-control">
                                <button type="submit" class="btn btn-primary contact-submit">
                                    <i class="fa fa-paper-plane" aria-hidden="true"></i>  Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</article>