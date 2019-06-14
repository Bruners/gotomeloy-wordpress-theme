
<script>

/* 
content: {
 header: 'Cookies used on the website!',
 message: 'This website uses cookies to improve your experience.',
 dismiss: 'Got it!',
 allow: 'Allow cookies',
 deny: 'Decline',
 link: 'Learn more',
 href: 'https://www.cookiesandyou.com',
 close: '&#x274c;',
 policy: 'Cookie Policy',
 target: '_blank',
}

*/


<?php
    // Strings
    if ( ICL_LANGUAGE_CODE == "en") {
?>
      var message_txt       = "Vi bruker informasjonskapsler for å  forbedre våre tjenester, kartlegge vår kundegruppe og annonsering på internett. Du kan fortsette å bruke nettsiden som normalt dersom du godtar dette",
          dismiss_txt = "Ok",
          link_txt   = "Les mer"
<?php
    } elseif ( ICL_LANGUAGE_CODE == "nb" ) {
?>
      var message_txt       = "Vi bruker informasjonskapsler for å  forbedre våre tjenester, kartlegge vår kundegruppe og annonsering på internett. Du kan fortsette å bruke nettsiden som normalt dersom du godtar dette",
          dismiss_txt = "Ok",
          link_txt   = "Les mer"
<?php
    }
?>
window.addEventListener("load", function(){
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#252e39"
    },
    "button": {
      "background": "#14a7d0"
    }
  },
  "theme": "classic",
  "position": "top",
  "content": {
    "message": message_txt,
    "dismiss": dismiss_txt,
    "link": link_txt
  }


})});

</script>


