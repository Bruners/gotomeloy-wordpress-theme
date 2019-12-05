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
    var message_txt = "Vi bruker informasjonskapsler for å  forbedre våre tjenester, kartlegge vår kundegruppe og annonsering på internett. Du kan fortsette å bruke nettsiden som normalt dersom du godtar dette",
        dismiss_txt = "Ok",
        link_txt   = "Les mer",
        link_url = 'https://www.stott.no/personvernerklaering/'
<?php
    }
?>

window.addEventListener("load", function() {
  // Google Analytics
  var loadGA = function()
  {
  if (typeof ga !== 'undefined')
  {
    return false;
  }

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  <?php if( $gdpr_google_analytics != null) { ?>
    ga('create', '<?php echo $gdpr_google_analytics; ?>', 'auto');
    ga('set', 'forceSSL', true);
    <?php if($options['ga-displayfeatures'] == 1) {
      echo ("ga('require', 'displayfeatures');");
    } ?>
    <?php if($options['ga-anonymizeip'] == 1) {
      echo ("ga('set', 'anonymizeIp', true);");
    } ?>
    ga('send', 'pageview');

  <?php } else { ?>
    console.log('Google Anaylitcs not set');
  <?php } ?>
}

  // Facebook Pixel Code
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('consent', 'revoke');
  <?php if( $gdpr_facebook_pixel != null) { ?>
    fbq('init', '<?php echo $gdpr_facebook_pixel; ?>');
  <?php } else { ?>
    console.log('Facebook pixel not set');
  <?php } ?>

  // Load facebook customer chat
  jQuery.ajaxSetup({ cache: true });
  jQuery.getScript('https://connect.facebook.net/nb_NO/sdk/xfbml.customerchat.js', function(){
    FB.init({
      xfbml            : true,
      version          : 'v3.3'
    });
  });

  window.cookieconsent.initialise({
     "palette": {
      "popup": {
        "background": "#252e39"
      },
      "button": {
        "background": "#14a7d0"
      }
    },
    "position": "top",
    "content": {
      "message": message_txt,
      "dismiss": dismiss_txt,
      "link": link_txt,
      "href": link_url
    },
    onInitialise: function(status) {
      if (this.hasConsented()) {
        fbq('consent', 'grant');
        fbq('track', 'PageView');
        loadGA();
      }
    },
    onStatusChange: function(status, chosenBefore) {
      if (this.hasConsented()) {
        fbq('consent', 'grant');
        fbq('track', 'PageView');
        loadGA();
      }
    },
    onRevokeChoice: function() {
      console.log(this.hasConsented() ? 'enable cookies' : 'disable cookies');
      fbq('consent', 'revoke');
    }
  })
  });
</script>
