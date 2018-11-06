/* global jQuery */
/* global wp */


/**
 * Customizer Control: JavaScript part of slider control
 *
 * @package     Azbalac Controls
 * @subpackage  Controls
 * @copyright   Copyright (c) 2018, Ralf Geschke
 * @license     https://opensource.org/licenses/MIT
 * @since       0.1
 */

(function ($) {

   
wp.customize.controlConstructor.azbalac_slider = wp.customize.Control.extend( {


    ready: function() {
        var control = this;
             
        var element = $(this.container).find('.customize-control-slider-value');
               
        $(element).on('change paste keyup', function(event) {
            control.setting.set( element.val() );
            return true;
        });
     
    },

   

} );
  

})(jQuery);