<?php

class SocialShareSettings
{
    /**
     * Holds the values to be used in the fields callbacks
     */
    private $options;

    /**
     * Start up
     */
    public function __construct()
    {
        add_action( 'admin_menu', array( $this, 'gotomeloy_theme_menu_items' ) );
        add_action( 'admin_init', array( $this, 'gotomeloy_theme_settings' ) );
    }

    /**
     * Add options page
     */
    public function gotomeloy_theme_menu_items() // add_plugin_page()
    {
        // This page will be under "Settings"
        // add_options_page( $page_title, $menu_title, $capability, $menu_slug, $function);
        add_options_page(
            __('Instillinger GOTOMELOY wordpress theme'),
            __('Theme-Instillinger'),
            'manage_options',
            'gotomeloy-theme-settings',
            array( $this, 'gotomeloy_settings_page' )
        );
    }

    /**
     * Options page callback
     */
    public function gotomeloy_settings_page() // create_admin_page()
    {
        // Set class property
        $this->options = get_option( 'gotomeloy_theme_options' );
        ?>
        <div class="wrap">
            <h1><?php print __('Instillinger GOTOMELOY Wordpress Theme') ?></h1>
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'social_share_group' ); // my_option_group
  
                do_settings_sections( 'gotomeloy-theme-settings' ); // my-setting-admin

