<?php

  //response generation function

  $response = "";

  //function to generate response
  function my_contact_form_generate_response($type, $message){

    global $response;

    if($type == "success") $response = "<p class='bg-success'>{$message}</p>";
    else $response = "<p class='bg-danger'>{$message}</p>";

  }

  //response messages
  $not_human       = "Human verification incorrect.";
  $missing_content = "Please supply all information.";
  $email_invalid   = "Email Address Invalid.";
  $message_unsent  = "Message was not sent. Try Again.";
  $message_sent    = "Thanks! Your message has been sent.";
  $email_from = "kontakt@stott.no";

  //user posted variables
  $name = $_POST['message_name'];
  $email = $_POST['message_email'];
  $message = $_POST['message_text'] . "\r\n\r\n" . "--" . "\r\n" . "This e-mail was sent from a contact form on Støtt Brygge (https://www.stott.no)";
  $human = $_POST['message_human'];

  //php mailer variables
  $to = "fiskebruket@gmail.com"; //get_option('admin_email');
  $subject = 'Kontaktskjema fra ' . get_bloginfo('name') . " - " . $name;
  $headers = 'From: '. $name . ' <' . $email_from . '>' . "\r\n" .
    'Reply-To: ' . $email . "\r\n";

  if(!$human == 0){
    if($human != 2) my_contact_form_generate_response("error", $not_human); //not human!
    else {

      //validate email
      if(!filter_var($email, FILTER_VALIDATE_EMAIL))
        my_contact_form_generate_response("error", $email_invalid);
      else //email is valid
      {
        //validate presence of name and message
        if(empty($name) || empty($message)){
          my_contact_form_generate_response("error", $missing_content);
        }
        else //ready to go!
        {
          $sent = wp_mail($to, $subject, strip_tags($message), $headers);
          if($sent) my_contact_form_generate_response("success", $message_sent); //message sent!
          else my_contact_form_generate_response("error", $message_unsent); //message wasn't sent
        }
      }
    }
  }
  else if ($_POST['submitted']) my_contact_form_generate_response("error", $missing_content);

?>

<?php get_header(); ?>
<style>
    .section-content {
        text-align: center; 
    }
    .contact-section {
        padding-top: 40px;
        padding-bottom: 40px;
        position: inherit;
    }
    .form-response p {
        padding: 15px;
    }

    textarea.form-control {
        height: 135px;
        font-size: inherit;
        /* margin-top: px;*/
    }
    input[type="text"].form-control, 
    input[type="email"].form-control,
    span.input-group-addon {
        height: 34px;
        font-size: inherit;
    }

    .submit{
        font-size: 1.1em;
    }
</style>

<section id="site-body" class="container-fluid sections">
    <div class="container">
        <?php while ( have_posts() ) : the_post(); ?>
            <div class="section-content">
                <h4 class="section-header"><?php the_title(); ?></h4>
                <h5><?php the_content(); ?></h5>
            </div>
            <div class="contact-section">
                <div class="form-response">
                    <?php echo $response; ?>
                </div>
                <form action="<?php the_permalink(); ?>" method="post">
                    <div class="row">
                        <div class="col-md-6 form-line">
                            <div class="form-group">
                                <label class="control-label" for="message_name">Your Name</label>
                                <input type="text" class="form-control" id="message_name" name="message_name" placeholder=" Enter Name" value="<?php echo esc_attr($_POST['message_name']); ?>">
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="message_email">Email Address</label>
                                <input type="email" class="form-control" id="message_email" name="message_email" placeholder=" Enter Email id" value="<?php echo esc_attr($_POST['message_email']); ?>">
                            </div>
                        </div>
                        <div class="col-md-6">
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
                                <div class="form-inline">
                                    <label class="control-label" for="submit"> </label>
                                    <button type="submit" class="btn btn-primary submit"><i class="fa fa-paper-plane" aria-hidden="true"></i>  Send Message</button>
                                </div>
                            </div>
                        </div>
                     </div>
                </form>
            </div>    
        <?php endwhile; // end of the loop. ?>
    </div>
</section>

<?php get_footer(); ?>