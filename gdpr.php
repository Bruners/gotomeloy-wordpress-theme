<?php
  $options = get_option( 'gotomeloy_theme_options' );
  $gdpr_facebook_pixel = null;
  $gdpr_google_analytics = null;

  if( isset( $options['gdpr-facebook-pixel'] ) ) {
    $gdpr_facebook_pixel = $options['gdpr-facebook-pixel'];
  }

  if( isset( $options['gdpr-google-analytics'] ) ) {
    $gdpr_google_analytics = $options['gdpr-google-analytics'];
  }

?>

<script>
<?php
  // Strings
  if ( ICL_LANGUAGE_CODE == "en") {
?>
  var message_txt = "We use cookies to improve our services on our website, map our usergroup and for advertising on the web. If you accept cookies, you may continue using this website.",
      dismiss_txt = "Ok",
      link_txt   = "Read more"
      link_url = "https://www.cookiesandyou.com/"
<?php
  } elseif ( ICL_LANGUAGE_CODE == "nb" ) {
?>
  var message_txt = "Vi bruker informasjonskapsler for å forbedre våre tjenester, kartlegge vår kundegruppe og annonsering på internett. Du kan fortsette å bruke nettsiden som normalt dersom du godtar dette",
      dismiss_txt = "Ok",
      link_txt   = "Les mer",
      link_url = 'https://www.stott.no/personvernerklaering/'
<?php
    }
?>

  // Facebook Pixel Code
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  '//connect.facebook.net/en_US/fbevents.js');

  // Google Analytics
  (function(f,i,r,e,s,h,l){i['GoogleAnalyticsObject']=s;f[s]=f[s]||function(){
        (f[s].q=f[s].q||[]).push(arguments)},f[s].l=1*new Date();h=i.createElement(r),
        l=i.getElementsByTagName(r)[0];h.async=1;h.src=e;l.parentNode.insertBefore(h,l)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

window.addEventListener("load", function() {

  window.cookieconsent.initialise(
  {
     "palette": {
      "popup": {
        "background": "#252e39"
      },
      "button": {
        "background": "#14a7d0"
      }
    },
    "position": "bottom-left",
    "content": {
      "message": message_txt,
      "dismiss": dismiss_txt,
      "link": link_txt,
      "href": link_url
    },
    onInitialise: function(status)
    {
      if(typeof fbq == 'undefined') {
        console.log('Facebook pixel is undefined');
      }

  <?php if( $gdpr_facebook_pixel != null) { ?>

      if(typeof fbq !== 'undefined') {
        fbq('init', '<?php echo $gdpr_facebook_pixel; ?>');
      } else {
        console.log('Facebook pixel is undefined');
      }

  <?php } else { ?>

      console.log('Facebook Pixel ID not configured');

  <?php } ?>

      if (this.hasConsented()) {
        if(typeof fbq !== 'undefined') {
          fbq('consent', 'grant');
          fbq('track', 'PageView');
        } else {
          console.log('Facebook pixel is undefined');
        }

    <?php if( $gdpr_google_analytics != null) { ?>

        if(typeof ga !== 'undefined') {
          ga('create', '<?php echo $gdpr_google_analytics; ?>', 'auto');
          ga('set', 'forceSSL', true);

      <?php if($options['ga-displayfeatures'] == 1) {

          echo ("ga('require', 'displayfeatures');");

      } ?>

      <?php if($options['ga-anonymizeip'] == 1) {

          echo ("ga('set', 'anonymizeIp', true);");

      } ?>

          ga('send', 'pageview');

        } else {
          console.log('Google analytics is undefined');
        }

      <?php } else { ?>

        console.log('Google Anaylitcs ID not configured');

    <?php } ?>

        // Load facebook customer chat
        jQuery.ajaxSetup({ cache: true });
        jQuery.getScript('https://connect.facebook.net/nb_NO/sdk/xfbml.customerchat.js', function(){
            FB.init({
                xfbml            : true,
                version          : 'v3.3'
            });
        });
      }
    },
    onStatusChange: function(status, chosenBefore) {
      if (this.hasConsented()) {
        if(typeof fbq !== 'undefined') {
          fbq('consent', 'grant');
          fbq('track', 'PageView');
          location.reload();
        } else {
          console.log('Facebook pixel is undefined');
        }

        if(typeof ga !== 'undefined') {
          ga('send', 'pageview');
        } else {
          console.log('Google analytics is undefined');
        }
      }
    },
    onRevokeChoice: function() {
      console.log(this.hasConsented() ? 'enable cookies' : 'disable cookies');
      if(typeof fbq !== 'undefined') {
        fbq('consent', 'revoke');
      } else {
        console.log('Facebook pixel is undefined');
      }
    }
  })
  });
</script>