                submit_button();
            ?>
            </form>
        </div>
        <?php
    }

    /**
     * Register and add settings
     */
    public function gotomeloy_theme_settings()
    {
        // Buttons

        register_setting(
            'social_share_group',
            'gotomeloy_theme_options',
            array( $this, 'gm_sanitize' )
        );

        add_settings_section(
            'social_share_buttons-header',
            __('Deleknapper'),
            array( $this, 'print_section_info' ),
            'gotomeloy-theme-settings'
        );

        add_settings_field(
            'social-share-buttons',
            __('Aktiver deleknapper?', 'gotomeloy'),
            array( $this, 'social_share_buttons_checked' ),
            'gotomeloy-theme-settings',
            'social_share_buttons-header'
        );

        add_settings_field(
            'social-share-facebook-button',
            __('Vis deleknapp for Facebook?', 'gotomeloy'),
            array( $this, 'social_share_facebook_checked' ),
            'gotomeloy-theme-settings',
            'social_share_buttons-header'
        );

        add_settings_field(
            'social-share-twitter-button', // ID id_number
            __('Vis deleknapp for Twitter?', 'gotomeloy'), // Title
            array( $this, 'social_share_twitter_checked' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'social_share_buttons-header' // Section
        );

        add_settings_field(
            'social-share-googleplus-button', // ID id_number
            __('Vis deleknapp for Google+?', 'gotomeloy'), // Title
            array( $this, 'social_share_googleplus_checked' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'social_share_buttons-header' // Section
        );

        add_settings_section(
            'social_share_profile-header', // ID setting_section_id
            __('Profiler'), // Title My Custom Settings
            array( $this, 'print_section_info_profile' ), // Callback
            'gotomeloy-theme-settings' // Page
        );

        add_settings_field(
            'social-share-facebook-profile', // ID id_number
            __('Facebook profil', 'gotomeloy'), // Title
            array( $this, 'social_share_facebook_profile' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'social_share_profile-header' // Section
        );

        add_settings_field(
            'social-share-youtube-profile', // ID id_number
            __('Youtube profil', 'gotomeloy'), // Title
            array( $this, 'social_share_youtube_profile' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'social_share_profile-header' // Section
        );

        add_settings_field(
            'social-share-instagram-profile', // ID id_number
            __('Instagram profil', 'gotomeloy'), // Title
            array( $this, 'social_share_instagram_profile' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'social_share_profile-header' // Section
        );

        add_settings_field(
            'social-share-twitter-profile', // ID id_number
            __('Twitter profil', 'gotomeloy'), // Title
            array( $this, 'social_share_twitter_profile' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'social_share_profile-header' // Section
        );

        add_settings_field(
            'social-share-tripadvisor-profile', // ID id_number
            __('Tripadvisor profil', 'gotomeloy'), // Title
            array( $this, 'social_share_tripadvisor_profile' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'social_share_profile-header' // Section
        );

        add_settings_section(
            'contact-form-header', // ID setting_section_id
            __('Kontaktskjema'), // Title My Custom Settings
            array( $this, 'print_section_info_contact' ), // Callback
            'gotomeloy-theme-settings' // Page
        );

        add_settings_field(
            'contact-form-logo', // ID id_number
            __('Logo kontakskjema', 'gotomeloy'), // Title
            array( $this, 'contact_form_logo' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'contact-form-header' // Section
        );

        add_settings_field(
            'contact-form-adresse', // ID id_number
            __('Adresse kontakskjema', 'gotomeloy'), // Title
            array( $this, 'contact_form_adresse' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'contact-form-header' // Section
        );
        add_settings_section(
            'gdpr-header', // ID setting_section_id
            __('GDPR'), // Title My Custom Settings
            array( $this, 'print_section_info_gdpr()' ), // Callback
            'gotomeloy-theme-settings' // Page
        );

        add_settings_field(
            'gdpr-facebook-pixel', // ID id_number
            __('Facebook Pixel ID', 'gotomeloy'), // Title
            array( $this, 'gdpr_facebook_pixel' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'gdpr-header' // Section
        );
        add_settings_field(
            'gdpr-google-analytics', // ID id_number
            __('Google Analytics ID', 'gotomeloy'), // Title
            array( $this, 'gdpr_google_analytics' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'gdpr-header' // Section
        );

        add_settings_field(
            'ga-displayfeatures', // ID id_number
            __('Aktiver demografi- og interesserapporter for remarketing og annonsering'), // Title
            array( $this, 'ga_displayfeatures_checked' ), // Callback id_number_callback
            'gotomeloy-theme-settings', // Page
            'gdpr-header' // Section
        );
    }


    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     */
    public function gm_sanitize( $input )
    {
        $new_input = array();
        if( isset( $input['social-share-buttons'] ) )
            $new_input['social-share-buttons'] = esc_attr( $input['social-share-buttons'] );

        if( isset( $input['social-share-facebook-profile'] ) )
            $new_input['social-share-facebook-profile'] = esc_url_raw( $input['social-share-facebook-profile'] );
        
        if( isset( $input['social-share-youtube-profile'] ) )
            $new_input['social-share-youtube-profile'] = esc_url_raw( $input['social-share-youtube-profile'] );

        if( isset( $input['social-share-instagram-profile'] ) )
            $new_input['social-share-instagram-profile'] = esc_url_raw( $input['social-share-instagram-profile'] );
        
        if( isset( $input['social-share-twitter-profile'] ) )
            $new_input['social-share-twitter-profile'] = esc_url_raw( $input['social-share-twitter-profile'] );
        
        if( isset( $input['social-share-tripadvisor-profile'] ) )
            $new_input['social-share-tripadvisor-profile'] = esc_url_raw( $input['social-share-tripadvisor-profile'] );

        if( isset( $input['social-share-facebook-button'] ) )
            $new_input['social-share-facebook-button'] = esc_attr( $input['social-share-facebook-button'] );

        if( isset( $input['social-share-twitter-button'] ) )
            $new_input['social-share-twitter-button'] = esc_attr( $input['social-share-twitter-button'] );

        if( isset( $input['social-share-googleplus-button'] ) )
            $new_input['social-share-googleplus-button'] = esc_attr( $input['social-share-googleplus-button'] );

        if( isset( $input['contact-form-logo'] ) )
            $new_input['contact-form-logo'] = esc_url_raw( $input['contact-form-logo'] );

        if( isset( $input['contact-form-adresse'] ) )
            $new_input['contact-form-adresse'] = esc_html( $input['contact-form-adresse'] );

        if( isset( $input['gdpr-facebook-pixel'] ) )
            $new_input['gdpr-facebook-pixel'] = esc_textarea( $input['gdpr-facebook-pixel'] );

        if( isset( $input['gdpr-google-analytics'] ) )
            $new_input['gdpr-google-analytics'] = esc_textarea( $input['gdpr-google-analytics'] );
        
        if( isset( $input['ga-displayfeatures'] ) )
            $new_input['ga-displayfeatures'] = esc_attr( $input['ga-displayfeatures'] );

        return $new_input;
    }

    public function print_section_info()
    {   
        $text_section_info_buttons = __('Aktiver deleknapper for sosiale medier vist i poster og sider:', 'gotomeloy');

        $site_url = site_url();
        $text_share = __('Del dette:', 'gotomeloy');
        $text_facebook = __(  'Klikk for å dele på Facebook', 'gotomeloy' );
        $text_googleplus = __(  'Klikk for å dele på Google+', 'gotomeloy' );
        $text_twitter = __(  'Klikk for å dele på Twitter', 'gotomeloy' );

        print $text_section_info_buttons;

        print '<div class="sb-social-icon"><h5 class="sb-title">' . $text_share . '</h5><div class="sb-content"><ul><li><a href="http://www.facebook.com/sharer.php?u=' . $site_url . '" rel="nofollow" class="fab fa-facebook" target="_blank" title="' . $text_facebook . '"><span class="sr-only">' . $text_facebook . '</span></a></li><li><a href="https://plus.google.com/share?url=' . $site_url . '" rel="nofollow" class="fab fa-google" target="_blank" title="' . $text_googleplus . '"><span class="sr-only">' . $text_googleplus . '</span></a></li><li><a href="https://twitter.com/share?url=' . $site_url . '" rel="nofollow" class="fab fa-twitter" target="_blank" title="' . $text_twitter . '"><span class="sr-only">' . $text_twitter . '</span></a></li><li class="share-end"></li></ul></div></div>';
    }

    public function print_section_info_profile()
    {
        $text_section_info_profiles = __('Profiler på sosial medier som skal vises på siden, tomme felt blir deaktivert:');

        print $text_section_info_profiles;
    }

    public function social_share_buttons_checked()
    {
        printf(
          '<input type="checkbox" id="social-share-buttons" name="gotomeloy_theme_options[social-share-buttons]" value="1" %s />',
          isset( $this->options['social-share-buttons'] ) ? checked(1, $this->options['social-share-buttons'], false) : ''
        );
    }

    public function social_share_facebook_checked()
    {
        printf(
          '<input type="checkbox" id="social-share-facebook-button" name="gotomeloy_theme_options[social-share-facebook-button]" value="1" %s />',
          isset( $this->options['social-share-facebook-button'] ) ? checked(1, $this->options['social-share-facebook-button'], false) : ''
        );
    }

    public function social_share_twitter_checked()
    {
        printf(
            '<input type="checkbox" id="social-share-twitter-button" name="gotomeloy_theme_options[social-share-twitter-button]" value="1" %s />',
            isset( $this->options['social-share-twitter-button'] ) ? checked(1, $this->options['social-share-twitter-button'], false) : ''
        );
    }

    public function social_share_googleplus_checked()
    {
        printf(
            '<input type="checkbox" id="social-share-googleplus-button" name="gotomeloy_theme_options[social-share-googleplus-button]" value="1" %s />',
            isset( $this->options['social-share-googleplus-button'] ) ? checked(1, $this->options['social-share-googleplus-button'], false) : ''
        );
    }

    public function social_share_facebook_profile()
    {
        printf(
            '<input class="social-share-input-form" type="text" id="social-share-facebook-profile" name="gotomeloy_theme_options[social-share-facebook-profile]" value="%s" />',
            isset( $this->options['social-share-facebook-profile'] ) ? esc_url_raw( $this->options['social-share-facebook-profile'] ) : ''
        );

    }
    
    public function social_share_youtube_profile()
    {
        printf(
            '<input class="social-share-input-form" type="text" id="social-share-youtube-profile" name="gotomeloy_theme_options[social-share-youtube-profile]" value="%s" />',
            isset( $this->options['social-share-youtube-profile'] ) ? esc_url_raw( $this->options['social-share-youtube-profile'] ) : ''
        );

    }
    public function social_share_instagram_profile()
    {
        printf(
            '<input class="social-share-input-form" type="text" id="social-share-instagram-profile" name="gotomeloy_theme_options[social-share-instagram-profile]" value="%s" />',
            isset( $this->options['social-share-instagram-profile'] ) ? esc_url_raw( $this->options['social-share-instagram-profile'] ) : ''
        );

    }

    public function social_share_twitter_profile()
    {
        printf(
            '<input class="social-share-input-form" type="text" id="social-share-twitter-profile" name="gotomeloy_theme_options[social-share-twitter-profile]" value="%s" />',
            isset( $this->options['social-share-twitter-profile'] ) ? esc_url_raw( $this->options['social-share-twitter-profile'] ) : ''
        );

    }

    public function social_share_tripadvisor_profile()
    {
        printf(
            '<input class="social-share-input-form" type="text" id="social-share-tripadvisor-profile" name="gotomeloy_theme_options[social-share-tripadvisor-profile]" value="%s" />',
            isset( $this->options['social-share-tripadvisor-profile'] ) ? esc_url_raw( $this->options['social-share-tripadvisor-profile'] ) : ''
        );

    }

    public function print_section_info_contact()
    {
        print __('Metadata til kontakskjema', 'gotomeloy');
    }

    public function contact_form_logo()
    {
        if (!empty($this->options['contact-form-logo'])) {
            $logo = $this->options['contact-form-logo'];
            print '<img src="' . $logo . '" width="100px" height="auto" />';
        }

        printf(
            '<input class="social-share-input-form" type="text" id="contact-form-logo" name="gotomeloy_theme_options[contact-form-logo]" value="%s" />',
            isset( $this->options['contact-form-logo'] ) ? esc_url_raw( $this->options['contact-form-logo'] ) : ''
        );
    }

    public function contact_form_adresse()
    {
        printf(
            '<textarea class="social-share-input-form form-textarea textarea" id="contact-form-adresse" name="gotomeloy_theme_options[contact-form-adresse]" rows="5" cols="1">%s</textarea>',
            isset( $this->options['contact-form-adresse'] ) ? html_entity_decode( $this->options['contact-form-adresse'] ) : ''
        );
    }

    public function print_section_info_gdpr()
    {
        $text_section_info_gdpr = __('ID for Google Analytics og Facebook pixel');

        print $text_section_info_gdpr;
    }

    public function gdpr_facebook_pixel()
    {
        printf(
            '<input class="social-share-input-form" type="text" id="gdpr-facebook-pixel" name="gotomeloy_theme_options[gdpr-facebook-pixel]" value="%s" />',
            isset( $this->options['gdpr-facebook-pixel'] ) ? esc_textarea( $this->options['gdpr-facebook-pixel'] ) : ''
        );

    }

    public function print_ga_displayfeatures()
    {
        $text_ga_displayfeatures = __('Aktiver demografi- og interesserapporter for remarketing og annonsering');

        print $text_ga_displayfeatures;
    }

    public function ga_displayfeatures_checked()
    {
        printf(
            '<input type="checkbox" id="ga-displayfeatures" name="gotomeloy_theme_options[ga-displayfeatures]" value="1" %s />',
            isset( $this->options['ga-displayfeatures'] ) ? checked(1, $this->options['ga-displayfeatures'], false) : ''
        );
    }

    public function gdpr_google_analytics()
    {
        printf(
            '<input class="social-share-input-form" type="text" id="gdpr-google-analytics" name="gotomeloy_theme_options[gdpr-google-analytics]" value="%s" />',
            isset( $this->options['gdpr-google-analytics'] ) ? esc_textarea( $this->options['gdpr-google-analytics'] ) : ''
        );

    }
}





if( is_admin() ) {
  $social_share_settings_page = new SocialShareSettings();
}

// Function to display share icons
function add_social_share_icons()
{

    $options = get_option( 'gotomeloy_theme_options' );
    $text_share = __('Del dette:', 'gotomeloy');
    $text_facebook = __(  'Klikk for å dele på Facebook', 'gotomeloy' );
    $text_googleplus = __(  'Klikk for å dele på Google+', 'gotomeloy' );
    $text_twitter = __(  'Klikk for å dele på Twitter', 'gotomeloy' );

    if ($options['social-share-buttons'] == 1)
    {
        $html = "<div class='clearfix'><div class='sb-social-icon'><h5 class='sb-title'>" . $text_share . "</h5><div class='sb-content'><ul>";

        global $post;

        $url = get_permalink($post->ID);
        $url = esc_url($url);

        if($options['social-share-facebook-button'] == 1)
        {
            $html = $html . "<li><a href='http://www.facebook.com/sharer.php?u=" . $url . "' rel='nofollow' class='fab fa-facebook' target='_blank' title='" . $text_facebook . "'><span class='sr-only'>" . $text_facebook . "</span></a></li>";
        }

        if($options['social-share-googleplus-button'] == 1)
        {
            $html = $html . "<li><a href='https://plus.google.com/share?url=" . $url . "' rel='nofollow' class='fab fa-google' target='_blank' title='" . $text_googleplus . "'><span class='sr-only'>" . $text_googleplus . "</span></a></li>";
        }

        if($options['social-share-twitter-button'] == 1)
        {
            $html = $html . "<li><a href='https://twitter.com/share?url=" . $url . "' rel='nofollow' class='fab fa-twitter' target='_blank' title='" . $text_twitter . "'><span class='sr-only'>" . $text_twitter . "</span></a></li>";
        }


        $html = $html . "<li class='share-end'></li></ul></div></div></div>";

        return $html;    
    }
}


?>
