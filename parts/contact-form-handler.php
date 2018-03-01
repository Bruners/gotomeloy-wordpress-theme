<?php

	if($_POST)
	{
	  //function to generate response
	  // http://www.mattblancarte.com/how-to-create-a-wordpress-ajax-contact-form/

	  //response messages
	  $not_human       = "Human verification incorrect.";
	  $missing_content = "Please supply all information.";
	  $email_invalid   = "Email Address Invalid.";
	  $message_unsent  = "Message was not sent. Try Again.";
	  $message_sent    = "Thanks! Your message has been sent.";
	  $email_from 	   = "kontakt@stott.no";

	  //user posted variables
	  $name = $_POST['message_name'];
	  $email = $_POST['message_email'];
	  $message = $_POST['message_text'] . "\r\n\r\n" . "--" . "\r\n" . "This e-mail was sent from a contact form on Støtt Brygge (https://www.stott.no)";
	  $human = $_POST['message_human'];

	  //php mailer variables
	  $to = "fiskebruket@gmail.com"; //get_option('admin_email');
	  $subject = 'Kontaktskjema fra Støtt Brygge' . $name;
	  $headers = 'From: '. $name . ' <' . $email_from . '>' . "\r\n" .
	    'Reply-To: ' . $email . "\r\n";

	  if(!$human == 0){
	    if($human != 2) echo $not_human; //not human!
	    else {

	      //validate email
	      if(!filter_var($email, FILTER_VALIDATE_EMAIL))
	        echo $email_invalid;
	      else //email is valid
	      {
	        //validate presence of name and message
	        if(empty($name) || empty($message)){
	          echo $missing_content;
	        }
	        else //ready to go!
	        {
	          $sent = wp_mail($to, $subject, strip_tags($message), $headers);
	          if($sent) echo $message_sent; //message sent!
	          else echo $message_unsent; //message wasn't sent
	        }
	      }
	    }
	  }
	  else if ($_POST['submitted']) echo $missing_content;
    }

?>
